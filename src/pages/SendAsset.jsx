import { useEffect, useState } from "react";
import { SUI } from "../assets";
import { Dropdown } from "../components";

const SendAsset = ({ quickSendData }) => {
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [note, setNote] = useState("");
  const [network, setNetwork] = useState(""); // Assuming dropdown updates this

  useEffect(() => {
    // Prefill logic from quickSend
    if (quickSendData) {
      setAmount(quickSendData.amount || "");
      setReceiver(quickSendData.receiver || "");
      setNote(quickSendData.note || "");
      setNetwork(quickSendData.network || "");
    }
  }, [quickSendData]);

  return (
    <div className="w-full text-white pb-4">
      <h2 className="text-xl md:text-2xl font-semibold">Send Assets</h2>

      <div className="py-5">
        <h4 className="text-sm">Saved Addresses</h4>
        <div className="mt-1.5">
          <div className="flex items-center w-fit border border-[#1E3A8A] gap-x-2 px-2 bg-[#FFFFFF1A] py-1.5 rounded-2xl justify-between">
            <div className="flex items-center gap-x-1">
              <div className="rounded-full w-5 h-5 border border-[#1E3A8A]" />
              <h4 className="text-sm">Naruto</h4>
            </div>
            <p className="text-sm text-[#3BC44B]">0x93...7fE1</p>
            <div className="flex items-center gap-x-1">
              <img src={SUI} alt="icon" className="w-[20px]" />
              <h5>Sui</h5>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-8 py-4 w-full rounded-2xl border border-[#1E3A8A]">
          <div className="w-[96%] mx-auto">
            <h3 className="text-lg md:text-xl font-semibold">Send Asset</h3>

            <div className="mt-4 w-full gap-3 md:gap-10 grid grid-cols-1 md:grid-cols-2">
              {/* Amount Field */}
              <div className="flex flex-col w-full">
                <label className="text-[#7D7D7E]">Amount</label>
                <div className="bg-white flex mt-1.5 items-center px-3 rounded-3xl py-2 justify-between gap-2">
                  <Dropdown color="#E0E3E7" text="#535354" />
                  <input
                    type="text"
                    className="text-sm outline-0 text-[#7D7D7E] w-full text-center bg-transparent"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button
                    className="bg-[#9960F2] px-3 py-1 rounded-lg text-white"
                    onClick={() => setAmount("5.4")} // Example max logic
                  >
                    max
                  </button>
                </div>
                <div className="flex items-center text-[#9960F2] pt-1 justify-end gap-2">
                  <h4 className="text-xs md:text-sm">SUI Balance:</h4>
                  <h4 className="text-xs md:text-sm">5.4 SUI</h4>
                </div>
              </div>

              {/* Network Field */}
              <div className="flex flex-col w-full">
                <label className="text-[#7D7D7E]">Network</label>
                <div className="bg-white mt-1.5 px-3 rounded-3xl py-2 w-full">
                  <Dropdown
                    fullWidth
                    value={network}
                    onChange={(val) => setNetwork(val)}
                    color="#E0E3E7"
                    text="#535354"
                  />
                </div>
              </div>

              {/* Receiver Address Field */}
              <div className="flex flex-col w-full">
                <label className="text-[#7D7D7E]">Receiver Address</label>
                <div className="bg-white mt-1.5 px-3 rounded-3xl py-3 w-full">
                  <input
                    type="text"
                    className="text-sm outline-0 text-[#7D7D7E] w-full bg-transparent"
                    placeholder="Enter receiver address"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>
              </div>

              {/* Note Field */}
              <div className="flex flex-col w-full">
                <label className="text-[#7D7D7E]">Note</label>
                <div className="bg-white mt-1.5 px-3 rounded-3xl py-3 w-full">
                  <input
                    type="text"
                    className="text-sm outline-0 text-[#7D7D7E] w-full bg-transparent"
                    placeholder="Input note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="flex items-center gap-3 bg-[#FFFFFF0D] px-5 rounded-3xl py-2 my-5">
              <div className="border-2 font-semibold h-6 w-6 p-1 border-[#A7880E] text-[#A7880E] flex items-center justify-center text-xl rounded-full">
                i
              </div>
              <p className="text-[#A7880E] text-xs md:text-sm">
                Your transaction will be verified by our AI for accuracy before
                it’s sent. No personal data is stored or shared.
              </p>
            </div>

            {/* Submit Button */}
            <div className="w-[65%] md:w-[45%] lg:w-[30%] mt-6 mx-auto flex items-center justify-center">
              <button className="bg-[#1E3A8A] py-2 w-[80%] rounded-md">
                Send Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendAsset;
