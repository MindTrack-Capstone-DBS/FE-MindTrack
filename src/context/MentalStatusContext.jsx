import React, { createContext, useState, useContext, useEffect } from 'react';

const MentalStatusContext = createContext();

export const useMentalStatus = () => useContext(MentalStatusContext);

export const MentalStatusProvider = ({ children }) => {
  const [mentalStatus, setMentalStatus] = useState('Normal');
  
  // Menyimpan status ke localStorage agar tetap ada setelah refresh
  useEffect(() => {
    const savedStatus = localStorage.getItem('mentalStatus');
    if (savedStatus) {
      setMentalStatus(savedStatus);
    }
  }, []);
  
  const updateMentalStatus = (prediction) => {
    if (!prediction) return;
    
    // Normalisasi prediksi (lowercase dan hapus spasi)
    const normalizedPrediction = prediction.toLowerCase().trim();
    
    // Pemetaan prediksi ke status yang diinginkan
    let newStatus = 'Normal';
    
    if (normalizedPrediction.includes('depress')) {
      newStatus = 'depression';
    } else if (normalizedPrediction.includes('suicid')) {
      newStatus = 'suicidal';
    } else if (normalizedPrediction.includes('anxi')) {
      newStatus = 'anxiety';
    } else if (normalizedPrediction.includes('bipolar')) {
      newStatus = 'bipolar';
    } else if (normalizedPrediction.includes('stress')) {
      newStatus = 'stress';
    } else if (normalizedPrediction.includes('personality') || normalizedPrediction.includes('disorder')) {
      newStatus = 'personality disorder';
    }
    
    setMentalStatus(newStatus);
    localStorage.setItem('mentalStatus', newStatus);
  };
  
  return (
    <MentalStatusContext.Provider value={{ mentalStatus, updateMentalStatus }}>
      {children}
    </MentalStatusContext.Provider>
  );
};