import React, { FC, useEffect, useState } from "react";

import adBtc from "../assets/ad-btc.png";
import adCorbin from "../assets/ad-corbin.jpg";
import adGlobalists from "../assets/ad-globalists.jpg";
import styled from "styled-components";

const adlist = [adBtc, adCorbin, adGlobalists];

const AdWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  color: #899bb5;
  font-size: 0.75rem;
  font-weight: 400;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const AdImage = styled.img`
  width: 100%;
  height: auto;
  margin-top: 0.5rem;
`;

const Advertisement: FC = () => {
  const [rand, setRand] = useState(Math.floor(Math.random() * adlist.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setRand(Math.floor(Math.random() * adlist.length));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdWrapper>
      Advertisement
      <a
        href="https://youtu.be/dQw4w9WgXcQ?si=oXRVClQuVONile0S"
        target="_blank"
        rel="noreferrer"
      >
        <AdImage src={adlist[rand]} />
      </a>
    </AdWrapper>
  );
};

export default Advertisement;
