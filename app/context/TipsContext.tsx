'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import UserTips from '../utils/user-tips/entity/user-tips';

interface TipSelectionContextType {
  userTips: UserTips;
  handleTipSelection: (selectedTeam: string) => void;
}

const TipSelectionContext = createContext<TipSelectionContextType | undefined>(undefined);

export const TipSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [userTips] = useState(new UserTips({ id: 'match-id', tips: [] }));

  const handleTipSelection = (selectedTeam: string) => {
    console.log(selectedTeam);
    userTips.addTip(selectedTeam);
  }

  return (
    <TipSelectionContext.Provider value={{ userTips, handleTipSelection }}>
      {children}
    </TipSelectionContext.Provider>
  );
};

export const useTipSelection = () => {
  const context = useContext(TipSelectionContext);
  if (!context) {
    throw new Error('useTipSelection must be used within a TipSelectionProvider');
  }
  return context;
};
