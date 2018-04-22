import FileObject from './obj.file'

export default class UploadFile {
  private $file: FileObject

  constructor (file: FileObject) {
    this.$file = file
  }

  get id () {
    return this.$file.id
  }

  get filename () {
    return this.$file.filename
  }

  get filesize () {
    return this.$file.filesize
  }

  get filetype () {
    return this.$file.filetype
  }

  get url () {
    return this.$file.url
  }
}
