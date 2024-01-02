import './App.css';
import ClosingTime from './Components/ClosingTime';
import Nav from './Components/Nav';
import NumPeople from './Components/NumPeople';
import TimeChart from './Components/TimeChart';
import Hourly from './Components/Hourly';
import Daily from './Components/Daily';
import YourComponent from './Components/YourComponent';

function App() {
  return (
    <>
      <Nav />
      <NumPeople />
      <ClosingTime />
      <TimeChart />
      <Hourly />
      <Daily />
    </>
  );
}

export default App;
