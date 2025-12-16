import React from "react";
import styled from "styled-components";

const MenuButtonContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const MenuButton = styled.div`
  width: 30px;
  height: 3px;
  background-color: white;
  position: relative;
  cursor: pointer;
  margin-right: 10px;

  &::before,
  &::after {
    content: "";
    width: 30px;
    height: 3px;
    background-color: white;
    position: absolute;
    left: 0;
    border-radius: 25px 25px 25px 25px;
  }

  &::before {
    top: -10px;
  }

  &::after {
    top: 10px;
  }
`;

function HamburgerMenu({onClick}) {
  return <MenuButtonContainer onClick={onClick}>
          <MenuButton />
        </MenuButtonContainer>
  
}

export default HamburgerMenu;