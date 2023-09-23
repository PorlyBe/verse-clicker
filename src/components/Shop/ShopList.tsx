import React, { FC } from "react";
import styled from "styled-components";
import { useDispatch, useTrackedState } from "../../context/store";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  overflow-x: auto;
`;

const Button = styled.button<{ selected: boolean }>`
  box-sizing: border-box;
  border: none;
  outline: none;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  text-align: left;
  font-weight: 600;
  display: grid;
  min-width: 10rem;
  overflow-wrap: anywhere;

  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  background: ${({ selected }) => (selected ? "cornflowerblue" : "aliceblue")};
  color: ${({ selected }) => (selected ? "white" : "black")};

  &:disabled {
    cursor: default;
    background: lightgrey;
    color: black;
    filter: blur(4px);
  }
`;

const ShopList: FC = () => {
  const { buildings, currentBuilding } = useTrackedState();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      {buildings.map((building, i) => {
        return (
          <Button
            key={i}
            selected={building.name === currentBuilding}
            disabled={building.locked}
            onClick={() =>
              dispatch({ type: "SET_BUILDING", payload: building.name })
            }
          >
            {building.name}
          </Button>
        );
      })}
    </Wrapper>
  );
};

export default ShopList;
