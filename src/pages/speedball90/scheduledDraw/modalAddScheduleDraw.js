import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { formatMoney } from "utils/masks";
import { format, addMinutes, startOfDay } from "date-fns";
import { useTranslation } from "react-i18next";
import { useBingoCreate } from "services/requests/useCreate";
import { unmaskMoney } from "utils/unmaskMoney";
import { successNotification } from "utils/notification";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";
import PickerDate from "components/atoms/pickerDate/pickerDate";
import PickerTime from "components/atoms/pickerTime/pickerTime";
import ModalAddDrawWithTemplates from "./modalAddDrawWithTemplates";
import Switch from "components/atoms/switch/switch";

const ModalAddScheduleDraw = ({ showModal, setShowModal, mutate, gameInstance, roomId }) => {
  const { t } = useTranslation();
  const [fetch, setFetch] = useState(false);
  // const [fetchWithTemplates, setFetchWithTemplates] = useState(false);
  const [showTemplates, setShowTemplates] = useState(true);
  const [data, setData] = useState({ qty: 1});
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(addMinutes(new Date(), 10));
  const [dataTemplates, setDataTemplates] = useState({});

  const typesArray = [
    { value: 0, label: t("field.rounds") },
    { value: 1, label: t("field.special_rounds") },
    { value: 2, label: t("field.super_special_rounds") },
  ];

  let body = {
    date: format(startOfDay(date), "yyyy-MM-dd"),
    time: format(time, "HH:mm"),
    bingo: unmaskMoney(data?.bingo, true),
    double_line: unmaskMoney(data?.double_line, true),
    line: unmaskMoney(data?.line, true),
    card_value: unmaskMoney(data?.card_value, true),
    type: data?.type,
    auto_increment: data?.auto_increment === false ? 0 : 1,
    qty: data?.qty,
    interval: data?.qty > 1 ? data?.interval : 10,
    game_instance: data?.game_instance,
  };

  const {
    data: bingo,
    error: errorBingo,
    isFetching,
  } = useBingoCreate("/bingo-reports/round", body, fetch, setFetch);

  // const {
  //   data: bingoWithTemplates,
  //   error: errorBingoWithTemplates,
  //   isFetching: loadingBingoWithTemplates,
  // } = useBingoCreate(
  //   "/bingo-reports/round/createbytemplate", 
  //   dataTemplates, 
  //   fetchWithTemplates, 
  //   setFetchWithTemplates
  // );

  const onClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (showTemplates) {
    //  return setFetchWithTemplates(true);
    } else {
     return setFetch(true);
    }

  };

  const handleChangeQty = (ev) => {
    if (ev.target.value < 1) {
      return setData((state) => ({ ...state, qty: 1 }));
    } else {
      setData((state) => ({ ...state, qty: Number(ev.target.value) }));
    }
  };

  const handleChangeInterval = (ev) => {
      setData((state) => ({ ...state, interval: Number(ev.target.value) }));
  };

  useEffect(() => {
    if (bingo || errorBingo) {
      mutate();
      onClose();
    }

    if(bingo){
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bingo, errorBingo]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'80%'}
    >
      <ContentHeader>
        <Title>{t("modal.create") + " " + t("menu.scheduled_draw")}</Title>
      </ContentHeader>

      <Grid container item xs={12} md={12} lg={12} justifyContent={"flex-end"}>
        <Grid item xs={6} md={6} lg={6}>
          <Button 
            onClick={() => setShowTemplates(!showTemplates)}>{showTemplates ? 'Voltar' : "Templates"} 
          </Button>
        </Grid>
      </Grid>
      
    
      {showTemplates ? (
        <ModalAddDrawWithTemplates 
          roomId={roomId}
          gameInstance={gameInstance}
          setData={setDataTemplates}
          data={dataTemplates}
        />
      ):(
        !isFetching && (
          <Grid
            container
            item
            spacing={2}
            p={2}
            sx={{ minHeight: "300px", justifyContent: "flex-start" }}
          >
            <Grid 
              item 
              xs={6} 
              md={12} 
              lg={12}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Text sx={{ ml: 1, mb: "10px" }}>{t("field.auto_increment")}</Text>
              <Switch
                checked={data?.auto_increment ?? true} 
                onChange={(ev) => {
                  setData((state) => ({
                    ...state,
                    auto_increment: ev.target.checked
                  }))
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6} mt={2.5}>
              <Text sx={{ ml: 1 }}>{t("field.game_instance")}</Text>
              <Autocomplete 
                  required
                  disabled={!roomId}
                  options={gameInstance ?? []}
                  getOptionLabel={(option) => option.nick}
                  onChange={(event, newValue) => {
                    setData((state) => ({ ...state, game_instance: newValue.id }))
                  }}
              />
              {!roomId && (
                <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                  {t("messages.select_room").toUpperCase()}
                </Text>
              )}
            </Grid>

            <Grid item xs={6} md={3} lg={3} mt={2.5}>
              <Text sx={{ ml: 1 }}>{t("field.date")}</Text>
              <PickerDate
                required
                size="medium"
                minDate={new Date()}
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={3} mt={2.5}>
              <Text sx={{ ml: 1 }}>{t("field.time")}</Text>
              <PickerTime
                required
                size="medium"
                value={time}
                onChange={(newValue) => setTime(newValue)}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6} >
              <Text sx={{ ml: 1 }}>{t("field.type_of_draw")}</Text>
              <Autocomplete
                required
                options={typesArray}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                disableClearable
                defaultValue={data?.type}
                onChange={(ev, newValue) =>
                  setData((state) => ({ ...state, type: newValue.value }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>1° {t("field.award")}</Text>
              <Input
                required
                styles={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.4rem",
                  },
                }}
                value={formatMoney(data?.line)}
                onChange={(ev) =>
                  setData((state) => ({
                    ...state,
                    line: formatMoney(ev.target.value),
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>2° {t("field.award")}</Text>
              <Input
                required
                styles={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.4rem",
                  },
                }}
                value={formatMoney(data?.double_line)}
                onChange={(ev) =>
                  setData((state) => ({
                    ...state,
                    double_line: formatMoney(ev.target.value),
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>3° {t("field.award")}</Text>
              <Input
                required
                value={formatMoney(data?.bingo)}
                onChange={(ev) =>
                  setData((state) => ({
                    ...state,
                    bingo: formatMoney(ev.target.value),
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>{t("field.card_value")}</Text>
              <Input
                required
                styles={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.4rem",
                  },
                }}
                value={formatMoney(data?.card_value)}
                onChange={(ev) =>
                  setData((state) => ({
                    ...state,
                    card_value: formatMoney(ev.target.value),
                  }))
                }
              />
            </Grid>

            <Grid item xs={data?.qty <= 1 ? 12 : 6} md={data?.qty <= 1 ? 6 : 3} lg={data?.qty <= 1 ? 6 : 3}>
              <Text sx={{ ml: 1 }}>{t("field.draw_amount")}</Text>
              <Input
                type="number"
                required
                styles={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.4rem",
                  },
                }}
                value={data?.qty}
                onChange={(ev) => handleChangeQty(ev)}
              />
            </Grid>

            {data?.qty > 1 && (
              <Grid item xs={6} md={3} lg={3}>
                <Text sx={{ ml: 1 }}>{t("field.interval")}</Text>
                <Input
                  error={data?.interval < 10}
                  type="number"
                  min={10}
                  helperText={data?.interval < 10 && t("messages.min_interval")}
                  styles={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "2.4rem",
                    },
                  }}
                  value={data?.interval}
                  onChange={(ev) => handleChangeInterval(ev)}
                />
              </Grid>
            )}
          </Grid>
      ))}
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

      {isFetching && <Loading titulo={t("messages.loading")}/>}
    </Modal>
  );
};

export default ModalAddScheduleDraw;
