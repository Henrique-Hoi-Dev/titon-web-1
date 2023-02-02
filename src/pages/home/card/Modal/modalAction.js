import { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { successNotification, errorNotification } from "utils/notification";
import { useUpdate } from "services/requests/useUpdate";
import { useGet } from "services/requests/useGet";
import { moneyMask } from "utils/masks";
import { useSelector } from "react-redux";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";

const ModalAction = ({ showModal, setShowModal, mutate, checkId }) => {
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const [value, setValue] = useState(0);

  const user = useSelector((state) => state?.user);

  const status = [
    { value: "APPROVAL_PROCESS", label: "ANALISE", color: "#FFCE52" },
    { value: "APPROVED", label: "APROVADO", color: "#0BB07B" },
    { value: "DENIED", label: "NEGADO", color: "#F03D3D" },
    { value: "FINISHED", label: "FINALIZADO", color: "#86878A" },
  ];

  const getStatus = (res) => status.find((item) => item.value === res) ?? null;

  const { data: checks, isValidating } = useGet(`user/freight/${checkId}`, []);

  const { data, isFetching, error } = useUpdate(
    "user/freight",
    body,
    checkId,
    fetch,
    setFetch
  );

  const handleSubmitActive = (ev) => {
    ev.preventDefault();
    setBody({
      status: "approved",
      user_id: user.data.users.id,
      driver_id: 2,
    });
    setFetch(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      mutate();
      onClose();
      successNotification(data?.success?.responseData?.msg);
    } else if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.responseData?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Modal open={showModal} onClose={onClose} component="form" maxWidth="770px">
      <ContentHeader mt={2}>
        <Title>Informações Frete</Title>
      </ContentHeader>

      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text sx={{ color: "red" }}>
            {`Erro: ${error?.response?.data?.dataResult?.msg}`}
          </Text>
        </Grid>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ fontWeight: "700" }}
            label="Primeiro Check"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ fontWeight: "700" }}
            label="Segundo Check"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {!isFetching && !isValidating && (
          <Grid
            container
            item
            spacing={2}
            mt={1}
            sx={{ minHeight: "300px", justifyContent: "flex-start" }}
          >
            etapa 1
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {!isFetching && !isValidating && (
          <Grid
            container
            item
            spacing={2}
            mt={1}
            sx={{ minHeight: "300px", justifyContent: "flex-start" }}
          >
            etapa 2
          </Grid>
        )}
      </TabPanel>

      {isFetching && <Loading />}
      {isValidating && <Loading />}
    </Modal>
  );
};

export default ModalAction;
