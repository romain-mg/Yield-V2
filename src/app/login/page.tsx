"use client";

import { useContext, useEffect, useState } from "react";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";

import { Web3AuthContext } from "@/app/contexts/web3auth";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const { web3auth, provider, setProvider, loggedIn, setLoggedIn } =
    useContext(Web3AuthContext);

  useEffect(() => {
    const init = async () => {
      try {
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    // IMP START - Login
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "google",
    });
    // IMP END - Login
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
      router.push("/dashboard");
    }
  };

  return <button onClick={login}>Log In</button>;
}

export default Login;
