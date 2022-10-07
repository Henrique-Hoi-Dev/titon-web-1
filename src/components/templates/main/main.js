import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { createContext, useState } from "react";

import Theme from "theme/theme";
import Content from "components/organisms/content/content";
import HeaderBar from "components/organisms/headerBar/headerBar";

export const templateContext = createContext({});

const MainTemplate = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={Theme(user)}>
      <templateContext.Provider value={{ Theme, openMenu, setOpenMenu }}>
        <Box>
          <HeaderBar />
          <Content />
        </Box>
      </templateContext.Provider>
    </ThemeProvider>
  );
};

export default MainTemplate;
