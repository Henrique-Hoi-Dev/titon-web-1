import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import BaseLink from '../BaseLink/BaseLink'

function handleClick(event) {
  event.preventDefault()
}

export default function BaseBreadcrumb({ links = [] }) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link) => (
          <BaseLink key={link.label} to={link.path} label={link.label} color="white" />
        ))}
      </Breadcrumbs>
    </div>
  )
}
