import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const POLLING_INTERVAL = 30000;

export const injected = new InjectedConnector({
  supportedChainIds: [43113]
});

export const walletconnect = new WalletConnectConnector({
  infuraId: undefined,
  rpc: { 43113: 'https://api.avax-test.network/ext/bc/C/rpc' },
  supportedChainIds: [43113],
  chainId: 43113,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const chains = {
  "0xA869": {
    chainId: '0xA869',
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/']
  },
};

