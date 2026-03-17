// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import LoadingSpinner from './components/LoadingSpinner';
import ScheduleDisplay from './components/ScheduleDisplay';
import { calculateSchedule } from './utils/calculations';
import { exportScheduleToPDF } from './utils/pdfExport';

export default function App() {
  // Try to load initial state from localStorage
  const loadInitialFormData = () => {
    const saved = localStorage.getItem('powaFormData');
    return saved ? JSON.parse(saved) : { movement: 'squat', weight: '' };
  };

  const loadInitialUnit = () => {
    return localStorage.getItem('powaUnit') || 'kg';
  };

  const [formData, setFormData] = useState(loadInitialFormData());
  const [unit, setUnit] = useState(loadInitialUnit());

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever these change
  useEffect(() => {
    localStorage.setItem('powaFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('powaUnit', unit);
  }, [unit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'movement' || value === '' || (parseFloat(value) >= 0 && !isNaN(value))) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUnitToggle = (newUnit) => {
    if (newUnit === unit) return;

    let newWeight = formData.weight;
    const currentWeight = parseFloat(formData.weight);
    
    if (!isNaN(currentWeight) && currentWeight > 0) {
      if (newUnit === 'lbs') {
        newWeight = (currentWeight * 2.20462).toFixed(1);
        newWeight = parseFloat(newWeight).toString();
      } else {
        newWeight = (currentWeight / 2.20462).toFixed(1);
        newWeight = parseFloat(newWeight).toString();
      }
    }

    setFormData((prev) => ({ ...prev, weight: newWeight }));
    setUnit(newUnit);

    if (schedule) {
      const movementDisplayNames = {
        squat: 'Squat',
        bench: 'Bench Press',
        deadlift: 'Deadlift'
      };

      const parsedWeight = parseFloat(newWeight);
      if (!isNaN(parsedWeight) && parsedWeight > 0) {
        // Regenerate instantly on unit change without loading screen for better UX
        const scheduleData = {
          movement: schedule.movement,
          data: calculateSchedule(parsedWeight, movementDisplayNames[schedule.movement]),
          orm: parsedWeight,
          unit: newUnit
        };
        setSchedule(scheduleData);
      }
    }
  };

  const handleGenerate = () => {
    const { movement, weight } = formData;
    if (!weight) {
      alert('Mohon isi input 1RM!');
      return;
    }

    setLoading(true);

    const movementDisplayNames = {
      squat: 'Squat',
      bench: 'Bench Press',
      deadlift: 'Deadlift'
    };

    setTimeout(() => {
      const scheduleData = {
        movement: formData.movement,
        data: calculateSchedule(parseFloat(weight), movementDisplayNames[formData.movement]),
        orm: weight,
        unit: unit
      };

      setSchedule(scheduleData);
      setLoading(false);
    }, 1200);
  };

  const handleExportPDF = () => {
    const result = exportScheduleToPDF(schedule);
    if (!result.success) {
      alert('Error generating PDF: ' + result.error);
    }
  };

  const handleReset = () => {
    setSchedule(null);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 py-12 px-4 selection:bg-yellow-400 selection:text-slate-950 overflow-hidden">
      <div className="relative max-w-4xl mx-auto z-10">
        <Header unit={unit} onUnitToggle={handleUnitToggle} />

        {!schedule && (
          <InputForm
            formData={formData}
            onInputChange={handleInputChange}
            onGenerate={handleGenerate}
            unit={unit}
          />
        )}

        {loading && <LoadingSpinner />}

        {schedule && !loading && (
          <ScheduleDisplay
            schedule={schedule}
            onReset={handleReset}
            onExportPDF={handleExportPDF}
            unit={unit}
          />
        )}
      </div>
    </div>
  );
}