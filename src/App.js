import convert from "./utils/convert";
import capTable from "./template/capTable";
import "./app.css";

let data = capTable;

function App() {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <button onClick={() => convert(data)}>convert</button>
      <table>
        <tbody>
          <tr id="row0"><td></td><td></td><td></td><td></td></tr>
          <tr id="row1"><td></td><td id="b2">founders</td><td id="c2">token allocation</td><td id="d2">token count</td></tr>
          <tr id="row2"><td></td><td id="b3">founder 1</td><td id="c3">.40</td><td id="d3">=c3*b8</td></tr>
          <tr id="row3"><td></td><td id="b4">founder 2</td><td id="c4">.20</td><td id="d4">=c4*b8</td></tr>
          <tr id="row4"><td></td><td id="b5">founder 3</td><td id="c5">.20</td><td id="d5">=c5*b8</td></tr>
          <tr id="row5"><td></td><td></td><td></td><td></td></tr>
          <tr id="row6"><td></td><td id="b7">token total</td><td></td><td></td></tr>
          <tr id="row7"><td></td><td id="b8">1000000</td><td></td><td></td></tr>
          <tr id="row8"><td></td><td></td><td></td><td></td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
