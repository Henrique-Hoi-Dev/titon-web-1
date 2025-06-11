import { Avatar } from '@mui/material'
import preview from 'assets/preview.png'

const BaseAvatar = ({ src = {}, uuid, styles, category }) => {
  let srcImage = ''
  if (Object?.entries(src).length === 0) {
    srcImage = preview
  } else {
    srcImage = src
  }

  const imagem = `https://titon-file-storage.s3.us-east-1.amazonaws.com/${category}/${uuid}`

  return (
    <>
      {category && uuid ? (
        <Avatar
          alt="avatar"
          sx={{
            ...styles,
          }}
          src={category && uuid ? imagem : preview}
        />
      ) : (
        <Avatar alt="avatar" sx={{ ...styles }} src={srcImage} />
      )}
    </>
  )
}

export default BaseAvatar
