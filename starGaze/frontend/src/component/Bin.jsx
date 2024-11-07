import '../Dashboard.css';
import { RiDeleteBinLine } from "react-icons/ri";
const Bin = () => {

  var fillLevel = 50;
  const fillHeight = Math.max(0, Math.min(100, fillLevel));
  const size = 300;
  return (
    <>

      <div className='bin' style={{marginLeft: "5%"}}>
        <div className="binFill">
          <div style={{ height: fillHeight, overflow: "hidden" }}>
            <RiDeleteBinLine color="#ffc107" size={size} style={{ clipPath: `inset(${fillHeight}% 0% 0% 0%)` }} />
          </div>
          <div className="binContainer">
            <RiDeleteBinLine color="#e4e5e9" size={size} />
          </div>
          {/* transparent div to reserve the complementary spacing */}
          <div style={{ width: size }}></div>
        </div>
      </div>
    </>
  );
}


export default Bin;