import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@material-ui/icons';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'base';

export default function AvatarInput({ setProgressPercent, setImgProduct }) {
  const [preview, setPreview] = useState([]);
  const [data, setData] = useState([])

  const fileUrls = []
  const total = fileUrls.concat(...data)

  useEffect(() => {
    setData((state) => [...state, preview] ?? [])
    setImgProduct(total)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, setImgProduct]);

  useEffect(() => {
    setImgProduct(total)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setImgProduct, data]);

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
          console.log(downloadURL)
          setPreview([{ img: downloadURL}])
        })
      }
    )
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" onChange={handleChange}/>
          <PhotoCamera />
        </IconButton>
      </label>
    </Container>
  );
}
