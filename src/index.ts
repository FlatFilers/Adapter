import 'promise-polyfill/dist/polyfill'

import { EventEmitter } from 'eventemitter3'
import whenDomReady from 'when-dom-ready'
import insertCss from 'insert-css'
import elementClass from 'element-class'
import Penpal from 'penpal'
import FlatfileResults from './results'
import Meta from './obj.meta'
import RecordObject from './obj.record'
import CustomerObject from './obj.customer'
import LoadOptionsObject from './obj.load-options'
import IValidationResponse, { IDataHookRecord, IDataHookResponse } from './obj.validation-response'

export default class FlatfileImporter extends EventEmitter {

  public static Promise = Promise
  private static MOUNT_URL: string = 'https://portal-2.flatfile.io/?key=:key'

  /**
   * Promise that resolves when the handshake is completed between Flatfile.io and the adapter
   */
  public $ready: Promise<any>

  private apiKey: string
  private options: object
  private customer?: CustomerObject
  private uuid: string

  // @ts-ignore
  private handshake: Penpal.IChildConnectionObject

  private $resolver: (data: any) => any
  private $rejecter: (err: any) => any
  private $validatorCallback?: (row: { [key: string]: string | number }) => Array<IValidationResponse> | Promise<Array<IValidationResponse>>
  private $networkErrorCallback?: (err: string) => void
  private $recordHook?: (row: { [key: string]: string | number }, index: number, mode: string) => IDataHookResponse | Promise<IDataHookResponse>
  private $fieldHooks: Array<{ field: string, cb: FieldHookCallback }> = []

  constructor (apiKey: string, options: object, customer?: CustomerObject) {
    super()
    this.apiKey = apiKey
    this.options = options
    this.customer = customer
    this.uuid = this.$generateUuid()
    this.$ready = new FlatfileImporter.Promise((resolve, reject) => {
      this.$resolver = resolve
      this.$rejecter = reject
    })

    whenDomReady(() => {
      this.initialize()
    })
  }

  /**
   * This will by default always be `https://www.flatfile.io/importer/:key` unless you are
   * an enterprise customer that is self-hosting the application. In which case, this
   * will be the URL of your enterprise installd Flatfile importer index page
   */
  public static setMountUrl (url: string): void {
    this.MOUNT_URL = url
  }

  /**
   * This allows you to opt into or out of specific versions of the Flatfile SDK
   */
  public static setVersion (version: 1 | 2): void {
    switch (version) {
      case 1:
        this.MOUNT_URL = 'https://kiosk-lite.flatfile.io/?key=:key'
        break
      case 2:
        this.MOUNT_URL = 'https://portal-2.flatfile.io/?key=:key'
        break
      default:
        throw new Error(`${version} is not a valid version`)
    }
  }

  /**
   * Call open() to activate the importer overlay dialog.
   */
  open (options = {}): void {
    options = {
      ...options,
      hasRecordHook: !!this.$recordHook,
      fieldHooks: this.$fieldHooks.map(v => v.field),
      endUser: this.customer
    }
    this.$ready.then((child) => {
      elementClass(document.body).add('flatfile-active')
      let el = document.getElementById(`flatfile-${this.uuid}`)
      if (el) {
        el.style.display = 'block'
      }
      child.open(options)
    })
  }

  /**
   * Use load() when you want a promise returned. This is necessary if you want to use
   * async/await for an es6 implementation
   * @deprecated
   */
  load (): Promise<Array<Object>> {
    return new FlatfileImporter.Promise((resolve, reject) => {
      this.open()

      const cleanup = () => {
        this.removeListener('close', loadRejectHandler)
        this.removeListener('complete', loadResolveHandler)
      }

      function loadResolveHandler (rows: Array<Object>) {
        resolve(rows)
        cleanup()
      }

      function loadRejectHandler (err) {
        reject(err)
        cleanup()
      }

      this.on('close', loadRejectHandler)
      this.on('complete', loadResolveHandler)
    })
  }

  /**
   * Use requestDataFromUser() when you want a promise returned. This is necessary if you want to use
   * async/await for an es6 implementation
   */
  requestDataFromUser (options: LoadOptionsObject = {}): Promise<FlatfileResults> {
    this.open({...options, inChunks: options.inChunks || null, expectsExpandedResults: true})
    return this.responsePromise()
  }

  /**
   * This will display a progress indicator inside the importer if you anticipate that handling
   * the output of the importer may take some time.
   */
  displayLoader (msg?: string): void {
    this.$ready.then((child) => {
      child.displayLoader(msg)
    })
  }

  /**
   * This will display a dialog inside of the importer with an error icon and the message you
   * pass. The user will be able to acknowledge the error and be returned to the import data
   * spreadsheet to ideally fix any issues or attempt submitting again.
   * @deprecated
   */
  displayError (msg: string): void {
    this.$ready.then((child) => {
      child.displayError(msg)
    })
  }

  /**
   * This will display a dialog inside of the importer with an error icon and the message you
   * pass. The user will be able to acknowledge the error and be returned to the import data
   * spreadsheet to ideally fix any issues or attempt submitting again.
   */
  requestCorrectionsFromUser (msg): Promise<FlatfileResults> {
    this.$ready.then((child) => {
      child.displayError(msg)
    })
    return this.responsePromise()
  }

  /**
   * This will display a dialog inside of the importer with a success icon and the message you
   * pass.
   */
  displaySuccess (msg: string): void {
    this.$ready.then((child) => {
      child.displaySuccess(msg)
    })
  }

  /**
   * This will fetch the data from the importer
   */
  getMeta (): object {
    return new Promise((resolve, reject) => {
      this.$ready.then((child) => {
        child.getMeta()
          .then(resolve)
          .catch(reject)
      }).catch(reject)
    })
  }

  /**
   * Set the customer information for this import
   */
  setCustomer (customer: CustomerObject): void {
    this.customer = customer
  }

  /**
   * Set the customer information for this import
   */
  registerValidatorCallback (callback: FlatfileImporter['$validatorCallback']): void {
    this.$validatorCallback = callback
    this.$ready.then((child) => {
      child.parentHasValidator()
    })
  }

  /**
   * Set the customer information for this import
   */
  registerRecordHook (callback: FlatfileImporter['$recordHook']): void {
    this.$recordHook = callback
  }

  registerNetworkErrorCallback (callback: FlatfileImporter['$networkErrorCallback']): void {
    this.$networkErrorCallback = callback
  }

  /**
   * Set the customer information for this import
   */
  registerFieldHook (field: string, cb: FieldHookCallback): void {
    this.$fieldHooks.push({field, cb})
  }

  /**
   * Call close() from the parent window in order to hide the importer. You can do this after
   * handling the import callback so your users don't have to click the confirmation button
   */
  close () {
    this.$ready.then((child) => {
      child.close()
    })
  }

  private handleClose () {
    elementClass(document.body).remove('flatfile-active')
    let el = document.getElementById(`flatfile-${this.uuid}`)
    if (el) {
      el.style.display = 'none'
    }
  }

  private initialize () {
    insertCss(`
      .flatfile-component {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: none;
        z-index: 100000;
      }
      .flatfile-component iframe {
        width: 100%;
        height: 100%;
        position: absolute;
        border-width: 0;
      }
      body.flatfile-active {
        overflow: hidden;
        overscroll-behavior-x: none;
      }
    `)

    document.body.insertAdjacentHTML('beforeend', `<div id="flatfile-${this.uuid}" class="flatfile-component"></div>`)
    this.handshake = Penpal.connectToChild({
      appendTo: document.getElementById(`flatfile-${this.uuid}`) || undefined,
      url: FlatfileImporter.MOUNT_URL.replace(':key', this.apiKey),
      methods: {
        results: (data) => {
          this.emit('results', data.results, data.meta)
        },
        complete: (data) => {
          this.emit('complete', data.rows, data.meta)
        },
        close: () => {
          this.emit('close')
          this.handleClose()
        },
        networkErrorCallback: (error) => {
          return this.$networkErrorCallback ? this.$networkErrorCallback(error) : undefined
        },
        validatorCallback: (row) => {
          return this.$validatorCallback ? this.$validatorCallback(row) : undefined
        },
        dataHookCallback: (row, index, mode) => {
          return this.$recordHook ? this.$recordHook(row, index, mode) : undefined
        },
        fieldHookCallback: (values, meta) => {
          const fieldHook = this.$fieldHooks.find(v => v.field === meta.field)
          if (!fieldHook) {
            return undefined
          }
          return fieldHook.cb(values, meta)
        },
        ready: () => {
          this.handshake.promise.then((child) => {
            this.$resolver(child)
            if (this.customer) {
              child.setUser(this.customer)
            }
          }).catch((err) => {
            console.error(err)
          })
          return this.options
        }
      }
    })

    this.handshake.promise.catch((err) => {
      this.$rejecter(err)
    })
  }

  private $generateUuid (): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private responsePromise (): Promise<FlatfileResults> {
    return new Promise((resolve, reject) => {
      const loadResolveHandler = async (rows: Array<RecordObject>, meta: object) => {
        const results = new FlatfileResults(rows, meta as Meta, this)
        resolve(results)
        cleanup()
      }

      function loadRejectHandler (err) {
        reject(err)
        cleanup()
      }

      const self = this

      function cleanup () {
        self.removeListener('close', loadRejectHandler)
        self.removeListener('results', loadResolveHandler)
      }

      this.on('close', loadRejectHandler)
      this.on('results', loadResolveHandler)
    })
  }
}

export type Scalar = string | number | boolean | null | undefined

export type FieldHookCallback = (values: [Scalar, number][], meta: any) => [IDataHookRecord, number][] | Promise<[IDataHookRecord, number][]>
