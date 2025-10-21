"use client";
import { FaBell, FaUser } from "react-icons/fa";
import { useAccount } from "wagmi";

export default function Navbar() {
    const { address, isConnected } = useAccount();

    return (
        <header className="fixed top-0 left-60 right-0 h-[61px] bg-gray-900 text-white border-b border-gray-700 flex items-center justify-between px-6 shadow-sm z-10">
            <h1 className="text-xl font-semibold">Dashboard</h1>

            <div className="flex items-center gap-5">
                <button className="relative">
                    <FaBell className="text-gray-500" size={20} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        2
                    </span>
                </button>

                <div className="flex items-center gap-2">
                    <FaUser className="text-gray-600" size={20} />
                    {isConnected ? (
                        <span className="text-sm text-gray-700">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                    ) : (
                        <span className="text-sm text-gray-500">Not Connected</span>
                    )}
                </div>
            </div>
        </header>
    );
}
