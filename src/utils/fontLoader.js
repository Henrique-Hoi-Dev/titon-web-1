// Função para carregar fontes do Google de forma segura
export const loadGoogleFonts = () => {
  const fontLinks = [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true,
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Kanit:wght@600&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Overpass&family=Poppins:wght@200;400;500&display=swap',
    },
  ]

  fontLinks.forEach((link) => {
    const linkElement = document.createElement('link')
    Object.entries(link).forEach(([key, value]) => {
      linkElement.setAttribute(key, value)
    })
    document.head.appendChild(linkElement)
  })
}

// Função para lidar com o acesso às regras CSS
export const safeAccessStyleSheets = () => {
  const originalStyleSheets = document.styleSheets
  Object.defineProperty(document, 'styleSheets', {
    get: function () {
      const sheets = Array.from(originalStyleSheets)
      return sheets.filter((sheet) => {
        try {
          return sheet.cssRules
        } catch (e) {
          return false
        }
      })
    },
  })
}
