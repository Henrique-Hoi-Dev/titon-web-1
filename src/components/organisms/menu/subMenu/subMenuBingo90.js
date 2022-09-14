import * as React from 'react';
import { ListText } from '../styles';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import { 
  DeviceIcon, 
  IconLine, 
  IconReportsList, 
  IconSalespoint, 
  IconScheduled, 
  IconSellers,
  IconUser 
} from 'components/atoms/icons/icons';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SubMenuBingo90({ bingo90, setBingo90, openMenu }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const open = Boolean(bingo90);

  const handleClose = () => {
    setBingo90(null);
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={bingo90}
        id="account-menu"
        open={open && !openMenu}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'initial',
            maxHeight: '400px',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 17,
              right: 197,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 200, left: 70 }}
      >
        <Grid 
          container 
          flexDirection="column"
          flexWrap="nowrap"
          alignContent="flex-end"
          sx={{ 
            overflow: "auto", 
            maxHeight: "350px", 
            "&::-webkit-scrollbar-track": { background: "none" }  
          }}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/line")}>
              <IconLine sx={{ verticalAlign: "text-bottom" }}/>  {t("field.line")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/device")}>
              <DeviceIcon sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.device")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/sellers")}>
              <IconSellers sx={{ verticalAlign: "text-bottom" }}/>  {t("field.sellers")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/collector")}>
              <IconUser sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.collector")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/salespoint")}>
              <IconSalespoint sx={{ verticalAlign: "text-bottom" }}/>  {t("field.salespoint_name")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/scheduled-draw")}>
              <IconScheduled sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.scheduled_draw")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/reports/draw-speedball90")}>
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/> {t("menu.reports")} {t("menu.draw")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/reports/sellers-speedball90")}>
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/> {t("menu.reports")} {t("field.sellers")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/reports/collector-speedball90")}>
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/> {t("menu.reports")} {t("field.collector")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/reports/openboxes-speedball90")}>
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.open_boxes")}
            </ListText>
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <ListText onClick={() => navigate("bingo/reports/closedboxes-speedball90")}>
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.closed_boxes")}
            </ListText>
          </MenuItem>
        </Grid>
      </Menu>
    </React.Fragment>
  );
}
