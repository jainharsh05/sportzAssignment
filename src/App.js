import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState([]);
  const [search, setSearch] = useState("");
  const [tName, setTName] = useState("");
  const getResult = async () => {
    const result = await fetch(`https://api.npoint.io/20c1afef1661881ddc9c`);
    const response = await result.json();
    return response;
  };

  useEffect(() => {
    const result = getResult();
    result.then((data) => setPlayer(data));
  }, []);

  // let playerArray = player.playerList || [];
  let playerArray =
    player?.playerList?.length > 0
      ? player?.playerList?.filter((el) => {
          if (search === "" && tName === "") {
            return true;
          } else {
            if (Boolean(Boolean(search && tName))) {
              return (
                Boolean(
                  el.PFName.toLowerCase().startsWith(search.toLowerCase())
                ) &&
                Boolean(el.TName.toLowerCase().startsWith(tName.toLowerCase()))
              );
            } else if (Boolean(search)) {
              return Boolean(
                el.PFName.toLowerCase().startsWith(search.toLowerCase())
              );
            } else {
              return Boolean(
                el.TName.toLowerCase().startsWith(tName.toLowerCase())
              );
            }
          }
        })
      : [];

  const formatDate = (matchDate) => {
    var date = new Date(`${matchDate} UTC`);
    let converteddate = new Date(date.toString());
    const time = converteddate.toLocaleTimeString();
    const year = converteddate?.getFullYear();
    const month =
      converteddate?.getMonth() + 1 > 9
        ? converteddate?.getMonth() + 1
        : `0${converteddate?.getMonth() + 1}`;
    const Mdate =
      converteddate?.getDate() > 9
        ? converteddate?.getDate()
        : `0${converteddate?.getDate()}`;
    return `${Mdate}-${month}-${year} ${time}`;
  };

  const handleSearchPFName = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchTName = (e) => {
    setTName(e.target.value);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="pfName"
        onChange={(e) => handleSearchPFName(e)}
      />
      <input
        type="text"
        placeholder="tName"
        onChange={(e) => handleSearchTName(e)}
      />
      <div className="gridClass">
        {playerArray
          .sort((a, b) => a.Value > b.Value)
          .map((play) => {
            return (
              <div key={play.Id} className="card" style={{ width: "18rem" }}>
                <img
                  src={`${play?.Id}.jpg`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{play?.PFName}</h5>
                  <p className="card-text">{play?.SkillDesc}</p>
                  <p className="card-text">{play?.Value} $</p>
                  <div className="card-text">
                    upComing Match =
                    {play.UpComingMatchesList.map((el) => {
                      return (
                        <React.Fragment key={el.TID}>
                          <p>{el.VsCCode} v/s</p>
                          <p>{el.CCode}</p>
                          <p>Match Date and time ={formatDate(el.MDate)}</p>
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
