import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate  } from "react-router-dom";
import styled from "styled-components";
import GridView from "./Components/GridView";
import DetailView from "./Components/DetailView";
import TopBar from "./Components/TopBar";
import Sidebar from "./Components/Sidebar";
import Login from "./pages/Login";
import {getSessionItemWithExpiry} from "./Utils/Session";

const TOPBAR_HEIGHT = 50;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #212121;
  font-family: Calibri, sans-serif;
  color: white;
`;

const MainContent = styled.div`
  display: flex;
  height: calc(100vh - ${TOPBAR_HEIGHT}px);
  margin-top: ${TOPBAR_HEIGHT}px;
  flex: 1;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
`;

const GridContainerWrapper = styled.div`
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  height: 100%;
  display: flex;
`;

const DetailContainerWrapper = styled.div`
  border-radius: 0 10px 10px 0;
  overflow: hidden;
  flex: 1;
`;

function App() {

  const isAuthenticated = !!getLocalStorageItemWithExpiry("token") || !!getSessionItemWithExpiry("token");
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLoginSuccess = () => {
    navigate("/", { replace: true });
  };
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login onLogin={handleLoginSuccess}/>} />

      {/* Protected route */}
      <Route
        path="/"
        element={
          isAuthenticated ? 
          <AppContainer>
            <TopBar onMenuClick={toggleSidebar}/>
              <Sidebar open={sidebarOpen}  onClose={() => setSidebarOpen(false)}/>
            <MainContent sidebarOpen={sidebarOpen}>
              <GridContainerWrapper>
                <GridView onSelectItem={setSelectedItem} />
              </GridContainerWrapper>
              <DetailContainerWrapper>
                <DetailView item={selectedItem} />
              </DetailContainerWrapper>
            </MainContent>
          </AppContainer>
           : <Navigate to="/login" replace />
        }
      />

      {/* Optional: catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
  
}

export default App;