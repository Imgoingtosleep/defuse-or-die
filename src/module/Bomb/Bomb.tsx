import { useState, useEffect } from "react";
import { getInstructionsForCode, Instruction } from "../../logic/Instruction";
import './Bomb.css'
import { generateCode, generateSerialNumber } from "../../utils/generate";
import { checkSerialCondition, checkTimeCondition } from "../../logic/Condition";
import Switch from "../SwicthPanel/SwitchPanel";
import Fuse from "../Fuse/FusePanel";
import Button from "../button/Button";
import ElectronicPanel from "../ElectronicPanel/ElectronicPanel";
import NumPad from "../NumPad/Numpad";
import Battery from "../Battery/Battery";
import Timer from "../Timer/Timer";
import Wires from "../Wire/Wires";
import GenCode from "../GenCode/GenCode";
import Menu from "../Menu/menu"

type Props = {
  onDefuse: () => void;
  onExplode: () => void;
};


function Bomb({ onDefuse, onExplode }: Props) {
  const [code, setCode] = useState<number>(() => generateCode());
  const [serialNumber] = useState<string>(() => generateSerialNumber());
  const [previousCodes, setPreviousCodes] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(360000);
  const [currentStep, setCurrentStep] = useState(0);
  const [failure, setFailure] = useState(0);
  const [success, setSuccess] = useState(0);
  const [startTime, setStartTime] = useState<number>(360000);

  const maxSuccess = 5;
  const maxFailure = 3;

  const wires = ["red", "blue", "green", "yellow", "pink"];
  const fuses = ["fuse1", "fuse2", "fuse3", "fuse4"];
  const eComps = [
    "com_transistor_brown",
    "com_transistor_black",
    "com_transistor_blue",
    "com_resistor1",
    "com_resistor2",
    "com_capacitor1",
    "com_capacitor2",
    "com_capacitor3",
    "chip-big",
    "chip-small",
    "chip-main"
  ];
  const switches = ["switch_button1", "switch_button2"];
  const batteries = ["battery1", "battery2", "battery3"];

  const [cutWires, setCutWires] = useState<string[]>([]);
  const [pulledFuses, setPulledFuses] = useState<string[]>([]);
  const [pulledEComps, setPulledEComps] = useState<string[]>([]);
  const [pulledBatteries, setPulledBatteries] = useState<string[]>([]);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({
    SB1: false,
    SB2: false,
  });

  const playAudio = (file: string) => {
    try {
      const base = import.meta.env.BASE_URL || '/';
      const sound = new Audio(`${base}${file}`);
      sound.play().catch(() => {});
    } catch {
      // Audio playback ignore on error
    }
  };

  const generateNewCode = () => {
    let newCode: number;
    let attempts = 0;
    do {
      newCode = generateCode();
      attempts++;
    } while (previousCodes.includes(newCode) && attempts < 50);

    setPreviousCodes(prev => [...prev, newCode]);
    setCode(newCode);
    setCurrentStep(0);
    setStartTime(timeLeft);
  };

  const instructions: Instruction[] = code !== null ? getInstructionsForCode(code) : [];

  // Check if a specific step should be automatically skipped
  const shouldSkipStep = (
    stepIndex: number,
    currentCutWires: string[],
    currentPulledFuses: string[],
    currentPulledEComps: string[],
    currentPulledBatteries: string[],
    currentSwitches: { [key: string]: boolean }
  ): boolean => {
    const inst = instructions[stepIndex];
    if (!inst) return false;

    // Check serial condition
    if (inst.condition?.serial && !checkSerialCondition(inst.condition.serial, serialNumber)) {
      return true;
    }

    // Check already cut wire
    if (inst.action === "cut" && inst.wireColor && currentCutWires.includes(inst.wireColor)) {
      return true;
    }

    // Check already pulled fuse
    if (inst.action === "pull" && inst.fuseName && currentPulledFuses.includes(inst.fuseName)) {
      return true;
    }

    // Check already pulled eComp
    if (inst.action === "pull" && inst.eCompName && currentPulledEComps.includes(inst.eCompName)) {
      return true;
    }

    // Check already pulled battery
    if (inst.action === "pull" && inst.batteryName && currentPulledBatteries.includes(inst.batteryName)) {
      return true;
    }

    // Check switch state
    if (inst.switchName) {
      if (
        (inst.action === "turnOn" && currentSwitches[inst.switchName]) ||
        (inst.action === "turnOff" && !currentSwitches[inst.switchName])
      ) {
        return true;
      }
    }

    return false;
  };

  // Find next valid step by skipping unnecessary ones
  const resolveNextStep = (
    startStep: number,
    currentCutWires: string[] = cutWires,
    currentPulledFuses: string[] = pulledFuses,
    currentPulledEComps: string[] = pulledEComps,
    currentPulledBatteries: string[] = pulledBatteries,
    currentSwitches: { [key: string]: boolean } = switchStates
  ): number => {
    let step = startStep;
    while (
      step < instructions.length &&
      shouldSkipStep(step, currentCutWires, currentPulledFuses, currentPulledEComps, currentPulledBatteries, currentSwitches)
    ) {
      step++;
    }
    return step;
  };

  // Advance step or trigger code completion
  const advanceStep = (
    fromStep: number,
    currentCutWires: string[] = cutWires,
    currentPulledFuses: string[] = pulledFuses,
    currentPulledEComps: string[] = pulledEComps,
    currentPulledBatteries: string[] = pulledBatteries,
    currentSwitches: { [key: string]: boolean } = switchStates
  ) => {
    const nextStep = resolveNextStep(
      fromStep + 1,
      currentCutWires,
      currentPulledFuses,
      currentPulledEComps,
      currentPulledBatteries,
      currentSwitches
    );

    if (nextStep >= instructions.length) {
      // Completed all steps for this code
      const nextSuccess = success + 1;
      setSuccess(nextSuccess);
      if (nextSuccess >= maxSuccess) {
        onDefuse();
      } else {
        generateNewCode();
      }
    } else {
      setCurrentStep(nextStep);
      setStartTime(timeLeft);
    }
  };

  const handleFailure = () => {
    const nextFailure = failure + 1;
    setFailure(nextFailure);
    if (nextFailure >= maxFailure) {
      onExplode();
    } else {
      generateNewCode();
    }
  };

  const validateStep = (
    condition: boolean,
    currentCutWires: string[] = cutWires,
    currentPulledFuses: string[] = pulledFuses,
    currentPulledEComps: string[] = pulledEComps,
    currentPulledBatteries: string[] = pulledBatteries,
    currentSwitches: { [key: string]: boolean } = switchStates
  ) => {
    if (condition) {
      advanceStep(
        currentStep,
        currentCutWires,
        currentPulledFuses,
        currentPulledEComps,
        currentPulledBatteries,
        currentSwitches
      );
    } else {
      handleFailure();
    }
  };

  // Skip initial steps if conditions already met for the new code
  useEffect(() => {
    if (instructions.length > 0) {
      const initialStep = resolveNextStep(0);
      if (initialStep >= instructions.length) {
        const nextSuccess = success + 1;
        setSuccess(nextSuccess);
        if (nextSuccess >= maxSuccess) {
          onDefuse();
        } else {
          generateNewCode();
        }
      } else {
        setCurrentStep(initialStep);
        setStartTime(timeLeft);
      }
    }
  }, [code]);

  const handleWireCut = (wireColor: string) => {
    if (cutWires.includes(wireColor)) return;
    const newCutWires = [...cutWires, wireColor];
    setCutWires(newCutWires);
    playAudio('cut.mp3');

    const instruction = instructions[currentStep];
    const valid = instruction?.action === "cut" && wireColor === instruction.wireColor;
    validateStep(
      valid && checkTimeCondition(instruction?.condition?.time, timeLeft, startTime),
      newCutWires
    );
  };

  const handleFusePull = (fuseName: string) => {
    if (pulledFuses.includes(fuseName)) return;
    const newPulledFuses = [...pulledFuses, fuseName];
    setPulledFuses(newPulledFuses);
    playAudio('fuse.mp3');

    const instruction = instructions[currentStep];
    const valid = instruction?.action === "pull" && fuseName === instruction.fuseName;
    validateStep(
      valid && checkTimeCondition(instruction?.condition?.time, timeLeft, startTime),
      cutWires,
      newPulledFuses
    );
  };

  const handleECompPull = (eCompName: string) => {
    if (pulledEComps.includes(eCompName)) return;
    const newPulledEComps = [...pulledEComps, eCompName];
    setPulledEComps(newPulledEComps);
    playAudio('fuse.mp3');

    const instruction = instructions[currentStep];
    const valid = instruction?.action === "pull" && eCompName === instruction.eCompName;
    validateStep(
      valid && checkTimeCondition(instruction?.condition?.time, timeLeft, startTime),
      cutWires,
      pulledFuses,
      newPulledEComps
    );
  };

  const handleBatteryPull = (batteryName: string) => {
    if (pulledBatteries.includes(batteryName)) return;
    const newPulledBatteries = [...pulledBatteries, batteryName];
    setPulledBatteries(newPulledBatteries);
    playAudio('fuse.mp3');

    const instruction = instructions[currentStep];
    const valid = instruction?.action === "pull" && batteryName === instruction.batteryName;
    validateStep(
      valid && checkTimeCondition(instruction?.condition?.time, timeLeft, startTime),
      cutWires,
      pulledFuses,
      pulledEComps,
      newPulledBatteries
    );
  };

  const handleSwitchButton = (switchName: string) => {
    const newSwitches = { ...switchStates, [switchName]: !switchStates[switchName] };
    setSwitchStates(newSwitches);
    playAudio('switch.mp3');

    const instruction = instructions[currentStep];
    const valid = instruction?.switchName === switchName && (
      (instruction.action === "turnOn" && newSwitches[switchName]) ||
      (instruction.action === "turnOff" && !newSwitches[switchName])
    );
    validateStep(
      valid && checkTimeCondition(instruction?.condition?.time, timeLeft, startTime),
      cutWires,
      pulledFuses,
      pulledEComps,
      pulledBatteries,
      newSwitches
    );
  };

  const handleButtonPressed = () => {
    const instruction = instructions[currentStep];
    const timeCondition = instruction?.condition?.time;
    playAudio('teet.mp3');

    if (instruction?.action === "press") {
      validateStep(checkTimeCondition(timeCondition, timeLeft, startTime));
    } else if (instruction?.action === "hold") {
      setStartTime(timeLeft);
    }
  };

  const handleButtonReleased = () => {
    const instruction = instructions[currentStep];
    const timeCondition = instruction?.condition?.time;
    if (instruction?.action === "hold" || instruction?.action === "release") {
      if (timeCondition && timeCondition.type === 'at') {
        validateStep(checkTimeCondition(timeCondition, timeLeft, startTime));
      } else {
        validateStep(true);
      }
    }
  };

  const handleKeyPressed = (key: string) => {
    playAudio('numpad.mp3');
    const instruction = instructions[currentStep];
    const valid = instruction?.action === 'keyPress' && instruction.keyNum === key;
    validateStep(valid);
  };
  return (
    <>
    <div className="large-container">
      <Menu/>
      <div className="big-container">
        <div className="rectangle"></div>
        <div className="rectangle"></div>

        <div className="container">
          <div className="left">
            <div className="switch">
              <Switch
                switches={switches}
                switchStates={switchStates}
                onSwitchToggle={handleSwitchButton} />
            </div>
            <div className="fuse">
              <Fuse
                fuses={fuses}
                pulledFuses={pulledFuses}
                onFusePull={handleFusePull} />
            </div>
          </div>

          <div className="center">
            <div className="time-container">
              <div className="time-code-button-box">
                <div className="box time"><Timer missCount={failure} successCount={success} timeLeft={timeLeft} setTimeLeft={setTimeLeft} /></div>
                <div className="code-button-box">
                  <div className="box code"><GenCode Code_num={code} /></div>
                </div>
              </div>
              <div className="box button">
                <Button onPress={handleButtonPressed} onRelease={handleButtonReleased} />
              </div>
            </div>

            <div className="middle">
              <div className="circuitmain">
                <div className="box circuit">
                  <ElectronicPanel
                    eComps={eComps}
                    pulledEComps={pulledEComps}
                    onECompPull={handleECompPull} />
                </div>
                <div className="box serialnumber">SN.{serialNumber}</div>
              </div>
              <div className="box numpad"><NumPad onKeyPress={handleKeyPressed} /></div>
            </div>
          </div>


          <div className="right">
            <div className="wire">
              <Wires
                wires={wires}
                cutWires={cutWires}
                onWireCut={handleWireCut} />
            </div>
            <div className="battery">
              <Battery
                batteries={batteries}
                pulledBatteries={pulledBatteries}
                onBatteryPull={handleBatteryPull} />
            </div>
          </div>
        </div>
      </div>

      </div>
    </>

  );
}

export default Bomb
