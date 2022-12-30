import { Link, Outlet } from 'react-router-dom';
import './static/App.css';
import { ConnectButton, useWallet } from '@mysten/wallet-kit';
import { GeistProvider, CssBaseline, Page, Grid, Spacer, Button } from '@geist-ui/core';
import { JsonRpcProvider, Network } from '@mysten/sui.js';

export const App = () => {
  const wallet = useWallet();
  const provider = new JsonRpcProvider(Network.DEVNET)

  return (
    <GeistProvider>
      <CssBaseline />
      <Page className="zombies-bg">
        <Grid.Container gap={1} justify="center">
          <Grid xs={20} />
          <Grid xs={4}>
            <ConnectButton />
          </Grid>
        </Grid.Container>
        <Spacer h={3} />
        <Grid.Container gap={2} justify="center">
          <Grid xs={4}>
            <Link to="/">
              <button className="start-course-btn">僵尸军团</button>
            </Link>
          </Grid>
          <Grid xs={4}>
            <Link to="/my-zombie">
              <button className="start-course-btn">我的僵尸</button>
            </Link>
          </Grid>
          <Grid xs={8} />
          <Grid xs={4}>
            <Link to="/zombie-market">
              <button className="start-course-btn">僵尸市场</button>
            </Link>
          </Grid>
          <Grid xs={4}>
            <Link to="/zombie-simulator">
              <button className="start-course-btn">基因模拟</button>
            </Link>
          </Grid>
        </Grid.Container>
        {wallet.connected &&
          <Outlet context={[wallet, provider]} />
        }
      </Page>
    </GeistProvider>
  )
}
