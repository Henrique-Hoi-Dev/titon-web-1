import React, { useContext, useEffect, useState } from "react";
import { Grid, List, ListItemText, Tooltip } from "@mui/material";
import { templateContext } from "components/templates/main/main";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { 
  Drawer, 
  ListItemCategory, 
  ListText, 
  MenuCollapse, 
  SubList,
  IconMenuCategory, 
  ButtonMenu,
  DrawerHeader
} from "./styles";

import { 
  IconCasino, 
  IconDeposits, 
  IconList,
  IconReportsList, 
  IconScheduled, 
  IconSellers, 
  IconSettings, 
  IconWithdraws, 
  DeviceIcon,
  IconMenuTransactions,
  IconMenuHome,
  IconScratchGames,
  IconSalespoint,
  IconArrowLeft,
  IconHamburger,
  IconLine
} from "components/atoms/icons/icons";

import SubMenuTransaction from "./subMenu/subMenuTransaction";
import SubMenuScratchGame from "./subMenu/subMenuScratchGame";
import SubMenuBingo90 from "./subMenu/subMenuBingo90";

const Menu = () => {
  const { t } = useTranslation();

  const { openMenu, setOpenMenu} = useContext(templateContext);
  const [openBingo, setOpenBingo] = useState(false)
  const [openScratchGames, setOpenScratchGames] = useState(false)
  const [openTransactions, setOpenTransactions] = useState(false)

  const [transaction, setTransaction] = useState(false);
  const [scratchGame, setScratchGame] = useState(false);
  const [bingo90, setBingo90] = useState(false);

  const isSmallDesktop = useMediaQuery({ maxWidth: "710px" });

  useEffect(() => {
    if (openMenu === false) {
      setTransaction(false)
      setScratchGame(false)
      setBingo90(false)
    }
    if (isSmallDesktop) {
      setOpenMenu(false)
    }
  }, [
    setTransaction, 
    setScratchGame, 
    setBingo90, 
    openMenu, 
    setOpenMenu, 
    isSmallDesktop
  ])

  const handleTransaction = (event) => {
    setTransaction(event.currentTarget)
  };
  
  const handleScratchGame = (event) => {
    setScratchGame(event.currentTarget)
  };

  const handleBingo90 = (event) => {
    setBingo90(event.currentTarget)
  }

  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={openMenu} >
      <DrawerHeader>
        {!openMenu && (
          <Grid item  sx={{
            // ml: `${openMenu ? "268px" : "60px"}`,
          }}>
            <IconHamburger
              aria-label="open drawer"
              onClick={() => setOpenMenu(true)}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                fontSize: "30px",
                color: "inherit",
                pl: 2,
                width: "45px",
                height: "45px",
                display: `${!isSmallDesktop ? "" : "none"}`,
                ...(openMenu && { display: "none" }),
              }}
            />
          </Grid>
        )}
  
        {openMenu && (
          <Grid item sx={{
            // ml: `${openMenu ? "0px" : "268px"}`,
          }}>
            <IconArrowLeft
              aria-label="close drawer"
              onClick={() => setOpenMenu(false)}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
                fontSize: "40px",
                color: "inherit",
                pl: 2,
                width: "45px",
                height: "45px",
                display: `${!isSmallDesktop ? "" : "none"}`,
                ...(!openMenu && { display: "none" }),
              }}
            />
        </Grid>
      )}
      </DrawerHeader>
      <List sx={{ marginTop: "20px", border: "none" }}>
        <ListItemCategory
          onClick={() => navigate("/home")}
        >
          <ButtonMenu
            sx={{ justifyContent: openMenu ? 'initial' : 'center'}}
          >
            <Tooltip title={t("menu.home")} placement="right">
              <IconMenuCategory sx={{ mr: openMenu ? 3 : 'auto' }}>
                <IconMenuHome sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
           
            <ListItemText sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}>
              {t("menu.home")}
            </ListItemText>
          </ButtonMenu>
        </ListItemCategory>

        <ListItemCategory>
          <ButtonMenu sx={{ justifyContent: openMenu ? 'initial' : 'center'}}>
            <Tooltip title={t("menu.transactions")} placement="right">
              <IconMenuCategory 
                aria-controls={transaction ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={transaction ? 'true' : undefined}
                onClick={handleTransaction}
                sx={{ mr: openMenu ? 3 : 'auto' }}
              >
                <IconMenuTransactions sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText 
              onClick={() => setOpenTransactions(!openTransactions)}
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }} 
            >
              {t("menu.transactions")}
            </ListItemText>
          </ButtonMenu>
          {transaction && (
            <SubMenuTransaction 
              openMenu={openMenu}
              setTransaction={setTransaction}
              transaction={transaction}
            />
          )}
        </ListItemCategory>
        <MenuCollapse in={openTransactions && openMenu}>
          <SubList>
            <ListText 
              onClick={() => navigate("reports-deposits")}
              sx={{ opacity: openMenu ? 1 : 0 }}
            >
              <IconDeposits sx={{ verticalAlign: "unset" }}/>  {t("menu.deposits")}
            </ListText> 
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("reports-withdraws")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconWithdraws sx={{ verticalAlign: "-webkit-baseline-middle" }}/> {t("menu.withdraws")}
            </ListText>
          </SubList>
        </MenuCollapse>

        <ListItemCategory>
          <ButtonMenu sx={{ justifyContent: openMenu ? 'initial' : 'center'}}>
            <Tooltip title={t("menu.scratch_games")} placement="right">
              <IconMenuCategory 
                aria-controls={scratchGame ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={scratchGame ? 'true' : undefined}
                onClick={handleScratchGame}
                sx={{ mr: openMenu ? 3 : 'auto'}}
              >
                <IconScratchGames sx={{ fontSize: "25px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText 
              onClick={() => setOpenScratchGames(!openScratchGames)}
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }} 
            >
              {t("menu.scratch_games")}
            </ListItemText>
          </ButtonMenu>
          {scratchGame && (
            <SubMenuScratchGame 
              openMenu={openMenu}
              scratchGame={scratchGame}
              setScratchGame={setScratchGame}
            />
          )}
        </ListItemCategory>
        <MenuCollapse in={openScratchGames && openMenu}>
          <SubList>
            <ListText
              onClick={() => navigate("reports/historic-scratch-games")} 
              sx={{ opacity: openMenu ? 1 : 0 }}
            >
              <IconList sx={{ verticalAlign: "text-bottom" }}/> {t("menu.historic")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("reports/settings-scratch-games")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconSettings sx={{ verticalAlign: "text-bottom" }}/> {t("menu.settings")}
            </ListText>
          </SubList>
        </MenuCollapse>

        <ListItemCategory sx={{ display: 'block' }} >
          <ButtonMenu sx={{ justifyContent: openMenu ? 'initial' : 'center'}}>
            <Tooltip title="Bingo 90" placement="right">
              <IconMenuCategory 
                aria-controls={bingo90 ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={bingo90 ? 'true' : undefined}
                onClick={handleBingo90}
                sx={{ mr: openMenu ? 3 : 'auto'}}
              >
                <IconCasino sx={{ fontSize: "30px" }}/>
              </IconMenuCategory>
            </Tooltip>
            
            <ListItemText
              onClick={() => setOpenBingo(!openBingo)} 
              sx={{ opacity: openMenu ? 1 : 0, fontSize: "1.2rem", marginTop: "10px" }}
            >
              Bingo 90
            </ListItemText>
          </ButtonMenu>
          {bingo90 && (
            <SubMenuBingo90 
              openMenu={openMenu}
              bingo90={bingo90}
              setBingo90={setBingo90}
            />
          )}
        </ListItemCategory>
        <MenuCollapse in={openBingo && openMenu} >
          <SubList >
            <ListText
              onClick={() => navigate("bingo/line")}
              sx={{ opacity: openMenu ? 1 : 0}}
            >
              <IconLine sx={{ verticalAlign: "text-bottom" }}/>  {t("field.line")}
            </ListText>
          </SubList>

          <SubList >
            <ListText
              onClick={() => navigate("bingo/device")}
              sx={{ opacity: openMenu ? 1 : 0}}
            >
              <DeviceIcon sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.device")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/sellers")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconSellers sx={{ verticalAlign: "text-bottom" }}/>  {t("field.sellers")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/salespoint")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconSalespoint sx={{ verticalAlign: "text-bottom" }}/>  {t("field.salespoint_name")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/scheduled-draw")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconScheduled sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.scheduled_draw")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/reports/draw-speedball90")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/> {t("menu.reports")} {t("menu.draw")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/reports/sellers-speedball90")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/> {t("menu.reports")} {t("field.sellers")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/reports/collector-speedball90")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/> {t("menu.reports")} {t("field.collector")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/reports/openboxes-speedball90")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.open_boxes")}
            </ListText>
          </SubList>

          <SubList>
            <ListText 
              onClick={() => navigate("bingo/reports/closedboxes-speedball90")}
              sx={{ opacity: openMenu ? 1 : 0 }} 
            >
              <IconReportsList sx={{ verticalAlign: "text-bottom" }}/>  {t("menu.closed_boxes")}
            </ListText>
          </SubList>

        </MenuCollapse>
      </List>
    </Drawer>
  );
};

export default Menu;
