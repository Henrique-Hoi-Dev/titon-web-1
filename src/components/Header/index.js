import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from './styles';

import backIcon from '../../assets/back.svg';
import logo from '../../assets/logo-logo.png';
import MouseOverPopover from '../MouseOverPopover';

function Header(props) {
  return (
    <PageHeader>
      <div className="header">
        <Link to="/dashboard">
          <img src={backIcon} alt="voltar" height="40px" />
        </Link>
        <div className='img'>
          <MouseOverPopover 
            children={<Link to={'/'}>
            <img src={logo} alt="voltar" height="100px" width="100px" /> 
          </Link>}
            text={"Voltar"}
          />
        </div>
      </div>

      <div className="header-content">
        <h2>{props.title}</h2>
      </div>
    </PageHeader>
  );
}

export default Header;
