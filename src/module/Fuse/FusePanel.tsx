import { useState } from 'react'
import './FusePanel.css'

type Props = {
    fuses: string[];
    pulledFuses: string[];
    onFusePull: (fuse: string) => void;
  };
  
  function FusePanel({ fuses, onFusePull, pulledFuses }: Props) {
    const [isFuse1 ,setIsFuse1] = useState(false)
    const [isFuse2 ,setIsFuse2] = useState(false)
    const [isFuse3 ,setIsFuse3] = useState(false)
    const [isFuse4 ,setIsFuse4] = useState(false)

    const Ispull = (typeFuse:string) => {
        switch (typeFuse) {
            case "F1":
                setIsFuse1(true)
                onFusePull('fuse1')
                break;
            case "F2":
                setIsFuse2(true)
                onFusePull('fuse2')
                break;
            case "F3":
                setIsFuse3(true)
                onFusePull('fuse3')
                break;
            case "F4":
                setIsFuse4(true)
                onFusePull('fuse4')
                break;
            default:
                break;
        }
    }
    return <>
        <div className="fuse-box">
            <div className={`wavy fuse1 ${isFuse1 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F1")}></div>
            <div className={`myfuse fuse1 ${isFuse1 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F1")}></div>
            <div className={`fuse-h fuse1 ${isFuse1 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F1")}></div>
            <div className={`fuse-t fuse1 ${isFuse1 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F1")}></div>
        </div>
        <div className="fuse-box">
            <div className={`wavy fuse2 ${isFuse2 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F2")}></div>
            <div className={`myfuse fuse2 ${isFuse2 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F2")}></div>
            <div className={`fuse-h fuse2 ${isFuse2 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F2")}></div>
            <div className={`fuse-t fuse2 ${isFuse2 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F2")}></div>
        </div>
        <div className="fuse-box">
            <div className={`wavy fuse3 ${isFuse3 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F3")}></div>
            <div className={`myfuse fuse3 ${isFuse3 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F3")}></div>
            <div className={`fuse-h fuse3 ${isFuse3 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F3")}></div>
            <div className={`fuse-t fuse3 ${isFuse3 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F3")}></div>
        </div>
        <div className="fuse-box">
            <div className={`wavy fuse4 ${isFuse4 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F4")}></div>
            <div className={`myfuse fuse4 ${isFuse4 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F4")}></div>
            <div className={`fuse-h fuse4 ${isFuse4 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F4")}></div>
            <div className={`fuse-t fuse4 ${isFuse4 ? "fall-animation-f" : ""}`} onClick={() => Ispull("F4")}></div>
        </div>
    </>
}

export default FusePanel
