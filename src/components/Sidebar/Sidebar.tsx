import React from "react";
import { SidebarButton, Wrapper } from "./styled";
import Trophy from "../Icons/Trophy";
import Info from "../Icons/Info";
import Gear from "../Icons/Gear";
// import Map from "../Icons/Map";
import Leaderboard from "./Leaderboard";
import Settings from "./Settings";
import NotificationContent from "../NotificationModal/Content";
import Modal from "../Modal";
import {
  SidebarModal,
  useSidebarModalCtx,
} from "../../context/SidebarModalContext";

const getModalContent = (close: () => void, content?: SidebarModal) => {
  switch (content) {
    case "LEADERBOARD":
      return {
        title: "Leaderboard",
        component: <Leaderboard />,
      };
    case "WELCOME":
      return {
        title: "Verse Clicker",
        component: <NotificationContent sidebar close={close} />,
      };

    /*   case "tour":
      break; */

    case "SETTINGS":
      return {
        title: "Account Information",
        component: <Settings />,
      };
    default:
      return null;
  }
};

const Sidebar = () => {
  const { modalRef, showModal, close, content, setContent } =
    useSidebarModalCtx();
  const modalContent = getModalContent(close, content);

  return (
    <>
      <Wrapper>
        <SidebarButton
          onClick={() => {
            setContent("LEADERBOARD");
            showModal();
          }}
        >
          <Trophy size="1rem" />
        </SidebarButton>
        <SidebarButton
          onClick={() => {
            setContent("WELCOME");
            showModal();
          }}
        >
          <Info size="1rem" />
        </SidebarButton>
        {/* <SidebarButton>
        <Map size="1rem" />
      </SidebarButton> */}
        <SidebarButton
          onClick={() => {
            setContent("SETTINGS");
            showModal();
          }}
        >
          <Gear size="1rem" />
        </SidebarButton>
      </Wrapper>
      <Modal
        modalRef={modalRef}
        onClose={() => setContent(undefined)}
        title={modalContent?.title}
        overlayClose
      >
        {modalContent?.component}
      </Modal>
    </>
  );
};

export default Sidebar;
