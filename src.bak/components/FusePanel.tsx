
//import '../styles/FusePanel.css'
type Props = {
  fuses: string[];
  pulledFuses: string[];
  onFusePull: (fuse: string) => void;
};

function FusePanel({ fuses, onFusePull, pulledFuses }: Props) {



  return (
    <div className="fuse-panel">
      {fuses.map(fuse => (
        <button
          key={fuse}
          onClick={() => onFusePull(fuse)}
          disabled={pulledFuses.includes(fuse)} // Disable if already pulled
          className={pulledFuses.includes(fuse) ? 'fuse-pulled' : 'fuse-button'}
        >
          Pull {fuse} Fuse
        </button>
      ))}
    </div>
  );
};

export default FusePanel;
