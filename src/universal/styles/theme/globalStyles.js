import {makePlaceholderStylesString} from 'universal/styles/helpers/makePlaceholderStyles'
import appTheme from 'universal/styles/theme/appTheme'
import fontLoader from 'universal/styles/theme/fontLoader'
import ui from 'universal/styles/ui'

const placeholderStyles = makePlaceholderStylesString(ui.placeholderColor)

const fontFaceDefinitions = fontLoader
  .map(
    (fontFace) => `
    @font-face {
      font-family: "${fontFace.fontFamily}";
      src: ${fontFace.src};
      font-style: ${fontFace.fontStyle};
      font-weight: ${fontFace.fontWeight};
      font-stretch: ${fontFace.fontStretch};
    }
  `
  )
  .join('\n')

export default `
  * {
    box-sizing: border-box;
  }

  *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    color: ${ui.colorText};
    font-family: ${appTheme.typography.sansSerif};
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${ui.linkColor};
    text-decoration: none;
  }

  a:hover, a:focus {
    color: ${ui.linkColorHover};
    text-decoration: none;
  }

  input {
    font-family: ${appTheme.typography.sansSerif};
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  img {
    max-width: 100%;
  }

  p {
    margin: 0;
  }

  pre {
    max-width: 100%;
    overflow: auto;
  }

  b {
    font-weight: 600;
  }

  strong {
    font-weight: 600;
  }

  ${placeholderStyles}

  ${fontFaceDefinitions}
`
