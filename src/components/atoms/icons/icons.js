import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SvgIcon from "@mui/material/SvgIcon";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { FaUserEdit, FaUserMinus } from "react-icons/fa";
import { FiFileText } from "react-icons/fi"
import QrCodeIcon from '@mui/icons-material/QrCode';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CasinoIcon from '@mui/icons-material/Casino';
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { MdEditCalendar } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { VscDeviceMobile} from 'react-icons/vsc';
import { GrStatusGoodSmall } from "react-icons/gr";
import EditIcon from '@mui/icons-material/Edit';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PeopleIcon from '@mui/icons-material/People';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import HomeIcon from '@mui/icons-material/Home';
import { IoGameController } from "react-icons/io5";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PersonIcon from '@mui/icons-material/Person';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import { HiOutlineTemplate } from "react-icons/hi";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const IconReturn = (props) => {
  return (
    <SvgIcon {...props}>
      <ArrowBackIcon />
    </SvgIcon>
  );
};

export const IconTemplateDraw = (props) => {
  return (
    <SvgIcon {...props}>
      <HiOutlineTemplate />
    </SvgIcon>
  );
};

export const IconMenuHome = (props) => {
  return (
    <SvgIcon {...props}>
      <HomeIcon />
    </SvgIcon>
  );
};

export const IconMenuTransactions = (props) => {
  return (
    <SvgIcon {...props}>
      <PointOfSaleIcon />
    </SvgIcon>
  );
};

export const IconUser = () => {
  return <PersonIcon />;
};

export const IconAddUser = () => {
  return <PersonAddIcon />;
};

export const IconEditUser = () => {
  return (
    <SvgIcon>
      <FaUserEdit />
    </SvgIcon>
  );
};

export const IconDeleteUser = () => {
  return (
    <SvgIcon>
      <FaUserMinus />
    </SvgIcon>
  );
};

export const IconQrCode = () => {
  return (
    <SvgIcon>
      <QrCodeIcon />
    </SvgIcon>
  );
};

export const IconClose = (props) => {
  return (
    <SvgIcon {...props}>
      <CloseIcon />
    </SvgIcon>
  );
};

export const IconFileReport = (props) => {
  return (
    <SvgIcon {...props}>
      <FiFileText />
    </SvgIcon>
  );
};

export const IconRefresh = (props) => {
  return (
    <SvgIcon {...props}>
      <AutorenewIcon />
    </SvgIcon>
  );
};

export const IconHamburger = (props) => {
  return (
    <SvgIcon {...props}>
      <MenuIcon />
    </SvgIcon>
  );
};

export const IconArrowLeft = (props) => {
  return (
    <SvgIcon {...props}>
      <ChevronLeftIcon />
    </SvgIcon>
  );
};

export const IconTextFormatIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <TextFormatIcon />
    </SvgIcon>
  );
};

export const IconColorLensIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <ColorLensIcon />
    </SvgIcon>
  );
};

export const IconDelete = (props) => {
  return (
    <SvgIcon {...props}>
      <DeleteIcon />
    </SvgIcon>
  );
};

export const IconAdd = (props) => {
  return (
    <SvgIcon {...props}>
      <AddIcon />
    </SvgIcon>
  );
};

export const IconSettings = (props) => {
  return (
    <SvgIcon {...props}>
      <SettingsIcon />
    </SvgIcon>
  );
};

export const IconList = (props) => {
  return (
    <SvgIcon {...props}>
      <ListAltIcon />
    </SvgIcon>
  );
};

export const IconReportsList = (props) => {
  return (
    <SvgIcon {...props}>
      <IoIosListBox />
    </SvgIcon>
  );
};

export const IconDeposits = (props) => {
  return (
    <SvgIcon {...props}>
      <GiReceiveMoney />
    </SvgIcon>
  );
};

export const IconWithdraws = (props) => {
  return (
    <SvgIcon {...props}>
      <GiPayMoney />
    </SvgIcon>
  );
};

export const IconCasino = (props) => {
  return (
    <SvgIcon {...props}>
      <CasinoIcon />
    </SvgIcon>
  );
};

export const IconScheduled = (props) => {
  return (
    <SvgIcon {...props}>
      <MdEditCalendar />
    </SvgIcon>
  );
};

export const ExpandListIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <ReadMoreIcon />
    </SvgIcon>
  );
};

export const ArrowUpIcon  = (props) => {
  return (
    <SvgIcon {...props}>
      <KeyboardArrowUpIcon  />
    </SvgIcon>
  );
};

export const ArrowDownIcon  = (props) => {
  return (
    <SvgIcon {...props}>
      <KeyboardArrowDownIcon  />
    </SvgIcon>
  );
};

export const IconSellers  = (props) => {
  return (
    <SvgIcon {...props}>
      <PeopleIcon  />
    </SvgIcon>
  );
}

export const DeviceIcon  = (props) => {
  return (
    <SvgIcon {...props}>
      <VscDeviceMobile  />
    </SvgIcon>
  );
};

export const PointIcon  = (props) => {
  return (
    <SvgIcon {...props}>
      <GrStatusGoodSmall  color={props.color}/>
    </SvgIcon>
  );
};

export const IconEdit  = (props) => {
  return (
    <SvgIcon {...props}>
      <EditIcon/>
    </SvgIcon>
  );
};

export const IconScratchGames  = (props) => {
  return (
    <SvgIcon {...props}>
      <IoGameController/>
    </SvgIcon>
  );
};

export const IconSalespoint  = (props) => {
  return (
    <SvgIcon {...props}>
      <AddLocationAltIcon/>
    </SvgIcon>
  );
};

export const IconLine = (props) => {
  return (
    <SvgIcon {...props}>
      <AirlineStopsIcon/>
    </SvgIcon>
  );
};
