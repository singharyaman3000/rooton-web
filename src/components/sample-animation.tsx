'use client'

import * as React from "react";
import { motion } from "framer-motion";

export const SampleAnimation = () => (
    <motion.h1
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
        }}
        className=" text-[48px]"
    >Welcome to Root On</motion.h1>
);
