import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { createContext, useState } from 'react'

import Theme from 'theme/theme'
import HeaderBar from 'components/organisms/HeaderBar'
import Menu from 'components/organisms/menu/menu'
import Content from 'components/organisms/content/content'

export const templateContext = createContext({})

const MainTemplate = () => {
  const [openMenu, setOpenMenu] = useState(true)
  const [fetch, setFetch] = useState(false)

  const user = useSelector((state) => state.user)

  return (
    <ThemeProvider theme={Theme(user)}>
      <templateContext.Provider value={{ Theme, openMenu, setOpenMenu }}>
        <Box>
          <HeaderBar fetch={fetch} setFetch={setFetch} />
          <Menu fetch={fetch} setFetch={setFetch} />
          <Content />
        </Box>
      </templateContext.Provider>
    </ThemeProvider>
  )
}

export default MainTemplate
