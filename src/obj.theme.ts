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

export interface ITheme {
  global?: {
    backgroundColor?: string // default background color
    textColor?: string // default text color

    primaryTextColor?: string // primary text color
    secondaryTextColor?: string // secondary text color

    successColor?: string // default success color
    warningColor?: string // default warning color
  }
  buttons?: {
    // global
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
