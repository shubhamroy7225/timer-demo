import react, { useEffect, useState } from "react";
import axios from "axios";
import TimerDemo from "./TimerDemo";
function App() {
  const [rounds, setRounds] = useState("");
  const getRoundsData = () => {
    var data = JSON.stringify({
      query:
        "query getMarketData {rounds(first: 5, orderBy: epoch, orderDirection: desc) {id,epoch, position,  failed, startAt, startBlock, startHash, lockAt, lockBlock, lockHash, lockPrice, lockRoundId, closeAt, closeBlock, closeHash, closePrice, closeRoundId, totalBets, totalAmount, bullBets, bullAmount, bearBets, bearAmount}   market(id: 1) {id, paused, epoch { epoch } } }",
      variables: {},
    });

    var config = {
      method: "post",
      url: "https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-v2",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setRounds(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getRoundsData();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      getRoundsData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  console.log(rounds, "this is ");
  return (
    <div className="App">
      {rounds.data && rounds.data.rounds && (
        <TimerDemo lockAt={rounds.data.rounds[1].lockAt} />
      )}
    </div>
  );
}

export default App;
