import { Link } from '@mui/material'

const BaseLink = ({ to, label, color, style }) => {
  return (
    <Link
      href={to}
      underline="none"
      color={color}
      sx={{ cursor: 'pointer' }}
      style={style}
    >
      {label}
    </Link>
  )
}

export default BaseLink
