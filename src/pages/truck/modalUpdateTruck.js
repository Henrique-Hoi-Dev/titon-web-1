import React, { useEffect, useState } from "react";
import { Avatar, Grid, IconButton } from "@mui/material";
import { errorNotification, successNotification } from "utils/notification";
import { useGet } from "services/requests/useGet";
import { useUpdate } from "services/requests/useUpdate";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'base';

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Progress from "components/atoms/progress/progress";

const ModalUpdateTruck = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    props
  }) => {

  const [fetch, setFetch] = useState(false);

  const [body, setBody] = useState([]);

  const [preview, setPreview] = useState('');

  const [progressPercent, setProgressPercent] = useState(0)

  const {
    data: truck,
    isValidating
  } = useGet(
    `user/truck/${props.id}`, 
    []
  );

  const {
    data: truckUpdate,
    error: errorTruckUpadate,
    isFetching
  } = useUpdate(
    `user/truck/${props.id}`, 
    body, 
    "",
    fetch, 
    setFetch
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
    setBody({})
  };

  useEffect(() => {
    if (preview) {
      setBody((state) => ({
        ...state,
        truck_avatar: preview
      }))
    }
  }, [preview]);

  useEffect(() => {
    setBody((state) => ({
      ...state,
      truck_models: truck?.dataResult?.truck_models,
      truck_name_brand: truck?.dataResult?.truck_name_brand,
      truck_color: truck?.dataResult?.truck_color,
      truck_km: truck?.dataResult?.truck_km,
      truck_year: truck?.dataResult?.truck_year,
    }))

    setPreview(truck?.dataResult?.truck_avatar)
  }, [truck]);

  useEffect(() => {
    if (truckUpdate) {
      mutate();
      onClose();
      successNotification();
    }

    if(errorTruckUpadate){
      errorNotification(errorTruckUpadate?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [truckUpdate, errorTruckUpadate]);

  async function handleChange(e) {
    const file = e.target.files[0]

    if (!file) return null;
    const storageRef = ref(storage, `avatar/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgressPercent(progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        // e.target[0].value = ''
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("avatar", downloadURL)
          setPreview(downloadURL)
        })
      }
    )
  }

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"600px"}
    >
      <ContentHeader>
        <Title>Editar Caminhão</Title>
      </ContentHeader>

      {!isFetching && !isValidating && (
        <Grid
          container
          item
          spacing={2}
        >

          <Grid
            container
            item
            spacing={2}
            justifyContent="flex-start"
            flexWrap={"nowrap"}
            mr={3}
            lg={12}
            md={12}
            xs={12}
          > 
            <Grid 
              item 
              container 
              xs={6} 
              md={6} 
              lg={6} 
              mb={2}
              mr={2} 
              justifyContent={"center"}
              sx={{ 
                cursor: "pointer",
                "&:hover": {
                  cursor: "pointer"
                }
              }}
            >
              <IconButton 
                color="info" 
                aria-label="upload picture"
                
                component="label"
                sx={{ 
                  background: "transparent",
                  "&:hover": {
                    background: "transparent",
                  }
                }}
              >
                <input hidden accept="image/*" type="file" onChange={handleChange} />
                <Avatar 
                  variant="square"
                  alt="img" 
                  sx={{ height: "auto", width: "280px", borderRadius: "8px"}} 
                  src={
                    preview ? preview :
                    "https://i.pinimg.com/474x/a6/70/05/a67005e9bf90bc529088205650784bba.jpg"  
                  }
                >
                </Avatar>
              </IconButton>
              {progressPercent > 0 && (
                <Progress
                  progressPercent={progressPercent}
                  setProgressPercent={setProgressPercent}
                />
              )}
            </Grid>

            <Grid container item xs={6} md={6} lg={6} spacing={1.5}>
              <Grid item xs={12} md={12} lg={12}>
                <Input
                  required
                  label={"Modelo"}
                  styles={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "1.4rem",
                    },
                  }}
                  value={body?.truck_models ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_models: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Input
                  required
                  label={"Marca"}
                  styles={{
                    maxWidth: "274px",
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "1.4rem",
                    },
                  }}
                  value={body?.truck_name_brand ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_name_brand: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Input
                  required
                  label={"Cor"}
                  styles={{
                    maxWidth: "274px",
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "1.4rem",
                    },
                  }}
                  value={body?.truck_color ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_color: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Input
                  required
                  label={"KM"}
                  styles={{
                    maxWidth: "274px",
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "1.4rem",
                    },
                  }}
                  value={body?.truck_km ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_km: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Input
                  required
                  label={"Ano Fabricação"}
                  styles={{
                    maxWidth: "274px",
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "1.4rem",
                    },
                  }}
                  value={body?.truck_year ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_year: ev.target.value,
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid 
            container 
            item 
            xs={12} 
            md={12} 
            lg={12} 
            spacing={1} 
            mt={0.3}
            justifyContent={"flex-end"}
          >
            <Grid container item xs={12} md={3} lg={3}>
              <Button 
                onClick={() => onClose()}
                background={"#fff"}
                sx={{ width: "140px", height: "49px", border: "1px solid #509BFB", color: "#000000" }}
                variant="text"
              >
                CANCELAR
              </Button>              
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button 
                type="submit" 
                color="success"
                background={"linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"}
                sx={{
                  fontSize: "14px",
                  color: "white",
                  width: "139px",
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

      {isFetching && <Loading/>}
      {isValidating && <Loading/>}
    </Modal>
  );
};

export default ModalUpdateTruck;
