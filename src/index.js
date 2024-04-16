import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
const pca = new PublicClientApplication({
  auth: {
    clientId: "69ac61a5-9a78-4638-8fe2-512599803ebe",
    authority:
      "https://login.microsoftonline.com/b907d549-84e1-4733-b7be-d459594670c4",
    redirectUri: "/",
  },
});

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    console.log(event);
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App msalInstance={pca} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
