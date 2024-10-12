import { useEffect } from "react";

interface EventListenerProps {
  escape: () => void;
}

const useKeyBoardEvent = (props: EventListenerProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      switch (key) {
        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          props?.escape();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return {};
};

export default useKeyBoardEvent;
