import { Route, Routes } from "react-router-dom";
import MainTemplate from "components/templates/main/main";
import Login from "pages/login/login";
import Home from "pages/home/home";
import ScheduledDraw from "pages/speedball90/scheduledDraw/scheduledDraw";
import TampleteScheduledDraw from "pages/speedball90/scheduledDraw/tampleteScheduledDraw/tampleteScheduledDraw";
import ReportDeposits from "pages/transactions/deposits/deposits";
import RequireAuth from "utils/requireAuth";
import ReportWithdraws from "pages/transactions/withdraws/withdraws";
import ReportHistoricScratchGames from "pages/scratchGames/historic/historicScratchGames";
import ReportSettingsScratchGames from "pages/scratchGames/config/settingsScratchGames";
import ReportClosedBoxesSpeedBall90 from "pages/speedball90/reports/closedBoxes/closedBoxesSpeedBall90";
import ReportOpenBoxesSpeedBall90 from "pages/speedball90/reports/openBoxes/openBoxesSpeedBall90";
import ReportDrawSpeedBall90 from "pages/speedball90/reports/drawReport/drawReportSpeedBall90";
import ReportSellerSpeedBall90 from "pages/speedball90/reports/sellerReport/sellerReportSpeedBall90";
import ReportCollectorSpeedBall90 from "pages/speedball90/reports/collectorReport/collectorReportSpeedBall90";
import Sellers from "pages/speedball90/seller/seller";
import Line from "pages/speedball90/line/line";
import Device from "pages/speedball90/device/device";
import Salespoint from "pages/speedball90/salespoint/salespoint";
import Collector from "pages/speedball90/collector/collector";

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
          <Route path="/reports-deposits" element={<ReportDeposits />} />
          <Route path="/reports-withdraws" element={<ReportWithdraws />} />
          <Route path="/reports/historic-scratch-games" element={<ReportHistoricScratchGames />} />
          <Route path="/reports/settings-scratch-games" element={<ReportSettingsScratchGames />} />
          <Route path="/bingo/reports/draw-speedball90" element={<ReportDrawSpeedBall90 />} />
          <Route path="/bingo/reports/sellers-speedball90" element={<ReportSellerSpeedBall90 />} />
          <Route path="/bingo/reports/collector-speedball90" element={<ReportCollectorSpeedBall90 />} />
          <Route path="/bingo/reports/closedboxes-speedball90" element={<ReportClosedBoxesSpeedBall90 />} />
          <Route path="/bingo/reports/openboxes-speedball90" element={<ReportOpenBoxesSpeedBall90 />} />
          <Route path="/bingo/scheduled-draw" element={<ScheduledDraw />} />
          <Route path="/bingo/scheduled-draw/template" element={<TampleteScheduledDraw />} />
          <Route path="/bingo/sellers" element={<Sellers />} />
          <Route path="/bingo/line" element={<Line />} />
          <Route path="/bingo/device" element={<Device />} />
          <Route path="/bingo/salespoint" element={<Salespoint />} />
          <Route path="/bingo/collector" element={<Collector />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouterController;
