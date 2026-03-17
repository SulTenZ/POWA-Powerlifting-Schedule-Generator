// src/utils/calculations.js
export const roundToNearest = (weight) => {
  return Math.round(weight / 2.5) * 2.5;
};

export const calculatePlates = (targetWeight, barWeight = 20) => {
  let remainingWeightPerSide = (targetWeight - barWeight) / 2;
  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
  const platesToUse = [];

  if (remainingWeightPerSide <= 0) return platesToUse;

  for (const plate of availablePlates) {
    while (remainingWeightPerSide >= plate) {
      platesToUse.push(plate);
      remainingWeightPerSide -= plate;
    }
    // Handle floating point imprecision
    remainingWeightPerSide = Math.round(remainingWeightPerSide * 100) / 100;
  }
  return platesToUse;
};

export const calculateSchedule = (orm, liftType) => {
  // Template jadwal 3 minggu berdasarkan metode 5/3/1
  const weeks = [
    {
      week: 1,
      sets: [
        { percentage: 65, reps: '5', setCount: 1 },
        { percentage: 75, reps: '5', setCount: 1 },
        { percentage: 85, reps: '5+', setCount: 1 },
        { percentage: 65, reps: '8+', setCount: 2 }
      ]
    },
    {
      week: 2,
      sets: [
        { percentage: 70, reps: '3', setCount: 1 },
        { percentage: 80, reps: '3', setCount: 1 },
        { percentage: 90, reps: '3+', setCount: 1 },
        { percentage: 70, reps: '8+', setCount: 2 }
      ]
    },
    {
      week: 3,
      sets: [
        { percentage: 75, reps: '5', setCount: 1 },
        { percentage: 85, reps: '3', setCount: 1 },
        { percentage: 95, reps: '1+', setCount: 1 },
        { percentage: 70, reps: '8+', setCount: 2 }
      ]
    }
  ];

  // Hitung weight untuk setiap set berdasarkan percentage dan unit rounding
  return weeks.map(week => ({
    ...week,
    liftType,
    sets: week.sets.map(set => ({
      ...set,
      weight: roundToNearest((set.percentage / 100) * orm)
    }))
  }));
};