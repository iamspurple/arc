"use client";

import dynamic from "next/dynamic";

export const ImagePicker = dynamic(() => import("./ImagePicker"), { ssr: false });
