import React, { FC } from "react";
import { useTheme } from "styled-components";

import { useTrackedState } from "../../context/store";
import BonusContent from "./Bonus/BonusContent";
import NewUser from "./User/NewUser";
import ReturningUser from "./User/ReturningUser";
import { Moon, StyledButton } from "./styled";

interface Props {
  close: () => void;
  sidebar?: boolean;
}

const Content: FC<Props> = ({ close, sidebar }) => {
  const { player, bonusData } = useTrackedState();
  const { moon } = useTheme();

  return (
    <>
      <Moon src={moon} />
      {bonusData ? (
        <BonusContent />
      ) : (
        <>
          {sidebar || !player.cookies ? <NewUser /> : <ReturningUser />}
          <StyledButton onClick={close}>Play</StyledButton>
        </>
      )}
    </>
  );
};

export default Content;
