import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { formatMoney } from "utils/masks";
import { unmaskMoney } from "utils/unmaskMoney";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import PickerTime from "components/atoms/pickerTime/pickerTime";
import Switch from "components/atoms/switch/switch";
import Autocomplete from "components/atoms/autocomplete/autocomplete";

const ModalUpdateTemplate = (
  { 
    showModal, 
    setShowModal, 
    props,
    setDraw
  }) => {

  const { t } = useTranslation();

  const [data, setData] = useState([])
  const [time, setTime] = useState(new Date());
  const [newTime, setNewTime] = useState(false);

  const [msgTimeError, setMsgTimeError] = useState([])

  const typesArray = [
    { value: 0, label: t("field.rounds") },
    { value: 1, label: t("field.special_rounds") },
    { value: 2, label: t("field.super_special_rounds") },
  ];

  let getDefaultTypesArray = () => typesArray?.find((item) => 
    item.value === props?.type) ?? null;

  const list = JSON.parse(localStorage.getItem("drawList"))
  const timeState = list?.map((res) => res?.time)
  
  function setTimeInput(time) {
    const [hrs, min] = time?.split(':');
    const newTime = new Date(0)

    newTime.setHours(hrs);
    newTime.setMinutes(min);

    return newTime
  }

  useEffect(() => {
    setData((state) => ({
      ...state,
      auto_increment: props?.auto_increment,
      line: props?.line?.toString(),
      bingo: props?.bingo?.toString(),
      double_line: props?.double_line?.toString(),
      card_value: props?.card_value?.toString(),
      time: setTimeInput(props?.time),
      type: props?.type
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function handleTimestamp(hour) {
    const [hrs, min] = hour.split(':');
    const date = new Date(0);
    
    if (hrs.length) date.setHours(hrs);
    if (min.length) date.setMinutes(min);
    
    return Math.abs(date?.getTime());
  }
  
  const handleSubmitEdit = () => {
    const drawEdit = JSON.parse(localStorage.getItem("drawList"))
        .filter(item => item.time !== props?.time)

    const newTimestamp = handleTimestamp(format(time, "HH:mm"));
    const validateRange = timeState?.every(hour => Math.abs(handleTimestamp(hour) - newTimestamp) >= handleTimestamp(':10'));  
    
    if (!newTime) {
      drawEdit.push({
        auto_increment: data?.auto_increment,
        bingo: unmaskMoney(data?.bingo),
        double_line: unmaskMoney(data?.double_line),
        line: unmaskMoney(data?.line),
        card_value: unmaskMoney(data?.card_value),
        time: format(data?.time, "HH:mm"),
        type: data?.type
      })

      localStorage.setItem("drawList", JSON.stringify(drawEdit))
      const listDraw = JSON.parse(localStorage.getItem('drawList'))
      const ascListDraw = listDraw?.sort((a,b) => handleTimestamp(b.time) - handleTimestamp(a.time) )
      setDraw(ascListDraw)
      onClose()
    } else {
      if (validateRange) {
        drawEdit.push({
          auto_increment: data?.auto_increment,
          bingo: unmaskMoney(data?.bingo),
          double_line: unmaskMoney(data?.double_line),
          line: unmaskMoney(data?.line),
          card_value: unmaskMoney(data?.card_value),
          time: format(time, "HH:mm"),
          type: data?.type
        })
  
        localStorage.setItem("drawList", JSON.stringify(drawEdit))
        const listDraw = JSON.parse(localStorage.getItem('drawList'))
        const ascListDraw = listDraw?.sort((a,b) => handleTimestamp(b.time) - handleTimestamp(a.time) )
        setDraw(ascListDraw)
        setNewTime(false)
        onClose()
      } else {
        return setMsgTimeError([t("error.minimum_break_is_10_minutes")])
      }
    }
  }

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      maxWidth={"500px"}
    >
      <ContentHeader>
        <Title>{t("modal.edit") + " " + t("menu.draw")}</Title>
      </ContentHeader>
      <Grid
        container
        item
        spacing={2}
        justifyContent={"center"}
        sx={{ minHeight: "150px" }}
      >
        {msgTimeError && (
          <Grid item mt={2}>
            <Text sx={{ mt: "20px" }} type="warning" fontSize={"15px"} center>
              {msgTimeError}
            </Text>
          </Grid>
        )}
       
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

        <Grid item xs={6} md={4} lg={4}>
          <Text sx={{ ml: 1 }}>{t("field.time")}</Text>
          <PickerTime
            required
            size="medium"
            value={data?.time}
            onChange={(newValue) => 
              setTime(newValue) ||  
              setData((state) => ({...state, time: newValue})) ||
              setMsgTimeError([]) || 
              setNewTime(true)
            }
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Text sx={{ ml: 1 }}>{t("field.type_of_draw")}</Text>
          <Autocomplete
            options={typesArray}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            defaultValue={getDefaultTypesArray() ?? null}
            onChange={(ev, newValue) => {
                if (newValue) {
                  setData((state) => ({ ...state, type: newValue.value }))
                }
                if (newValue === null) {
                  setData((state) => ({ ...state, type: ''}));
                }
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Text sx={{ ml: 1,  }}>1°{t("field.award")}</Text>
          <Input
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

        <Grid item xs={12} md={4} lg={4}>
          <Text sx={{ ml: 1 }}>2°{t("field.award")}</Text>
          <Input
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

        <Grid item xs={12} md={4} lg={4}>
          <Text sx={{ ml: 1 }}>3°{t("field.award")}</Text>
          <Input
            styles={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                height: "2.4rem",
              },
            }}
            value={formatMoney(data?.bingo)}
            onChange={(ev) =>
              setData((state) => ({
                ...state,
                bingo: formatMoney(ev.target.value),
              }))
            }
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Text sx={{ ml: 1 }}>{t("field.card_value")}</Text>
          <Input
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
      </Grid>

      <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2}>
        <Grid item xs={12} md={12} lg={6}>
          <Button variant="return" onClick={() => onClose()}>
            {t("button.return")}
          </Button>
        </Grid>

        <Grid item xs={12} md={12} lg={6}>
          <Button onClick={() => handleSubmitEdit()}>
            {t("button.confirm")}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalUpdateTemplate;
