export default interface FileObject {
  /**
   * A unique UUID referencing this file in the Flatfile system
   */
  id: string

  /**
   * The original filename on the user's system
   */
  filename: string

  /**
   * The size of the file in bytes
   */
  filesize: number

  /**
   * The type of file
   */
  filetype: string

  /**
   * A securely signed url giving you temporary access to download the file
   */
  url: string
}
