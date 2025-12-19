import React, { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "../graphql/authMutations";
import styled from "styled-components";
import {setSessionItemWithExpiry, setLocalStorageItemWithExpiry} from "../Utils/Session";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #212121;
`;

const Card = styled.div`
  background: #2a2a2a;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  color: white;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #800080;
  border: none;
  color: white;
  cursor: pointer;
`;

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await login({
      variables: { username, password },
    });
    
      const token = res.data.login.token;
      
      if (rememberMe) {
        setLocalStorageItemWithExpiry("token", token, 7 * 24 * 60 * 60 * 1000); // 7 days expiry for remember me
      } else {
        setSessionItemWithExpiry("token", token, 1 * 24 * 60 * 60 * 1000); // No expiry for session storage
      }

      onLogin();
    } catch (err) {
      // Error handling can be done here if needed
      console.log("Login failed: " + err.message);
    }
  };

  return (
    <Container>
      <Card>
        <h3>Login</h3>

        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          <Button type="submit" disabled={loading}>
            Login
          </Button>

          {error && <p style={{ color: "blue" }}>{error.message}</p>}
        </form>
      </Card>
    </Container>
  );
}

export default Login;