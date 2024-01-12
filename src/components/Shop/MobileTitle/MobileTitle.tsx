import React, { FC } from "react";

import { H2 } from "../../H2";
import Cross from "../../Icons/Cross";
import { CloseButton, ModalTitle } from "./styled";

interface Props {
  setIsOpen: (open: boolean) => void;
  title: string;
}

const MobileTitle: FC<Props> = ({ setIsOpen, title }) => {
  return (
    <ModalTitle>
      <H2>{title}</H2>
      <CloseButton onClick={() => setIsOpen(false)}>
        <Cross />
      </CloseButton>
    </ModalTitle>
  );
};

export default MobileTitle;
