import 'promise-polyfill/dist/polyfill'

import registerDocumentContainsPolyfill from './document.contains.polyfill'
registerDocumentContainsPolyfill()

export {
  ISettings,
  CustomerObject,
  FieldHookCallback,
  LoadOptionsObject,
  IVirtualFieldOptions,
  StepHookCallback,
  RecordObject,
  IDataHookResponse,
  ScalarDictionary,
  Nullable,
  IPrimitive,
  IValidationResponse,
  IDictionary
} from './interfaces'

export { FlatfileResults } from './results'
export { FlatfileImporter } from './importer'
