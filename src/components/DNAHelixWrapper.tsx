"use client";

import dynamic from "next/dynamic";

const DNAHelix = dynamic(() => import("@/components/DNAHelix"), {
  ssr: false,
});

interface DNAHelixWrapperProps {
  height?: number;
  color?: string;
}

export default function DNAHelixWrapper(props: DNAHelixWrapperProps) {
  return <DNAHelix {...props} />;
}
