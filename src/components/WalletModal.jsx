import Modal from "./Modal";
import { useSuiWallet } from "../Context/ContextApi";

const WalletModal = ({ modalOpen, onClose }) => {
  const { wallets, connect, walletName, loading } = useSuiWallet();

  const handleConnect = (wallet) => {
    if (loading || walletName === wallet.name) return;
    connect(wallet); // Pass the wallet object, not just the name
    onClose();
  };

  return (
    <Modal isOpen={modalOpen} onClose={onClose}>
      <div className="">
        <h2 className="text-lg font-semibold text-white mb-3">
          Connect Wallet
        </h2>
        <h3 className="-mt-2 text-xs text-[#535354]">
          Easily link your digital wallet to get started
        </h3>
        <div className="my-7">
          {wallets.length > 0 ? (
            wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleConnect(wallet)}
                className={`w-full text-white px-4 py-2 mb-3 flex items-center justify-between rounded-xl transition duration-200 ${
                  walletName === wallet.name
                    ? "bg-green-700"
                    : "bg-[#0F1D45] hover:bg-[#1a2c66]"
                }`}
              >
                <div className="flex items-center gap-x-3">
                  <img
                    src={wallet.icon || "/default-wallet.png"} // fallback if icon is missing
                    alt={wallet.name}
                    className="w-[32px] h-[32px] object-contain"
                  />
                  <h4 className="text-sm">{wallet.name}</h4>
                </div>
                <div className="rounded-full w-[17px] h-[17px] border border-[#535354]"></div>
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No wallets available</p>
          )}

          <p className="text-gray-400 text-xs py-1.5 md:text-sm">
            If you don’t have a wallet, select a provider and create one now.{" "}
            <span className="underline cursor-pointer">Learn more</span>
          </p>

          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-7 py-1 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
