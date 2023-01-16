import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreate } from "services/requests/useCreate";
import { errorNotification, successNotification } from "utils/notification";
import { formatMoney } from "utils/masks";
import { unmaskMoney } from "utils/unmaskMoney";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";

const ModalAddDriver = ({ showModal, setShowModal, mutate }) => {
  const { t } = useTranslation();

  const [body, setBody] = useState({});
  const [data, setData] = useState({});

  const [fetch, setFetch] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const {
    data: newDevice,
    error: errorNewDevice,
    isFetching,
  } = useCreate("driver/register", data, fetch, setFetch);

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (body?.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    setFetch(true);
    setPasswordError(false);
    setConfirmPassword("");
  };

  useEffect(() => {
    setData((state) => ({
      ...state,
      name: body?.name,
      name_user: body?.name_user,
      password: body?.password,
      percentage: body?.percentage ?? 0,
      daily: unmaskMoney(body?.daily ?? 0),
      value_fix: unmaskMoney(body?.value_fix ?? 0),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  useEffect(() => {
    if (newDevice || errorNewDevice) {
      mutate();
      onClose();
    }

    if (newDevice) {
      successNotification(t("messages.success_msg"));
    }

    if (errorNewDevice) {
      errorNotification(errorNewDevice?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDevice, errorNewDevice]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"600px"}
      maxHeight={"800px"}
    >
      <ContentHeader mt={2}>
        <Title>Cadastro Motorista</Title>
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <Input
              required
              label={"Nome Completo"}
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.name ?? ""}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              required
              label={"Nome de usuário"}
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.name_user ?? ""}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name_user: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              required
              label={"Senha"}
              type={showPassword ? "text" : "password"}
              onClick={() => setShowPassword(!showPassword)}
              isPassword
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              error={passwordError}
              helperText={passwordError ? "Senhas não conferem" : ""}
              value={body?.password ?? ""}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  password: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={"Confirmar Senha"}
              type={showConfirmPassword ? "text" : "password"}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              isPassword
              value={confirmPassword ?? ""}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              required
            />
          </Grid>

          <hr
            style={{
              border: "1px solid #000000",
              width: "97%",
              opacity: "0.5",
              margin: "25px 0px 16px 20px",
            }}
          />

          <Grid item xs={12} md={6} lg={6}>
            <Input
              required
              label={"Valor Diária"}
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={formatMoney(body?.daily)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  daily: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              required
              label={"Remuneração Fixa"}
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={formatMoney(body?.value_fix)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  value_fix: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Input
              required
              label={"Remuneração Porcentagem"}
              type={"number"}
              styles={{
                maxWidth: "274.1px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.percentage ?? 0}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  percentage: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={2}
            mt={2}
            justifyContent={"flex-end"}
          >
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                onClick={() => onClose()}
                background={"#fff"}
                sx={{
                  width: "140px",
                  height: "49px",
                  border: "1px solid #509BFB",
                  color: "#000000",
                }}
                variant="text"
              >
                CANCELAR
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                type="submit"
                color="success"
                background={
                  "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                }
                sx={{
                  fontSize: "14px",
                  color: "white",
                  width: "141px",
                  height: "49px",
                  marginRight: "15px",
                }}
              >
                CADASTRAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddDriver;
