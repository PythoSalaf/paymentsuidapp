import { useState } from "react";
import { useNavigate } from "react-router";
import { Btc, Eth, Graph, Solana, USDC } from "../assets";
import { GoArrowUpRight } from "react-icons/go";
import { Dropdown } from "../components";
import { transactions } from "../components/Dummy";
const Dashboard = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);
  // const [network, setNetwork] = useState("");
  const [address, setAddress] = useState("");
  const handleClick = (tx) => {
    navigate(`/transaction/${tx.id}`, { state: tx });
  };
 const handleSend = () => {
  if (!amount || !address || !selectedToken) {
    alert("Please enter all fields.");
    return;
  }

  navigate("/send-asset", {
    state: {
      amount,
      address,
      token: selectedToken, // includes name, icon, etc.
    },
  });
};
  const availableAsset = [
    {
      id: 1,
      name: "USDC",
      amount: 1024.9,
      amountIn: 1025,
      icon: USDC,
      network: "On Sui network",
    },
    {
      id: 2,
      name: "ETH",
      amount: 924.9,
      amountIn: 925,
      icon: Eth,
      network: "On Eth network",
    },
  ];
  const otherAsset = [
    {
      id: 1,
      amount: 5.3,
      symbol: "BTC",
      icon: Btc,
    },
    {
      id: 2,
      amount: 4.5,
      symbol: "SOL",
      icon: Solana,
    },
  ];
  const statusColor = {
    Complete: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-800",
    Warning: "bg-red-100 text-red-600",
  };
  const walletColor = {
    Complete: " text-green-700",
    Pending: " text-yellow-500",
    Warning: " text-red-600",
  };
  return (
    <div className="w-full text-white pb-8">
      <div className="flex items-center gap-x-2">
        <h3>Assets</h3>
        <p className="bg-[#FFFFFF1A] text-[#9960F2] px-3 py-0.5 text-sm md:text-base rounded-2xl">
          3 Assets
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6 gap-6">
        <div className="w-[94%] mx-auto md:w-full bg-[#0F1D45] border border-[#1E3A8A] rounded-2xl py-3 ">
          <div className="w-[92%] mx-auto">
            <h3 className="text-sm md:text-base font-medium text-[#CFD0D1]">
              Total Portfolio value{" "}
            </h3>
            <div className="mt-2.5 flex items-start gap-x-1">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                $12,345.64
              </h2>
              <p className="bg-[#FFFFFF1A] text-[9px] rounded-xl px-1.5 py-0.5">
                updated 2 mins ago
              </p>
            </div>
            <h4 className="bg-[#FFFFFF1A] text-[#9960F2] text-sm rounded-2xl px-3 py-0.5 w-fit mt-1.5 mb-2.5">
              Across 3 networks
            </h4>
            <div className="mt-5">
              <img src={Graph} alt="" />
            </div>
          </div>
        </div>
        {availableAsset.map((item) => (
          <div
            className="hidden md:block w-[94%] mx-auto md:w-full bg-[#0F1D45] border border-[#1E3A8A] rounded-2xl py-3 "
            key={item.id}
          >
            <div className="w-[92%] mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <img
                    src={item.icon}
                    alt="usdc"
                    className="w-[30px] md:w-[35px]"
                  />
                  <h3 className="text-[#CFD0D1] text-base">{item.name}</h3>
                </div>
                <div className="border border-[#1E3A8A] w-8 h-8 rounded-full flex items-center justify-center">
                  <GoArrowUpRight />
                </div>
              </div>
              <p className="bg-[#FFFFFF1A] text-[#7D7D7E] mt-3 w-fit rounded-2xl px-2 py-0.5 text-xs">
                updated 2 mins ago
              </p>
              <div className="mt-6">
                <h3 className="text-[#7D7D7E] text-sm">Current Balance:</h3>
                <div className="my-3 flex items-center gap-x-3">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                    {item.amount}
                  </h2>
                  <h4 className="text-[#FACC15] uppercase font-bold text-lg md:text-xl">
                    {item.name}
                  </h4>
                </div>
                <div className="flex items-center gap-x-3">
                  <h5 className="text-sm md:text-base text-[#B287F5]">
                    ≈ ${item.amountIn}
                  </h5>
                  <p className="bg-[#FFFFFF1A] text-[#B287F5] text-xs px-2 rounded-2xl py-0.5">
                    {item.network}
                  </p>
                </div>
                <div className="flex items-center w-[95%] gap-3 mt-6 pb-2 mx-auto">
                  <button className="w-full bg-[#B287F5] text-base py-0.5 text-white rounded-xl">
                    Send
                  </button>
                  <button className="w-full border border-[#1E3A8A] py-0.5 rounded-xl text-base ">
                    Swap
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-[94%] hidden md:block mx-auto md:w-full bg-[#0F1D45] border border-[#1E3A8A] rounded-2xl py-3 ">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-[#CFD0D1] text-base">Other Assets</h3>
              <div className="border border-[#1E3A8A] w-8 h-8 rounded-full flex items-center justify-center">
                <GoArrowUpRight />
              </div>
            </div>

            {otherAsset.map((item) => (
              <div className="flex items-center gap-x-3 my-5" key={item.id}>
                <img src={item.icon} alt="icon" className="w-[35px]" />
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">
                  {item.amount}
                </h2>
                <h4 className="uppercase text-base md:text-lg font-bold">
                  {item.symbol}
                </h4>
              </div>
            ))}
            <div className="flex items-center w-[95%] gap-3 mt-[4.5rem] pb-2 mx-auto">
              <button className="w-full bg-[#B287F5] text-base py-0.5 text-white rounded-xl">
                Send
              </button>
              <button className="w-full border border-[#1E3A8A] py-0.5 rounded-xl text-base ">
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-14 flex items-start justify-between flex-col md:flex-row gap-4">
        <div className="w-[96%] mx-auto md:w-[20%] lg:w-[35%] bg-[#0A132E] border border-[#1E3A8A] py-3 rounded-xl">
          <div className="w-[92%] mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm md:text-base font-semibold">Quick Send</h3>
              <div className="border border-[#1E3A8A] w-8 h-8 rounded-full flex items-center justify-center">
                <GoArrowUpRight />
              </div>
            </div>

            {/* Select Asset Dropdown */}
            <Dropdown
  color="#FFFFFF1A"
  text="white"
  handleSelect={(token) => setSelectedToken(token)}
/>

            {/* Amount Field */}
            <label className="block mt-4 text-sm">Amount</label>
           <div className="flex items-center mt-1.5 w-full rounded-3xl px-3 py-2 bg-white text-black gap-4">
  {selectedToken && (
    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-2xl text-sm min-w-fit">
      <img src={selectedToken.icon} className="w-5 h-5" alt={selectedToken.name} />
      <span>{selectedToken.name}</span>
    </div>
  )}

  <input
    type="text"
    inputMode="decimal"
    placeholder="Enter Amount"
    className="remove-arrow bg-transparent border-none outline-none w-full text-center text-black placeholder:text-gray-400 text-sm"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    onWheel={(e) => e.target.blur()}
  />

  <button className="bg-[#9960F2] text-white rounded-lg px-3 py-1.5 text-sm">
    Max
  </button>
</div>


            {/* Address Input */}
            <label className="block mt-4 text-sm">Recipient Address</label>
            <input
              type="text"
              placeholder="Enter wallet address"
              className="w-full mt-1.5  text-sm font-semibold py-3 px-4 rounded-3xl bg-white text-black outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={handleSend}
              className="w-[58%] md:w-[50%] lg:w-[45%] mx-auto flex justify-center items-center mt-4 bg-[#9960F2] text-white rounded-2xl py-1.5"
            >
              Send Asset
            </button>
          </div>
        </div>
        <div className="w-[96%] mx-auto md:w-[80%] lg:w-[65%] bg-[#0A132E] border border-[#1E3A8A] py-3 rounded-xl">
          <div className="w-[94%] mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-[#CFD0D1]">
                Transaction History
              </h2>
              <button className="text-sm text-[#1E3A8A]">See all</button>
            </div>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-sm text-left bg-[#0A132E] text-white">
                {/* Table Header */}
                <thead className="bg-[#111A33] text-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Network
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className=" bg-transparent">
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="bg-[#FFFFFF0D] mb-4 hover:bg-[#1a274a] cursor-pointer transition-all"
                      onClick={() => handleClick(tx)}
                    >
                      <td className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
                        <img
                          src={tx.tokenIcon}
                          alt="token icon"
                          className="w-5 h-5"
                        />
                        <span>{tx.amount}</span>
                      </td>

                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {tx.network}
                      </td>

                      {/* Address */}
                      <td
                        className={`px-4 py-3 ${
                          walletColor[tx.status]
                        } whitespace-nowrap`}
                      >
                        {tx.address}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            statusColor[tx.status]
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>

                      {/* Time */}
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {tx.time}
                      </td>

                      {/* Action Button */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          className="bg-purple-500 text-white text-xs px-3 py-1 rounded-md cursor-pointer"
                          onClick={() => handleClick(tx)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
