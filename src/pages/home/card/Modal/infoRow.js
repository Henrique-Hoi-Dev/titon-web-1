import React from "react";
import { useMediaQuery } from "react-responsive";
import { SCell, SRow } from "components/atoms/table/table";
import { moneyMask } from "utils/masks";
import { formatDate } from "utils/formatDate";
import { Button } from "@mui/material";

const status = [
  { value: "APPROVAL_PROCESS", label: "ANALISE", color: "#FFCE52" },
  { value: "APPROVED", label: "APROVADO", color: "#0BB07B" },
  { value: "DENIED", label: "NEGADO", color: "#F03D3D" },
  { value: "FINISHED", label: "FINALIZADO", color: "#86878A" },
];

const InfoRow = (props) => {
  const { data, index } = props;

  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const getStatus = (res) => status.find((item) => item.value === res) ?? "";

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell displaywidth={isMobile ? 1 : 0}>
          <Button style={{ color: getStatus(data?.status).color }}>
            {getStatus(data?.status).label}
          </Button>
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          {data?.final_freight_city ?? "---"}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {data?.location_of_the_truck}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {formatDate(new Date())}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {moneyMask(data?.preview_tonne * 100 * (data?.value_tonne / 100))}
        </SCell>
      </SRow>

      {/* <SRow 
        displaywidth={isDesktop ? 0 : 1} 
        sx={{ backgroundColor: "white" }}>
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse 
            // in={open} 
            timeout="auto" 
            unmountOnExit
          >
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
      </SRow> */}
    </>
  );
};

export default InfoRow;
