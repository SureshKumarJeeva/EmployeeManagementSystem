import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router-dom";
import { HttpLink } from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import client from "./apolloClient";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
