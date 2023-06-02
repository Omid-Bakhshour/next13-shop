"use client";

import React from "react";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

function DarkmodeBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      <div className="flex felx-row gap-2 items-center">
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value={"system"}>System</option>
          <option value={"light"}>Light</option>
          <option value={"dark"}>Dark</option>
        </select>

        {currentTheme == "dark" ? <BsFillMoonFill /> : <BsFillSunFill />}
      </div>
    </>
  );
}

export default DarkmodeBtn;
