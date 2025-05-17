import React from "react";
import { Wallet } from "../assets";
import Modal from "./Modal";

const WalletModal = ({ modalOpen, onClose }) => {
  return (
    <Modal title={"Choose Wallet"} isOpen={modalOpen} onClose={onClose}>
      <div className="">
        <h3 className="-mt-2 text-xs text-[#535354]">
          Easily link your digital wallet to get started
        </h3>
        <div className="my-7">
          <div className="bg-[#0F1D45] text-white px-4 py-1 mb-3 flex items-center justify-between rounded-xl ">
            <div className="flex items-center gap-x-3">
              <img src={Wallet} alt="wallet" className="w-[32px]" />
              <h4 className="">Coinbase</h4>
            </div>
            <div className="rounded-full w-[17px] h-[17px] border border-[#535354]"></div>
          </div>
          <div className="bg-[#0F1D45] text-white px-4 py-2 mb-3 flex items-center justify-between rounded-xl ">
            <div className="flex items-center gap-x-3">
              <img src={Wallet} alt="wallet" className="w-[32px]" />
              <h4 className="">Metamask</h4>
            </div>
            <div className="rounded-full w-[17px] h-[17px] border border-[#535354]"></div>
          </div>
          <p className="text-gray-400 text-xs py-1.5 md:text-sm">
            If you don’t have a wallet, select a provider and create one now.{" "}
            <span>Learn more</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default WalletModal;
