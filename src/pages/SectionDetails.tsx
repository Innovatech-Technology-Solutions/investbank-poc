/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import RenderLabelAndValue from './RenderLabelAndValue';
import SectionHeader from './SectionHeader';
import React from 'react';

const SectionDetails = ({
  sectionData,
  sectionHeader,
  className,
  stepId
  
}: {
  sectionData: { key: ReactNode; value: ReactNode;fieldKey?:any }[];
  sectionHeader?: ReactNode;
  className?: string;
  stepId?:string
}) => {
  return (
    <>
      {sectionHeader && (
        <div id={stepId} className='mt-4'>
          <SectionHeader title={sectionHeader} />
        </div>
      )}
      <div 
      
        className={` ${className ? className : 'md:col-span-3 grid grid-cols-1 gap-x-[0rem] gap-y-8 md:grid-cols-3 pb-[0.5rem] mt-4'}`}
      >
        {sectionData?.map((item) => <RenderLabelAndValue fieldKey={item.fieldKey} label={item.key} value={item.value} />)}
      </div>
    </>
  );
};

export default SectionDetails;
