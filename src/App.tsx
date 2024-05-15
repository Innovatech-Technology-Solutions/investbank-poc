/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import MultiStepForm from "./MultiStepForm";
import BreadCrumbs from "./BreadCrumbs";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `Menu ${index + 1}`,
// }));

const App: React.FC = () => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];

  return (
    <>
      <div className="flex flex-col items-start md:flex-row md:items-center justify-between py-3">
        <div className="flex gap-2 items-center">
          <h2 className="text-lg text-blue-600 text-primary-600">
            {uiConfiguration?.UI_LABELS?.APPLICATION_FORM || "Application Form"}
          </h2>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <BreadCrumbs
            itemFeed={[
              {
                label:
                  uiConfiguration?.UI_LABELS?.APPLICATION_FORM ||
                  "Application Form",
                path: "#",
              },
            ]}
            homePath={"/investbank/dashboard"}
          />
        </div>
      </div>
      <MultiStepForm />
    </>
  );
};

export default App;
