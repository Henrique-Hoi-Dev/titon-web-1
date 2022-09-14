import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatMoney } from "utils/masks";
import { addMinutes, format } from "date-fns";
import { unmaskMoney } from "utils/unmaskMoney";

import Input from "components/atoms/input/input";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import PickerTime from "components/atoms/pickerTime/pickerTime";
import Button from "components/atoms/button/button";
import Table from './table'
import Switch from "components/atoms/switch/switch";

const CreateTemplate = (
  { 
    drawProps,
    isFetching,
    setDraw
  }) => {

  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [time, setTime] = useState(new Date());
  const [intervalDraw, setIntervalDraw] = useState(data?.qty > 1 ? data?.interval : 10)
  const [qty, setQty] = useState(1)
  
  const [msgTimeError, setMsgTimeError] = useState([])

  const timeState = drawProps?.map((res) => res?.time)
  
  const typesArray = [
    { value: 0, label: t("field.rounds") },
    { value: 1, label: t("field.special_rounds") },
    { value: 2, label: t("field.super_special_rounds") },
  ];

  let getDefaultTypesArray = () => typesArray?.find((item) => 
    item.value === data?.type) ?? null;

  let body = {
    time: format(time, "HH:mm"),
    card_value: unmaskMoney(data?.card_value, true),
    bingo: unmaskMoney(data?.bingo, true),  
    line: unmaskMoney(data?.line, true),
    double_line: unmaskMoney(data?.double_line, true),
    type: data?.type,
    auto_increment: data?.auto_increment ?? false,
  };

  function handleTimestamp(hour) {
    const [hrs, min] = hour.split(':');
    const date = new Date(0);
    
    if (hrs.length) date.setHours(hrs);
    if (min.length) date.setMinutes(min);
    
    return Math.abs(date.getTime());
  }
  
  const handleAddBingo = (currentTime, currentInterval) => {
    if (!timeState?.includes(body?.time)) {
      const newTimestamp = handleTimestamp(body?.time);
      const validateRange = timeState?.every(hour => Math.abs(handleTimestamp(hour) - newTimestamp) >= handleTimestamp(':10'));
      
      if (validateRange) {
        if (qty > 1) {
          setDraw((value) => [...value, {...body, time: format(currentTime, "HH:mm")}]);
          setMsgTimeError([])
        } else {
          setDraw((value) => [...value, body])
          setMsgTimeError([])
        }
        return
      } else {
        return setMsgTimeError([t("error.minimum_break_is_10_minutes")])
      }
    } 
    if (timeState?.includes(body?.time)) {
      setTime(addMinutes(currentTime, currentInterval))
      return setMsgTimeError([t("error.there_is_already_a_draw_at_this_time")])
    } 
  }

  const createBingo = () => {
    let currentTime = time
    const currentInterval = intervalDraw

    for(var i=0; i < qty; i++){
      handleAddBingo(currentTime, currentInterval)
      currentTime = addMinutes(currentTime, currentInterval)  
    }
  }

  const handleChangeQty = (ev) => {
    if (ev.target.value < 1) {
      return setQty(() => 1);
    } else {
      setQty(() => Number(ev.target.value));
    }
  };

  const handleClean = (ev) => {
    ev.preventDefault();
    const cleanList = localStorage.setItem("drawList", JSON.stringify([]))
    setDraw(cleanList)
    const list = JSON.parse(localStorage.getItem('drawList'))
    setDraw(list)
  }

  useEffect(() => {
    setData((state) => ({ ...state, type: 0 }))
  },[])

  useEffect(() => {
    setData((state) => ({
      ...state,
      type: 0
    }))

    if (drawProps) {
      localStorage.setItem('drawList', JSON.stringify(drawProps))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawProps]);

  return (
    <>
      {msgTimeError && (
        <Grid
          container
          item
          justifyContent="center"
          mt={2}
        >
          <Text sx={{ mt: "20px" }} type="warning" fontSize={"15px"} center>
            {msgTimeError}
          </Text>
        </Grid>
      )}
  
      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={2}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        >
          <Grid 
            container 
            item 
            xs={12} 
            md={12} 
            lg={12} 
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row-reverse"
          >
            <Grid container item xs={6} md={6} lg={6} spacing={1}>
              <Grid item xs={6} md={6} lg={6}>
                <Button
                  sx={{ 
                    "&:hover": {
                      backgroundColor: "#cf1e2fad" 
                    },
                    backgroundColor: "#cf1e2f" 
                  }}
                  onClick={(ev) => handleClean(ev)} 
                >
                  {t("field.clear_list")}
                </Button>
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <Button
                  sx={{ 
                    "&:hover": {
                      backgroundColor: "#2ba91cdb" 
                    },
                    backgroundColor: "#2ba91c" 
                  }}
                  onClick={() => createBingo()} 
                >
                  {t("modal.add") + " " + t("menu.draw")+"s"} 
                </Button>
              </Grid>
            </Grid>

            <Grid 
              item 
              xs={6} 
              md={3} 
              lg={3}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Text sx={{ ml: 1, mb: "10px" }}>{t("field.auto_increment")}</Text>
              <Switch 
                checked={data?.auto_increment ?? false} 
                onChange={(ev) => {
                  setData((state) => ({
                    ...state,
                    auto_increment: ev.target.checked
                  }))
                }}
              />
            </Grid>
          </Grid>

           <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>{t("field.draw_amount")}</Text>
            <Input
              type="number"
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.7rem",
                },
              }}
              value={qty ?? 1}
              onChange={(ev) => handleChangeQty(ev)}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>{t("field.interval")}</Text>
            <Input
              error={data?.interval < 10}
              type="number"
              min={10}
              helperText={data?.interval < 10 && t("messages.min_interval")}
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.7rem",
                },
              }}
              value={intervalDraw}
              onChange={(ev) => setIntervalDraw(ev.target.value)}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>{t("field.time")}</Text>
            <PickerTime
              required
              height="2.7em"
              size="medium"
              value={time}
              onChange={(newValue) => setTime(newValue) || setMsgTimeError([])}
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>{t("field.type_of_draw")}</Text>
            <Autocomplete
              required   
              sx={{
                "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                  height: "0.7em"
                },
              }}           
              options={typesArray}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={getDefaultTypesArray() ?? null}
              onChange={(ev, newValue) => {
                  if (newValue) {
                    setData((state) => ({ ...state, type: newValue.value }))
                  }
                  if (newValue === null) {
                    setData((state) => ({ ...state, type: '' }));
                  }
                }
              }
            />
          </Grid>

          <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>1°{t("field.award")}</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.7rem",
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

          <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>2°{t("field.award")}</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.7rem",
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

          <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>3°{t("field.award")}</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.7rem",
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

          <Grid item xs={6} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>{t("field.card_value")}</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.7rem",
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
      )}

      <Grid item container mt={1}>
        <Table
          data={drawProps}
          setDraw={setDraw}
        />
      </Grid>

      {isFetching && <Loading titulo={t("messages.loading")}/>}
    </>
  );
}

export default CreateTemplate;