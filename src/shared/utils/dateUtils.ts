export function formatDate(date: string | Date): string {
  let parsedDate: Date;

  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number);
    parsedDate = new Date(year, month - 1, day);
  } else {
    throw new Error('Valor inválido fornecido para formatação de data');
  }

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Data inválida após conversão');
  }

  return parsedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
