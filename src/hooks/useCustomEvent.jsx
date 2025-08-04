import { useState, useCallback } from "react";

const useCustomEvent = () => {
  const [dataEvent, setEventData] = useState(null);
  const requestEvents = useCallback(({ eventName, input }) => {
    window.dispatchEvent(new CustomEvent(eventName, input));
  }, []);
  const responseEvents = useCallback(({ eventName }) => {
    const listener = (data) => {
      if (typeof data.detail === "object" && data.detail !== null) {
        setEventData(data.detail);
      } else {
        setEventData(null);
      }
    };
    window.addEventListener(eventName, listener, { once: true }); // the fix
    return () => window.removeEventListener(eventName, listener); // remove with given eventName and listener
  }, []);
  return {
    requestEvents,
    dataEvent,
    responseEvents,
  };
};

export default useCustomEvent;
