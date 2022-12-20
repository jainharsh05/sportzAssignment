import "./App.css";
import React, { useEffect, useState } from "react";
import useapi from "./hooks/useapi";
import getPlayer from "./api/getPlayer";
import Card from "./components/card";
import Input from "./components/Input";

function App() {
  const playerData = useapi(getPlayer);
  useEffect(() => {
    playerData.request();
  }, []);

  const [search, setSearch] = useState("");
  const [tName, setTName] = useState("");

  let playerArray =
    playerData?.data?.playerList?.length > 0
      ? playerData?.data?.playerList?.filter((el) => {
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

  const handleSearchPFName = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchTName = (e) => {
    setTName(e.target.value);
  };

  return (
    <div className="App">
      <div className="m-3 md:d-flex gap-3">
        <Input
          type="text"
          placeholder="Search Player Name"
          changehandler={(e) => handleSearchPFName(e)}
        />
        <Input
          type="text"
          placeholder="Search Team Name"
          changehandler={(e) => handleSearchTName(e)}
        />
      </div>

      <div className="gridClass mb-3">
        {playerArray
          .sort((a, b) => a.Value > b.Value)
          .map((play) => {
            return <Card key={play.Id} play={play} />;
          })}
      </div>
    </div>
  );
}

export default App;
