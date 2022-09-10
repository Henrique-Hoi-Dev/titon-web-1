import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import { Link } from 'react-router-dom'
import { updateProfileRequest } from '../../store/modules/user/actions';
import { Container } from './styles';

import AvatarInput from './AvatarInput';
import Progress from 'components/progress/progress';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [progressPercent, setProgressPercent] = useState(0)
  const [preview, setPreview] = useState('');

  function handleSubmit(data) {
    dispatch(updateProfileRequest(preview, data, profile.id));
  }

  const cargos = [
    { id: 'COLABORADOR', title: 'Colaborador' },
    { id: 'DIRETOR', title: 'Diretor' },
    { id: 'GERENTE', title: 'Gerente' },
    { id: 'CEO', title: 'CEO' },
  ];

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <div className="avatar-update">
          <AvatarInput
            name="avatar_id"
            preview={preview}
            setPreview={setPreview}
            setProgressPercent={setProgressPercent}
          />
          {progressPercent > 0 && (
            <Progress
              progressPercent={progressPercent}
              setProgressPercent={setProgressPercent}
            />
          )}
          <button type="submit">Salvar Imagem</button>
        </div>

        <h2>Informações básicas</h2>
        <Input name="name" placeholder="Seu nome completo" />
        <Input name="email" placeholder="Seu endereço e-mail" />
        <Input name="cpf" placeholder="CPF" />
        <Input
          type="date"
          name="date_birth"
          placeholder="Data de Nacimento"
        />
        <Select name="company_position" options={cargos} placeholder="Cargos" />
        <hr />
        <h2>Nova senha</h2>
        <Input type="password" name="oldPassword" placeholder="Senha" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme nova senha"
        />
        <hr />
        <div className="but">
          <button type="submit">Atualizar perfil</button>
          <button type="button">
            <Link to={`/adress/${profile.id}`}> 
              Adicionar endereço
            </Link>
          </button>
        </div>
        
      </Form>
    </Container>
  );
}
