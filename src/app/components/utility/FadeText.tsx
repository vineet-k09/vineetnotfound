// components/FadeText.tsx
import React, { HTMLAttributes } from "react";
import type * as ReactTypes from "react";
import { motion } from "framer-motion";

type Tag = keyof ReactTypes.JSX.IntrinsicElements;


interface FadeTextProps extends HTMLAttributes<HTMLElement> {
    as?: Tag;
    children: React.ReactNode;
}

export default function FadeText({ as = "p", children, ...props }: FadeTextProps) {
    const MotionTag = motion(as) as React.ElementType;

    return (
        <MotionTag
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            {...props}
        >
            {children}
        </MotionTag>
    );
}
