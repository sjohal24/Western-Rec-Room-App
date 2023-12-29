import './App.css';
import ClosingTime from './Components/ClosingTime';
import Nav from './Components/Nav';
import NumPeople from './Components/NumPeople';
import TimeChart from './Components/TimeChart';
import Hourly from './Components/Hourly';

function App() {
  return (
    <>
      <Nav />
      <NumPeople />
      <ClosingTime />
      <TimeChart />
      <Hourly />
    </>
  );
}

export default App;
