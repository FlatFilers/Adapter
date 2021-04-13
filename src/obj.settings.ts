import { ITheme } from './obj.theme'

export interface ISettings {
  /**
   * Type of record that is being imported. eg. "User", "Transaction"
   */
  type: string

  /**
   * Adds custom header for importer
   */
  title?: string

  /**
   * Configure the fields to map the uploaded data to. Easily setup validation,
   * format hinting and more.
   */
  fields: IField[]

  /**
   * Configure a list of columns that should be ignored.
   */
  ignoreColumns?: string[]

  /**
   * Specific overrides to allow theming.
   * @deprecated use `theme`
   */
  styleOverrides?: IStyleOverrides

  /**
   * Overrides to allow theming for most Portal elements.
   */
  theme?: ITheme

  /**
   * Boolean configuration which turns on dashboard functionality and sends data
   * to Flatfile's servers.
   */
  managed?: boolean

  /**
   * Limits file upload size to the specified number of bytes.
   */
  maxSize?: number

  /**
   * Limits file upload size to the specified number of rows.
   */
  maxRecords?: number

  /**
   * Disables the ability of the user to input directly on the first step.
   */
  disableManualInput?: boolean

  /**
   * Whether or not to allow importing extra fields
   * that you have not specified in your target field map.
   */
  allowCustom?: boolean

  /**
   * Whether or not to allow submitting data that still has invalid cells in it.
   */
  allowInvalidSubmit?: boolean

  /**
   * Whether or not to allow bold / italic / strike formatting of the cells.
   */
  allowFormatting?: boolean

  /**
   * Whether or not to auto-detect headers
   */
  autoDetectHeaders?: boolean

  /**
   * Allows use of non-standard fonts
   */
  integrations?: IIntegrations

  /**
   * Allow overriding any internationalized value
   */
  i18nOverrides?: IDictionary<IDictionary<string>> | IDictionary<II18nOverrides>

  /**
   * URL to post batch rows to on successful import
   */
  webhookUrl?: string

  /**
   * Force the ability of the user to input directly on the first step.
   */
  forceManualInput?: boolean

  /**
   * Specify the encoding of the file upload
   */
  encoding?: string

  /**
   * Whether or not to allow users to select encoding
   */
  displayEncoding?: boolean

  /**
   * Whether or not to show "Are you sure?" dialog before closing
   */
  confirmClose?: boolean

  /**
   * Allows for additional rows to be added to the initial rows checked on import.
   */
  preloadRowCount?: number

  /**
   * Boolean configuration which sets disables billing for development uploads
   */
  devMode?: boolean
}

export type IField = IFieldBase | IFieldSelect

export interface IFieldBase {
  key: string
  label: string
  description?: string
  shortDescription?: string
  alternates?: string[]
  validators?: IValidator[]
  type?: 'checkbox' | 'string'
  sizeHint?: number
}

export type IFieldSelectMatchStrategy = 'fuzzy' | 'exact'

export interface IFieldSelect extends Omit<IFieldBase, 'type'> {
  type: 'select'
  matchStrategy?: IFieldSelectMatchStrategy
  options: IFieldOption[]
}

export type IValidator =
  | IValidatorRegexDictionary
  | IValidatorRequiredWithDictionary
  | IValidatorOtherDictionary

export interface IBaseValidatorDictionary {
  error?: string
}

export interface IRegexFlags {
  ignoreCase?: boolean
  multiline?: boolean
  dotAll?: boolean
  global?: boolean
  unicode?: boolean
}

export interface IValidatorRegexDictionary extends IBaseValidatorDictionary {
  validate: 'regex_matches' | 'regex_excludes'
  regex: string
  regexFlags?: IRegexFlags
}

export interface IValidatorRequiredWithSimpleDictionary extends IBaseValidatorDictionary {
  validate: 'required_with' | 'required_with_all' | 'required_without' | 'required_without_all'
  fields: string[]
}

export interface IValidatorRequiredWithValuesDictionary extends IBaseValidatorDictionary {
  validate:
    | 'required_with_values'
    | 'required_with_all_values'
    | 'required_without_values'
    | 'required_without_all_values'
  fieldValues: ScalarDictionary
}

export type IValidatorRequiredWithDictionary =
  | IValidatorRequiredWithSimpleDictionary
  | IValidatorRequiredWithValuesDictionary

export interface IValidatorOtherDictionary extends IBaseValidatorDictionary {
  validate: 'required' | 'select' | 'unique' | 'boolean'
}

export interface IFieldOptionDictionary {
  value: string | number | null
  label: string
  alternates?: string[]
}

export type IFieldOption = IFieldOptionDictionary

export interface II18nOverrides {
  otherLocales?: string[]

  /**
   * @deprecated use `importer.setLanguage('en')`
   */
  setLanguage?: string | undefined

  overrides: IDictionary<string | IDictionary<string>>
}

export interface IIntegrations {
  adobeFontsWebProjectId?: string
  googleFonts?: string
}

export interface IStyleOverrides {
  borderRadius?: string
  borderTop?: string
  borderImage?: string
  buttonHeight?: string
  primaryButtonColor?: string
  primaryButtonBorderColor?: string
  primaryButtonFontSize?: string
  primaryButtonFontColor?: string
  uploadButtonBackground?: string
  uploadButtonPadding?: string
  yesButtonBackground?: string
  yesButtonPadding?: string
  secondaryButtonColor?: string
  secondaryButtonBorderColor?: string
  secondaryButtonFontSize?: string
  secondaryButtonFontColor?: string
  noButtonColor?: string
  noButtonBorderColor?: string
  noButtonFontColor?: string
  yesButtonColor?: string
  yesButtonBorderColor?: string
  yesButtonFontColor?: string
  finalButtonSuccessColor?: string
  finalButtonSuccessBorderColor?: string
  finalButtonSuccessFontColor?: string
  finalButtonErrorColor?: string
  finalButtonErrorBorderColor?: string
  finalButtonErrorFontColor?: string
  invertedButtonColor?: string
  linkColor?: string
  linkAltColor?: string
  primaryTextColor?: string
  secondaryTextColor?: string
  errorColor?: string
  successColor?: string
  warningColor?: string
  borderColor?: string
  fontFamily?: string
}

export interface IDictionary<V = string> {
  [key: string]: V
}
export type Nullable<T> = T | undefined | null
export type IPrimitive = string | number | boolean
export type ScalarDictionary = IDictionary<Nullable<IPrimitive>>
