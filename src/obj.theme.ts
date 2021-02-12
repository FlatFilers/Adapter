import * as CSS from 'csstype'

type CSSProperties = CSS.Properties<string | number>

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

interface CSSObject extends CSSProperties, CSSPseudos {
  [key: string]: CSSObject | string | number | undefined
}

type IStyleCSS = Pick<
  CSSObject,
  | 'backgroundColor'
  | 'color'
  | 'padding'
  | 'margin'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderRadius'
  | 'textAlign'
  | 'boxShadow'
>

type IStyleCSSButton = IStyleCSS & Pick<CSSObject, ':focus' | ':hover' | ':active'>

interface IStyleCSSSvg {
  fill?: string
}

type IStyleTable = Pick<
  CSSObject,
  'backgroundColor' | 'color' | 'borderColor' | 'fontSize' | 'fontWeight' | 'textAlign'
>

interface IStyleCSSTable extends IStyleTable {
  ':focus'?: IStyleTable
  ':hover'?: IStyleTable
  ':invalid'?: IStyleTable
}

type IStyleSelect = Pick<
  CSSObject,
  | 'backgroundColor'
  | 'color'
  | 'border'
  | 'borderTop'
  | 'borderRight'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderRadius'
  | 'boxShadow'
>

interface IStyleCSSSelect extends IStyleSelect {
  ':focus'?: IStyleSelect
  ':active'?: IStyleSelect
  ':selected'?: IStyleSelect
}

export interface ITheme {
  global?: {
    backgroundColor?: CSSObject['backgroundColor'] // default background color
    textColor?: CSSObject['color'] // default text color

    primaryTextColor?: CSSObject['color'] // primary text color
    secondaryTextColor?: CSSObject['color'] // secondary text color

    successColor?: CSSObject['color'] // default success color
    warningColor?: CSSObject['color'] // default warning color

    borderRadius?: CSSObject['borderRadius'] // default border radius
  }
  buttons?: {
    primary?: IStyleCSSButton
    secondary?: IStyleCSSButton
    success?: IStyleCSSButton
    tertiary?: IStyleCSSButton

    dropzoneUpload?: IStyleCSSButton

    headerMatchYes?: IStyleCSSButton
    headerMatchNo?: IStyleCSSButton

    columnMatchConfirm?: IStyleCSSButton
    columnMatchConfirmWithDupes?: IStyleCSSButton
    columnMatchIgnore?: IStyleCSSButton
    columnMatchInclude?: IStyleCSSButton
    columnMatchIncludeDropdown?: IStyleCSSButton
    columnMatchEdit?: IStyleCSSButton

    dialogConfirmYes?: IStyleCSSButton
    dialogConfirmNo?: IStyleCSSButton

    dialogFinalYes?: IStyleCSSButton
    dialogFinalNo?: IStyleCSSButton

    dialogFinalSuccess?: IStyleCSSButton
    dialogFinalError?: IStyleCSSButton

    dataSourceCancel?: IStyleCSSButton
    dataSourceContinue?: IStyleCSSButton
  }
  header?: {
    root?: IStyleCSS
    title?: IStyleCSS
    closeButton?: IStyleCSSButton
  }
  footer?: {
    root?: IStyleCSS
  }
  progressBar?: {
    root?: IStyleCSS
    current?: IStyleCSS
    complete?: IStyleCSS
    incomplete?: IStyleCSS
  }
  dropzone?: {
    root?: IStyleCSS
    content?: IStyleCSS
    fileTypes?: IStyleCSS
    accepted?: IStyleCSS
  }
  manualInput?: {
    root?: IStyleCSS
    title?: IStyleCSS
    table?: {
      th?: IStyleCSSTable
      td?: IStyleCSSTable
    }
  }
  headerMatch?: {
    root?: IStyleCSS
    content?: IStyleCSS
    icon?: IStyleCSSSvg
    table?: {
      th?: IStyleCSSTable
      td?: IStyleCSSTable
    }
    select?: IStyleCSSSelect
  }
  columnMatch?: {
    root?: IStyleCSS
    content?: IStyleCSS
    rule?: IStyleCSS
    autoMatchRule?: {
      root?: IStyleCSS
      icon?: IStyleCSSSvg
      description?: IStyleCSS
      field?: IStyleCSS
    }
    table?: {
      th?: IStyleCSSTable
      td?: IStyleCSSTable
    }
  }
  dialog?: {
    root?: IStyleCSS
    content?: IStyleCSS
    footer?: IStyleCSS
    overlayColor?: string // overlay color
  }
  dataSource?: {
    root?: IStyleCSS
    title?: IStyleCSS
    subtitle?: IStyleCSS
    step?: IStyleCSS
    footer?: IStyleCSS
    select?: IStyleCSSSelect
  }
  loader?: {
    root?: IStyleCSS
    overlayColor?: string // overlay color
  }
  iterator?: {
    root?: IStyleCSS
    overlayColor?: string // overlay color
  }
}
