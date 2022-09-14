import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { successNotification } from "utils/notification";
import { useGetBingo } from "services/requests/useGet";
import { useBingoUpdate } from "services/requests/useUpdate";
import { PointIcon } from "components/atoms/icons/icons";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Switch from "components/atoms/switch/switch";
import Text from "components/atoms/text/text";


const ModalUpdateSeller = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    sellerId, 
    gameInstanceId  
  }) => {

  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const query = {
    game_instance: gameInstanceId,
    seller_id: sellerId,
  };

  const {
    data: sellerQuery,
  } = useGetBingo("/bingo-reports/seller/byid", query);

  const {
    data: sellerUpdate,
    error: errorSellerUpdate,
    isFetching: isFetchingSellerUpdate
  } = useBingoUpdate("bingo-reports/seller/update", body, "", fetch, setFetch);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
    setBody({})
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      game_instance: gameInstanceId,
      seller_id: sellerId,
      name: sellerQuery?.name,
      fee: sellerQuery?.fee,
      status: sellerQuery?.status ?? null
    }))

  }, [sellerId, gameInstanceId, sellerQuery]);

  useEffect(() => {
    if (sellerUpdate || errorSellerUpdate) {
      mutate();
      onClose();
    }
    if(sellerUpdate){
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerUpdate, errorSellerUpdate]);

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"800px"}
    >
      <ContentHeader>
        <Title>{t("modal.edit") + " " + t("field.sellers")}</Title>
      </ContentHeader>

        {!isFetchingSellerUpdate && (
          <Grid
            container
            item
            spacing={2}
            mt={2}
            sx={{ minHeight: "300px", justifyContent: "flex-start" }}
          >

            <Grid item xs={12} md={12} lg={12} mt={2.5}>
              <Text sx={{ ml: 1 }}>{t("field.status")}</Text>
              <Grid item xs={12} md={6} lg={6}>
                <PointIcon 
                  sx={{ verticalAlign: "middle" }} 
                  color={body?.status ? "#3333" : "#E74C3C"}
                />
                <Switch checked={body?.status ? true : null} onChange={(ev) => {
                    setBody((state) => ({
                      ...state,
                      status: ev.target.checked
                    }))
                  }}
                />
                <PointIcon 
                  sx={{ verticalAlign: "middle" }} 
                  color={body?.status ? "#2ECC71" : "#3333"}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>{t("field.seller_name")}</Text>
              <Input
                required
                styles={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.4rem",
                  },
                }}
                value={body?.name}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    name: ev.target.value
                  })) 
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>{t("card.seller_fee")}</Text>
              <Input
                required
                styles={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.4rem",
                  },
                }}
                value={body?.fee}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    fee: ev.target.value,
                  }))
                }
              />
            </Grid>

            <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2}>
              <Grid item xs={12} md={12} lg={6}>
                <Button variant="return" onClick={() => onClose()}>
                  {t("button.return")}
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Button type="submit">{t("button.confirm")}</Button>
              </Grid>
            </Grid>

          </Grid>
        )}

      {isFetchingSellerUpdate && <Loading />}
    </Modal>
  );
};

export default ModalUpdateSeller;
