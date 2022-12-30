import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { WalletKitProvider } from '@mysten/wallet-kit';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletKitProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </WalletKitProvider>
  </React.StrictMode>,
)
