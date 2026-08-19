import { useEffect, useState } from "react"
import "./Timer.css"

type TimerProps = {
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    missCount : number
    successCount: number
  };
  

  const Timer: React.FC<TimerProps> = ({ timeLeft, setTimeLeft , missCount, successCount }) => {
    //const [missCount,setMissCount] = useState(0)
    //const [successCount,setSeccessCount] = useState(0)

    useEffect(() => {
      if (timeLeft > 0) {
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 10), 10); // update every 10ms
        return () => clearTimeout(timerId);
      }
    }, [timeLeft]);
  
    const hundredths = Math.floor((timeLeft % 1000) / 10);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 60000) % 60);
  
    const formatNumber = (num: number, digits: number) => num.toString().padStart(digits, '0');

    return <>
        <div className={`status-miss-code-num miss1 ${missCount > 0 ? "active-miss" : ""}`} ></div>
        <div className={`status-miss-code-num miss2 ${missCount > 1 ? "active-miss" : ""}`} ></div>
        <div className={`status-miss-code-num miss3 ${missCount > 2 ? "active-miss" : ""}`} ></div>
        
        <div className={`status-miss-code-num code-num1 ${successCount > 0 ? "active-code" : ""}`} ></div>
        <div className={`status-miss-code-num code-num2 ${successCount > 1 ? "active-code" : ""}`} ></div>
        <div className={`status-miss-code-num code-num3 ${successCount > 2 ? "active-code" : ""}`} ></div>
        <div className={`status-miss-code-num code-num4 ${successCount > 3 ? "active-code" : ""}`} ></div>
        <div className={`status-miss-code-num code-num5 ${successCount > 4 ? "active-code" : ""}`} ></div>
        
        <div className="myTimer">
            <div className="box-time min on">{formatNumber(minutes,2)}</div>
            <div className="box-time min under">88</div>
            <div className="box-time sec on">{formatNumber(seconds,2)}</div>
            <div className="box-time sec under">88</div>
            <div className="box-time milli-sec on">{formatNumber(hundredths,2)}</div>
            <div className="box-time milli-sec under">88</div>
            <div className="colon colon1">:</div>
            <div className="colon colon2">:</div>
        </div>
    </>
}

export default Timer
