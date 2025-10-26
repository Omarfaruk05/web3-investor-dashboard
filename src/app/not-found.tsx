'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500 rounded-full blur-3xl"></div>
            </div>

            <div className={`text-center relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                {/* 404 Number with Glow Effect */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Lost in the Digital Void
                    </h2>
                    <p className="text-gray-400 text-xl max-w-lg mx-auto leading-relaxed">
                        The page you're searching for has drifted into the unknown.
                        It might have been moved, deleted, or never existed in this reality.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <Link
                        href="/"
                        className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                    >
                        <span className="relative z-10">Return to Homebase</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
                    </Link>
{/* 
                    <button
                        onClick={() => window.history.back()}
                        className="group border-2 border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 font-semibold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Navigate Back
                        </span>
                    </button> */}
                </div>

                {/* Additional Navigation */}
                <div className="text-gray-500">
                    <p className="mb-4">Need assistance finding your way?</p>
                    <div className="flex justify-center gap-6 text-sm">
                        <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            Contact Support
                        </Link>
                        <Link href="/help" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            Help Center
                        </Link>
                        <Link href="/sitemap" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            Site Map
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}