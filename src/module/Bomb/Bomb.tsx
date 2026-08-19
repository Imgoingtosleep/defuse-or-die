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
  const [code, setCode] = useState(1)
  const [serialNumber] = useState<string>(generateSerialNumber());
  const [previousCodes, setPreviousCodes] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(360000);
  const [currentStep, setCurrentStep] = useState(0);
  const [failure, setFailure] = useState(0);
  const [success, setSuccess] = useState(0);
  const [startTime, setStartTime] = useState<number>(0)

  const maxSuccess = 5;
  const maxFailure = 3;

  const wires = ["red", "blue", "green", "yellow", "pink"]
  const fuses = ["fuse1", "fuse2", "fuse3", "fuse4"]
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
  ]
  const switches = ["switch_button1", "switch_button2"]
  const batteries = ["battery1", "battery2", "battery3"]

  const [cutWires, setCutWires] = useState<string[]>([]);
  const [pulledFuses, setPulledFuses] = useState<string[]>([]);
  const [pulledEComps, setPulledEComps] = useState<string[]>([]);
  const [pulledBatteries, setPulledBatteries] = useState<string[]>([]);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({
    SB1: false,
    SB2: false,
  });

  useEffect(() => {
    generateNewCode()
  }, [])
  //Function to generate a new code different from the previous one
  const generateNewCode = () => {
    let newCode;
    do {
      newCode = generateCode()
    } while (previousCodes.includes(newCode))

    setPreviousCodes(prev => [...prev, newCode])
    setCode(newCode) // Set the new code
    setCurrentStep(0)
  };

  const instructions: Instruction[] = code !== null ? getInstructionsForCode(code) : [];

  const handleSuccess = () => {
    console.log(currentStep, instructions.length);

    if (currentStep === instructions.length) {
      setSuccess(prev => prev + 1);
      if (success + 1 === maxSuccess) {
        onDefuse(); // Successfully defused
      } else {
        generateNewCode()
      }
    }
  };

  const handleFailure = () => {
    setFailure(prev => prev + 1);
    if (failure + 1 >= maxFailure) {
      onExplode(); // Bomb exploded
    } else {
      generateNewCode()
    }
  }

  const validateStep = (condition: boolean) => {
    if (condition) {
      setCurrentStep(prev => prev + 1);
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const autoSkip = () => {
    console.log(currentStep);

    const instruction = instructions[currentStep];
    if (!instruction) return; // No instruction at this step

    console.log(instruction.condition?.serial);

    // Check serial number condition
    if (instruction.condition?.serial && !checkSerialCondition(instruction.condition.serial, serialNumber)) {
      console.log('Serial number condition not met, skipping to next step');
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Check wire cut condition
    if (instruction.action === "cut" && instruction.wireColor) {
      if (cutWires.includes(instruction.wireColor)) {
        console.log('Wire already cut, skipping to next step');
        setCurrentStep(prev => prev + 1);
        return;
      }
    }

    // Check fuse pull condition
    if (instruction.action === "pull" && instruction.fuseName) {
      if (pulledFuses.includes(instruction.fuseName)) {
        console.log('Fuse already pulled, skipping to next step');
        setCurrentStep(prev => prev + 1);
        return;
      }
    }

    // Check eComp pull condition
    if (instruction.action === "pull" && instruction.eCompName) {
      if (pulledEComps.includes(instruction.eCompName)) {
        console.log('eComp already pulled, skipping to next step');
        setCurrentStep(prev => prev + 1);
        return;
      }
    }


    // Check Battery pull condition
    if (instruction.action === "pull" && instruction.batteryName) {
      if (pulledBatteries.includes(instruction.batteryName)) {
        console.log('Battery already pulled, skipping to next step');
        setCurrentStep(prev => prev + 1);
        return;
      }
    }



    // Check switch state
    const switchName = instruction.switchName;
    if (switchName) {
      if (
        (instruction.action === "turnOn" && switchStates[switchName]) ||
        (instruction.action === "turnOff" && !switchStates[switchName])
      ) {
        console.log('Switch state is valid, skipping to next step');
        setCurrentStep(prev => prev + 1);
        return;
      }
    }

    console.log('No skip conditions met, staying on current step');
  };

  useEffect(() => {
    console.log(instructions[currentStep]);

    setStartTime(timeLeft)
    autoSkip()
    handleSuccess()
    console.log('code', code);

  }, [currentStep]);

  // current instruction has time withIn
  useEffect(() => {
    const instruction = instructions[currentStep]
    const timeCondition = instruction.condition?.time
    if (timeCondition && timeCondition.type === 'withIn') {
      if (!checkTimeCondition(timeCondition, timeLeft, startTime)) {
        handleFailure()
      }
    }
  }, [timeLeft])


  const handleWireCut = (wireColor: string) => {
    if (cutWires.includes(wireColor)) return

    setCutWires(prev => [...prev, wireColor])
    const sound = new Audio('../../public/cut.mp3')
    sound.play()
    const instruction = instructions[currentStep]
    const valid = instruction?.action === "cut" && wireColor === instruction.wireColor
    validateStep(valid && checkTimeCondition(instruction.condition?.time, timeLeft, startTime))
  }

  const handleFusePull = (fuseName: string) => {
    if (pulledFuses.includes(fuseName)) return

    setPulledFuses(prev => [...prev, fuseName])
    const sound = new Audio('../../public/fuse.mp3')
    sound.play()
    const instruction = instructions[currentStep]
    const valid = instruction?.action === "pull" && fuseName === instruction.fuseName;
    validateStep(valid && checkTimeCondition(instruction.condition?.time, timeLeft, startTime));
  }

  const handleECompPull = (eCompName: string) => {
    if (pulledEComps.includes(eCompName)) return;

    setPulledEComps(prev => [...prev, eCompName]);
    const sound = new Audio('../../public/fuse.mp3')
    sound.play()
    const instruction = instructions[currentStep];
    const valid = instruction?.action === "pull" && eCompName === instruction.eCompName;
    validateStep(valid && checkTimeCondition(instruction.condition?.time, timeLeft, startTime));
  }

  const handleBatteryPull = (batteryName: string) => {
    if (pulledBatteries.includes(batteryName)) return;
    const sound = new Audio('../../public/fuse.mp3')
    sound.play()
    setPulledBatteries(prev => [...prev, batteryName]);

    const instruction = instructions[currentStep];
    const valid = instruction?.action === "pull" && batteryName === instruction.batteryName;
    validateStep(valid && checkTimeCondition(instruction.condition?.time, timeLeft, startTime));
  }

  const handleSwitchButton = (switchName: string) => {

    setSwitchStates(prev => ({ ...prev, [switchName]: !prev[switchName] }))

    const instruction = instructions[currentStep]
    const valid = instruction?.switchName === switchName && (
      (instruction.action === "turnOn" && !switchStates[switchName]) ||
      (instruction.action === "turnOff" && switchStates[switchName])
    )
    validateStep(valid && checkTimeCondition(instruction.condition?.time, timeLeft, startTime));
  }

  const handleButtonPressed = () => {
    const instruction = instructions[currentStep]
    const timeCondition = instruction.condition?.time
    const sound = new Audio('../../public/teet.mp3')
    sound.play()
    if (instruction.action === "press") {
      validateStep(checkTimeCondition(timeCondition, timeLeft, startTime))
    } else if (instruction.action === "hold") {
      setStartTime(timeLeft)
    } else {
      console.log("What the funk is this?");
    }
  }

  const handleButtonReleased = () => {
    const instruction = instructions[currentStep]
    const timeCondition = instruction.condition?.time
    if (timeCondition && timeCondition.type === 'at') {
      validateStep(checkTimeCondition(timeCondition, timeLeft, startTime))
    } else {
      validateStep(true)
    }
  }

  const handleKeyPressed = (key: string) => {
    const sound = new Audio('../../public/numpad.mp3')
    sound.play()
    const instruction = instructions[currentStep]
    const valid = instruction.action === 'keyPress' && instruction.keyNum === key
    validateStep(valid)
  }
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
