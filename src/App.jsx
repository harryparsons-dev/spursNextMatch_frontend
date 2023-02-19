import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
const api = import.meta.env.VITE_APP_API;

function App() {
  const [matches, setMatches] = useState([]);
  const [nextMatch, setNextMatch] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getMatches = async () => {
    axios.get(api).then((req) => {
      setMatches(req.data);
      setLoaded(true);
    });
  };

  const findClosest = (matches) => {
    let today = new Date();
    let closestMatch = null;
    let closestDateDiff = Number.MAX_SAFE_INTEGER;

    matches.forEach((element) => {
      const dateDiff = Math.abs(new Date(element.date) - today);

      if (dateDiff < closestDateDiff) {
        closestMatch = element;
        closestDateDiff = dateDiff;
      }
    });

    return closestMatch;
  };

  useEffect(() => {
    getMatches();
    if (loaded) {
      console.log("Finding closest match...");
      setNextMatch(findClosest(matches));
    }
  }, [loaded]);

  if (loaded) {
    // console.log("closest match: " + nextMatch.team);
  }

  return (
    <div className="App">
      {" "}
      <div className="heading-boarder">
        <div className="heading">The next match is:</div>
      </div>
      <div className="nextMatch">
        <div className="team">{nextMatch.team}</div>
        <div className="date">{new Date(nextMatch.date).toDateString()} </div>
        <div className="venue">{nextMatch.venue}</div>
      </div>
    </div>
  );
}

export default App;
