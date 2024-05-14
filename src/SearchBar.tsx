import React, { useState } from 'react';
import AdvancedSearch from './AdvnancedSearch';
import InputText from './InputText';
import { MagnifyingGlass } from '@phosphor-icons/react';
import Button from './Button';
import { Col, Row } from 'antd';


const SearchBar: React.FC<{
  onSearch: (value: string) => void;
}> = ({ onSearch }) => {
  const [modalVisible, setModalVisible] = useState(false);
 const [searchText, setSearchText] = useState("");

  const handleBasicSearch = (value: string) => {
    setSearchText(value)
    onSearch(value);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <InputText
          sizeVariant={'sm'}
          placeholder={'Search...'}
          value={searchText}
          suffxIcon={<MagnifyingGlass/>} onChange={e => handleBasicSearch(e.target.value)} isError={false} id={''}  name={''}/>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button sizeVariant='xs'  onClick={() => setModalVisible(true)}>
            Advanced Search
          </Button>
        </Col>
      </Row>
      <AdvancedSearch
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSearch={(params: string) => {
          console.log('Advanced search params:', params);
          
        }}
      />
    </>
  );
};

export default SearchBar;
