import { useEffect, useRef, useState } from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

export const useHeader = () => {
  const [sticky, setSticky] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [lightHeader, setLightHeader] = useState(false);

  const { t } = useI18next();
  const headerRef = useRef();

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      window.scrollY > 300 ? setSticky(true) : setSticky(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return {
    sticky,
    headerRef,
    transparent,
    lightHeader,
    setSticky,
    handleScroll,
    t,
    setTransparent,
    setLightHeader
  };
};
