import { Grid, Typography } from "@mui/material";

const RoutleTitle = ({ route }) => {
  return (
    <>
      {route && (
        <Grid
          sx={{
            borderBottom: "2px solid #203247",
            width: "100%",
            padding: "5px",
          }}
        >
          <Typography color="#7294AE" variant="h4">
            {route}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default RoutleTitle;
