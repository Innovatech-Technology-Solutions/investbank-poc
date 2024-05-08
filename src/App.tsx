/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Col, Dropdown, Layout, Menu, Row, theme } from "antd";
import MultiStepForm from "./MultiStepForm";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
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
  const user = decodeToken(localStorage.getItem("token") as any) as any;

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
        <Header style={{ background: "#fff" }}>
          <Row justify="space-between" align="middle" >
            <Col>
              <img
                style={{ width: '25%' }}
                src="https://jordanfinancialservices.com/2020/sites/default/files/images/logos/investbank-01.png"
                alt="Home"
              />
            </Col>
            <Col >
              <Dropdown menu={UserMenu as any}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar style={{fontSize:'16px', color: 'white',
    background: '#b28708'
                }} icon={<UserOutlined />} />
                  <span className="px-2">{user?.fullNameEn}</span>
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
