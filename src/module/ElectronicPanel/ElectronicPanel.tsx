import { useState } from 'react'
import './ElectronicPanel.css'
type Props = {
    eComps: string[]
    pulledEComps: string[]
    onECompPull: (fuse: string) => void;
  };
  
  function ElectronicPanel({ eComps, pulledEComps, onECompPull }: Props) {
    const [transister_brown, setTransister_brown] = useState(false);
    const [transister_blue, setTransister_blue] = useState(false);
    const [transister_black, setTransister_black] = useState(false);
    const [resister1, setResister1] = useState(false);
    const [resister2, setResister2] = useState(false);
    const [com1, setCom1] = useState(false);
    const [com2, setCom2] = useState(false);
    const [com3, setCom3] = useState(false);
    const [chipbig, setChipbig] = useState(false);
    const [chipSmall, setChipSmall] = useState(false);
    const [chipMain, setChipMain] = useState(false);

    const IsPull = (name:string) => {
        switch (name) {
            case "brown":
                setTransister_brown(true)
                onECompPull('com_transistor_brown')
                break;
            case "black":
                setTransister_black(true)
                onECompPull('com_transistor_black')
                break;
            case "blue":
                setTransister_blue(true)
                onECompPull('com_transistor_blue')
                break;
            case "R1":
                setResister1(true)
                onECompPull('com_resistor1')
                break;
            case "R2":
                setResister2(true)
                onECompPull('com_resistor2')
                break;
            case "C1":
                setCom1(true)
                onECompPull('com_capacitor1')
                break;
            case "C2":
                setCom2(true)
                onECompPull('com_capacitor2')
                break;
            case "C3":
                setCom3(true)
                onECompPull('com_capacitor3')
                break;
            case "CB":
                setChipbig(true)
                onECompPull('chip-big')
                break;
            case "CS":
                setChipSmall(true)
                onECompPull('chip-small')
                break;
            case "CM":
                setChipMain(true)
                onECompPull('chip-main')
                break;
            default:
                break;
        }
    }

    return <>
        <div className={`com transister_brown ${ transister_brown ? "fall-animation-e" : ""}`} onClick={() => IsPull("brown")}></div>
        <div className={`com transister_black ${ transister_black ? "fall-animation-e" : ""}`} onClick={() => IsPull("black")}></div>
        <div className={`com transister_blue ${ transister_blue ? "fall-animation-e" : ""}`} onClick={() => IsPull("blue")}></div>
        
        <div className={`com resister1 ${ resister1 ? "fall-animation-e" : ""}`} onClick={() => IsPull("R1")}></div>
        <div className={`com resister2 ${ resister2 ? "fall-animation-e" : ""}`} onClick={() => IsPull("R2")}></div>
        
        <div className={`com_capaciter com1 ${ com1 ? "fall-animation-e" : ""}`} onClick={() => IsPull("C1")}></div>
        <div className={`com_capaciter com2 ${ com2 ? "fall-animation-e" : ""}`} onClick={() => IsPull("C2")}></div>
        <div className={`com_capaciter com3 ${ com3 ? "fall-animation-e" : ""}`} onClick={() => IsPull("C3")}></div>

        <div className={`chip-box `}>
            <div className={`line hor line1 ${ chipbig ? "fall-animation-e" : ""}`}></div>
            <div className={`line hor line2 ${ chipbig ? "fall-animation-e" : ""}`}></div>
            <div className={`line hor line3 ${ chipbig ? "fall-animation-e" : ""}`}></div>
            <div className={`line hor line4 ${ chipbig ? "fall-animation-e" : ""}`}></div>
            <div className={`line hor line5 ${ chipbig ? "fall-animation-e" : ""}`}></div>
            <div className={`chip chip-big ${ chipbig ? "fall-animation-e" : ""}`} onClick={() => IsPull("CB")}></div>
        </div>

        <div className={`chip-box `}>
            <div className={`line ver line6 ${ chipSmall ? "fall-animation-e" : ""}`}></div>
            <div className={`line ver line7 ${ chipSmall ? "fall-animation-e" : ""}`}></div>
            <div className={`line ver line8 ${ chipSmall ? "fall-animation-e" : ""}`}></div>
            <div className={`line ver line9 ${ chipSmall ? "fall-animation-e" : ""}`}></div>
            <div className={`line ver line10 ${ chipSmall ? "fall-animation-e" : ""}`}></div>
            <div className={`line ver line11 ${ chipSmall ? "fall-animation-e" : ""}`}></div>
            <div className={`chip chip-small ${ chipSmall ? "fall-animation-e" : ""}`} onClick={() => IsPull("CS")}></div>
        </div>

        <div className={`chip-box `}>
           <div className={`line chip1 line12 ${ chipMain ? "fall-animation-e" : ""}`}></div>
           <div className={`line chip1 line13 ${ chipMain ? "fall-animation-e" : ""}`}></div>
           <div className={`line chip2 line14 ${ chipMain ? "fall-animation-e" : ""}`}></div>
           <div className={`line chip2 line15 ${ chipMain ? "fall-animation-e" : ""}`}></div>
           
           <div className={`chip chip-main ${ chipMain ? "fall-animation-e" : ""}`} onClick={() => IsPull("CM")}></div> 
        </div>
    </>
}

export default ElectronicPanel;
