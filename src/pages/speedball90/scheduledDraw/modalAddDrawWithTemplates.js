import { useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetBingo } from "services/requests/useGet";
import { formatDatePicker } from "utils/formatDate";

import Autocomplete from "components/atoms/autocomplete/autocomplete";
import PickerDate from "components/atoms/pickerDate/pickerDate";
import Text from "components/atoms/text/text";

const ModalAddDrawWithTemplates = ({ roomId, gameInstance, setData, data }) => {
  const { t } = useTranslation();

  const [dateSelected, setDateSelected] = useState(new Date());
  const [date, setDate] = useState([]);

  console.log(date)

  const {
    data: templates,
  } = useGetBingo(
      "bingo-reports/round/template", 
      {game_instance: data?.game_instance}, 
      data?.game_instance ? false : true
  );

  const handleDate = (date) => {
    setDateSelected(formatDatePicker(date));
    setDate((state) => ({ ...state, date: date}))
  }

  return (
    <Grid 
      container          
      item
      spacing={2}
      p={2}
    >
      <Grid item xs={12} md={6} lg={6}>
        <Text sx={{ ml: 1 }}>{t("field.game_instance")}</Text>
        <Autocomplete 
          required
          disabled={!roomId}
          options={gameInstance ?? []}
          getOptionLabel={(option) => option?.nick}
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

      <Grid item xs={12} md={6} lg={6}>
        <Text sx={{ ml: 1 }}>Templates</Text>
        <Autocomplete 
          required
          disabled={!data?.game_instance}
          options={templates ?? []}
          getOptionLabel={(option) => option.nick}
          onChange={(event, newValue) => {
            setData((state) => ({ ...state, template_id: newValue.id }))
          }}
        />
        {!roomId && (
          <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
          {t("messages.select_template").toUpperCase()}
          </Text>
        )}
      </Grid>

      <Grid item xs={6} md={6} lg={6}>
        <Text sx={{ ml: 1 }}>{t("field.date")}</Text>
        <PickerDate
          value={dateSelected}
          minDate={new Date()}
          size="medium"
          onChange={(newValue) => handleDate(newValue)}
        />
      </Grid>

      <Grid item xs={6} md={6} lg={6} >
    
        
      </Grid>

      <Grid item xs={12} md={6} lg={6} >
        <Text sx={{ ml: 1 }}>{t("field.date")}s</Text>
        <Autocomplete 
          multiple
          disabled={date?.length < 1}
          options={date ?? []}
          getOptionLabel={(option) => option || ''}
          onChange={(event, newValue) => {
              setDate(newValue)
          }}
        />
        {!roomId && (
          <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
            {t("messages.select_room").toUpperCase()}
          </Text>
        )}
      </Grid>
    </Grid>
  );
};

export default ModalAddDrawWithTemplates;