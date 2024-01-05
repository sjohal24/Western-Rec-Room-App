import './App.css';
import ClosingTime from './Components/ClosingTime';
import Nav from './Components/Nav';
import NumPeople from './Components/NumPeople';
import TimeChart from './Components/TimeChart';
import Hourly from './Components/Hourly';
import Daily from './Components/Daily';
import BusyTimesToday from './Components/BusyTimesToday';
import BusyTimesTomorrow from './Components/BusyTimesTomorrow';
import BusyTimes from './Components/BusyTimes';

function App() {
  return (
    <>
      <Nav />
      <NumPeople />
      <ClosingTime />
      <BusyTimesToday />
      <BusyTimesTomorrow />
      <BusyTimes />
      <TimeChart />
      <Hourly />
      <Daily />
    </>
  );
}

export default App;
