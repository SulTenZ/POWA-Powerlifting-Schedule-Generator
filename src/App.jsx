// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import LoadingSpinner from './components/LoadingSpinner';
import ScheduleDisplay from './components/ScheduleDisplay';
import { calculateSchedule } from './utils/calculations';
import { exportScheduleToPDF } from './utils/pdfExport';

export default function App() {
  // State untuk form input (single movement 1RM)
  const [formData, setFormData] = useState({
    movement: 'squat',
    weight: ''
  });

  // State untuk menyimpan schedule yang sudah di-generate
  const [schedule, setSchedule] = useState(null);

  // State untuk loading animation
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'movement' || value === '' || (parseFloat(value) > 0 && !isNaN(value))) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Generate training schedule berdasarkan input 1RM
  const handleGenerate = () => {
    const { movement, weight } = formData;

    // Validasi input
    if (!weight) {
      alert('Mohon isi input 1RM!');
      return;
    }

    // Show loading
    setLoading(true);

    const movementDisplayNames = {
      squat: 'Squat',
      bench: 'Bench Press',
      deadlift: 'Deadlift'
    };

    // Simulate API call dengan setTimeout
    setTimeout(() => {
      const scheduleData = {
        movement: formData.movement,
        data: calculateSchedule(parseFloat(weight), movementDisplayNames[formData.movement]),
        orm: weight
      };

      setSchedule(scheduleData);
      setLoading(false);
    }, 1200);
  };

  // Export schedule ke PDF 
  const handleExportPDF = () => {
    const result = exportScheduleToPDF(schedule);
    
    if (!result.success) {
      alert('Error generating PDF: ' + result.error);
    }
  };

  // Reset schedule dan kembali ke form input
  const handleReset = () => {
    setSchedule(null);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 py-12 px-4 selection:bg-yellow-400 selection:text-slate-950">
      <div className="relative max-w-4xl mx-auto z-10">
        {/* Header */}
        <Header />

        {/* Input Form - tampil jika belum ada schedule */}
        {!schedule && (
          <InputForm
            formData={formData}
            onInputChange={handleInputChange}
            onGenerate={handleGenerate}
          />
        )}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Schedule Display - tampil setelah generate */}
        {schedule && !loading && (
          <ScheduleDisplay
            schedule={schedule}
            onReset={handleReset}
            onExportPDF={handleExportPDF}
          />
        )}
      </div>
    </div>
  );
}