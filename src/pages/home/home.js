import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { IconAdd } from 'components/atoms/icons/icons';
import { useMediaQuery } from 'react-responsive';
import { InputSearches } from 'components/atoms/input/inputSearches/input';

import Cards from './cards';
import Button from 'components/atoms/button/button';
import ModalAddFinancial from 'pages/financialStatement/modalAddFinancial';
import CustomizedMenus from 'components/molecules/customizedMenus/customizedMenu';

const Home = () => {
  const [showModalFicha, setShowModalFicha] = useState(false);

  const isDesktopBig = useMediaQuery({ maxWidth: "1950px" });

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        minHeight="88vh"
        padding={1}
        spacing={2}
      >
        <Grid
          item 
          container 
          pl={2} 
          mr={4} 
          mt={-6.5} 
          justifyContent={"flex-end"}
        >
          <Grid
            item 
            container 
            xs={6} 
            md={isDesktopBig ? 4.2 : 6} 
            lg={isDesktopBig ? 4.2 : 6}
            mt={0.6}
          >
            <CustomizedMenus />          
          </Grid>
          <Button 
            onClick={() => setShowModalFicha(true)}
            background={"linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"}
            sx={{
              fontSize: "14px",
              color: "white",
              width: "228px",
              height: "40px",
              marginRight: "15px",
            }}
          >
            Adicionar Nova Ficha <IconAdd sx={{ mt: -0.7 }} />
          </Button>
          <InputSearches
            searches
            searchesType={"searches"}
            styles={{ minWidth: "350px"}}
            placeholder={"Nome, placa..."}
            // onChange={(ev) => setEmail(ev.target.value)}
            required
          />   
        </Grid>
        <Grid
          item
          container
          spacing={2}
          mt={1}
          mb={1}
          alignItems="flex-start"
          justifyContent="flex-start"
          sx={{ color: "#fff" }}
        >
          <Cards />
        </Grid>
      </Grid>   

      <ModalAddFinancial
        showModal={showModalFicha}
        setShowModal={setShowModalFicha}
      /> 
    </>
  );
}

export default Home;