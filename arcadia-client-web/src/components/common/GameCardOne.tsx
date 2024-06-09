import React from "react";
import { FaConnectdevelop } from "react-icons/fa6";
import { PiMoneyLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IGameListingData } from "../../pages/Search";

export interface GameCardProps {
  gameData: IGameListingData;
}

const GameCardOne: React.FC<GameCardProps> = ({ gameData }) => {
  return (
    <Link to={`/listing/${gameData._id}`}>
      <div
        className={`flex flex-col max-w-[300px] gap-2 border rounded-lg hover:scale-105 transition-all duration-500 bg-white`}
      >
        <img
          src={gameData.imageUrls[0]}
          alt=""
          className="border rounded-t-lg h-full w-full"
        />
        <div className="flex flex-col p-3 gap-2">
          <p className="text-start truncate">{gameData.title}</p>
          <p className="text-start text-xs truncate flex flex-row gap-2 items-center">
            <FaConnectdevelop />
            {gameData.publisher}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {gameData.description}
          </p>
          <p className="text-start text-sm truncate flex flex-row gap-2 items-center text-green-700">
            <PiMoneyLight />
            {gameData.discountPrice} LKR
          </p>
        </div>
      </div>
    </Link>
  );
};

export default GameCardOne;
