import '../styles/Wires.css';

type Props = {
  wires: string[]
  cutWires: string[]
  onWireCut: (wireColor: string) => void;
};

function Wires({ wires, onWireCut }: Props) {
  return (
    <div className="wires">
      {wires.map(wire => (
        <button key={wire} onClick={() => onWireCut(wire)}>
          Cut {wire} Wire
        </button>
      ))}
    </div>
  );
}

export default Wires;
