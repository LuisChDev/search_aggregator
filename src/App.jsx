import SearchBox from "./SearchBox";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="">
        <h1 className="text-dark">Welcome to Search-agg</h1>
      </header>
      <section className="card">
        <SearchBox />
      </section>
      <section className="card">
        <h2>Search results</h2>
      </section>
    </div>
  );
}

export default App;
