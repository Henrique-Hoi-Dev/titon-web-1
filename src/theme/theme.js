import { createTheme } from "@mui/material";

const Theme = (auth) => {
  
  return createTheme({
    palette: {
      neutral: {
        backgroundColor: "#34495E",
        color:  "#ffffff"
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "return" },
            style: {
              backgroundColor: `${auth?.skin?.button_return?.background_color ?? "#DDDDDD"}`,
              color: `${auth?.skin?.button_return?.color ?? "black"}`,
              ":hover": {
                backgroundColor: `${auth?.skin?.button_return?.background_color ?? "#DDDDDD"}`,
                opacity: 0.8,
              },
            },
          },
          {
            props: { variant: "default" },
            style: {
              backgroundColor: `${auth?.skin?.button_default?.background_color ?? "#34495E"}`,
              color: `${auth?.skin?.button_default?.color ?? "white"}`,
              ":hover": {
                backgroundColor: `${auth?.skin?.button_default?.background_color ?? "#34495E"}`,
                opacity: 0.8,
              },
            },
          },
          {
            props: { variant: "edit" },
            style: {
              backgroundColor: "#626EDF",
              color: "white",
              ":hover": {
                backgroundColor: "#626EDF",
                opacity: 0.8,
              },
            },
          },
          {
            props: { variant: "delete" },
            style: {
              backgroundColor: "#D01A24",
              color: "white",
              ":hover": {
                backgroundColor: "#D01A24",
                opacity: 0.8,
              },
            },
          },
        ],
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: `${auth?.skin?.sidebar?.background_color ?? "#f1f5f9"}`,
          },
        },
      },
    },
  });
};

export default Theme;
