
// ✪ Timer Store 
import { create } from "zustand";


  type State = {
    useTimer: boolean;
    timer: number;
  };
  
  type Action = {
    updateTimer: () => void; // No argument required here
    resetTimer: () => void; // No argument required here
    updateUseTimer: (el : State['useTimer']) => void; 
  };
  
  export const useTimerStore = create<State & Action>((set) => ({
    useTimer: false,
    timer: 20,
    resetTimer: () => set( {timer: 20}),
    updateUseTimer: (el) => set(() => ({ useTimer:  el })), 
    updateTimer: () => set((state) => ({ timer: state.timer - 1 })), 
  }));
  




