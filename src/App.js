import logo from './logo.svg';
import './App.css';
import TypeScriptGenerator from './TypeScriptGenerator'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Typescript type generator</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <TypeScriptGenerator/>
      </header>
    </div>
  );
}

export default App;
