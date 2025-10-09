import "./startScreen.css"
import logo from '../../Assets/Images/LOGO1.png'
import AnimatedButton from "../AnimatedButton/AnimatedButton";

function StartScreen({ onStart }) {
  return (
    <>
      <div className="StartScreen">
        <div className="StartScreenMainSec">
          <div className="text-center">
            <img src={logo} alt="logoimage" className="logoImgStart" />
          </div>
              <div>
                <h3 className="text-stroke">PREMIUM AUTOCARE</h3>
              </div>
        <div className="buttonSection">
        <AnimatedButton text1="GET STARTED" text2="Success" onClick={onStart} />

        </div>
        </div>

      </div>

    </>
  );
}

export default StartScreen;










// function StartScreen({ onStart }) {
//   return (
//     <div style={{
//       height: '100vh',          // full viewport height
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       background: '#f5f5f5',    // light background color
//       textAlign: 'center'
//     }}>
//       <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
//         Welcome to My App!
//       </h1>
//       <button
//         onClick={onStart}
//         style={{
//           padding: '12px 25px',
//           fontSize: '1.2rem',
//           borderRadius: '8px',
//           border: 'none',
//           cursor: 'pointer',
//           backgroundColor: '#4CAF50',
//           color: 'white'
//         }}
//       >
//         Yes, Start
//       </button>
//     </div>
//   );
// }

// export default StartScreen;
