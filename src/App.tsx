/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Col, Dropdown, Layout, Menu, Row, theme } from "antd";
import MultiStepForm from "./MultiStepForm";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { decodeToken } from "./commonuitils";
import AppFooter from "./AppFooter";
import BreadCrumbs from "./BreadCrumbs";
const { Header, Content, Footer } = Layout;

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `Menu ${index + 1}`,
// }));

const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-start md:flex-row md:items-center justify-between py-3">
        <div className="flex gap-2 items-center">
          <h2 className="text-lg text-blue-600 text-primary-600">
            {"Application Form"}
          </h2>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <BreadCrumbs
            itemFeed={[
              {
                label: "Application Form",
                path: "#",
              },
            ]}
            homePath={'/investbank/dashboard'}
          />
        </div>
      </div>
      <MultiStepForm />
    </>
  );
};

export default App;
