import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardInfoValues = ({ value, title, colorstatus, colorvalue, backgroundstatus, styles }) => {
  return (
    <Card sx={{ 
      width: "200px!important", 
      height: "100px!important",
      backgroundColor: `${(backgroundstatus ? backgroundstatus : "white")}`,
    }}>
        <CardContent
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: "1.4rem",
              fontWeight: "bold", 
              whiteSpace: "nowrap",
              marginBottom: "5px",
              color: `${colorstatus}`,
              ...styles,
            }}>
              {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              fontWeight: "bold",
              whiteSpace: "nowrap",
              fontSize: "1.2rem",
              color: `${(colorvalue >= 0 && "green") || (colorvalue < 0 && "red")}`,
              ...styles,
            }}>
              {value || [0]}
          </Typography>
        </CardContent>
    </Card>
  );
};

export default CardInfoValues;