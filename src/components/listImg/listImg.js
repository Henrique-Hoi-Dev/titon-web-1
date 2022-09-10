import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteIcon from '@mui/icons-material/Delete';

// import { useMediaQuery } from "react-responsive";

export default function ListImg({ itemData, setDeleteId, setTotalImagensPreview}) {
  // const isDesktop = useMediaQuery({ maxWidth: "700px" });

  const handleDelete = (ev, id) => {
    ev.preventDefault();
    setTotalImagensPreview((res) => res?.filter((_, index) => index !== id));
    setDeleteId(true)
  };

  return (   
    <>
      <h2 
        style={{ 
          color: "#9c98a6", 
          textShadow: "0px 4px 4px rgb(0 0 0 / 50%)", 
          font: "700 1.4rem Archivo", 
          marginBottom: "15px"
        }}
      >
        Lista imagens produtos
      </h2>

      <ImageList 
        sx={{ width: 500, height: 240, display: "flex", justifyContent: "center" }} 
        cols={3} 
        rowHeight={140} 
      >
        {itemData?.map((item, i) => (
          <ImageListItem key={i} sx={{ marginTop: "25px" }}>
            <DeleteIcon
              onClick={(ev) => handleDelete(ev, i) }
              sx={{ 
                zIndex: 1, 
                fontSize: "35px", 
                margin: "0 0px -20px 0px!important", 
                backgroundColor: "transparent!important",
                color: "red"
              }}
            />
            <img
              style={{ borderRadius: "8px", height: "150px", width: "140px", margin: "2px" }}
              src={`${item.img}?w=140&h=140&fit=crop&auto=format`}
              srcSet={`${item.img}?w=140&h=140&fit=crop&auto=format&dpr=2 2x`}
              alt={"img"}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>    
    </>
  );
}
