import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Text from '../text/text';
import Button from '../button/button';

import { moneyMask } from 'utils/masks';
import { CardMedia, Chip, Grid, Paper, Stack } from '@mui/material';

const CardInfoValues = (
  { 
    props, 
    title, 
    colorstatus, 
    colorvalue, 
    backgroundstatus, 
    styles,
    onClick,
  }) => {

    console.log("porps", props?.freigth[0]?.status_check_order ?? "Sem Check")
  
  return (
    <Grid
      sx={{ 
        minWidth: "240px!important", 
        minHeight: "350px!important",
      }}
    >
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ 
          marginLeft: "180px!important",
          marginBottom: "-14px",
          zIndex: 1
        }}
      >
        <Chip 
          label={
            (props?.freigth[0]?.status_check_order === "approved" ? "Aprovado" : "Sem Check")
          } 
          sx={{ fontWeight: "600", fontSize: "15px" }}
          color="success" 
        />
      </Stack>
      <Card
        sx={{ 
          minWidth: "220px!important", 
          minHeight: "350px!important",
        }}
      >
        <CardContent
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            marginTop: "10px",
            padding: "0px"
          }}
        >
          <Button
            onClick={onClick}
            sx={{ 
              background: "transparent",
              width: "180px",
              "&:hover": {
                background: "transparent",
              }
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                fontSize: "1.4rem",
                fontWeight: "bold",
                width: "130px",
                padding: "5px 0 0 0",
                textAlign: "center",
                whiteSpace: "nowrap",
                borderRadius: "8px",
                margin: "5px",
                background: "#000",
                color: `#fff`,
                ...styles,
              }}>
                {title}
            </Typography>            
          </Button>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontWeight: "bold",
              whiteSpace: "nowrap",
              fontSize: "1.2rem",
              ...styles,
            }}>
            <CardMedia
              component="img"
              height="150px"
              sx={{ borderRadius: "8px", width: "220px" }}
              image={props.truck_avatar}
              alt="green iguana"
            />
          </Typography>
          <hr style={{ width: "220px", margin: "12px", border: "solid 1px" }} />
          <Paper 
            elevation={3}
            sx={{ 
              background: "#212121", 
              color: `#fff`,
              padding: "5px",
              marginBottom: "10px",
              width: "220px",
              height: "90px"
            }}
          >
            <Grid item container pl={2} mt={1} spacing={1} flexDirection={"column"}>
              <Text fontSize={'13.5px'}>INICIO VIAGEM: <Text fontSize={'12.7px'}>12/20/2022</Text></Text> 
              <Text fontSize={'13.5px'}>MÉDIA: <Text fontSize={'12.7px'}>1.2</Text></Text> 
              <Text fontSize={'13.5px'}>MOTORISTA: <Text fontSize={'12.7px'}>{props.driver_name}</Text></Text> 
              <Text fontSize={'13.5px'}>FATURAMENTO: <Text fontSize={'12.7px'}>{moneyMask(props.id || [0])}</Text></Text> 
            </Grid>
          </Paper>
        </CardContent>      
      </Card>        
    </Grid>
  );
};

export default CardInfoValues;