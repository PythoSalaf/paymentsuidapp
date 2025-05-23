import { Success } from "../assets";
import Modal from "./Modal";

const SuccessModal = ({ modalOpen, onClose }) => {
  return (
    <Modal isOpen={modalOpen} onClose={onClose}>
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src={Success}
          alt="warning"
          className="w-[40px] md:w-[55px] animate-scale"
        />
        <h4 className="text-[#3BC44B] mt-4 mb-3 font-semibold text-lg md:text-xl">
          Payment Successful
        </h4>
        <p className="text-xs mt-3 text-center text-[#B1E7B7]">
          Your payment has been sent sucessfully
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

export default SuccessModal;
