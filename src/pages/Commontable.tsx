import { ConfigProvider, Table } from 'antd';
import { TableProps } from 'antd/lib/table';
// import Pagination, { PaginationProps } from './Pagination';

const Commontable = ({ columns, dataSource, ...rest }: TableProps) => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: { colorPrimary: '#cba344', colorBorder: '#cba344' },
          components: {
            Table: {
              headerBg: 'rgba(182, 138, 53, 0.15)',
            },
          },
        }}
        direction={'ltr'}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          {...rest}
        />
      </ConfigProvider>
      {/* <div className='flex justify-end mt-4'>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextClick={onNextClick}
          onPageClick={onPageClick}
          onPreviousClick={onPreviousClick}
        />
      </div> */}
    </div>
  );
};
export default Commontable;
