import { Warning } from "../assets";
import Modal from "./Modal";

const WarningModal = ({ modalOpen, onClose }) => {
  return (
    <Modal isOpen={modalOpen} onClose={onClose}>
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src={Warning}
          alt="warning"
          className="w-[40px] md:w-[55px] animate-scale"
        />
        <h4 className="text-[#A31111] mt-4 mb-3 font-semibold text-lg md:text-xl">
          High Alert
        </h4>
        <p className="text-center text-[#FBB2B2] text-xs md:text-sm">
          Our AI detected a potential mismatch between the wallet address and
          the selected network. Please double-check the recipient address before
          proceeding.
        </p>
        <p className="text-xs mt-3 text-center text-[#A6A7A7]">
          By clicking <span className="text-[#8038EF]">“Continue,”</span> you
          confirm that this transaction is correct. Changed your mind? You can
          reverse it within <span className="text-[#8038EF]">30 seconds</span>.
        </p>
        <div className="flex items-center mt-5 flex-col">
          <button
            className="bg-[#1E3A8A] px-4 cursor-pointer rounded-md py-1.5 text-white text-sm"
            onClick={onClose}
          >
            Cancel Payment
          </button>
          <button className="border border-[#1E3A8A] py-1.5 px-4 cursor-pointer rounded-md mt-3 text-white text-sm">
            Continue anyway
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
