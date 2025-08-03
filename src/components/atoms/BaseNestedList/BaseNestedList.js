import * as React from 'react';
import { Divider } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Text from '../BaseText/BaseText';
import BaseText from '../BaseText/BaseText';

export default function BaseNestedList({
  title,
  titleHeader,
  valor,
  titleFooter,
  valorFooter,
  sx,
  styleHeader,
  maxwidth,
  children,
  typeTemplate = 'default',
}) {
  const [openOne, setOpenOne] = React.useState(false);

  const handleClickOne = () => {
    setOpenOne(!openOne);
  };

  return (
    <>
      {typeTemplate === 'default' && (
        <>
          <BaseText sx={styleHeader}>{titleHeader}</BaseText>
          <Divider sx={{ backgroundColor: '#545454', margin: '10px 0 30px 0	', width: '100%' }} />
          <List
            sx={{
              ...sx,
              width: '100%',
              maxWidth: `${maxwidth}`,
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '8px',
              backgroundColor: '#343434',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClickOne}>
              <ListItemText
                primary={title}
                sx={{
                  '& .css-10hburv-MuiTypography-root': {
                    fontSize: '16px',
                    fontWeight: '700!important',
                    color: '#939395',
                  },

                  padding: '20px',
                }}
              />
              <Text fontsize={'18px'} color={'#1877F2'} sx={{ marginRight: '20px' }}>
                {valor}
              </Text>
              {openOne ? (
                <ExpandLess sx={{ color: '#fff', width: '40px', height: '40px' }} />
              ) : (
                <ExpandMore sx={{ color: '#fff', width: '40px', height: '40px' }} />
              )}
            </ListItemButton>

            <Collapse in={openOne} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {children}
              </List>
            </Collapse>

            <ListItemButton sx={{ borderTop: '1px solid #545454', cursor: 'default' }}>
              <ListItemText
                primary={titleFooter}
                sx={{
                  '& .css-10hburv-MuiTypography-root': {
                    fontSize: '16px',
                    fontWeight: '700!important',
                    color: '#939395',
                  },

                  padding: '20px',
                }}
              />
              <Text fontsize={'18px'} color={'#0BB07B'} sx={{ marginRight: '60px' }}>
                {valorFooter}
              </Text>
            </ListItemButton>
          </List>
        </>
      )}

      {typeTemplate === 'list' && (
        <>
          <BaseText sx={styleHeader}>{titleHeader}</BaseText>
          <Divider sx={{ backgroundColor: '#545454', margin: '10px 0 30px 0	', width: '100%' }} />
          <List
            sx={{
              ...sx,
              width: '100%',
              maxWidth: `${maxwidth}`,
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '8px',
              backgroundColor: '#343434',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton>{children}</ListItemButton>
          </List>
        </>
      )}
    </>
  );
}
