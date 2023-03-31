import Button from "components/atoms/button/button";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { IconAdd } from "components/atoms/icons/icons";
import { InputSearches } from "components/atoms/input/inputSearches/input";

export const Check = () => {
  const [showModalChck, setShowModalCheck] = useState();
  const [checkQuery, setCheckQuery] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckQuery((state) => ({
        ...state,
        search: search,
      }));
    }, 1200);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Grid
      container
      justifyContent="center"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <Grid item container pl={2} mr={4} mt={-6.5} justifyContent={"flex-end"}>
        <Button
          onClick={() => setShowModalCheck(true)}
          background={
            "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
          }
          fontsize={"12px"}
          sx={{
            color: "white",
            width: "248px",
            height: "40px",
            marginRight: "15px",
          }}
        >
          Adicionar modelo Checklist <IconAdd sx={{ mt: -0.7 }} />
        </Button>
        <InputSearches
          searches
          searchesType={"searches"}
          styles={{ minWidth: "350px" }}
          placeholder={"Modelo"}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>
    </Grid>
  );
};
