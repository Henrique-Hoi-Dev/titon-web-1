import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Theme from "theme/theme";
import Content from "components/organisms/content/content";
import HeaderBar from "components/organisms/headerBar/headerBar";
import Menu from "components/organisms/menu/menu";
import { createContext, useState } from "react";
export const templateContext = createContext({});

const MainTemplate = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={Theme(user)}>
      <templateContext.Provider value={{ Theme, openMenu, setOpenMenu }}>
        <Box>
          <HeaderBar />
          <Menu />
          <Content />
        </Box>
      </templateContext.Provider>
    </ThemeProvider>
  );
};

export default MainTemplate;
