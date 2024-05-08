// Popover.tsx

import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  interaction?: 'click' | 'hover';
  offset?: [number, number];
}

const Popover: React.FC<PopoverProps> = ({ trigger, content, interaction = 'hover'}) => {
  const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(triggerElement, popperElement, {
   placement:'bottom', modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 22],
          
        },
      },
    ],
  });

  const [isVisible, setIsVisible] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

  const showPopover = () => {
    clearTimeout(hideTimeoutRef.current!);
    setIsVisible(true);
  };

  const hidePopover = () => {
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 200); // Adjust the delay as needed
  };

  const handleClickOutside = (event: Event) => {
    if (popperElement && triggerElement && !popperElement.contains(event.target as Node) && !triggerElement.contains(event.target as Node)) {
      hidePopover();
    }
  };

  const handleMouseEnter = () => {
    if (interaction === 'hover') {
      showPopover();
    }
  };

  const handleMouseLeave = () => {
    if (interaction === 'hover') {
      hidePopover();
    }
  };

  const handleClick = () => {
    if (interaction === 'click') {
      showPopover();
    }
  };
  const popoverStyles = {
    ...styles.popper,
    zIndex: 99999999999999,
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(hideTimeoutRef.current!);
    };
  }, [popperElement, triggerElement]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={setTriggerElement}>
        {trigger}
      </div>

      {isVisible && (
        <div  className='submenu rounded-bordered shadow-lg ring-1 ring-aeblack-900/5 !border-none 'ref={setPopperElement} style={popoverStyles} {...attributes.popper}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
