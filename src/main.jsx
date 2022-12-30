import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import { Router } from "./router";
import { WalletKitProvider } from '@mysten/wallet-kit';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletKitProvider>
      <HashRouter>
        <Router />
      </HashRouter>
    </WalletKitProvider>
  </React.StrictMode>,
)
