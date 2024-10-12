import { useEffect } from "react";

const useResizeBound = () => {
  useEffect(() => {
    const handleResizeBound = () => {};
    window.addEventListener("resize", handleResizeBound);
    return () => {
      window.removeEventListener("resize", handleResizeBound);
    };
  }, []);
  return {};
};

export default useResizeBound;
