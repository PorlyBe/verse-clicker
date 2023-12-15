import React, { FC, useCallback } from "react";
import { useAccount, useNetwork } from "wagmi";
import { useDispatch, useTrackedState } from "../../../context/store";
import { formatNumber } from "../../../helpers/formatNumber";
import truncateEthAddress from "../../../helpers/truncateEthAddress";
import {
  Avatar,
  Connected,
  Header,
  HeaderRow,
  NetworkImage,
  ButtonsWrapper,
  SettingsButton,
} from "./styled";

import { Points } from "../../GameBoard/PointsDisplay/styled";
import SoundOff from "../../Icons/SoundOff";
import SoundOn from "../../Icons/SoundOn";
import Reset from "../../Icons/Reset";
import PointsIcon from "../../PointsIcon";

import { useSocketCtx } from "../../../context/SocketContext";
import { useModal } from "../../Modal";
import ConfirmModal from "./ConfirmModal";
import { getNetworkImage } from "../../../helpers/getNetworkImage";

const Settings: FC = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { player, settings, gameMode } = useTrackedState();
  const dispatch = useDispatch();
  const { socket } = useSocketCtx();
  const { modalRef, showModal, close } = useModal();

  const resetScore = useCallback(() => {
    if (!gameMode || !address) return;
    socket.emit("wipe_save", { address, chain: gameMode });
    close();
    dispatch({ type: "RESET_GAME" });
  }, [gameMode, address]);

  return (
    <>
      <Header>
        <HeaderRow>
          <Avatar />
          <Connected>Connected</Connected>
        </HeaderRow>

        <HeaderRow>
          <div>{truncateEthAddress(address || "")}</div>

          {chain && (
            <NetworkImage src={getNetworkImage(chain.id)} alt={chain?.name} />
          )}
        </HeaderRow>
      </Header>

      <Points style={{ alignSelf: "flex-start" }}>
        <PointsIcon size={32} />
        {formatNumber(player.cookies)}
      </Points>

      <ButtonsWrapper>
        <SettingsButton
          onClick={() => {
            dispatch({
              type: "SET_SETTINGS",
              payload: { sound: !settings.sound },
            });
          }}
        >
          {settings.sound ? (
            <>
              <SoundOn size="2rem" />
              Mute
            </>
          ) : (
            <>
              <SoundOff size="2rem" />
              Unmute
            </>
          )}
        </SettingsButton>

        <SettingsButton onClick={showModal}>
          <Reset size="2rem" />
          Reset score
        </SettingsButton>
      </ButtonsWrapper>
      <ConfirmModal modalRef={modalRef} close={close} resetScore={resetScore} />
    </>
  );
};

export default Settings;
