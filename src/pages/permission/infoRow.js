import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "components/atoms/icons/icons";
import {
  SCell,
  SRow,
  STable,
  STableBody,
  SHead,
  SLabel,
} from "components/atoms/table/table";
import { formatDate } from "utils/formatDate";

import InfoIcon from '@mui/icons-material/Info';

const InfoRow = (props) => {

  const { 
    data, 
    index, 
    setShowModalAction, 
    setCheckId,
    setQuery, 
    query
  } = props;

  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const status = [
    { value: "approval_process", label: "Em processo", color: "green" },
    { value: "approved", label: "Aprovado", color: "#1976d2" },
    { value: "denied", label: "Negado", color: "red" },
    { value: "finished", label: "Finalizado", color: "grey" },
  ]

  const getStatus = (res) => status.find(item => item.value === res) ?? null

  const handleAction = (id, status) => {
    setShowModalAction(true)
    setCheckId({ id: id, status: status })
  }
  
  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`
    }))
    return;
  };

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>

        <SCell 
          displaywidth={isMobile ? 1 : 0}
          sx={{ 
            fontWeight: "900",
            color: `${getStatus(data?.status_check_order)?.color}` 
          }}
        >
          {getStatus(data?.status_check_order)?.label}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data.financialStatements.driver_name}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data.start_city}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.final_city}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.location_of_the_truck}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.preview_tonne}T</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.financialStatements.truck_board}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.value_tonne)}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.preview_value_diesel)}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{formatDate(data.start_date)}</SCell>
        <SCell
          sx={{ 
            display: "flex", 
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            color="inherit"
            sx={{ mr: 1 }}
            onClick={() => handleAction(data?.id, "approved")}
          >
            <InfoIcon sx={{ color: "#264bd1", fontSize: "30px" }} />
          </IconButton>
        </SCell>
      </SRow>

      <SRow 
        displaywidth={isDesktop ? 0 : 1} 
        sx={{ backgroundColor: "white" }}>
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 4 }}>
              <STable aria-label="purchases">
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <STable aria-label="purchases" sx={{ borderRadius: "8px" }}>
                    <SHead>
                      <SRow>
                        <SCell displaywidth={isDesktop ? 0 : 1}>
                          <SLabel
                            active={query?.sort_field === "start_km"}
                            direction={query?.sort_order?.toLowerCase()}
                            onClick={() => handleSort("start_km")}
                          >
                            Valor Tonelada
                          </SLabel>
                        </SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>
                          <SLabel
                            active={query?.sort_field === "preview_value_diesel"}
                            direction={query?.sort_order?.toLowerCase()}
                            onClick={() => handleSort("preview_value_diesel")}
                          >
                            Valor Prévia Diesel
                          </SLabel>
                        </SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>
                          <SLabel
                            active={query?.sort_field === "start_date"}
                            direction={query?.sort_order?.toLowerCase()}
                            onClick={() => handleSort("start_date")}
                          >
                            Data Check Frete
                          </SLabel>
                        </SCell>
                      </SRow>
                    </SHead>
                    <STableBody>
                      <SRow alternatingcolors={index}>
                        <SCell displaywidth={isDesktop ? 0 : 1}>{moneyMask(data.value_tonne)}</SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>{moneyMask(data.preview_value_diesel)}</SCell>
                        <SCell displaywidth={isDesktop ? 0 : 1}>{formatDate(data.createdAt)}</SCell>
                      </SRow>                      
                    </STableBody>
                  </STable>
                </Box>
              </STable>
            </Box>
          </Collapse>
        </SCell>
      </SRow>
    </>
  );
};

export default InfoRow;
