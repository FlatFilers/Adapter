import { FileObject } from './interfaces'

export class UploadFile {
  private $file: FileObject

  constructor(file: FileObject) {
    this.$file = file
  }

  /**
   * A unique UUID referencing this file in the Flatfile system
   */
  get id() {
    return this.$file.id
  }

  /**
   * The original filename on the user's system
   */
  get filename() {
    return this.$file.filename
  }

  /**
   * The size of the file in bytes
   */
  get filesize() {
    return this.$file.filesize
  }

  /**
   * The type of file
   */
  get filetype() {
    return this.$file.filetype
  }

  /**
   * A securely signed url giving you temporary access to download the file
   */
  get url() {
    return this.$file.url
  }
}
