import React, { FC, useState } from "react";

import { useTrackedState } from "../../context/store";

import Lock from "../Icons/Lock";
import Modal, { useModal } from "../Modal";

import Burn from "./Burn";
import Hold from "./Hold";
import Farm from "./Farm";

import { BoostTiles, BoostButton, Label, Boost } from "./styled";

const getModalContent = (content?: string, verseHolder?: boolean) => {
  switch (content) {
    case "burn":
      return {
        title: "Burn to earn (BETA)",
        component: <Burn />,
      };
    case "hold":
      return {
        title: verseHolder ? "You hold verse." : "Get 10x CPC multiplier",
        component: <Hold />,
      };
    case "farm":
      return {
        title: "Double CPS!",
        component: <Farm />,
      };
    default:
      return null;
  }
};

const Boosts: FC = () => {
  const [content, setContent] = useState<string>();
  const { modalRef, showModal } = useModal();
  const { player } = useTrackedState();

  const modalContent = getModalContent(content, player.verseHolder);

  return (
    <>
      Boost your point
      <BoostTiles>
        <BoostButton
          onClick={() => {
            setContent("hold");
            showModal();
          }}
          $hasBonus={player.verseHolder}
        >
          <Label $unlocked={player.verseHolder}>Hold</Label>
          <Boost $unlocked={player.verseHolder}>10x boost</Boost>
        </BoostButton>
        <BoostButton
          onClick={() => {
            setContent("burn");
            showModal();
          }}
        >
          <Lock />
          <Label $unlocked={false}>Burn</Label>
          <Boost $unlocked={false}>10x boost</Boost>
        </BoostButton>
        <BoostButton
          onClick={() => {
            setContent("farm");
            showModal();
          }}
        >
          <Label $unlocked={false}>Farm</Label>
          <Boost $unlocked={false}>10x boost</Boost>
        </BoostButton>
      </BoostTiles>
      <Modal
        modalRef={modalRef}
        onClose={() => setContent(undefined)}
        title={modalContent?.title}
      >
        {modalContent?.component}
      </Modal>
    </>
  );
};

export default Boosts;
