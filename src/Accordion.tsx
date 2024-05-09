import { ReactNode, useEffect, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Button from './Button';

type AccordionItemType = {
  title: ReactNode;
  content: ReactNode;
  accordianIndex: number;
  className?: string;
};
type AccordionProps = {
  accordionItems: AccordionItemType[];
  defaultIndex?: number;
  clickedAccordion?: (index: number) => void;
  arrow?: boolean;
  showFooterButtons?: boolean;
};
const Accordion = ({
  accordionItems,
  defaultIndex = -1,
  arrow = false,
  clickedAccordion,
  showFooterButtons = false,
}: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  useEffect(() => {
    setActiveIndex(defaultIndex);
  }, [defaultIndex]);

  const handleAccordion = (clickedIndex: number) => {
    if (activeIndex === clickedIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(clickedIndex);
      clickedAccordion && clickedAccordion(clickedIndex);
    }
  };

//   const uiLabels = {}
  return (
    <div
      className={` aegov-accordion [&_.accordion-active_svg]:${arrow ? 'rotate-180' : 'rotate-45'}`}
      id='accordion-collapse-1'
      data-accordion='collapse'
    >
      {accordionItems?.map((item: AccordionItemType) => (
        <div
          key={String(item?.accordianIndex)}
          className={`accordion-item ${item.className ? item.className : ''}`}
        >
          <div className='accordion-title' id='acc-v2-head-1'>
            <button 
              className={
                activeIndex === item?.accordianIndex ? 'accordion-active' : 'accordion-inactive'
              }
              onClick={() => handleAccordion(item?.accordianIndex)}
              type='button'
              data-accordion-target='#acc-v2-body-1'
              aria-expanded='true'
              aria-controls='acc-v2-body-1'
            >
              <span>{item?.title}</span>
              {arrow ? (
                <svg
                  data-accordion-icon
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.2989 6.22027L12.8075 0.861876C12.861 0.809514 12.9247 0.768138 12.9949 0.740199C13.0651 0.71226 13.1403 0.698325 13.2161 0.69922C13.292 0.700115 13.3668 0.715822 13.4363 0.745411C13.5058 0.774999 13.5685 0.817867 13.6206 0.871476C13.7275 0.981128 13.7862 1.12705 13.7844 1.27822C13.7826 1.4294 13.7203 1.57392 13.6108 1.68108L7.69478 7.43547C7.6417 7.48753 7.57849 7.52876 7.50886 7.55675C7.43923 7.58473 7.36457 7.59892 7.28924 7.59847C7.21392 7.59802 7.13944 7.58295 7.07016 7.55414C7.00089 7.52533 6.9382 7.48336 6.88578 7.43068L0.812101 1.37388C0.704608 1.26545 0.644531 1.1206 0.644531 0.969876C0.644531 0.819147 0.704608 0.674304 0.812101 0.565876C0.864922 0.512896 0.92812 0.470778 0.997954 0.442017C1.06779 0.413257 1.14284 0.398438 1.21865 0.398438C1.29447 0.398438 1.36952 0.413257 1.43936 0.442017C1.50919 0.470778 1.57239 0.512896 1.62521 0.565876L7.2989 6.22027Z'
                    fill='#92722A'
                  />
                </svg>
              ) : (
                <svg
                  data-accordion-icon
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z'
                    fill='currentColor'
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`accordion-content ${activeIndex === item?.accordianIndex ? 'block' : 'hidden'}`}
            id='acc-v2-body-1'
            aria-labelledby='acc-v2-head-1'
          >
            <div className='accordion-content-body'>{item?.content}</div>
          </div>
          {showFooterButtons && item?.accordianIndex === activeIndex && (
            <div className='flex justify-between flex-col lg:flex-row gap-2 mb-4'>
              <Button
                type='button'
                onClick={() => handleAccordion(item?.accordianIndex - 1)}
                disabled={item?.accordianIndex === 1}
                className='!bg-[#92722a]'
              >
                <CaretLeft size={32} /> {'Previous Step'}
              </Button>
              <Button
                type='button'
                onClick={() => handleAccordion(item?.accordianIndex + 1)}
                className='!bg-[#92722a]'
                disabled={item?.accordianIndex === accordionItems?.length}
              >
                { 'Next Step'} <CaretRight size={32} />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
