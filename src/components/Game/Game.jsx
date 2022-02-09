import React, { useEffect, useContext } from "react";
import { BiSave } from "react-icons/bi";

import Button from "../Button";
import GameContext from "./GameContext";

import "./Game.css";

const Game = () => {
  const { gold, setGold, goldPerSecond, saveGame, setGoldPerSecond } =
    useContext(GameContext);

  function tick() {
    setGold(gold + goldPerSecond);
  }

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="game">
      {/* Give your actionButton a name lol */}

      <div className="gamePrompts">
        <h3 className="">Would you like to play a game?</h3>
      </div>

      <div className="gameFrame">Coins: {gold}</div>

      <div className="actionButton"></div>

      <Button className="saveButton" onClick={saveGame}>
        <BiSave />
      </Button>
    </div>
  );
};

export default Game;
