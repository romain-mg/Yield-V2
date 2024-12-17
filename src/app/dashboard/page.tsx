"use client";

import { useContext, useEffect, useState } from "react";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";

import RPC from "@/app/wallet/ethersRPC";
import { Web3AuthContext } from "@/app/contexts/web3auth";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();
  const { web3auth, provider, setProvider, loggedIn, setLoggedIn } =
    useContext(Web3AuthContext);

  useEffect(() => {
    const init = async () => {
      try {
        setProvider(web3auth.provider);

        if (!web3auth.connected) {
          setLoggedIn(false);
          router.push("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information
    console.log(user);
  };

  // IMP START - Blockchain Calls
  // Check the RPC file for the implementation
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    console.log(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    console.log(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    console.log("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    console.log(transactionReceipt);
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setLoggedIn(false);
    console.log("logged out");
    router.push("/login");
  };

  return (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
