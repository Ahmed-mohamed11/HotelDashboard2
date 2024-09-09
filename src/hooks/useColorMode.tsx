"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const className = "dark";
      const bodyClass = window.document.documentElement.classList;

      // Update the class list based on colorMode
      colorMode === "dark"
        ? bodyClass.add(className)
        : bodyClass.remove(className);
    }
  }, [colorMode]); 

  return [colorMode, setColorMode] as const;
};

export default useColorMode;
