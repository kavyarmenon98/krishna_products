import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import splashLogo from "../assets/logo/index_logo_black.png";

const InitialSplashScreen = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use sessionStorage to ensure it only shows once per tab/session
        // This prevents double loaders if the component remounts or during fast refreshes
        const hasShown = sessionStorage.getItem("splash_screen_shown");

        if (hasShown) {
            setLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("splash_screen_shown", "true");
        }, 4000); // 4 seconds as requested

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Background elements for premium feel */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-[#00a1d1]/5 blur-[120px] rounded-full" />
                            <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-[#00a1d1]/5 blur-[120px] rounded-full" />
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{
                                scale: [0.9, 1.02, 1],
                                opacity: 1
                            }}
                            exit={{
                                scale: 1.1,
                                opacity: 0,
                                transition: { duration: 0.8, ease: "easeIn" }
                            }}
                            transition={{
                                duration: 3,
                                times: [0, 0.6, 1],
                                ease: "easeOut"
                            }}
                            className="relative w-72 md:w-[500px] px-4 flex flex-col items-center"
                        >
                            <img
                                src={splashLogo}
                                alt="Arts & Crafts by Kavya"
                                className="w-full h-auto drop-shadow-[0_0_50px_rgba(0,161,209,0.3)]"
                            />

                            {/* Elegant loader bar */}
                            <div className="mt-16 h-[1px] bg-white/5 w-64 relative overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00a1d1] to-transparent w-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {children}
                </motion.div>
            )}
        </>
    );
};

export default InitialSplashScreen;
