import '../styles/SwitchPanel.css';

type Props = {
  switches: string[];
  onSwitchToggle: (switchName: string) => void;
  switchStates: { [key: string]: boolean };
};

function SwitchPanel({ switches, onSwitchToggle, switchStates }: Props) {
  return (
    <div className="switch-container">
      {switches.map(switchName => (
        <div key={switchName} className="switch-item">
          <label>
            <span className="switch-labels">
            </span>
            <input
              type="checkbox"
              checked={switchStates[switchName] || false}
              onChange={() => onSwitchToggle(switchName)}
            />
            <span className="switch-slider"></span>
            {switchName}
          </label>
        </div>
      ))}
    </div>
  );
}

export default SwitchPanel;
