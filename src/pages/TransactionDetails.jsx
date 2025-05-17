import { useLocation } from "react-router";

const TransactionDetails = () => {
  const { state: tx } = useLocation();

  const isWarning = tx.aiStatus === "Warning Detected";
  return (
    <div className="bg-[#0A132E] p-3 md:p-6 rounded-xl text-white w-full  mx-auto">
      <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
      <div className="border border-[#1E3A8A] rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <span className=" bg-green-200 text-green-800 px-2 py-1 text-xs rounded-full">
            {tx.status}
          </span>
          <span className="mt-1 text-xs text-gray-300">
            April 30, 2025 • 3:42 PM
          </span>
          <div className="flex mt-3 items-center w-fit px-1.5 gap-2 py-1 rounded-2xl bg-[#E0E3E780]">
            <img src={tx.tokenIcon} alt="icon" />
            <h4 className="text-white text-xs md:text-sm font-semibold">{tx.name}</h4>
          </div>
        </div>
        <div className="flex items-center gap-4" >
          <div className="border border-[#1E3A8A] h-7 w-7 md:w-9 md:h-9 flex items-center justify-center rounded-full"> </div>
          <div className="border border-[#1E3A8A] h-7 w-7 md:w-9 md:h-9 flex items-center justify-center rounded-full"> </div>
        </div>
        </div>

        <div className="bg-[#1C2541] text-sm px-3 py-2 rounded-md flex justify-between">
          <span>Amount Sent</span>
          <span>{tx.amount}</span>
        </div>

        <div className="bg-[#1C2541] text-sm px-3 py-2 rounded-md flex justify-between">
          <span>Gas Fee</span>
          <span>0.002 ETH</span>
        </div>

        <div className="bg-[#1C2541] text-sm px-3 py-2 rounded-md flex justify-between">
          <span>Sender Address</span>
          <span className="text-blue-400">0x3a9F...92B4</span>
        </div>

        <div className="bg-[#1C2541] text-sm px-3 py-2 rounded-md flex justify-between">
          <span>Receiver Address</span>
          <span className="text-blue-400">0xAbC7...E91F</span>
        </div>

        <div className="bg-[#1C2541] text-sm px-3 py-2 rounded-md flex justify-between">
          <span>Chain Network</span>
          <span>{tx.network}</span>
        </div>

        <div className="bg-[#1C2541] text-sm px-3 py-2 rounded-md">
          <span className="block mb-1 text-gray-400">Note</span>
          <p>
            dui. hendrerit Nunc viverra sapien ullamcorper quam malesuada
            tincidunt laoreet eu consectetur placerat.
          </p>
        </div>

        {isWarning ? (
          <div className="bg-red-100 border border-red-500 text-red-800 text-sm rounded-md px-3 py-2">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <span>⚠️</span>
                Warning Detected
              </span>
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                Reversible
              </span>
            </div>
            <div className="text-xs text-gray-600 mt-1">⏱️ 00:00:12</div>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-500 text-green-800 text-sm rounded-md px-3 py-2">
            <h2 className="">AI status</h2>
            <span>✅ Verified</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
