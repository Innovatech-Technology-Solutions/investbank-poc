/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import emitMessage from '../services/emitMessage';

interface UiLabel {
  id: string;
  labelId: string;
  uiLabelValue: {
    id: string;
    uiLabelId: string;
    value: string;
    langId: string;
  }[];
}

interface Data {
  output: {
    uiLabel: UiLabel[];
    // Add other properties as needed
  };
}

const useLocalizedLabels = (data: Data | null) => {
  const [uiLabelMap, setUiLabelMap] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    let isMounted = true;
    const processData = () => {
      try {
        if (data) {
          const transformedData = data.output.uiLabel.reduce((acc: any, label) => {
            const langValues = label.uiLabelValue.reduce((langAcc: any, langValue) => {
              langAcc[langValue.langId] = langValue.value;
              return langAcc;
            }, {});
            acc[label.labelId] = langValues;
            return acc;
          }, {});

          if (isMounted) {
            setUiLabelMap((prevData) => {
              // Only update the state if the transformed data has changed
              if (JSON.stringify(prevData) !== JSON.stringify(transformedData)) {
                return transformedData;
              }
              return prevData;
            });
          }
        }
      } catch (error) {
        // console.error('Error in processing data:', error);
        // Handle errors if necessary
        emitMessage((error as any) || 'Error in processing data', 'error');
      }
    };

    processData();

    return () => {
      isMounted = false;
    };
  }, [data]);

  // Memoize the result to avoid unnecessary re-renders
  const currentLangLabels = useMemo(() => uiLabelMap || {}, [uiLabelMap]);
  return currentLangLabels;
};

export default useLocalizedLabels;
