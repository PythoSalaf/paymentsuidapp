import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useConnectWallet,
  useDisconnectWallet,
  useAccounts,
  useWallets,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

const ContextApi = createContext();

export const ContextApiProvider = ({ children }) => {
  const account = useCurrentAccount();
  const accounts = useAccounts();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const { mutate: connectWallet } = useConnectWallet();
  const { mutate: disconnectWallet } = useDisconnectWallet();
  const availableWallets = useWallets();

  const [walletName, setWalletName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const connect = useCallback(
    async (wallet) => {
      try {
        setLoading(true);
        setError("");
        connectWallet({ wallet });
        localStorage.setItem("wallet-name", wallet.name);
        setWalletName(wallet.name);
      } catch (err) {
        setError(err.message || "Connection failed");
      } finally {
        setLoading(false);
      }
    },
    [connectWallet]
  );
  const disconnect = useCallback(() => {
    disconnectWallet();
    localStorage.removeItem("wallet-name");
    setWalletName(null);
  }, [disconnectWallet]);

  const signAndExecuteTxn = useCallback(
    async (tx) => {
      if (!account) throw new Error("Wallet not connected");
      try {
        // Use the correct hook here
        return await signAndExecuteTransaction({
          transaction: tx,
        });
      } catch (err) {
        setError(err.message || "Transaction failed");
        throw err;
      }
    },
    [signAndExecuteTransaction, account]
  );

  useEffect(() => {
    const saved = localStorage.getItem("wallet-name");
    if (saved) connect(saved);
  }, [connect]);

  return (
    <ContextApi.Provider
      value={{
        account,
        walletName,
        wallets: availableWallets,
        loading,
        error,
        connect,
        disconnect,
        signAndExecuteTxn,
        isConnected: !!account,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useSuiWallet = () => {
  const ctx = useContext(ContextApi);
  if (!ctx)
    throw new Error("useSuiWallet must be used inside ContextApiProvider");
  return ctx;
};
