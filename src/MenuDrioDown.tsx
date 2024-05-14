import { useState, useEffect, useCallback, ReactNode } from 'react';
import { usePopper } from 'react-popper';
import { Link } from 'react-router-dom';
import { CircleNotch } from '@phosphor-icons/react';
import React from 'react';

type Item = {
  label: ReactNode;
  value: string;
};
interface DropdownProps {
  buttonText: ReactNode;
  items: Item[];
  buttonSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;

  onItemClick?: (item: string) => void;
}

const fp=(a:any)=> ''
const MenuDropDown = ({
  buttonText,
  items,
  onItemClick,
  isDisabled = false,
  buttonSize = 'sm',
  isLoading = false,
}: DropdownProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = useCallback(() => {
    setDropdownVisible(false);
  }, [setDropdownVisible]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        referenceElement &&
        popperElement &&
        !referenceElement.contains(event.target as Node) &&
        !popperElement.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    },
    [referenceElement, popperElement, closeDropdown],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [referenceElement, popperElement, handleClickOutside]);

  const handleItemClick = (item: string) => {
    if (onItemClick) {
      onItemClick(item);
    }
    closeDropdown();
  };

  return (
    <div>
      <button
        id='dropdownButton'
        disabled={isLoading || isDisabled}
        data-dropdown-toggle='dropdown'
        className={(`aegov-btn btn-${buttonSize}`)}
        onClick={toggleDropdown}
        ref={(el) => {
          setReferenceElement(el);
        }}
      >
        {isLoading ? <CircleNotch className={('animate-spin mx-2')} /> : buttonText}
      </button>

      {dropdownVisible ? (
        <div
          id='dropdown'
          className={('aegov-dropdown w-52 block min-w-[100px] max-w-fit')}
          ref={(el) => {
            setPopperElement(el);
          }}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className={('dropdown-body text-aeblack-600 w-full')}>
            <ul className={('py-1')} aria-labelledby='dropdownButton-1' role='menu'>
              {items?.map((item, index) => (
                <li key={index}>
                  <Link
                    to='#'
                    className={('dropdown-item justify-center')}
                    onClick={() => handleItemClick(item?.value)}
                  >
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MenuDropDown;
