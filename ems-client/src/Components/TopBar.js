import React from "react";
import styled from "styled-components";
import HamburgerMenu from "./HamburgerMenu";
import { useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #d11d1d;
  height: 50px;
  padding: 0 20px;
  position: fixed;
  width: 100%;
  box-sizing: border-box; 
  top: 0;
  z-index: 1001;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: white;
  margin-left: 10px;
`;

// const Spacer = styled.div`
//   flex: 1;
// `;

const LogoutIcon = styled.span`
  cursor: pointer;
  font-size: 16px;
  color: white;
  margin-left: auto;

  &:hover {
    text-decoration: underline;
  }
`;

function TopBar({onMenuClick}) {
  const client = useApolloClient();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    // 1. Remove token
    localStorage.removeItem("token");

    // 2. Clear Apollo cache
    await client.clearStore();

    // 3. Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <TopBarContainer>
      <HamburgerMenu onClick={onMenuClick}/>
      <Logo>EMS Logo</Logo>
      <LogoutIcon onClick={handleLogout} title="Logout">🚪 Logout</LogoutIcon>
    </TopBarContainer>
  );
}

export default TopBar;