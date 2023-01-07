import React, { useState } from "react";
import { Avatar, Box, Collapse, IconButton, Menu, MenuItem } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import { formatDate } from "utils/formatDate";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  IconActions,
} from "components/atoms/icons/icons";
import {
  SCell,
  SRow,
  STable,
  STableBody,
  SHead,
} from "components/atoms/table/table";

const InfoRow = (props) => {

  const { 
    data, 
    index, 
    setShowModalDelete, 
    setFinancialId, 
  } = props;

  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const isDesktop = useMediaQuery({ maxWidth: "1250px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const status = [
    { value: "approval_process", label: "Em processo", color: "green" },
    { value: "approved", label: "Aprovado", color: "#1976d2" },
    { value: "denied", label: "Negado", color: "red" },
    { value: "finished", label: "Finalizado", color: "grey" },
  ]

  const getStatus = (res) => status.find(item => item.value === res)

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const handleDelete = (id) => {
    setShowModalDelete(true)
    setFinancialId(id)
    setOpenSettings(false)
  }
  
  // const handleUpdate = (id) => {
  //   setShowModalUpdate(true)
  //   setFinancialId(id)
  //   setOpenSettings(false)
  // }

  return (
    <>
      <SRow key={data.id} alternatingcolors={index} >
        <SCell minwidth={"0px"}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>

        <SCell displaywidth={isMobile ? 1 : 0}>{data.driver_name}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.truck_models}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.cart_models}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{formatDate(data.start_date)}</SCell>
        <SCell>
          <Avatar
            alt="img" 
            sx={{ height: "40px", width: "40px", marginLeft: "35px" }} 
            src={data.truck_avatar}
          />
        </SCell>
        <SCell>
          <IconButton
            color="inherit"
            fontSize="20px"
            sx={{ mr: 1 }}
            onClick={(ev) => handleClick(ev)}
          >
            <IconActions
              sx={{
                color: "#ff443a",
                height: "30px",
                width: "30px",
              }}
            />
          </IconButton>
        </SCell>
      </SRow>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          zIndex: 4444,
          mt: 5,
        }}
        open={openSettings}
        onClose={() => setOpenSettings(!openSettings)}
      >
        {/* <MenuItem onClick={() => handleUpdate(data?.id)}>Editar</MenuItem> */}
        <MenuItem onClick={() => handleDelete(data?.id)}>Excluir</MenuItem>
      </Menu>

      <SRow 
        sx={{ backgroundColor: "white" }}
        displaywidth={(data?.freigth.length > 0 ? 0 : 1)}
      >
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <STable aria-label="purchases" sx={{ borderRadius: "8px" }}>
                <SHead>
                  <SRow>
                    <SCell>Status Check</SCell>
                    <SCell>Contratante</SCell>
                    <SCell>Inicio Frete</SCell>
                    <SCell>Final Frete</SCell>
                    <SCell>Valor Tonelada</SCell>
                    <SCell>Km Caminhão</SCell>
                  </SRow>
                </SHead>
                <STableBody>
                  {data?.freigth.map((res, i) => (
                    <SRow 
                      key={i}
                      sx={{ backgroundColor: "white" }} 
                      displaywidth={res?.status_check_order === 'finished' ? 0 : 1}
                    >
                      <SCell 
                        sx={{ 
                          fontWeight: "900",
                          color: `${getStatus(res?.status_check_order)?.color}` 
                        }}
                      >
                        {getStatus(res?.status_check_order)?.label}
                      </SCell>
                      <SCell>{res?.contractor}</SCell>
                      <SCell>{res?.start_city}</SCell>
                      <SCell>{res?.final_city}</SCell>
                      <SCell>{moneyMask(res?.value_tonne || [0])}</SCell>
                      <SCell>{res?.start_km}Km</SCell>
                    </SRow>                      
                  ))}
                </STableBody>
              </STable>
            </Box>
          </Collapse>
        </SCell>
      </SRow>
    </>
  );
};

export default InfoRow;
