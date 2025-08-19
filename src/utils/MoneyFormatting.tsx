
export const MoneyFormatting = (data: number) => {
  return data.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}


