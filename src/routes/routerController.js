import { Route, Routes } from "react-router-dom";
import MainTemplate from "components/templates/main/main";
import Login from "pages/login/login";
import Home from "pages/home/home";
import Driver from "pages/driver/driver";
import RequireAuth from "utils/requireAuth";

const RouterController = () => {
  const initialPage = () => {
    return <Home />;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route element={<MainTemplate />}>
          <Route path="/" element={initialPage()} />
          <Route path="/home" element={<Home />} />
          <Route path="/driver" element={<Driver />} />
          {/* <Route path="/report" element={<ReportWithdraws />} /> */}
          {/* <Route path="/permission" element={<ReportHistoricScratchGames />} />
          <Route path="/conjuntos" element={<ReportSettingsScratchGames />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterController;
