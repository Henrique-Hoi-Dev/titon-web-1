import React, { useEffect } from 'react';
import { Container } from './styles';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'base';
import { useSelector } from 'react-redux';

export default function AvatarInput(
  { 
    preview, 
    setPreview, 
    setProgressPercent 
  }) {

  const { avatar } = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (avatar) {
      setPreview(avatar);
    } else {
      setPreview('https://i.pinimg.com/474x/a6/70/05/a67005e9bf90bc529088205650784bba.jpg')
    }
  }, [avatar, setPreview]);

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
          setPreview(downloadURL)
        })
      }
    )
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview ??
            'https://i.pinimg.com/474x/a6/70/05/a67005e9bf90bc529088205650784bba.jpg'
          }
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          // data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
