"use client";

import dynamic from "next/dynamic";

export const Header = dynamic(() => import("@/components/Header/Header"), { ssr: false });
