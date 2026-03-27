"use client";

import dynamic from "next/dynamic";

const CyberneticGridShader = dynamic(
  () => import("./cybernetic-grid-shader"),
  { ssr: false, loading: () => null }
);

export default function GridBackground() {
  return <CyberneticGridShader />;
}
