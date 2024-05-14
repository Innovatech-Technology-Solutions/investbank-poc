import React, { useState } from "react";
import { Button, Modal, Select, Input, Row, Col } from "antd";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

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
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];

  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleSearch = () => {
    const queryString = Object.keys(searchParams)
      .filter((key) => searchParams[key]?.length)
      .map((key) => {
        if (Array.isArray(searchParams[key])) {
          return `${key}=${searchParams[key].join(",")}`;
        }
        return `${key}=${searchParams[key]}`;
      })
      .join("&");

    onSearch(queryString);
    onClose();
  };

  return (
    <Modal
      title={uiConfiguration?.UI_LABELS?.ADVANCED_SEARCH || "Advanced Search"}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {uiConfiguration?.UI_LABELS?.CANCEL || "Cancel"}
        </Button>,
        <Button key="search" type="primary" onClick={handleSearch}>
          {uiConfiguration?.UI_LABELS?.SEARCH || "Search"}
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select gender"
            onChange={(value: string[]) =>
              setSearchParams({ ...searchParams, gender: value })
            }
          >
            <Option value="1">Male</Option>
            <Option value="0">Female</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select marital status"
            onChange={(value: string[]) =>
              setSearchParams({ ...searchParams, maritalStatus: value })
            }
          >
            <Option value="single">Single</Option>
            <Option value="married">Married</Option>
            <Option value="divorced">Divorced</Option>
            <Option value="widowed">Widowed</Option>
          </Select>
        </Col>
        <Col span={12}>
          <Input
            style={{ background: "white", border: "1px solid" }}
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
            style={{ width: "100%" }}
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
