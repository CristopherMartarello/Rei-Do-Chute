'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import UserTips from '../utils/user-tips/entity/user-tips';
import { TodayMatch } from '../components/Home';

interface TipSelectionContextType {
  userTips: UserTips;
  handleTipSelection: (selectedTeam: string | null, matchData: TodayMatch) => void;
}

const TipSelectionContext = createContext<TipSelectionContextType | undefined>(undefined);

export const TipSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [userTips] = useState(new UserTips({ id: 'user-id', tips: [] }));

  const handleTipSelection = (selectedTeam: string | null, matchData: TodayMatch) => {
    const matchId = matchData.id.toString();
    const existingTipIndex = userTips.tips.findIndex(tip => tip.matchId === matchId);

    if (existingTipIndex !== -1) {
      userTips.removeTip(userTips.tips[existingTipIndex]);
    }

    if (selectedTeam) {
      userTips.addTip({ matchId, selectedTeam });
    }
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
