import { useState } from 'react'
import './Wires.css'


type Props = {
    wires: string[]
    cutWires: string[]
    onWireCut: (wireColor: string) => void;
};
  
function Wires({ wires, onWireCut }: Props) {
    const [isCut1,setIscut1] = useState(false)
    const [isCut2,setIscut2] = useState(false)
    const [isCut3,setIscut3] = useState(false)
    const [isCut4,setIscut4] = useState(false)
    const [isCut5,setIscut5] = useState(false)

    const handleCut = (wire:string) => {
        switch (wire) {
            case "red":
                setIscut1(true)
                onWireCut(wire)
                break;
            case "green":
                setIscut2(true)
                onWireCut(wire)
                break;
            case "yellow":
                setIscut3(true)
                onWireCut(wire)
                break;
            case "pink":
                setIscut4(true)
                onWireCut(wire)
                break;
            case "blue":
                setIscut5(true)
                onWireCut(wire)
                break;
            default:
                break;
        }
    }

    return <>
        <div className="wire-container">
            <div className="mybox mybox-top"></div>
            { !isCut1 ? <div className="mywire red" onClick={() => handleCut("red")}></div> : 
            <>
                <div className="mywire-cut red top"></div>
                <div className="mywire-cut red bot"></div>
            </>
            }

            { !isCut2 ? <div className="mywire green" onClick={() => handleCut("green")}></div> : 
            <>
                <div className="mywire-cut green top"></div>
                <div className="mywire-cut green bot"></div>
            </>
            }

            { !isCut3 ? <div className="mywire yellow" onClick={() => handleCut("yellow")}></div> : 
            <>
                <div className="mywire-cut yellow top"></div>
                <div className="mywire-cut yellow bot"></div>
            </>
            }

            { !isCut4 ? <div className="mywire pink" onClick={() => handleCut("pink")}></div> : 
            <>
                <div className="mywire-cut pink top"></div>
                <div className="mywire-cut pink bot"></div>
            </>
            }

            { !isCut5 ? <div className="mywire blue" onClick={() => handleCut("blue")}></div> : 
            <>
                <div className="mywire-cut blue top"></div>
                <div className="mywire-cut blue bot"></div>
            </>
            }
            <div className="mybox mybox-bot"></div>
        </div>
    </>
}

export default Wires