import { instructionData } from '../data/instructionData.ts'



export type ActionType =
  'cut' |
  'press' |
  'hold' |
  'release' |
  'pull' |
  'turnOn' |
  'turnOff' |
  'keyPress';

export type TimeCondition = {
  type: 'withIn' | 'at';
  value: number;
}


export type SerialCondition = {
  contains?: string;  
  even?: boolean;    
  startsWith?: string; 
  endsWith?: string;  
  notContains?: string;
};

export type Instruction = {
  action: ActionType;
  wireColor?: string;
  fuseName?: string;
  switchName?: string;
  eCompName?: string;
  pushButtonName?: string;
  batteryName?: string;
  keyNum?: string;
  condition?: {
    time?: TimeCondition
    serial?: SerialCondition
  }
};

export const getInstructionsForCode = (code: number): Instruction[] => {
  return instructionData[code] || [];

};


