import { Button } from "react-bootstrap";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";

import { API } from "aws-amplify";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const handleClick = async () => {
  //   await API.get
  // };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="text-dark">Welcome to Search-agg</h1>
      </header>
      <section className="card">
        <SearchBox />
      </section>
      <section className="card">
        <SearchResults />
      </section>
    </div>
  );
}

export default App;
