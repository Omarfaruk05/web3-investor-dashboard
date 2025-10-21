 'use client';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";
import { annualizedROI, projectOverYears, Property, simpleROI } from "@/lib/roi";
import React from "react";
import { useAccount, useContractRead } from "wagmi";
import PropertyListMock from "./_component/PropertyListMock";
import { AllProperties } from "./_component/AllProperties";

type DashboardProps = {
    properties: Property[]; 
};

export default function Dashboard({ properties }: DashboardProps) {
        const { address, isConnected } = useAccount();


       const { data: balance, isLoading, refetch } = useContractRead({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'balanceOf',
            args: [address],
        });
    return (
        <div className="p-6 space-y-6">
           
            {/* <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {properties?.map((p) => {
                    const proj = projectOverYears(p, 10, 0.05, 0.02); // 10-year, 5% price growth, 2% rent growth
                    const final = proj[proj.length - 1];
                    const simple = simpleROI(p, final.propertyValue, final.cumulativeRent);
                    const ann = annualizedROI(p, final.propertyValue, final.cumulativeRent);

                    return (
                        <div key={p.tokenId} className="bg-white rounded-lg p-4 shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="font-medium">Property #{p.tokenId}</h2>
                                    <p className="text-sm text-slate-600">Purchased: {new Date(p.purchaseDate).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-slate-500">Purchase</div>
                                    <div className="font-semibold">${p.purchasePrice.toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="mt-3 space-y-2">
                                <div className="flex gap-3">
                                    <div className="text-sm">Simple ROI:</div>
                                    <div className="font-medium">{simple.toFixed(2)}%</div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="text-sm">Annualized:</div>
                                    <div className="font-medium">{ann.toFixed(2)}% /yr</div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <PropertyROIChart data={proj} />
                            </div>
                        </div>
                    );
                })}
            </div> */}
            <PropertyListMock />
            <AllProperties />
        </div>
    );
}
