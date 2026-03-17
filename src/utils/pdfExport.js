// src/utils/pdfExport.js
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Fungsi untuk export schedule ke PDF
export const exportScheduleToPDF = (schedule) => {
  try {
    console.log('Starting PDF generation...');
    const doc = new jsPDF();
    console.log('jsPDF initialized');

    // === COLOR PALETTE (Dark Theme) ===
    const colors = {
      background: [15, 23, 42], // slate-900
      backgroundAlt: [30, 41, 59], // slate-800
      cardBg: [15, 23, 42], // slate-900
      border: [51, 65, 85], // slate-700
      primary: [250, 204, 21], // yellow-400
      textPrimary: [255, 255, 255], // white
      textSecondary: [148, 163, 184], // slate-400
    };

    // Helper function untuk draw background di setiap halaman
    const drawPageBackground = () => {
      doc.setFillColor(...colors.background);
      doc.rect(0, 0, 210, 297, 'F');
    };

    // Helper function untuk draw header
    const drawHeader = () => {
      // POWA Title
      doc.setFontSize(36);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors.primary);
      doc.text('POWA', 105, 20, { align: 'center' });

      // Tagline
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textSecondary);
      doc.text('Stronger every week.', 105, 28, { align: 'center' });

      // Decorative line
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.line(20, 32, 190, 32);
    };

    // === PAGE 1 - HEADER ===
    drawPageBackground();
    drawHeader();

    // 1RM Info Box
    doc.setFillColor(...colors.cardBg);
    doc.setDrawColor(...colors.border);
    doc.roundedRect(15, 38, 180, 14, 2, 2, 'FD');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textSecondary);
    doc.text('1RM INFO', 20, 44);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.textPrimary);
    doc.setFontSize(11);
    doc.text(
      `${schedule.data[0]?.sets[0] ? schedule.movement.toUpperCase() : 'MOVEMENT'} - ${schedule.orm}kg`,
      20,
      49
    );

    let yPos = 60;
    let currentPage = 1;

    // === GENERATE TABLE FOR THE SINGLE LIFT ===
    const liftName = schedule.movement.toUpperCase();

    // Lift name header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colors.primary);
    doc.text(liftName, 20, yPos + 2);
    
    yPos += 8;

    // Generate table untuk setiap minggu
    schedule.data.forEach((week, weekIdx) => {
      // Cek jika table akan keluar dari halaman
      const estimatedTableHeight = 8 + (week.sets.length * 10);
      if (yPos + estimatedTableHeight > 270) {
        doc.addPage();
        currentPage++;
        drawPageBackground();
        yPos = 20;
      }

      const tableData = week.sets.map((set) => [
        set.setCount > 1 ? `${set.setCount} sets` : '1 set',
        set.reps,
        `${set.percentage}%`,
        `${set.weight} kg`
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [[`Week ${week.week}`, 'Reps', '%', 'Weight']],
        body: tableData,
        theme: 'plain',
        
        // Header styling
        headStyles: {
          fillColor: colors.backgroundAlt,
          textColor: colors.primary,
          fontStyle: 'bold',
          fontSize: 10,
          halign: 'left',
          cellPadding: { top: 4, bottom: 4, left: 5, right: 5 },
          lineColor: colors.border,
          lineWidth: 0.1,
        },
        
        // Body styling
        bodyStyles: {
          fillColor: colors.background,
          textColor: colors.textSecondary,
          fontSize: 9,
          cellPadding: { top: 4, bottom: 4, left: 5, right: 5 },
          lineColor: colors.border,
          lineWidth: 0.1,
        },
        
        // Alternating row colors
        alternateRowStyles: {
          fillColor: colors.backgroundAlt,
        },
        
        // Column styles
        columnStyles: {
          0: { cellWidth: 50, halign: 'left' },
          1: { cellWidth: 45, halign: 'left' },
          2: { cellWidth: 35, halign: 'left' },
          3: { 
            cellWidth: 50,
            fontStyle: 'bold',
            textColor: colors.textPrimary,
            halign: 'left'
          },
        },
        
        margin: { left: 15, right: 15 },
        
        // Table outer border
        tableLineColor: colors.border,
        tableLineWidth: 0.1,
      });

      yPos = doc.lastAutoTable.finalY + 8;
    });

    yPos += 5;

    // === FOOTER untuk semua halaman ===
    const pageCount = doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Footer line
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.line(20, 280, 190, 280);
      
      // Footer text
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...colors.textSecondary);
      doc.text('Made with POWA - Stronger every week', 105, 285, { align: 'center' });
      
      doc.setFontSize(7);
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    }

    // === SAVE PDF ===
    doc.save('POWA_Training_Schedule.pdf');
    console.log('PDF saved successfully!');
    
    return { success: true };
  } catch (error) {
    console.error('PDF Error:', error);
      return { success: false, error: error?.message || 'Unknown error' };
  }
};