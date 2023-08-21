import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ContinentalList from "./test";
import ContinentList from "./continents";

export default function App() {
  return (
    <div className="App">
      <ContinentList />

      {/* <ContinentalList /> */}
    </div>
  );
}
