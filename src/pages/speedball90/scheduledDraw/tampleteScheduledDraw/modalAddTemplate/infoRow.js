import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  IconDelete,
  IconEdit,
  PointIcon,
} from "components/atoms/icons/icons";

import {
  SCell,
  SRow,
  STable,
  STableBody,
  SCellTwoHead,
} from "components/atoms/table/table";

import ModalUpdateTemplate from "./modalUpdateTemplateScheduleDraw";
import ModalDeleteTemplate from "./modalDeleteTemplateScheduleDraw";

const InfoRow = (props) => {
  const { t } = useTranslation();

  const { data, setDraw, index } = props;

  const [open, setOpen] = useState(false);

  const [editSorteio, setEditSorteio] = useState()
  const [deleteId, setDeleteId] = useState()

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalUpdateTemplate, setShowModalUpdateTemplate] = useState(false);

  const isDesktop = useMediaQuery({ maxWidth: "910px" });
  const isMobile = useMediaQuery({ maxWidth: "610px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "430px" });

  const handleDelete = (id) => {
    setShowDeleteModal(true)
    setDeleteId(id)
  };

  const handleEditar = () => {
    setShowModalUpdateTemplate(true)
    setEditSorteio(data)
  }

  const renderScheduledType = (type) => {
    switch (type) {
      case 0:
        return t("field.rounds");
      case 1:
        return t("field.special_rounds");
      case 2:
        return t("field.super_special_rounds");
      default:
        return "";
    }
  }

  return (
    <>
      <SRow key={data.round_id} alternatingcolors={index}>
        <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>
        <SCell>
          {data.time}
        </SCell>
        <SCell>
          {moneyMask(data.card_value || [0])}
        </SCell>
        <SCell displaywidth={isSmallMobile ? 1 : 0}>
          {moneyMask(data.line || [0])}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}> 
          {moneyMask(data.double_line || [0])}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          {moneyMask(data.bingo || [0])}
        </SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>
          {renderScheduledType(data.type)} 
        </SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>
          {<PointIcon color={data?.auto_increment ? "#2ECC71" : "#E74C3C"}/>}
        </SCell>
        <SCell 
          minwidth={"90px"} 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            height: "100%",
            margin: 0
          }}
        >
          <IconEdit
            sx={{ cursor: "pointer", height: "35px" }}
            onClick={() => handleEditar(index)}
          />
          <hr style={{ height: "17px" }} />
          <IconDelete
            sx={{ cursor: "pointer", height: "35px" }}
            onClick={() => handleDelete(index)}
          />
        </SCell>
      </SRow>

      <SRow sx={{ backgroundColor: "white" }} displaywidth={isDesktop ? 0 : 1}>
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 4 }}>
              <STable aria-label="purchases">
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <STableBody>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallMobile ? 0 : 1}>
                        1°{t("field.award")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                        {moneyMask(data.line || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        2°{t("field.award")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {moneyMask(data.double_line || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        3°{t("field.award")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {moneyMask(data.bingo || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("field.type_of_draw")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {renderScheduledType(data.type)} 
                      </SCell>
                    </SRow>
                    
                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("field.auto_increment")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {<PointIcon color={data?.auto_increment ? "#2ECC71" : "#E74C3C"}/>}
                      </SCell>
                    </SRow>
                  </STableBody>
                </Box>
              </STable>
            </Box>
          </Collapse>
        </SCell>
      </SRow>

      {showModalUpdateTemplate && (
        <ModalUpdateTemplate
          showModal={showModalUpdateTemplate}
          setShowModal={setShowModalUpdateTemplate}
          props={editSorteio}
          setDraw={setDraw}
        />
      )}

      {showDeleteModal && (
        <ModalDeleteTemplate
          open={showDeleteModal}
          onClose={setShowDeleteModal}
          setDraw={setDraw}
          id={deleteId}
        />
      )}
    </>
  );
};

export default InfoRow;
