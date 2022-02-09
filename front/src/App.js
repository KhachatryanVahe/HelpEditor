import Header from './components/toolbar/Header';
import EditCard from './components/EditCard/EditCard';
import './App.css';


function App() {

  return (
    <div className="App">
      <Header/>
      <div className='edit-cards'>
        <EditCard/>
        <EditCard/>
      </div>
    </div>
  );

}

export default App;
