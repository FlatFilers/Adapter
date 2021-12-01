import { EventEmitter } from 'eventemitter3'
import whenDomReady from 'when-dom-ready'
import elementClass from 'element-class'
import Penpal from 'penpal'
import {
  CustomerObject,
  FieldHookCallback,
  IBeforeFetchRequest,
  IBeforeFetchResponse,
  IDataHookResponse,
  IInteractionEvent,
  ISettings,
  IVirtualFieldOptions,
  HookRecordObject,
  LoadOptionsObject,
  Meta,
  RecordObject,
  StepHookCallback,
  StepHooks
} from './interfaces'
import { Results } from './results'
import { insertCss } from './utils/insertCss'

export class FlatfileImporter extends EventEmitter {
  public static Promise = Promise
  private static MOUNT_URL: string = 'https://portal-2.flatfile.io/?key=:key'

  /**
   * Promise that resolves when the handshake is completed between Flatfile.io and the adapter
   */
  public $ready: Promise<any>

  private apiKey: string
  private options: ISettings
  private customer?: CustomerObject
  private uuid: string

  // @ts-ignore
  private handshake: Penpal.IChildConnectionObject | null

  private $resolver: (data: any) => any
  private $rejecter: (err: any) => any
  private $networkErrorCallback?: (err: string) => void
  private $beforeFetchCallback?: (req: IBeforeFetchRequest) => IBeforeFetchResponse
  private $interactionEventCallback?: (req: IInteractionEvent) => void
  private $recordHook?: (
    row: HookRecordObject,
    index: number,
    mode: string
  ) => IDataHookResponse | Promise<IDataHookResponse>
  private $virtualRecordHook?: (
    row: HookRecordObject,
    index: number,
    mode: string
  ) => IDataHookResponse | Promise<IDataHookResponse>
  private $bulkInitRecordHook?: (
    rows: [HookRecordObject, number][],
    mode: string
  ) => IDataHookResponse[] | Promise<IDataHookResponse[]>
  private $fieldHooks: Array<{ field: string; cb: FieldHookCallback }> = []
  private $stepHooks: StepHooks = {} as StepHooks

  constructor(apiKey: string, options: ISettings, customer?: CustomerObject) {
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
  public static setMountUrl(url: string): void {
    this.MOUNT_URL = url
  }

  /**
   * This allows you to opt into or out of specific versions of the Flatfile SDK
   */
  public static setVersion(version: 1 | 2): void {
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
  open(options = {}): void {
    if (this.handshake === null) {
      throw new Error('This importer has been destroyed.')
    }
    options = {
      ...options,
      bulkInit: true,
      hasVirtualRecordHook: !!this.$virtualRecordHook,
      hasRecordHook: !!(this.$recordHook || this.$bulkInitRecordHook),
      hasInteractionEventCallback: !!this.$interactionEventCallback,
      stepHooks: Object.keys(this.$stepHooks),
      fieldHooks: this.$fieldHooks.map((v) => v.field),
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
  load(): Promise<Array<Object>> {
    return new FlatfileImporter.Promise((resolve, reject) => {
      this.open()

      const cleanup = () => {
        this.removeListener('close', loadRejectHandler)
        this.removeListener('complete', loadResolveHandler)
      }

      function loadResolveHandler(rows: Array<Object>) {
        resolve(rows)
        cleanup()
      }

      function loadRejectHandler(err) {
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
  requestDataFromUser(options: LoadOptionsObject = {}): Promise<Results> {
    this.open({ ...options, inChunks: options.inChunks || null, expectsExpandedResults: true })
    return this.responsePromise()
  }

  /**
   * This will display a progress indicator inside the importer if you anticipate that handling
   * the output of the importer may take some time.
   */
  displayLoader(msg?: string): void {
    this.$ready.then((child) => {
      child.displayLoader(msg)
    })
  }

  /**
   * This will display a dialog inside of the importer with an error icon and the message you
   * pass. The user will be able to acknowledge the error and be returned to the import data
   * spreadsheet to ideally fix any issues or attempt submitting again.
   */
  displayError(msg?: string): void {
    this.$ready.then((child) => {
      child.displayError(msg)
    })
  }

  /**
   * This will display a dialog inside of the importer with an error icon and the message you
   * pass. The user will be able to acknowledge the error and be returned to the import data
   * spreadsheet to ideally fix any issues or attempt submitting again.
   *
   * @param corrections - allows user to do server-side validation and provide error / warning
   * messages or value overrides
   */
  requestCorrectionsFromUser(msg?: string, corrections?: IDataHookResponse[]): Promise<Results> {
    this.$ready.then((child) => {
      child.displayError(msg, corrections)
    })
    return this.responsePromise()
  }

  /**
   * This will display a dialog inside of the importer with a success icon and the message you
   * pass.
   *
   * @return Promise that will be resolved when user closes the dialog.
   */
  displaySuccess(msg?: string): Promise<void> {
    this.$ready.then((child) => {
      child.displaySuccess(msg)
    })

    return new Promise((resolve) => {
      const handleSuccess = () => {
        resolve()
        this.removeListener('close', handleSuccess)
      }

      this.on('close', handleSuccess)
    })
  }

  /**
   * Set the customer information for this import
   */
  setCustomer(customer: CustomerObject): void {
    this.customer = customer
  }

  /**
   * Set the language for the Portal
   */
  setLanguage(lang: string): void {
    this.$ready.then((child) => {
      child.setLanguage(lang)
    })
  }

  addVirtualField(field: ISettings['fields'][0], options: IVirtualFieldOptions = {}): void {
    this.$ready.then((child) => {
      child.addVirtualField({ field, options })
    })
  }

  /**
   * Set the customer information for this import
   */
  registerRecordHook(callback: FlatfileImporter['$recordHook']): void {
    this.$recordHook = callback
  }

  registerBulkInitRecordHook(callback: FlatfileImporter['$bulkInitRecordHook']): void {
    this.$bulkInitRecordHook = callback
  }

  registerVirtualRecordHook(callback: FlatfileImporter['$virtualRecordHook']): void {
    this.$virtualRecordHook = callback
  }

  registerNetworkErrorCallback(callback: FlatfileImporter['$networkErrorCallback']): void {
    this.$networkErrorCallback = callback
  }

  registerBeforeFetchCallback(callback: FlatfileImporter['$beforeFetchCallback']): void {
    this.$beforeFetchCallback = callback
  }

  registerInteractionEventCallback(callback: FlatfileImporter['$interactionEventCallback']): void {
    this.$interactionEventCallback = callback
  }

  registerFieldHook(field: string, cb: FieldHookCallback): void {
    this.$fieldHooks.push({ field, cb })
  }

  registerStepHook<T extends keyof StepHooks>(step: T, callback: StepHookCallback<T>): void {
    this.$stepHooks[step] = callback
  }

  /**
   * Call close() from the parent window in order to hide the importer. You can do this after
   * handling the import callback so your users don't have to click the confirmation button
   */
  close() {
    this.$ready.then((child) => {
      child.close()
    })
  }

  /**
   * This will remove the importer's HTML element and will destroy the connection.
   * You wouldn't be able to open an importer if this method gets called.
   */
  destroy() {
    document.getElementById(`flatfile-${this.uuid}`)?.remove()
    this.handshake = null
  }

  private handleClose() {
    elementClass(document.body).remove('flatfile-active')
    let el = document.getElementById(`flatfile-${this.uuid}`)
    if (el) {
      el.style.display = 'none'
    }
  }

  private initialize() {
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

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div id="flatfile-${this.uuid}" class="flatfile-component"></div>`
    )
    const timeout = setTimeout(
      () =>
        console.error(
          '[Flatfile] Looks like Portal takes too long to load. Please visit our Help Center (https://support.flatfile.com/hc/en-us/articles/4408071883924-CORS-Referrer-Policy-Recommendations) or contact Flatfile support for any help.'
        ),
      5000
    )
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
        beforeFetchCallback: (req) => {
          return this.$beforeFetchCallback ? this.$beforeFetchCallback(req) : undefined
        },
        interactionEventCallback: (req) => {
          return this.$interactionEventCallback ? this.$interactionEventCallback(req) : undefined
        },
        dataHookCallback: (row, index, mode) => {
          try {
            return this.$recordHook ? this.$recordHook(row, index, mode) : undefined
          } catch ({ message, stack }) {
            console.error(`Flatfile Record Hook Error on row ${index}:\n  ${stack}`, { row, mode })

            return {}
          }
        },
        bulkHookCallback: (rows, mode) => {
          if (this.$bulkInitRecordHook) {
            try {
              return this.$bulkInitRecordHook(rows, mode)
            } catch ({ stack }) {
              console.error(`Flatfile Bulk Init Record Hook Error:\n  ${stack}`, { rows, mode })

              return {}
            }
          }
          try {
            if (mode === 'virtual') {
              return this.$virtualRecordHook
                ? Promise.all(
                    rows.map(([row, index]) => {
                      try {
                        return this.$virtualRecordHook!(row, index, mode)
                      } catch (e) {
                        e.row = row
                        e.index = index
                        throw e
                      }
                    })
                  )
                : undefined
            }
            return this.$recordHook
              ? Promise.all(
                  rows.map(([row, index]) => {
                    try {
                      return this.$recordHook!(row, index, mode)
                    } catch (e) {
                      e.row = row
                      e.index = index
                      throw e
                    }
                  })
                )
              : undefined
          } catch ({ stack, row, index }) {
            console.error(`Flatfile Record Hook Error on row ${index}:\n  ${stack}`, { row, mode })

            return {}
          }
        },
        fieldHookCallback: (values, meta) => {
          const fieldHook = this.$fieldHooks.find((v) => v.field === meta.field)
          if (!fieldHook) {
            return undefined
          }
          try {
            return fieldHook.cb(values, meta)
          } catch ({ stack }) {
            console.error(`Flatfile Field Hook Error on field "${meta.field}":\n  ${stack}`, {
              meta,
              values
            })

            return []
          }
        },
        stepHookCallback: async (step, payload) => {
          if (!this.$stepHooks[step]) {
            return undefined
          }
          try {
            return await this.$stepHooks[step](payload)
          } catch ({ stack }) {
            console.error(`Flatfile Step Hook Error on step "${step}":\n  ${stack}`, {
              payload
            })
          }
        },
        ready: () => {
          this.handshake.promise
            .then((child) => {
              this.$resolver(child)
              if (this.customer) {
                child.setUser(this.customer)
              }
            })
            .catch((err) => {
              console.error(err)
            })
          return this.options
        }
      }
    })

    this.handshake.promise.then(() => {
      if (timeout) clearTimeout(timeout)
    })

    this.handshake.promise.catch((err) => {
      this.$rejecter(err)
    })
  }

  private $generateUuid(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private responsePromise(): Promise<Results> {
    return new Promise((resolve, reject) => {
      const loadResolveHandler = async (rows: Array<RecordObject>, meta: object) => {
        const results = new Results(rows, meta as Meta, this)
        resolve(results)
        cleanup()
      }

      function loadRejectHandler(err) {
        reject(err)
        cleanup()
      }

      const self = this

      function cleanup() {
        self.removeListener('close', loadRejectHandler)
        self.removeListener('results', loadResolveHandler)
      }

      this.on('close', loadRejectHandler)
      this.on('results', loadResolveHandler)
    })
  }
}
