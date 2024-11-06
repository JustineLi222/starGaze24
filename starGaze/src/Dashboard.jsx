import './Dashboard.css';
import './index.css';
import { RiDeleteBinLine } from "react-icons/ri";
const Dashboard = () => {

  var fillLevel = 50;
  const fillHeight = Math.max(0, Math.min(100, fillLevel));
  const size = 100;
  return (
    <>
      <h1>Dashboard</h1>

      <div className='bin'>
      <div>
        <div style={{ height: fillHeight, overflow: "hidden" }}>
          <RiDeleteBinLine className="binFill" color="#ffc107" size={size} style={{clipPath: `inset(${fillHeight}% 0% 0% 0%)`}}/>
          <RiDeleteBinLine className="binContainer" color="#e4e5e9" size={size} />
        </div>
      </div>
      </div>
    </>
  );
}


export default Dashboard;