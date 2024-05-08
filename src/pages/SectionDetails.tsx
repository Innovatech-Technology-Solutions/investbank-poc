/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import RenderLabelAndValue from './RenderLabelAndValue';
import SectionHeader from './SectionHeader';

const SectionDetails = ({
  sectionData,
  sectionHeader,
  className,
}: {
  sectionData: { key: ReactNode; value: ReactNode;fieldKey?:any }[];
  sectionHeader?: ReactNode;
  className?: string;
}) => {
  return (
    <>
      {sectionHeader && (
        <div className='mt-4'>
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
