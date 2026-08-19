import './GenCode.css'

type Props = {
  Code_num: string | number;
};

function GenCode({ Code_num }: Props) {
  return <>
    <div className="Code-Gen">{Code_num}</div>
  </>
}

export default GenCode