import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { startOfDay, endOfDay, format } from "date-fns";
import { formatMoney } from "utils/masks";
import { unmaskMoney } from "utils/unmaskMoney";
import Title from "components/atoms/title/title";
import Input from "components/atoms/input/input";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import PickerDateTime from "components/atoms/pickerDateTime/pickerDateTime";
import SelectWithInput from "components/molecules/selectWithInput/selectWithInput";
import useDebounce from "hooks/useDebounce";
import Table from "./table";

const ReportDeposits = () => {
  const { t } = useTranslation();
  // const { auth } = useContext(AuthContext);
  const [initialDate, setInitialDate] = useState(
    format(startOfDay(new Date()), "yyyy-MM-dd HH:mm")
  );
  const [finalDate, setFinalDate] = useState(
    format(endOfDay(new Date()), "yyyy-MM-dd HH:mm")
  );
  const [userId, setUserId] = useState("");
  const [value, setValue] = useState("")
  const [compareValue, setCompareValue] = useState(null)

  const debouncedValue = useDebounce(unmaskMoney(value));
  const debouncedUserId = useDebounce(userId);

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
    startDate: initialDate,
    finalDate: finalDate,
    userId: debouncedUserId,
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
      startDate: initialDate,
      finalDate: finalDate,
      userId: debouncedUserId,
      compareString: compareValue,
      value: debouncedValue
    }));
  }, [initialDate, finalDate, debouncedUserId, compareValue, debouncedValue]);

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
          <PickerDateTime
            label={t("field.initial_date")}
            value={initialDate}
            size="medium"
            onChange={(ev) => {
              setInitialDate(format(ev, "yyyy-MM-dd HH:mm"));
            }}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <PickerDateTime
            label={t("field.final_date")}
            size="medium"
            value={finalDate}
            onChange={(ev) => {
              setFinalDate(format(ev, "yyyy-MM-dd HH:mm"));
            }}
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
