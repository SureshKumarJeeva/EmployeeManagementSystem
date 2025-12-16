import React, { useState } from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
  background: rgba(0, 0, 0, 0.5);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s ease;
  z-index: 999;
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 220px;
  height: calc(100vh - 50px);
  background-color: #212121;
  padding: 10px;
  z-index: 1000;

  transform: ${({ open }) =>
    open ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease;
`;

const MenuItem = styled.div`
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #d11d1d;
  }
`;

const SubMenu = styled.div`
  margin-left: 15px;
`;

function Sidebar({ open, onClose }) {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  return (
    <>
      <Backdrop open={open} onClick={onClose} />

      <SidebarContainer open={open}>
        <MenuItem onClick={() => setOpenSubMenu(!openSubMenu)}>
          Employees
        </MenuItem>

        {openSubMenu && (
          <SubMenu>
            <MenuItem onClick={onClose}>Employee List</MenuItem>
            <MenuItem onClick={onClose}>Add Employee</MenuItem>
          </SubMenu>
        )}

        <MenuItem onClick={onClose}>Departments</MenuItem>
        <MenuItem onClick={onClose}>Reports</MenuItem>
        <MenuItem onClick={onClose}>Settings</MenuItem>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;