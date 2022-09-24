import React, { useState } from "react";
import { Avatar, Box, Collapse, IconButton, Menu, MenuItem } from "@mui/material";
import { useMediaQuery } from "react-responsive";
// import { moneyMask } from "utils/masks";
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
    setShowModalUpdate,
    setFinancialId, 
  } = props;

  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const isDesktop = useMediaQuery({ maxWidth: "1250px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const handleClick = (ev) => {
    setOpenSettings(!openSettings);
    setAnchorEl(ev.currentTarget);
  };

  const handleDelete = (id) => {
    setShowModalDelete(true)
    setFinancialId(id)
    setOpenSettings(false)
  }
  
  const handleUpdate = (id) => {
    setShowModalUpdate(true)
    setFinancialId(id)
    setOpenSettings(false)
  }

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

        <SCell>{data.id}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data.driver_name}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.truck_models}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.cart_models}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{formatDate(data.start_date)}</SCell>
        <SCell>
          <Avatar
            alt="img" 
            sx={{ height: "70px", width: "70px", marginLeft: "12px" }} 
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
        <MenuItem onClick={() => handleUpdate(data?.id)}>Editar</MenuItem>
        <MenuItem onClick={() => handleDelete(data?.id)}>Excluir</MenuItem>
      </Menu>

      <SRow 
        sx={{ backgroundColor: "white" }}>
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 4 }}>
              <STable aria-label="purchases">
                <SHead>
                  <SRow>
                    <SCell>Status Check</SCell>
                    <SCell>Contratante</SCell>
                    <SCell>Cidade Inicio Frete</SCell>
                    <SCell>Cidade Final Frete</SCell>
                    <SCell>Previa Peso Carregamento</SCell>
                    <SCell>Km Atual Caminhção</SCell>
                    <SCell>Valor Tonelada</SCell>
                  </SRow>
                </SHead>
                <STableBody>
                  {data?.freigth.map((res) => (
                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCell 
                        sx={{ 
                          fontWeight: "900",
                          color: `${res.status_check_order === 'approval_process' && "green"}` 
                        }}
                      >
                        {res.status_check_order === 'approval_process' && "Em Processo"}
                      </SCell>
                      <SCell>{res.contractor}</SCell>
                      <SCell>{res.start_city}</SCell>
                      <SCell>{res.final_city}</SCell>
                      <SCell>{res.preview_tonne}T</SCell>
                      <SCell>{res.start_km}</SCell>
                      <SCell>{res.value_tonne}</SCell>
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
