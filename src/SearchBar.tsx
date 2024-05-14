import React, { useState } from "react";
import AdvancedSearch from "./AdvnancedSearch";
import InputText from "./InputText";
import { Faders, MagnifyingGlass } from "@phosphor-icons/react";
import Button from "./Button";
import { Col, Row } from "antd";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

const SearchBar: React.FC<{
  onSearch: (value: string) => void;
  onAdvancedSearch: (value: string) => void;
}> = ({ onSearch, onAdvancedSearch }) => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleBasicSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <>
      <div className="flex justify-normal  gap-2 items-center">
        <div className="flex">
          <InputText
            style={{ height: "2.2rem" }}
            sizeVariant={"sm"}
            placeholder={uiConfiguration?.UI_LABELS?.SEARCH || "Search..."}
            value={searchText}
            suffxIcon={<MagnifyingGlass onClick={() => onSearch(searchText)} />}
            onChange={(e) => handleBasicSearch(e.target.value)}
            isError={false}
            id={""}
            name={""}
          />
        </div>
        <div>
          <Button sizeVariant="xs" onClick={() => setModalVisible(true)}>
            {uiConfiguration?.UI_LABELS?.ADVANCED_SEARCH || "Advanced Search"}
            <Faders size={32} />
          </Button>
        </div>
      </div>
      <AdvancedSearch
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSearch={(params: string) => {
          onAdvancedSearch(params);
        }}
      />
    </>
  );
};

export default SearchBar;
