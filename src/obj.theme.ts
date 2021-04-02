import * as CSS from 'csstype'

type CSSProperties = CSS.Properties<string | number>

type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject }

interface CSSObject extends CSSProperties, CSSPseudos {
  [key: string]: CSSObject | string | number | undefined
}

type IStyleCSS = Pick<
  CSSObject,
  | 'backgroundColor'
  | 'border'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderRadius'
  | 'borderRight'
  | 'borderTop'
  | 'boxShadow'
  | 'color'
  | 'fontSize'
  | 'fontWeight'
  | 'lineHeight'
  | 'margin'
  | 'padding'
  | 'textAlign'
>

type IStyleCSSButton = IStyleCSS & Pick<CSSObject, ':focus' | ':hover' | ':active'>

interface IStyleCSSSvg {
  fill?: string
}

type IStyleTable = Pick<
  CSSObject,
  'backgroundColor' | 'borderColor' | 'color' | 'fontSize' | 'fontWeight' | 'textAlign'
>

interface IStyleCSSTableColumn extends IStyleTable {
  ':focus'?: IStyleTable
  ':hover'?: IStyleTable
}

interface IStyleCSSTableRow extends IStyleTable {
  ':focus'?: IStyleTable
  ':hover'?: IStyleTable
  ':invalid'?: IStyleTable
}

interface IStyleCSSTableRowIndex extends IStyleTable {
  ':empty'?: IStyleTable
  ':focus'?: IStyleTable
  ':hover'?: IStyleTable
}

type IStyleSelect = Pick<
  CSSObject,
  | 'backgroundColor'
  | 'border'
  | 'borderBottom'
  | 'borderLeft'
  | 'borderRadius'
  | 'borderRight'
  | 'borderTop'
  | 'boxShadow'
  | 'color'
>

interface IStyleCSSSelect extends IStyleSelect {
  ':focus'?: IStyleSelect
  ':active'?: IStyleSelect
  ':selected'?: IStyleSelect
}

export interface ITheme {
  global?: {
    /**
     * default background color
     */
    backgroundColor?: CSSObject['backgroundColor']

    /**
     * default text color
     */
    textColor?: CSSObject['color']

    /**
     * default primary text color
     */
    primaryTextColor?: CSSObject['color']

    /**
     * default secondary text color
     */
    secondaryTextColor?: CSSObject['color']

    /**
     * default success color
     */
    successColor?: CSSObject['color']

    /**
     * default warning color
     */
    warningColor?: CSSObject['color']

    borderRadius?: CSSObject['borderRadius']
    overlayColor?: CSSObject['backgroundColor']
    fontFamily?: CSSObject['fontFamily']
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
    arrow?: IStyleCSSSvg
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
      th?: IStyleCSSTableColumn
      td?: IStyleCSSTableRow
      rowIndex?: IStyleCSSTableRowIndex
    }
  }
  headerMatch?: {
    root?: IStyleCSS
    content?: IStyleCSS
    icon?: IStyleCSSSvg
    table?: {
      th?: IStyleCSSTableColumn
      td?: IStyleCSSTableRow
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
      th?: IStyleCSSTableColumn
      td?: IStyleCSSTableRow
    }
  }
  dialog?: {
    root?: IStyleCSS
    content?: IStyleCSS
    footer?: IStyleCSS
    overlayColor?: string
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
    overlayColor?: string
  }
  iterator?: {
    root?: IStyleCSS
    overlayColor?: string

    /**
     * loader bar foreground color
     */
    barColor?: string

    /**
     * loader bar background color
     */
    barBackground?: string
  }
}
