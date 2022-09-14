import * as React from 'react';
import { ListText } from '../styles';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconDeposits, IconWithdraws } from 'components/atoms/icons/icons';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SubMenuTransaction({ transaction, setTransaction, openMenu }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const open = Boolean(transaction);

  const handleClose = () => {
    setTransaction(null);
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={transaction}
        id="account-menu"
        open={open && !openMenu}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2.5,
            ml: 1,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 15,
              right: 131,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <ListText onClick={() => navigate("reports-deposits")}>
            <IconDeposits sx={{ verticalAlign: "unset" }}/>  {t("menu.deposits")}
          </ListText> 
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ListText onClick={() => navigate("reports-withdraws")}>
            <IconWithdraws sx={{ verticalAlign: "-webkit-baseline-middle" }}/> {t("menu.withdraws")}
          </ListText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
