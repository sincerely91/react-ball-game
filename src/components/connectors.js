import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const RPC_URL_1 =
  "https://mainnet.infura.io/v3/e2d4593179fa4120a217d136a0518efc";
const RPC_URL_4 =
  "https://ropsten.infura.io/v3/e2d4593179fa4120a217d136a0518efc";

const RPC_URLS = {
  1: RPC_URL_1,
  4: RPC_URL_4,
};

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  qrcode: true,
});

export const resetWalletConnector = (connector) => {
    if (connector && connector instanceof WalletConnectConnector) {
        connector.walletConnectProvider = undefined;
    }
};
