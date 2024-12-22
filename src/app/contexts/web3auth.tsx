"use client";

import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { createContext } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { useState, useContext } from "react";

const clientId =
  "BMLy0wtcB1j_vGRhCBrnCRfP7BFYqYLnhL1Oot8OH43CsYEcnA9n3iQ34Y8NAHRxKqJi92ut6Lm35ES8nbiNndA";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const authAdapter = new AuthAdapter();
web3auth.configureAdapter(authAdapter);

export const Web3AuthContext = createContext<any>(undefined);

export function Web3AuthWrapper({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [initiated, setInitiated] = useState(false);

  return (
    <Web3AuthContext.Provider
      value={{
        web3auth,
        provider,
        setProvider,
        loggedIn,
        setLoggedIn,
        initiated,
        setInitiated,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
}

export function useWeb3AuthContext() {
  return useContext(Web3AuthContext);
}
