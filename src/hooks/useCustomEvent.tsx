// useCustomEvent.ts

import { useState, useEffect } from 'react';

 const useCustomEvent = (eventName: string, eventHandler: () => void): boolean => {
  const [eventTriggered, setEventTriggered] = useState(false);

  useEffect(() => {
    const handleEvent = () => {
      setEventTriggered(true);
      eventHandler();
    };

    window.addEventListener(eventName, handleEvent);

    return () => {
      window.removeEventListener(eventName, handleEvent);
    };
  }, [eventName, eventHandler]);

  return eventTriggered;
};
export default useCustomEvent
