import { Switch as MuiSwitch } from '@mui/material'

const Switch = ({ checked, onChange }) => {
  return <MuiSwitch checked={checked} onChange={onChange} />
}

export default Switch
