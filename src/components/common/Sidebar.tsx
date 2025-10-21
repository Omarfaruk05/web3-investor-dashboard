"use client";
import { use, useState } from "react";
import { FaHome, FaChartBar } from "react-icons/fa";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FaHome size={18} /> },
    { name: "Analytics", href: "/analytics", icon: <FaChartBar size={18} /> },
    { name: "Settings", href: "/settings", icon: <IoSettingsSharp size={18} /> },
];

export default function Sidebar() {
    const pathname = usePathname();
    const navigate = useRouter();
    const { disconnect } = useDisconnect();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`fixed left-0 top-0 h-full ${collapsed ? "w-16" : "w-60"
                } bg-gray-900 text-white flex flex-col justify-between transition-all duration-300`}
        >
            {/* Top Section */}
            <div>
                {/* Header */}
                <div
                    className={`flex items-center justify-between p-4 border-b border-gray-700 ${collapsed ? "justify-center" : ""
                        }`}
                >
                    {!collapsed && (
                        <span className="text-lg font-bold tracking-wide">E-Estate</span>
                    )}
                    <button
                        onClick={() => setCollapsed((prev) => !prev)}
                        className="text-gray-300 hover:text-white"
                    >
                        <HiMenuAlt2 size={20} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="mt-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-5 py-3 text-sm font-medium rounded-md transition-colors ${pathname === item.href
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                } ${collapsed ? "justify-center" : ""}`}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-700 p-4">
                <button
                    onClick={() => {
                        disconnect()
                       navigate.push("/") 
                    }}
                    className={`flex items-center gap-2 text-gray-300 hover:text-white w-full ${collapsed ? "justify-center" : "justify-between"
                        }`}
                >
                    {!collapsed && <span>Disconnect</span>}
                    <IoLogOut size={18} />
                </button>
            </div>
        </aside>
    );
}
