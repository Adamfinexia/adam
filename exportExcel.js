
import * as XLSX from 'xlsx';

export const exportExpensesToExcel = (expenses) => {
  const worksheet = XLSX.utils.json_to_sheet(expenses.map(exp => ({
    Projekt: exp.project,
    Wydatek: exp.item,
    'Kwota (€)': exp.amount.toFixed(2)
  })));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Rachunki');
  XLSX.writeFile(workbook, 'rachunki_finexia.xlsx');
};
