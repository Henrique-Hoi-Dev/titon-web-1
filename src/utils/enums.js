const typeCart = [
  { value: 'TANK', label: 'Tanque' },
  { value: 'BULKCARRIER', label: 'Graneleiro' },
  { value: 'SIDER', label: 'Sider' },
  { value: 'CHEST', label: 'Baú' },
  { value: 'BUCKET', label: 'Caçamba' },
]

const typeBodywork = [
  { value: 'BUCKET', label: 'Caçanba' },
  { value: 'BULKCARRIER', label: 'Graneleiro' },
  { value: 'SIDER', label: 'Sider' },
  { value: 'CHEST', label: 'Bau' },
  { value: 'TANK', label: 'Tanque' },
]

const columnsTableBank = [
  { id: 'typeTransactions', label: 'Motivo', minWidth: 170 },
  { id: 'value', label: 'Valor', minWidth: 140 },
  {
    id: 'type',
    label: 'Tipo',
    minWidth: 100,
  },
  { id: 'date', label: 'Data', minWidth: 170, align: 'right' },
]

const statusFreight = [
  { value: 'PENDING', label: 'Em processo', color: 'green' },
  { value: 'approved', label: 'Aprovado', color: '#1976d2' },
  { value: 'denied', label: 'Negado', color: 'red' },
  { value: 'finished', label: 'Finalizado', color: 'grey' },
]

const typeUser = [
  { value: 'MASTER', label: 'Master' },
  { value: 'DIRECTOR', label: 'Diretor' },
  { value: 'MANAGER', label: 'Gerente' },
  { value: 'COLLABORATOR', label: 'Colaborador' },
]

const typeFinancial = [
  { value: 'INCOME', label: 'Receita' },
  { value: 'EXPENSE', label: 'Despesa' },
]

const statusFinancial = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'PAID', label: 'Pago' },
  { value: 'OVERDUE', label: 'Atrasado' },
]

const enums = {
  typeCart,
  typeBodywork,
  columnsTableBank,
  statusFreight,
  typeUser,
  typeFinancial,
  statusFinancial,
}

export default enums
