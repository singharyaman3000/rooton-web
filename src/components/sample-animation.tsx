'use client'

import * as React from "react";
import { motion } from "framer-motion";
import axios from "axios";

export const SampleAnimation = () => {

    React.useEffect(() => {
        axios.get('https://rootonweb-dev-be.qburst.build/blogs').then(() => {
            console.log('API call success')
        }).catch(() => {
            console.error('API call failed')
        })
    })

    return <motion.h1
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
        }}
        className=" text-[48px]"
    >Welcome to Root On {process.env.NEXT_PUBLIC_BASE_URL}</motion.h1>
};
