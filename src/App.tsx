/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Col, Dropdown, Layout, Menu, Row, theme } from "antd";
import MultiStepForm from "./MultiStepForm";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { decodeToken } from "./commonuitils";
const { Header, Content, Footer } = Layout;

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `Menu ${index + 1}`,
// }));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = decodeToken(localStorage.getItem('token') as any) as any;

  const UserMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      
     
        <>
         
          <Header style={{ background: '#fff', padding: 0 }}>
      <Row justify="space-between" align="middle">
        <Col>
          <img
          style={{ width: 120 }}
                    src="https://www.investbank.jo/sites/all/themes/investbank_subtheme/logo.png?v1"
                    alt="Home"
                  />
        </Col>
        <Col style={{paddingRight:"3rem"}}>
          <Dropdown menu={UserMenu as any}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <Avatar size="small" icon={<UserOutlined />} />
              {user?.fullNameEn}
            </a>
          </Dropdown>
        </Col>
      </Row>
    </Header>
          <Content style={{ padding: "48px" }}>
            Welcome to INVESTBANK's Internet Banking
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <MultiStepForm />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              color: "white",
              background: "#b98f00",
            }}
          >
            Copyright © 2024 INVESTBANK. All rights reserved.
          </Footer>
        </>
    </Layout>
  );
};

export default App;
