import React, { FC } from "react";
import styled from "styled-components";
import { useSharedState } from "../../context/store";

const DisplayWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;

  gap: 16px;
`;

const CookieCount = styled.h2`
  flex-basis: 100%;
  text-align: center;
`;

const StatCount = styled.div`
  font-weight: 600;
`;

const Display: FC = () => {
  const [state] = useSharedState();
  return (
    <DisplayWrapper>
      <CookieCount>Cookies: {state.cookies}</CookieCount>
      <StatCount>CPS: 0</StatCount>
      <StatCount>CPC: 1.0</StatCount>
    </DisplayWrapper>
  );
};

export default Display;
