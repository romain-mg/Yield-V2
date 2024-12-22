"use client";

import { useContext, useEffect } from "react";
import { WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthContext } from "@/app/contexts/web3auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "../components/navbar";
import Image from "next/image";

function Login() {
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

  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-2 justify-center items-center p-32 gap-32">
        <div className="text-center">
          <p className="text-6xl font-bold">
            WELCOME ON YIELD, THE ROBINHOOD OF FINANCE
          </p>
          <p className="text-3xl mt-16">
            Earn the Highest Interest Rate on your Savings while Minimizing Risk
          </p>
          <Button
            className="w-full mt-32 bg-red-600 hover:bg-red-500"
            onClick={login}
          >
            Sign In with Google
          </Button>
        </div>

        <Image
          src="/interest.png"
          width={800}
          height={500}
          alt="Picture of the interest rates"
        />
      </main>
    </>
  );
}

export default Login;
