import 'promise-polyfill/dist/polyfill'

import registerDocumentContainsPolyfill from './document.contains.polyfill'
registerDocumentContainsPolyfill()

import { FlatfileImporter } from './importer'

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
  IDictionary,
  FlatfileResults
} from './interfaces'

export default FlatfileImporter
