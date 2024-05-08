import { Box } from '@mui/material';
import CommentsSection from './CommentsSection';
import useLanguage from '../hooks/useLanguage';
import { useGetInterfaceByIDQuery } from '../services/hostApiServices';
import RequestHistory from './RequestHistory';
import Tabs from './Tabs';
interface IProps {
  requestId: string;
  allActivities?: any;
}

const HistoryComments = ({ requestId, allActivities }: IProps) => {
  const { data: uiData } = useGetInterfaceByIDQuery('807');
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language];

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        className = 'p-0 py-1'
        tabs={[
          {
            label: uiConfiguration?.UI_LABELS?.COMMENTS || 'Comments',

            content: <CommentsSection uiConfiguration={uiConfiguration} requestId={requestId} />,
          },
          {
            label: uiConfiguration?.UI_LABELS?.HISTORY || 'History',
            content: (
              <RequestHistory
                uiConfiguration={uiConfiguration}
                requestId={requestId}
                allActivitiesData={allActivities}
              />
            ),
          },
        ]}
      />
    </Box>
  );
};

export default HistoryComments;
