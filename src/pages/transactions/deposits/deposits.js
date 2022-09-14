import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { startOfDay } from "date-fns";
import { formatMoney } from "utils/masks";
import { unmaskMoney } from "utils/unmaskMoney";
import { formatDatePicker } from "utils/formatDate";

import Title from "components/atoms/title/title";
import Input from "components/atoms/input/input";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import SelectWithInput from "components/molecules/selectWithInput/selectWithInput";
import useDebounce from "hooks/useDebounce";
import Table from "./table";
import PickerDate from "components/atoms/pickerDate/pickerDate";

const ReportDeposits = () => {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [userId, setUserId] = useState(null);
  const [value, setValue] = useState("")
  const [compareValue, setCompareValue] = useState(null)

  const debouncedValue = useDebounce(unmaskMoney(value));

  const compareString = [
    { value: "EQ", label: "=" },
    { value: "GT", label: ">" },
    { value: "LT", label: "<" }
  ]
  
  const INITIAL_STATE_DEPOSIT = {
    limit: 25,
    page: 1,
    sort_field: "",
    sort_order: "ASC",
    startDate: formatDatePicker(new Date(), true) && null,
    finalDate: formatDatePicker(new Date(), true) && null,
    userId: userId,
    compareString: "EQ",
    value: debouncedValue
  };

  const [depositQuery, setDepositQuery] = useState(INITIAL_STATE_DEPOSIT);

  const {
    data: deposits,
    error: depositsError,
    isFetching: depositsIsFetching,
    loading, 
    mutate,
  } = useGet("report/deposit", depositQuery);

  useEffect(() => {
    setDepositQuery((state) => ({
      ...state,
      userId: userId,
      compareString: compareValue,
      value: debouncedValue
    }));
  }, [userId, compareValue, debouncedValue]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setDepositQuery((state) => ({
      ...state,
      startDate: formatDatePicker(startOfDay(newValue), true),
    }));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    setDepositQuery((state) => ({
      ...state,
      endDate: formatDatePicker(startOfDay(newValue), true),
    }));
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <ContentHeader>
        <Title>{t("menu.reports") + " " + t("menu.deposits")}</Title>
      </ContentHeader>

      <Grid
        item
        container
        spacing={2}
        mt={1}
        mb={1}
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        <Grid item xs={12} md={3} lg={3}>
          <Input
            placeholder={"ID " + t("field.user")}
            type="text"
            styles={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                height: "2.4rem",
              },
            }}
            value={userId}
            onChange={(ev) => setUserId(ev.target.value)}
          />
        </Grid>

        <SelectWithInput
          selectValue={compareValue}
          setSelectValue={setCompareValue}
          options={compareString}
          inputValue={formatMoney(value)}
          setInputValue={setValue}
          placeholder={t("field.value")}
          xs={12}
          md={3}
          lg={3} 
        />

        <Grid item xs={12} md={3} lg={3}>
          <PickerDate
            label={t("field.initial_date")}
            value={startDate}
            minDate={new Date()}
            size="medium"
            onChange={(newValue) => handleStartDateChange(newValue)}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <PickerDate
            label={t("field.final_date")}
            minDate={startDate}
            value={endDate}
            size="medium"
            onChange={(newValue) => handleEndDateChange(newValue)}
          />
        </Grid>
      </Grid>

      <Grid item container pl={2} mt={1}>
        <Table
          data={deposits}
          query={depositQuery}
          setQuery={setDepositQuery}
          isValidating={depositsIsFetching}
          error={depositsError}
          loading={loading}
          mutate={mutate}
        />
      </Grid>
    </Grid>
  );
};

export default ReportDeposits;
