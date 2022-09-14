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
import useDebounce from "hooks/useDebounce";
import SelectWithInput from "components/molecules/selectWithInput/selectWithInput";
import Table from "./table";

const ReportHistoricScratchGames = () => {
  const { t } = useTranslation();
  const [initialDate, setInitialDate] = useState(
    format(startOfDay(new Date()), "yyyy-MM-dd HH:mm")
  );
  const [finalDate, setFinalDate] = useState(
    format(endOfDay(new Date()), "yyyy-MM-dd HH:mm")
  );
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [idInstance, setIdInstance] = useState("");
  const [gameCounterValue, setGameCounterValue] = useState(null)
  const [compareGameCounter, setCompareGameCounter] = useState(null)
  const [bet, setBet] = useState("")
  const [compareBet, setCompareBet] = useState(null)
  const [denom, setDenom] = useState(null)
  const [compareDenom, setCompareDenom] = useState(null)
  const [cashTotalWin, setCashTotalWin] = useState("")
  const [compareTotalWin, setCompareTotalWin] = useState(null)
  const [cashTotalSpent, setCashTotalSpent] = useState("")
  const [compareTotalSpent, setCompareTotalSpent] = useState(null)
  const [balance, setBalance] = useState("")
  const [compareBalance, setCompareBalance] = useState(null)

  const debouncedGameCounterValue = useDebounce(gameCounterValue);
  const debouncedBet = useDebounce(unmaskMoney(bet));
  const debouncedDenom = useDebounce(denom);
  const debouncedCashTotalWin = useDebounce(unmaskMoney(cashTotalWin));
  const debouncedCashTotalSpent = useDebounce(unmaskMoney(cashTotalSpent));
  const debouncedBalance = useDebounce(unmaskMoney(balance));

  const compareString = [
    { value: "EQ", label: "=" },
    { value: "GT", label: ">" },
    { value: "LT", label: "<" }
  ]

  const INITIAL_STATE_SCRATCHGAMES = {
    limit: 25,
    page: 1,
    sort_field: "",
    sort_order: "ASC",
    startDate: initialDate,
    finishDate: finalDate,
    bet: debouncedBet,
    compareStringBet: compareBet,
    compareStringGameCounter: compareGameCounter,
    gameCounter: null,
    compareStringDenom: compareDenom,
    denom: debouncedDenom,
    compareStringCashTotalWin: compareTotalWin,
    cashTotalWin: debouncedCashTotalWin,
    compareStringCashTotalSpent: compareTotalSpent,
    cashTotalSpent: debouncedCashTotalSpent,
    compareStringBalance: compareBalance,
    balance: debouncedBalance
  };

  const [scratchGamesQuery, setScratchGamesQuery] = useState(INITIAL_STATE_SCRATCHGAMES);

  useEffect(() => {
    setScratchGamesQuery((state) => ({
      ...state,
      startDate: initialDate,
      finishDate: finalDate,
      compareStringBet: compareBet,
      bet: debouncedBet,
      compareStringGameCounter: compareGameCounter,
      gameCounter: debouncedGameCounterValue,
      compareStringDenom: compareDenom,
      denom: debouncedDenom,
      compareStringCashTotalWin: compareTotalWin,
      cashTotalWin: debouncedCashTotalWin,
      compareStringCashTotalSpent: compareTotalSpent,
      cashTotalSpent: debouncedCashTotalSpent,
      compareStringBalance: compareBalance,
      balance: debouncedBalance
    }));
  }, [
    initialDate, 
    finalDate, 
    compareGameCounter, 
    debouncedGameCounterValue, 
    compareBet, 
    debouncedBet, 
    compareDenom, 
    debouncedDenom, 
    compareTotalWin, 
    debouncedCashTotalWin, 
    compareTotalSpent, 
    debouncedCashTotalSpent, 
    compareBalance, 
    debouncedBalance
  ]);

  const {
    data: scratchGames,
    // error: scratchGamesError,
    isFetching: scratchGamesIsFetching,
    mutate
  } = useGet("report/scratchhistory", scratchGamesQuery);

  return (
    <Grid
      container
      justifyContent="flex-end"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <ContentHeader>
        <Title>{t("menu.historic") + " " + t("menu.scratch_games")}</Title>
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
        <SelectWithInput
          selectValue={compareGameCounter}
          setSelectValue={setCompareGameCounter}
          options={compareString}
          inputValue={gameCounterValue}
          setInputValue={setGameCounterValue}
          placeholder={t("field.game_counter")}
        />

        <SelectWithInput
          selectValue={compareBet}
          setSelectValue={setCompareBet}
          options={compareString}
          inputValue={formatMoney(bet)}
          setInputValue={setBet}
          placeholder={t("field.bet")}
        />

        <SelectWithInput
          selectValue={compareDenom}
          setSelectValue={setCompareDenom}
          options={compareString}
          inputValue={denom}
          setInputValue={setDenom}
          placeholder={t("field.denominator")}
        />

        <SelectWithInput
          selectValue={compareTotalWin}
          setSelectValue={setCompareTotalWin}
          options={compareString}
          inputValue={formatMoney(cashTotalWin)}
          setInputValue={setCashTotalWin}
          placeholder={t("field.total_win")}
        />

        <SelectWithInput
          selectValue={compareTotalSpent}
          setSelectValue={setCompareTotalSpent}
          options={compareString}
          inputValue={formatMoney(cashTotalSpent)}
          setInputValue={setCashTotalSpent}
          placeholder={t("field.total_spent")}
        />

        <SelectWithInput
          selectValue={compareBalance}
          setSelectValue={setCompareBalance}
          options={compareString}
          inputValue={formatMoney(balance)}
          setInputValue={setBalance}
          placeholder={t("field.balance")}
        />

        <Grid item xs={12} md={4} lg={4}>
          <Input
            placeholder={"ID"}
            type="text"
            styles={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                height: "2.4rem",
              },
            }}
            value={id}
            onChange={(ev) => setId(ev.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
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
        <Grid item xs={12} md={4} lg={4}>
          <Input
            placeholder={"ID " + t("field.game_instance")}
            type="text"
            styles={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                height: "2.4rem",
              },
            }}
            value={idInstance}
            onChange={(ev) => setIdInstance(ev.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <PickerDateTime
            label={t("field.initial_date")}
            value={initialDate}
            size="medium"
            onChange={(ev) => {
              setInitialDate(format(ev, "yyyy-MM-dd HH:mm"));
            }}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
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
          data={scratchGames}
          query={scratchGamesQuery}
          setQuery={setScratchGamesQuery}
          isValidating={scratchGamesIsFetching}
          mutate={mutate}
        />
      </Grid>
    </Grid>
  );
};

export default ReportHistoricScratchGames;
