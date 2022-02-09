import React, { useEffect, createContext, useState } from "react";

const GameContext = createContext({
  gold: 0,
  goldPerSecond: 0,
  goldPerClick: 1,
});

function GameProvider({ children }) {
  const [gold, setGold] = useState(0);
  const [goldPerSecond, setGoldPerSecond] = useState(0);
  const [goldPerClick, setGoldPerClick] = useState(1);

  useEffect(() => {
    const profile = JSON.parse(window.localStorage.getItem("gameProfile"));

    profile?.gold ? setGold(profile.gold) : setGold(0);
  }, []);

  function incrementGold() {
    setGold(gold + goldPerClick);
  }

  function saveGame() {
    const profile = {
      gold,
    };

    localStorage.setItem("gameProfile", JSON.stringify(profile));
  }

  return (
    <GameContext.Provider
      value={{
        gold,
        setGold,
        goldPerSecond,
        setGoldPerSecond,
        goldPerClick,
        setGoldPerClick,
        incrementGold,
        saveGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;

export { GameProvider };
