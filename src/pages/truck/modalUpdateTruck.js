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
import Text from "components/atoms/text/text";
import Progress from "components/atoms/progress/progress";

const ModalUpdateTruck = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    truckId
  }) => {

  const [fetch, setFetch] = useState(false);

  const [body, setBody] = useState([]);

  const [preview, setPreview] = useState('');

  const [progressPercent, setProgressPercent] = useState(0)

  const {
    data: truck,
    isValidating
  } = useGet(
    `truck/${truckId}`, 
    []
  );

  const {
    data: truckUpdate,
    error: errorTruckUpadate,
    isFetching
  } = useUpdate(
    `truck/${truckId}`, 
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
          mt={1}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        >
         <Grid 
            item 
            container 
            xs={12} 
            md={12} 
            lg={12} 
            mb={2}
            mr={2} 
            justifyContent={"center"}
          >
            <IconButton 
              color="info" 
              aria-label="upload picture" 
              component="label"
              sx={{ 
                background: "#8b8787",
                "&:hover": {
                  background: "#3333",
                }
              }}
            >
              <Avatar 
                alt="img" 
                sx={{ height: "100px", width: "100px" }} 
                src={
                  preview ? preview :
                  "https://i.pinimg.com/474x/a6/70/05/a67005e9bf90bc529088205650784bba.jpg"  
                }
              >
              </Avatar>
              <input hidden accept="image/*" type="file" onChange={handleChange} />
            </IconButton>
            {progressPercent > 0 && (
              <Progress
                progressPercent={progressPercent}
                setProgressPercent={setProgressPercent}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Modelo</Text>
            <Input
              required
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

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Marca</Text>
            <Input
              required
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

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Cor</Text>
            <Input
              required
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

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>KM</Text>
            <Input
              required
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

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Ano</Text>
            <Input
              required
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

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Button variant="return" onClick={() => onClose()}>
                Voltar
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Button type="submit" variant="contained" color="success">Confirmar</Button>
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
