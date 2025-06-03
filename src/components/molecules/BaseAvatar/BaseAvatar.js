import { Avatar } from '@mui/material';
import preview from 'assets/preview.png';

const BaseAvatar = ({ uuid, styles, category }) => {
  const imagem = `https://titon-file-storage.s3.us-east-1.amazonaws.com/${category}/${uuid}`;

  return (
    <Avatar
      alt="avatar"
      sx={{
        ...styles
      }}
      src={category && uuid ? imagem : preview}
    />
  );
};

export default BaseAvatar;
