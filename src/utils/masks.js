export const moneyMask = (value) => {
  if (value) {
    value = value/100
    const result = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2
    }).format(value);

    if (value == null || result === 0 || result === "NaN") return "R$ 0,00";

    if (result) {
      return "R$ " + result;
    } else {
      return "R$ 0,00";
    }
  }
};

export const maskCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  return cpf;
};

export const formatMoney = (value) => {
  value = value?.replace(".", "").replace(",", "").replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const result =
    new Intl.NumberFormat("pt-BR", options).format(parseFloat(value) / 100) ||
    0;
  if (result === 0 || result === "NaN") return "R$ 0,00";

  if (result) {
    return "R$ " + result;
  } else {
    return "R$ 0,00";
  }
};
