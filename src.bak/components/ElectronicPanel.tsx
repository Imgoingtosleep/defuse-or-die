type Props = {
  eComps: string[]
  pulledEComps: string[]
  onECompPull: (fuse: string) => void;
};

function ElectronicPanel({ eComps, pulledEComps, onECompPull }: Props) {



  return (
    <div className="fuse-panel">
      {eComps.map(eComp => (
        <button
          key={eComp}
          onClick={() => onECompPull(eComp)}
          disabled={pulledEComps.includes(eComp)} // Disable if already pulled
          className={pulledEComps.includes(eComp) ? 'eComponent-pulled' : 'eComponent-button'}
        >
          {eComp}
        </button>
      ))}
    </div>
  );
};

export default ElectronicPanel;
