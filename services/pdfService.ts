
// This function relies on jsPDF being loaded from a CDN.
// The jsPDF constructor will be available on the global window object.

import { Language } from "../types";

const pdfStrings = {
  en: {
    title: "This Awesome Coloring Book",
    belongsTo: "Belongs To:",
    enjoy: "Have fun coloring!",
  },
  es: {
    title: "Este Increíble Libro de Colorear",
    belongsTo: "Pertenece a:",
    enjoy: "¡Diviértete coloreando!",
  },
};

export const createColoringBookPdf = async (
  jsPDF: any,
  coverImage: string,
  pages: string[],
  theme: string,
  name: string,
  lang: Language
): Promise<void> => {
  return new Promise((resolve) => {
    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const currentStrings = pdfStrings[lang];

    // --- Start: Add special 'Color Me!' personalization page ---
    pdf.setFontSize(28);
    pdf.text(currentStrings.title, pageWidth / 2, 40, { align: 'center' });
    pdf.text(currentStrings.belongsTo, pageWidth / 2, 55, { align: 'center' });

    // Draw a fun, decorative box for the name
    const boxWidth = 160;
    const boxHeight = 60;
    const boxX = (pageWidth - boxWidth) / 2;
    const boxY = 80;
    pdf.setLineWidth(0.8);
    pdf.setDrawColor(100, 100, 100); // A medium grey for the box outline
    pdf.roundedRect(boxX, boxY, boxWidth, boxHeight, 5, 5, 'S'); // 'S' for stroke

    // Add the child's name in a large, friendly font that can be colored in
    pdf.setFontSize(60);
    pdf.text(name, pageWidth / 2, 120, { align: 'center' });
    
    pdf.setFontSize(20);
    pdf.text(currentStrings.enjoy, pageWidth / 2, 170, { align: 'center' });
    // --- End: Add special 'Color Me!' personalization page ---


    // Themed Cover Page (now the second page)
    pdf.addPage();
    const margin = 15;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = imgWidth * (4 / 3); // Maintain 3:4 aspect ratio from image generation
    const yMargin = (pageHeight - imgHeight) / 2; // Center vertically for a clean look

    pdf.addImage(coverImage, 'JPEG', margin, yMargin, imgWidth, imgHeight);

    // Add coloring pages
    pages.forEach(page => {
      pdf.addPage();
      pdf.addImage(page, 'JPEG', margin, yMargin, imgWidth, imgHeight);
    });

    // Sanitize filename for download
    const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const safeTheme = theme.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    pdf.save(`${safeName}_${safeTheme}_coloring_book.pdf`);
    resolve();
  });
};
