
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportExpensesToPDF = (expenses) => {
  const doc = new jsPDF();
  doc.text('Baza Rachunków - Finexia BV', 14, 16);
  doc.autoTable({
    head: [['Projekt', 'Wydatek', 'Kwota (€)']],
    body: expenses.map(exp => [exp.project, exp.item, exp.amount.toFixed(2)]),
  });
  doc.save('rachunki_finexia.pdf');
};
