"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

function Providers({ children, ...props }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}

export default Providers;
