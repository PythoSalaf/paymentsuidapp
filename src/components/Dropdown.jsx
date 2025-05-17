import { useState } from "react";
import { Btc, Eth, Solana, SUI, USDC } from "../assets";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const CRYPTOS = [
  { id: 1, name: "Sui", symbol: "Sui", icon: SUI },
  { id: 2, name: "Bitcoin", symbol: "BTC", icon: Btc },
  { id: 3, name: "Ethereum", symbol: "ETH", icon: Eth },
  { id: 4, name: "USDC", symbol: "USDC", icon: USDC },
  { id: 5, name: "Solana", symbol: "SOL", icon: Solana },
];

const Dropdown = ({ color, text, handleSelect }) => {
  const [selected, setSelected] = useState(CRYPTOS[0]);
  const [open, setOpen] = useState(false);

  const onSelect = (crypto) => {
    setSelected(crypto);
    setOpen(false);
    if (handleSelect) {
      handleSelect(crypto); // Notify parent of selection
    }
  };

  return (
    <div className="relative">
      <button
        className="px-3 py-1 md:py-2 rounded-2xl text-left flex justify-between gap-2 items-center"
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: `${color}` }}
      >
        <img src={selected.icon} alt="" className="" />
        <span style={{ color: `${text}` }}>{selected.symbol}</span>
        <MdOutlineKeyboardArrowDown
          className={`w-4 h-4 ml-2 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-fit px-4 bg-[#0F1D45] border rounded shadow-md">
          {CRYPTOS.map((crypto) => (
            <div
              key={crypto.symbol}
              onClick={() => onSelect(crypto)}
              className="px-3 py-1.5 hover:bg-[#FFFFFF1A] flex items-center gap-x-1.5 cursor-pointer"
            >
              <img
                src={crypto.icon}
                alt={crypto.name}
                className="w-[30px]"
              />
              {crypto.name} ({crypto.symbol})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
