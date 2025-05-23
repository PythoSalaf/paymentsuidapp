import { Pending } from "../assets";
import Modal from "./Modal";

const PendingModal = ({ modalOpen, onClose }) => {
  return (
    <Modal isOpen={modalOpen} onClose={onClose}>
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src={Pending}
          alt="warning"
          className="w-[40px] md:w-[55px] animate-scale"
        />
        <h4 className="text-[#FBD43C] mt-4 mb-3 font-semibold text-lg md:text-xl">
          Payment Pending
        </h4>
        <p className="text-xs mt-3 text-center text-[#FDEEB1]">
          This Payment is Pending and you will be notified when its successful
        </p>
        <div className="flex items-center mt-5 flex-col">
          <button
            className="bg-[#1E3A8A] px-4 cursor-pointer rounded-md py-1.5 text-white text-sm"
            onClick={onClose}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PendingModal;
