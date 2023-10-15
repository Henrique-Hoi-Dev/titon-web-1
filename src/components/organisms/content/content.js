import { Grid, Paper } from '@mui/material'
import { templateContext } from 'components/templates/main'
import { useContext } from 'react'
// import { useMediaQuery } from "react-responsive";
import { Outlet } from 'react-router-dom'
import { Wrapper } from './styles'

const Content = () => {
  const { openMenu } = useContext(templateContext)

  // const isDesktop = useMediaQuery({ maxWidth: 1430 });

  return (
    <Wrapper>
      <Grid
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          borderRadius: '8px'
        }}
        p={'10px'}
        ml={`${openMenu ? '280px' : '20px'}`}
        width={`${openMenu ? 'calc(100% - 285px)' : 'calc(100% - 100px)'}`}
        height={'calc(100vh - 66px)'}
        component={Paper}
        alignContent={'center'}
        justifyContent={'center'}
      >
        <Outlet />
      </Grid>
    </Wrapper>
  )
}

export default Content
