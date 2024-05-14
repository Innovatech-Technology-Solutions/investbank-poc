import React, { useState } from 'react';
import { Button, Modal, Select, Input, Row, Col } from 'antd';

const { Option } = Select;

interface SearchParams {
  gender?: string[];
  name?: string;
  maritalStatus?: string[];
  primeCustomer?: string[];
}

const AdvancedSearch: React.FC<{
  visible: boolean;
  onClose: () => void;
  onSearch: (params: string) => void;
}> = ({ visible, onClose, onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleSearch = () => {
    const queryString = Object.keys(searchParams)
      .filter((key) => searchParams[key]?.length)
      .map((key) => {
        if (Array.isArray(searchParams[key])) {
          return `${key}=${searchParams[key].join(',')}`;
        }
        return `${key}=${searchParams[key]}`;
      })
      .join('&');

    onSearch(queryString);
    onClose();
  };

  return (
    <Modal
      title="Advanced Search"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="search" type="primary" onClick={handleSearch}>
          Search
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select gender"
            onChange={(value: string[]) =>
              setSearchParams({ ...searchParams, gender: value })
            }
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select marital status"
            onChange={(value: string[]) =>
              setSearchParams({ ...searchParams, maritalStatus: value })
            }
          >
            <Option value="single">Single</Option>
            <Option value="married">Married</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Input
          style={{background:'white'}}
            placeholder="Enter name"
            onChange={(e) =>
              setSearchParams({ ...searchParams, name: e.target.value })
            }
          />
        </Col>
        <Col span={12}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Select prime customer"
            onChange={(value: string[]) =>
              setSearchParams({ ...searchParams, primeCustomer: value })
            }
          >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  );
};

export default AdvancedSearch;
