"use client";

import { useContext, useEffect, useState } from "react";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";

import RPC from "@/app/wallet/ethersRPC";
import { Web3AuthContext } from "@/app/contexts/web3auth";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();
  const {
    web3auth,
    provider,
    setProvider,
    loggedIn,
    setLoggedIn,
    initiated,
    setInitiated,
  } = useContext(Web3AuthContext);

  useEffect(() => {
    const init = async () => {
      try {
        if (!initiated) {
          await web3auth.init();
          setInitiated(true);
        }
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  return <div></div>;
}

export default App;
