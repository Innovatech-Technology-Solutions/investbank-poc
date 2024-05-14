import React, { useState } from 'react';
import AdvancedSearch from './AdvnancedSearch';
import InputText from './InputText';
import { Faders, MagnifyingGlass } from '@phosphor-icons/react';
import Button from './Button';
import { Col, Row } from 'antd';


const SearchBar: React.FC<{
  onSearch: (value: string) => void;
  onAdvancedSearch:(value: string) => void;
}> = ({ onSearch,onAdvancedSearch }) => {
  const [modalVisible, setModalVisible] = useState(false);
 const [searchText, setSearchText] = useState("");

  const handleBasicSearch = (value: string) => {
    setSearchText(value)
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <InputText
          sizeVariant={'sm'}
          placeholder={'Search...'}
          value={searchText}
          suffxIcon={<MagnifyingGlass onClick={()=>    onSearch(searchText)
          }/>} onChange={e => handleBasicSearch(e.target.value)} isError={false} id={''}  name={''}/>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button 
          sizeVariant='xs'  onClick={() => setModalVisible(true)}>
            Advanced Search<Faders size={32} />


          </Button>
        </Col>
      </Row>
      <AdvancedSearch
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSearch={(params: string) => {
            onAdvancedSearch(params)
          
        }}
      />
    </>
  );
};

export default SearchBar;
