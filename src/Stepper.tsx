import { Fragment } from 'react';
import { Link } from 'react-router-dom';

type StepperItem = {
  label: string;
  path: string;
  stage: 'completed' | 'current' | 'upcoming';
  stepperIndex: number;
  isLastItem: boolean;
  isActive:boolean;
};

type StepperProps = {
  stepperItems: StepperItem[];
  clickedIndex?: (index: number) => void;
};



const Stepper = ({ stepperItems, clickedIndex }: StepperProps) => {

  const handleOnClick=(index:number)=>{
    if(clickedIndex){
      clickedIndex(index)
    }
    setTimeout(() => {
      document
        .getElementById(`stepidx-${index}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, 10);
  }

  const RenderLinkStage = ({ label, stage, stepperIndex, isLastItem,isActive, path }: StepperItem) => {

    if (stage === 'completed')
      return (
        <li className='relative step-completed pb-10'>

{!isLastItem ? (
            <div className='step-connector-state step-connector-vertical' aria-hidden='true'></div>
          ) : null}
          <Link to={path} className='relative flex items-start no-underline' onClick={()=>handleOnClick(stepperIndex)}>
            <span className='step-badge'></span>
            <span className="ms-4 flex pt-1.5 min-w-0 justify-between items-center gap-4 w-full">
              <span className={`text-xm ${isActive?'font-normal':'font-bold'}`}>{label}</span>
            </span>
          </Link>
        </li>
      );
    if (stage === 'current')
      return (
        <li className='relative step-current pb-10'>
  {!isLastItem ? (
            <div className='step-connector-state step-connector-vertical' aria-hidden='true'></div>
          ) : null}          <Link to={path} className='relative flex items-start no-underline' aria-current='step' onClick={()=>handleOnClick(stepperIndex)}>
            <span className='step-badge'>{stepperIndex}</span>
            <span className="ms-4 flex pt-1.5 min-w-0 justify-between items-center gap-4 w-full">
              <span className={`text-xm ${isActive?'font-normal':'font-bold'}`}>{label}</span>
            </span>
          </Link>
        </li>
      );
    if (stage === 'upcoming')
      return (
        <li className={`relative step-upcoming pb-10`}>
          {!isLastItem ? (
            <div className='step-connector-state step-connector-vertical' aria-hidden='true'></div>
          ) : null}

          <Link to={path} className='relative flex items-start no-underline' onClick={()=>handleOnClick(stepperIndex)}>
            <span className='step-badge'>{stepperIndex}</span>
            <span className="ms-4 flex pt-1.5 min-w-0 justify-between items-center gap-4 w-full">
              <span className={`text-xm text-aeblack-400 ${isActive?'font-normal':'font-bold'}`}>{label}</span>
            </span>
          </Link>
        </li>
      );
  };
  return (
    <nav aria-label='Progress' className='aegov-step step-sm inline-block w-full pe-6 xl:pe-10'>
      <ol role='list'>
        {stepperItems?.map((item: StepperItem) => {
          return (
            <Fragment key={item?.stepperIndex}>
              <RenderLinkStage
                label={item?.label}
                path={item?.path}
                stage={item?.stage}
                stepperIndex={item?.stepperIndex}
                isLastItem={item?.stepperIndex === stepperItems?.length}
                isActive={!item?.isActive}
              />
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Stepper;
