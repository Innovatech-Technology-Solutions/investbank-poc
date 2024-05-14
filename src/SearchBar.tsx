import React, { useState } from "react";
import AdvancedSearch from "./AdvnancedSearch";
import InputText from "./InputText";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Button from "./Button";
import { Col, Row } from "antd";
import {
  useGetInterfaceByIDQuery,
  useGetTaskActionQuery,
  usePerformActionMutation,
} from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

const SearchBar: React.FC<{
  onSearch: (value: string) => void;
}> = ({ onSearch }) => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];
  console.log("bb", uiConfiguration);

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleBasicSearch = (value: string) => {
    setSearchText(value);
    onSearch(value);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <InputText
            sizeVariant={"sm"}
            placeholder={uiConfiguration?.UI_LABELS?.SEARCH || "Search..."}
            value={searchText}
            suffxIcon={<MagnifyingGlass />}
            onChange={(e) => handleBasicSearch(e.target.value)}
            isError={false}
            id={""}
            name={""}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button sizeVariant="xs" onClick={() => setModalVisible(true)}>
            {uiConfiguration?.UI_LABELS?.ADVANCED_SEARCH || "Advanced Search"}
          </Button>
        </Col>
      </Row>
      <AdvancedSearch
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSearch={(params: string) => {
          console.log("Advanced search params:", params);
        }}
      />
    </>
  );
};

export default SearchBar;
