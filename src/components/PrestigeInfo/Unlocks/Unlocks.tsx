import React, { FC } from "react";

import { useSocketCtx } from "../../../context/SocketContext";
import { useTrackedState } from "../../../context/store";
import { formatNumber } from "../../../helpers/formatNumber";

const UNLOCK_MULTIPLIER = [0, 0.05, 0.25, 0.5, 0.75, 1];

const UNLOCKS = [
  {
    label: "5%",
    cost: 11,
  },
  { label: "25%", cost: 1111 },
  { label: "50%", cost: 111111 },
  { label: "75%", cost: 11111111 },
  { label: "100%", cost: 1111111111 },
];

const Unlocks: FC = () => {
  const { player, gameMode } = useTrackedState();
  const { socket } = useSocketCtx();

  return (
    <>
      <div>Prestige multiplier: {player.prestige.level}%</div>
      <div>
        Effective multiplier:{" "}
        {UNLOCK_MULTIPLIER[player.prestige.unlocked] * player.prestige.level}%
      </div>
      <hr />
      <div>
        Multiplier unlocked: {UNLOCK_MULTIPLIER[player.prestige.unlocked] * 100}
        %
      </div>

      {UNLOCKS.map((c, i) => {
        if (i < player.prestige.unlocked) return;

        return (
          <button
            type="button"
            key={c.label}
            onClick={() => {
              socket.emit("prestige_upgrade", { room: gameMode });
            }}
            disabled={player.prestige.unlocked < i || player.cookies < c.cost}
          >
            Unlock {c.label} for {formatNumber(c.cost)} points
          </button>
        );
      })}
    </>
  );
};

export default Unlocks;
