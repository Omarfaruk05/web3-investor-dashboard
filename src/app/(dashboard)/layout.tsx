"use client";


import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {  

    return (
        <div>
           <Sidebar />
            <Navbar />
            <main className="ml-60 pt-16 min-h-[94vh] flex flex-col">
              <div className="flex-1 p-6">{children}</div>
            </main>
            <Footer />
        </div>
    );
}
