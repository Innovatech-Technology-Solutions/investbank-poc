/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AdvancedSearch from "./AdvnancedSearch";
import InputText from "./InputText";
import { Faders, MagnifyingGlass, XCircle } from "@phosphor-icons/react";
import Button from "./Button";
import { Col, Row } from "antd";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

const SearchBar: React.FC<{
  onSearch: (value: string) => void;
  onAdvancedSearch: (value: string) => void;
  input: any;
}> = ({ onSearch, onAdvancedSearch, input }) => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];

  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState(input || undefined);
  const [width, setWidth] = useState("10.2rem");

  const handleBasicSearch = (value: string) => {
    setSearchText(value);
  };

  return (
    <>
      <div className="flex justify-normal  gap-2 items-center">
        <div className="flex">
          <InputText
            style={{ height: "2.2rem", width: width }}
            sizeVariant={"sm"}
            placeholder={uiConfiguration?.UI_LABELS?.SEARCH || "Search..."}
            value={searchText}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch(searchText);
                }
              }} 

            suffxIcon={!input?<MagnifyingGlass onClick={() => onSearch(searchText)} />: <XCircle onClick={() => onSearch('' as any)} size={16} />}
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
