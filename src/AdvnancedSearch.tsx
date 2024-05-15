import React, { useState } from "react";
import { Select, Input, Row, Col, Drawer } from "antd";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";
import InputText from "./InputText";
import Button from "./Button";
import SectionHeader from "./pages/SectionHeader";
import { X } from "@phosphor-icons/react";

const { Option } = Select;

interface SearchParams {
  gender?: string[];
  name?: string;
  maritalStatus?: string[];
  primeCustomer?: string[];
  status?: string[];
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
    <Drawer
      title={
        <div className="flex gap-2 justify-between">
          <SectionHeader title="Advanced Search" />
          <Button onClick={onClose} styleVariant="soft">
            <X size="16" />
          </Button>
        </div>
      }
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      footer={
        <div className="flex gap-2 justify-end">
          <Button
            sizeVariant="xs"
            key="cancel"
            styleVariant="secondary"
            onClick={onClose}
          >
            {uiConfiguration?.UI_LABELS?.CANCEL || "Cancel"}
          </Button>
          <Button sizeVariant="xs" key="search" onClick={handleSearch}>
            {uiConfiguration?.UI_LABELS?.SEARCH || "Search"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <InputText
              style={{ height: "2.2rem" }}
              placeholder="Search Something..."
              onChange={(e) =>
                setSearchParams({ ...searchParams, name: e.target.value })
              }
              isError={false}
              id={""}
              value={searchParams.name as any}
              name={""}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Select Gender"
              onChange={(value: string[]) =>
                setSearchParams({ ...searchParams, gender: value })
              }
            >
              <Option value="1">Male</Option>
              <Option value="0">Female</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Select
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
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Is Prime customer?"
              onChange={(value: string[]) =>
                setSearchParams({ ...searchParams, primeCustomer: value })
              }
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Select
              allowClear
              style={{ width: "100%" }}
              placeholder="Status"
              onChange={(value: string[]) =>
                setSearchParams({ ...searchParams, status: value })
              }
            >
              <Option value="APPROVED">Approved</Option>
              <Option value="REJECTED">Rejected</Option>
              <Option value="SUBMITTED">Submitted</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default AdvancedSearch;
