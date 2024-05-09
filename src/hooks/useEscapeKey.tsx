
/* Custom Hook to detect keyboard events like escape/enter */
import { useEffect } from 'react';

export enum KEYS {
  escape = 'Escape',
  enter = 'Enter',
}

export const useKeyBoardTrigger = (callback: (T?: any) => void, keys: KEYS[]) => {

    if(!Array.isArray(keys) || keys?.length<1) 
    throw new Error("useKeyBoardTrigger hook accepts keys argument as array with atlease one element")

  const handlekeyBoardEvent = (event: KeyboardEvent) => {
 const isKeyTriggered:boolean = keys?.some((key:string) => event?.key === key);
    if (isKeyTriggered) {
      event.preventDefault();
      callback();
    }

  };

  useEffect(()=>
  {
   document.addEventListener('keydown',handlekeyBoardEvent) 
   document.removeEventListener('keydown',handlekeyBoardEvent)

  },[handlekeyBoardEvent])
};
