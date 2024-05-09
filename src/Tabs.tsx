import React, { useEffect } from 'react';
interface Tab {
  id?: string;
  label: React.ReactNode;
  content: React.ReactNode;
  showTab?: boolean;
}
interface TabsProps {
  tabs: Tab[];
  sideContent?: React.ReactNode;
  commonContentTop?: React.ReactNode;
  commonContentBottom?: React.ReactNode;
  className?: string;
  handleSelect?: (index: number, currentTab: Tab, totalTabs: number, AllTabs: Tab[]) => void;
  tabIndex?: number;
}

const Tabs = ({
  tabs,
  sideContent,
  commonContentTop,
  commonContentBottom,
  className,
  handleSelect,
  tabIndex,
}: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(
    tabIndex && !isNaN(tabIndex) && +tabIndex < tabs.length && +tabIndex >= 0 ? tabIndex : 0,
  );
  const UpdatedTabs = tabs?.filter((tab) =>
    tab.hasOwnProperty('showTab') ? (tab.showTab === true ? true : false) : true,
  );
  const handleTabClick = (index: number, currentTab: Tab, e: any) => {
    e.preventDefault();
    setActiveTab(index);
    handleSelect && handleSelect(index, currentTab, UpdatedTabs?.length, UpdatedTabs);
    // Add any custom logic or actions you want to perform on tab click
  };
  useEffect(() => {
    setActiveTab(
      tabIndex && !isNaN(tabIndex) && +tabIndex < tabs.length && +tabIndex >= 0 ? tabIndex : 0,
    );
  }, [tabIndex]);

  useEffect(() => {
    handleSelect &&
      handleSelect(activeTab, UpdatedTabs?.[activeTab], UpdatedTabs?.length, UpdatedTabs);
  }, [UpdatedTabs?.length]);

  return (
    <>
      <div className='aegov-tab flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center gap-2 flex-grow overflow-auto p-[1px]'>
        <ul
          className='tab-items gap-4 md:gap-6 lg:gap-7 xl:gap-8 max-xl:overflow-auto'
          data-tabs-toggle='#SampleLayout-Tabs-01'
          role='tablist'
        >
          {UpdatedTabs?.map((tab: Tab, index: number) => {
            const tabClass = `tab-link whitespace-nowrap cursor-pointer ${
              activeTab === index ? 'tab-active' : ''
            }`?.trim();
            return (
              <li role='presentation'>
                <a
                  onClick={(event) => handleTabClick(index, tab, event)}
                  role='tab'
                  id={tab?.label as string}
                  data-tabs-target={tab?.id || (tab?.label as string)}
                  aria-controls={tab?.label as string}
                  className={tabClass}
                >
                  {tab?.label}
                </a>
              </li>
            );
          })}
        </ul>
        {sideContent && <div className='tab-side-content max-md:w-full'>{sideContent}</div>}
      </div>
      {commonContentTop && <div className='common-content-top'>{commonContentTop}</div>}

      {tabs?.map((tab: any, index: number) => {
        return (
          <div key={tab?.id || (tab?.label as string)} className='tab-item'>
            <div
              className={`tab-content ${className}  ${activeTab === index ? 'active' : 'hidden'}`?.trim()}
              role='tabpanel'
              id={tab?.id || (tab?.label as string)}
            >
              {tab?.content ? tab?.content : null}
            </div>
          </div>
        );
      })}
      {commonContentBottom && <div className='common-content-top'>{commonContentBottom}</div>}
    </>
  );
};

export default Tabs;
