let styleElement

export const insertCss = (css: string) => {
  if (!css) {
    return
  }

  if (styleElement) {
    return
  }

  styleElement = document.createElement('style')
  styleElement.setAttribute('type', 'text/css')
  document.querySelector('head')?.appendChild(styleElement)

  if (css.charCodeAt(0) === 0xfeff) {
    css = css.substr(1, css.length)
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    styleElement.textContent += css
  }
}
