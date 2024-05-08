/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Col, Dropdown, Layout, Menu, Row, theme } from "antd";
import MultiStepForm from "./MultiStepForm";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { decodeToken } from "./commonuitils";
import AppFooter from "./AppFooter";
const { Header, Content, Footer } = Layout;

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `Menu ${index + 1}`,
// }));

const App: React.FC = () => {

  return (   
   
            <MultiStepForm />
 
  );
};

export default App;
