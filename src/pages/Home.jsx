import { Link } from "react-router";
import { AI, Circle, Cloud, Hero, Logo, Multi, Send, Smart } from "../assets";
import { Navbar, WalletModal } from "../components";
import { IoWalletOutline } from "react-icons/io5";
import { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const features = [
    {
      id: 1,
      title: "Smart-Chain Validation",
      description:
        "Never send assets to the wrong blockchain – Guardwallet detects errors before you confirm.",
      icon: Smart,
      color: "#FACC15",
    },
    {
      id: 2,
      title: "AI-Powered Error Prevention",
      description:
        "Guardwallet’s AI scans for potential mistakes and warns you before sending funds.",
      icon: AI,
      color: "#F41919",
    },
    {
      id: 3,
      title: "Recovery Mechanism for Mistaken Transactions",
      description:
        "Accidentally sent funds to the wrong address? Our recovery feature helps you get them back.",
      icon: Cloud,
      color: "#14B827",
    },
    {
      id: 4,
      title: "Multi-Currency & Cross-Chain Support",
      description:
        "Seamlessly send and receive payments across multiple chains and networks.",
      icon: Multi,
      color: "#6610EC",
    },
  ];

  return (
    <div className="w-full relative h-full text-white bg-[#060C1C]  flex items-start justify-center">
      <div className="absolute inset-0  flex items-start justify-center  ">
        <div className="w-[450px] h-[450px] bg-[#550DC5] blur-[400px] opacity-40"></div>
      </div>
      <div className="relative z-0 w-full">
        <div className="w-full top-0 left-0 z-50 fixed ">
          <Navbar />
        </div>
        <div className="relative  gap-y-9 w-[95%] mt-16 md:mt-14 md:w-[92%] mx-auto flex items-center justify-between flex-col md:flex-row">
          <div className="text-white w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl  font-semibold text-white leading-12 md:leading-16">
              Never Lose a <br /> Transaction Again
            </h2>
            <div className="py-3  md:py-5">
              <img src={Send} alt="" className="w-[350px]" />
            </div>
            <p className="py-2 md:py-3 text-base md:text-lg lg:text-xl">
              A multi-currency wallet with AI-powered protection and <br />
              {"  "}
              smart-chain validation to prevent costly mistakes.
            </p>
            <div className="mt-4 md:mt-8 flex items-center gap-x-8">
              <button
                className="bg-[#1E3A8A] text-white rounded-md px-3 hover:bg-[#0e235d] cursor-pointer flex items-center gap-x-1.5 py-2 text-sm md:text-base"
                onClick={() => setIsOpen(true)}
              >
                <IoWalletOutline className="size-5" />
                Connect Wallet
              </button>
              <button className="border text-sm md:text-base border-[#6610EC] px-8 md:px-4.5 py-2 rounded-md">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full ">
            <img
              src={Hero}
              alt="hero"
              className="w-[96%] md:w-[85%] lg:w-[80%] mx-auto animate-scale"
            />
          </div>
        </div>
        <section className="w-full relative h-[100%] -mt-5 md:-mt-0 pb-7 pt-16 md:pt-14 bg-[#060C1C] flex items-start ">
          <div className="absolute left-0 inset-0 flex items-end justify-start ">
            <div className="bg-[#550DC5] blur-[380px] opacity-40 w-[300px] h-[300px]"></div>
          </div>
          <div className="relative w-full">
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl">
              Key Features
            </h2>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[95%] gap-9 md:gap-7 md:w-[92%] mx-auto">
              {features.map((item) => (
                <div
                  className="relative bg-[#B4BDD833]  w-[89%] mx-auto md:w-full py-16 md:py-20  rounded-xl flex items-center justify-center "
                  key={item.id}
                >
                  <div
                    className="absolute top-0  shadow rounded-full h-[50px] md:h-[64px] w-[50px] md:w-[64px] flex items-center justify-center -mt-5 md:-mt-8"
                    style={{ backgroundColor: item.color }}
                  >
                    <img src={item.icon} alt="" className="w-[60%]" />
                  </div>
                  <div className="w-[90%] flex items-center flex-col mx-auto">
                    <h3 className="font-semibold text-center text-base md:text-lg">
                      {item.title}
                    </h3>
                    <p className="pt-5 text-center text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 md:mt-20">
              <h2 className="text-center text-2xl md:text-3xl lg:text-4xl">
                How it Works
              </h2>
              <div className="pt-16 flex items-center justify-center w-full">
                <img
                  src={Circle}
                  alt=""
                  className="-mt-5 w-[80%] md:w-[55%] lg:w-[43%]"
                />
              </div>
              <div className="pt-20 w-full">
                <div className="bg-[#B4BDD833] py-6 flex flex-col items-center justify-center rounded-xl w-[90%] md:w-[70%] mx-auto">
                  <h3 className="capitalize text-lg md:text-xl lg:text-2xl font-semibold">
                    Send smart & stay safe.
                  </h3>
                  <p className="py-6 text-center text-sm md:text-base">
                    Never lose crypto again. Protect your assets with
                    smart-chain validation and AI-powered error prevention.
                  </p>
                  <div className="flex items-center justify-center gap-x-8">
                    <button className="bg-[#1E3A8A] text-white text-sm md:text-base px-4 py-1.5 rounded-md cursor-pointer">
                      Contact Sales
                    </button>
                    <button className="bg-transparent border border-[#6610EC] text-white text-sm md:text-base px-4 py-1.5 rounded-md cursor-pointer">
                      Connect Wallet
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-24 pb-5 flex items-center flex-col md:flex-row gap-y-5 md:gap-y-0 justify-between w-[96%] mx-auto md:w-[92%]">
                <div className="flex items-center gap-x-2">
                  <img src={Logo} alt="logo" className="w-[40px]" />
                  <h2 className="text-base md:text-lg font-semibold">
                    Guardwallet
                  </h2>
                </div>
                <div className="flex items-center gap-x-7 md:gap-x-14">
                  <Link className="text-base md:text-lg">Home</Link>
                  <Link className="text-base md:text-lg">About us</Link>
                  <Link className="text-base md:text-lg">Our Services</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <WalletModal modalOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
};

export default Home;
