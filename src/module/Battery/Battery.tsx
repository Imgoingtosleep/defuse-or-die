import { useState } from 'react'
import './Battery.css'

type Props = {
    batteries: string[];
    pulledBatteries: string[];
    onBatteryPull: (fuse: string) => void;
  };
  

function BatterySlot({ batteries, pulledBatteries, onBatteryPull }: Props) {
    const [b1,setB1] = useState(false)
    const [b2,setB2] = useState(false)
    const [b3,setB3] = useState(false)


    const IsPull = (name_battery:string) => {
        switch (name_battery) {
            case "B1":
                setB1(true)
                onBatteryPull('battery1')
                break;
            case "B2":
                setB2(true)
                onBatteryPull('battery2')
                break;
            case "B3":
                setB3(true)
                onBatteryPull('battery3')
                break;
            default:
                break;
        }
    }


    return <>
        <div className="battery-holder">
            <div className="battery-holder-top"></div>
            <div className="battery-holder-bot"></div>
            <div className="battry-box">
                <div className={`mybattery ${b1 ? "fall-animation-b" : ""}`} onClick={() => IsPull("B1")}></div>
                <div className={`PS ${b1 ? "fall-animation-b" : ""}`} onClick={() => IsPull("B1")}></div>
            </div>
            
        </div>
        <div className="battery-holder">
            <div className="battery-holder-top"></div>
            <div className="battery-holder-bot"></div>
            <div className="battry-box">
                <div className={`mybattery ${b2 ? "fall-animation-b" : ""}`} onClick={() => IsPull("B2")}></div>
                <div className={`PS ${b2 ? "fall-animation-b" : ""}`} onClick={() => IsPull("B2")}></div>
            </div>
        </div>
        <div className="battery-holder">
            <div className="battery-holder-top"></div>
            <div className="battery-holder-bot"></div>
            <div className="battry-box">
                <div className={`mybattery ${b3 ? "fall-animation-b" : ""}`} onClick={() => IsPull("B3")}></div>
                <div className={`PS ${b3 ? "fall-animation-b" : ""}`} onClick={() => IsPull("B3")}></div>
            </div>
        </div>
    </>
}

export default BatterySlot
