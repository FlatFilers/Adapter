import { EventEmitter } from 'eventemitter3'
import Promise from 'ts-promise'
import whenDomReady from 'when-dom-ready'
import insertCss from 'insert-css'
import elementClass from 'element-class'
import Penpal from 'penpal'

Penpal.debug = true

export default class FlatfileImporter extends EventEmitter {

  public static Promise = Promise
  private static MOUNT_URL: string = 'https://www.flatfile.io/importer/:key'

  /**
   * Promise that resolves when the handshake is completed between Flatfile.io and the adapter
   */
  public $ready: Promise<any>

  private apiKey: string
  private options: object
  private uuid: string

  private handshake: Penpal.IChildConnectionObject

  private $resolver: (data: any) => any
  private $rejecter: (err: any) => any

  constructor (apiKey: string, options: object) {
    super()
    this.apiKey = apiKey
    this.options = options
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
   * will be the URL of your browser importer index page
   */
  public static setMountUrl (url: string): void {
    this.MOUNT_URL = url
  }

  /**
   * Calling open() to activate the importer overlay dialog.
   */
  open (): void {
    this.$ready.then((child) => {
      elementClass(document.body).add('flatfile-active')
      let el = document.getElementById(`flatfile-${this.uuid}`)
      if (el) {
        el.style.display = 'block'
      }
      child.open()
    })
  }

  /**
   * Use load() when you want a promise returned. This is necessary if you want to use
   * async/await for an es6 implementation
   */
  load (): Promise<Array<Object>> {
    return new FlatfileImporter.Promise((resolve, reject) => {
      this.open()
      this.on('complete', (rows) => {
        resolve(rows)
      })

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
   * This will display a progress indicator inside the importer if you anticipate that handling
   * the output of the importer may take some time.
   */
  displayLoader (): void {
    this.$ready.then((child) => {
      child.displayLoader()
    })
  }

  /**
   * This will display a dialog inside of the importer with an error icon and the message you
   * pass. The user will be able to acknowledge the error and be returned to the import data
   * spreadsheet to ideally fix any issues or attempt submitting again.
   */
  displayError (msg: string): void {
    this.$ready.then((child) => {
      child.displayError(msg)
    })
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
   * Call close() from the parent window in order to hide the importer. You can do this after
   * handling the import callback so your users don't have to click the confirmation button
   */
  close () {
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
      }
    `)

    document.body.insertAdjacentHTML('beforeend', `<div id="flatfile-${this.uuid}" class="flatfile-component"></div>`)
    this.handshake = Penpal.connectToChild({
      appendTo: document.getElementById(`flatfile-${this.uuid}`) || undefined,
      url: FlatfileImporter.MOUNT_URL.replace(':key', this.apiKey),
      methods: {
        complete: (data) => {
          this.emit('complete', data.rows, data.meta)
        },
        close: () => {
          this.emit('close')
          this.close()
        },
        ready: () => {
          this.handshake.promise.then((child) => {
            this.$resolver(child)
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
}
