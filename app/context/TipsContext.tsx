'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import UserTips from '../utils/user-tips/entity/user-tips';
import { Match } from '../firebase/matches';

interface TipSelectionContextType {
  userTips: UserTips;
  handleTipSelection: (selectedTeam: string, matchData: Match) => void;
}

const TipSelectionContext = createContext<TipSelectionContextType | undefined>(undefined);

export const TipSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [userTips] = useState(new UserTips({ id: 'match-id', tips: [] }));

  const handleTipSelection = (selectedTeam: string, matchData: Match) => {
    const matchId = matchData.id;
    const existingTipIndex = userTips.tips.findIndex(tip => tip.matchId === matchId);

    //verifica se existe o ID da partida na lista
    if (existingTipIndex !== -1) {      
      const existingTip = userTips.tips[existingTipIndex];
      //verifica se o usuário já selecionou aquela aposta
      if (existingTip.selectedTeam === selectedTeam) {
        userTips.removeTip(userTips.tips[existingTipIndex]);
      }
    } else if (selectedTeam) {
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
