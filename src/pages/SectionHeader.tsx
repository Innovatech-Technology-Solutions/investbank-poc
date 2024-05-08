import React from 'react';
const SectionHeader = ({ title }: { title: React.ReactNode }) => {
  return (
    <div className='flex gap-1 items-center'>
      <div className='text-aegold-600 font-semibold text-[16px] pr-2 flex-grow whitespace-nowrap'>
        {title}
      </div>
      <div className='border-t bg-aegold-600 border-aegold-600 !mt-0 !pt-0 w-full opacity-15'></div>
    </div>
  );
};

export default SectionHeader;
