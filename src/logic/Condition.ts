import { SerialCondition, TimeCondition } from "./Instruction";

// Helper to check if time conditions are met
export const checkTimeCondition = (timeCondition: TimeCondition | undefined, timeLeft:number, startTime:number) => {
if (timeCondition?.type === 'withIn' && timeLeft <= startTime - timeCondition.value*1000) {
    return false;
  }
  if (timeCondition?.type === 'at' && !timeLeft.toString().includes(timeCondition.value.toString())) {
    console.log(timeLeft, timeCondition.value);
    return false;
  }
  return true;
};



export const checkSerialCondition = (serialCondition: SerialCondition | undefined, serialNumber: string): boolean => {
  if (!serialCondition) return true;  // If there's no serial condition, proceed

  // Check for the 'contains' condition
  if (serialCondition.contains && !serialNumber.includes(serialCondition.contains)) {
    return false;
  }

  // Check for the 'notContains' condition
  if (serialCondition.notContains && serialNumber.includes(serialCondition.notContains)) {
    return false;
  }

  // Check for the 'even' condition
  if (serialCondition.even !== undefined) {
    const lastChar = serialNumber[serialNumber.length - 1];
    const isEven = /\d/.test(lastChar) ? parseInt(lastChar) % 2 === 0 : false;
    if (serialCondition.even !== isEven) {
      return false;
    }
  }

  // Check for the 'startsWith' condition
  if (serialCondition.startsWith && !serialNumber.startsWith(serialCondition.startsWith)) {
    return false;
  }

  // Check for the 'endsWith' condition
  if (serialCondition.endsWith && !serialNumber.endsWith(serialCondition.endsWith)) {
    return false;
  }

  return true;  // If all conditions are met
};
