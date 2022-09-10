import React from 'react';

import { FaLinkedin, FaGithub, FaWhatsappSquare, FaTelegram } from "react-icons/fa";

import { Container } from './styles';

export default function Footer() {
  return (
    <Container>
      <div className="info">
        <div className="site">
          <a target="blank" href="https://github.com/Henrique-Hoi-Dev">
            <h4>Github <FaGithub /></h4>
          </a>
          <a target="blank" href="https://www.linkedin.com/in/henrique-hoinacki-a98b851a5/" >
            <h4>Linkedin <FaLinkedin /></h4> 
          </a>
        </div>
        <div className="contato">
          <h4>Whatsapp -- (46) 99119 - 5068  <FaWhatsappSquare /></h4> 
          <h4>Telegram -- (46) 99119 - 5068  <FaTelegram /></h4> 
        </div>
      </div>
      <footer>Projeto de Henrique Hoinacki 2021</footer>
    </Container>
  )
}