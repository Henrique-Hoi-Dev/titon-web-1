import * as React from 'react';
import { ListItem } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Text from '../BaseText/BaseText';

export default function NestedList({
  titleOne,
  valorOne,
  valorTwo,
  titleTwo,
  valuesFirstCheck,
  statusSecondCheck,
  maxwidth,
  sx
}) {
  const [openOne, setOpenOne] = React.useState(false);

  const handleClickOne = () => {
    setOpenOne(!openOne);
  };

  return (
    <>
      <List
        sx={{
          ...sx,
          width: '100%',
          maxWidth: `${maxwidth ? maxwidth : '360px'}`,
          margin: '20px',
          bgcolor: 'background.paper',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '8px',
          flexDirection: 'column'
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClickOne}>
          <ListItemText
            primary={titleOne}
            secondary={valorOne}
            sx={{
              '& .css-10hburv-MuiTypography-root': {
                fontSize: '24px',
                fontWeight: '500!important'
              },
              '& .css-83ijpv-MuiTypography-root': {
                fontWeight: '500',
                fontSize: '18px',
                color: '#1877F2'
              },

              '& .css-yb0lig': {
                fontSize: '24px',
                fontWeight: '500!important'
              },
              '& .css-mbfek': {
                fontWeight: '500',
                fontSize: '18px',
                color: '#1877F2'
              }
            }}
          />
          {openOne ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openOne} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ alignItems: 'flex-start' }}
          >
            <ListItemButton
              sx={{
                pl: statusSecondCheck ? 0 : 4,
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: "flex-start",
                alignItems: 'flex-start'
              }}
            >
              <ListItem
                sx={{
                  fontSize: '12px',
                  paddingBottom: statusSecondCheck ? 0 : '8px',
                  flexDirection: statusSecondCheck ? 'column' : 'row'
                }}
              >
                {'Combustível'}
                <Text
                  fontsize={'12px'}
                  color={'#F03D3D'}
                  sx={{
                    ml: statusSecondCheck ? 0 : 3,
                    alignItems: statusSecondCheck ? 'center' : 'flex-start'
                  }}
                >
                  {`${valuesFirstCheck?.value?.liter}L / ${valuesFirstCheck?.value?.fuelValue}`}
                </Text>
              </ListItem>
              <ListItem
                sx={{
                  fontSize: '12px',
                  paddingBottom: statusSecondCheck ? 0 : '8px',
                  flexDirection: statusSecondCheck ? 'column' : 'row'
                }}
              >
                {'Despesas'}
                <Text
                  fontsize={'12px'}
                  color={'#F03D3D'}
                  whiteSpace={'nowrap'}
                  sx={{
                    ml: statusSecondCheck ? 0 : 3,
                    alignItems: statusSecondCheck ? 'center' : 'flex-start'
                  }}
                >
                  {valuesFirstCheck?.value2}
                </Text>
              </ListItem>
              <ListItem
                sx={{
                  fontSize: '12px',
                  paddingBottom: statusSecondCheck ? 0 : '8px',
                  flexDirection: statusSecondCheck ? 'column' : 'row'
                }}
              >
                {'Motorista'}
                <Text
                  fontsize={'12px'}
                  whiteSpace={'nowrap'}
                  color={'#F03D3D'}
                  sx={{
                    ml: statusSecondCheck ? 0 : 3,
                    alignItems: statusSecondCheck ? 'center' : 'flex-start'
                  }}
                >
                  {valuesFirstCheck?.value3}
                </Text>
              </ListItem>
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton>
          <ListItemText
            primary={titleTwo}
            secondary={valorTwo}
            sx={{
              '& .css-10hburv-MuiTypography-root': {
                fontSize: '24px',
                fontWeight: '500!important'
              },
              '& .css-83ijpv-MuiTypography-root': {
                fontWeight: '500',
                fontSize: '18px',
                color: '#0BB07B'
              },

              '& .css-yb0lig': {
                fontSize: '24px',
                fontWeight: '500!important'
              },
              '& .css-mbfek': {
                fontWeight: '500',
                fontSize: '18px',
                color: '#0BB07B'
              }
            }}
          />
        </ListItemButton>
      </List>
    </>
  );
}
