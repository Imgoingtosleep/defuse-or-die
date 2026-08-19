import { useState } from 'react';
import './SwitchPanel.css';

type Props = {
  switches: string[];
  onSwitchToggle: (switchName: string) => void;
  switchStates: { [key: string]: boolean };
};

function SwitchPanel({ switches, onSwitchToggle, switchStates }: Props)  {
  const [switch1_IsOn, setSwitch1_IsOn] = useState(false);
  const [switch2_IsOn, setSwitch2_IsOn] = useState(false);

  const ss1 = new Audio('../../public/switch.mp3')
  const ss2 =  new Audio('../../public/switch2.mp3')
  const IsOn = (name:string) => {
    
    if (name === "SW1") {
      setSwitch1_IsOn(prev => !prev)
      onSwitchToggle("switch_button1")
      if(switch1_IsOn){
          ss1.play()
      }else{
        ss2.play()
      }
    }
    if( name === "SW2"){
      setSwitch2_IsOn(prev => !prev)
      onSwitchToggle("switch_button2")
      if(switch2_IsOn){
        ss1.play()
    }else{
      ss2.play()
    }
    }
  }

  return <>
    <div className={`switch-container`}>
        <div className={`bg-switch ${switch1_IsOn ? "on-switch1" : "off-switch1"}`}>
            <div className={`myswitch ${switch1_IsOn ? "on-switch1" : ""}`} onClick={() => IsOn('SW1')}></div>
        </div>
        <div className="box-status">
                <div className={`status ${switch1_IsOn ? "on-switch1" : "off-switch2"}`}></div>
            </div>
    </div>
    <div className={`switch-container`}>
        <div className={`bg-switch ${switch2_IsOn ? "on-switch2" : "off-switch2"}`}>
            <div className={`myswitch ${switch2_IsOn ? "on-switch2" : ""}`} onClick={() => IsOn('SW2')}></div>
        </div>
        <div className="box-status">
                <div className={`status ${switch2_IsOn ? "on-switch2" : "off-switch2"}`}></div>
        </div>
    </div>
  </>
};

export default SwitchPanel;