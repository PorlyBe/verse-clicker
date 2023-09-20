import React, { FC } from "react";
import { useDispatch, useTrackedState } from "../context/store";
import { useAccount } from "wagmi";

const Save: FC = () => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { error } = useTrackedState();
  console.log(error);
  return (
    <div style={{ display: "flex", gap: 16, padding: "16px 0" }}>
      <button
        type="button"
        onClick={() => {
          if (!address) return;

          dispatch({
            type: "SAVE_GAME",
            payload: {
              address,
            },
          });
          console.log("saving");
        }}
      >
        Save
      </button>
      <button
        type="button"
        onClick={() => {
          console.log("loading");
        }}
      >
        Load
      </button>
      <button
        type="button"
        onClick={() => {
          console.log("wiping");
        }}
      >
        Wipe
      </button>
    </div>
  );
};

export default Save;
