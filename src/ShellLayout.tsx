/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Col, Dropdown, Layout, Menu, Row, theme } from "antd";
import MultiStepForm from "./MultiStepForm";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { decodeToken } from "./commonuitils";
import AppFooter from "./AppFooter";
const { Header, Content, Footer } = Layout;
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Button from "./Button";
import Popover from "./pages/Popover";
import { SignOut, User } from "@phosphor-icons/react";

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `Menu ${index + 1}`,
// }));

const ShellLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = decodeToken(localStorage.getItem("token") as any) as any;
  function getShortName(username) {
    // Split the username into words
    const words = username.trim().split(/\s+/);

    // Extract the first character of each word and join them
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  const navigate = useNavigate();
  console.log(user);
  if (user === null) return <Navigate to="/login" />;
  return (
    <Layout>
      <>
        <Header style={{ background: "#fff" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <img
                style={{ width: "25%" }}
                src="https://jordanfinancialservices.com/2020/sites/default/files/images/logos/investbank-01.png"
                alt="Home"
              />
            </Col>
            <Col>
              <div className="header-navs-right">
                <ul className="flex items-center">
                  <li className="flex gap-2 item-center justify-center ">
                    <a className="lg:h-12 xl:h-14  gap-2 lg:px-2 xl:px-3 flex items-center justify-center flex-shrink-0 no-underline !text-lg !font-normal cursor-pointer">
                      <Popover
                        interaction="click"
                        trigger={
                          <div className="flex gap-2">
                            <Avatar style={{ backgroundColor: "#b28708" }}>
                              {getShortName(user?.fullNameEn)}
                            </Avatar>

                            <span className="flex text-sm text-slate-950 items-center justify-center">
                              {user?.fullNameEn}
                            </span>
                          </div>
                        }
                        content={
                          <div className="p-3  w-max flex flex-col justify-center items-center">
                            <Button
                              onClick={() => {
                                localStorage.clear();
                                navigate("/login");
                              }}
                              styleVariant="link"
                              className="!px-[0.5rem]"
                            >
                              <>
                                <SignOut size={16} />
                                {"Logout"}
                              </>
                            </Button>
                          </div>
                        }
                        offset={[0, 14]} // Example offset values
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Header>
        <Row className="px-6" style={{background:'#514a43'}}>
          <div className="header-navs  ">
            <div className="container" style={{background:'#514a43'}}>
              <div className="flex content-between flex-wrap lg:flex-nowrap lg:justify-between lg:items-center">
                <nav className="main-navigation" aria-label="Main navigation">
                  <div className="menu-main-menu-container">
                    <ul className="menu nav-menu lg:flex lg:items-center lg:gap-1 xl:gap-2">
                      <li className="menu-item lg:inline-flex lg:items-center has-link-icon">
                        <Link
                          to="/investbank/applications"
                          className="hover:!text-primary-800 hover:!border-primary-800"
                        >
                          <svg
                            className="text-inherit"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                          >
                            <rect width="256" height="256" fill="none"></rect>
                            <path
                              d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z"
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="16"
                            ></path>
                          </svg>
                          <span>{"Home"}</span>
                        </Link>
                      </li>
                   
                      <li className="menu-item lg:inline-flex lg:items-center">
                        {" "}
                        <Link
                          to="/investbank/applications"
                          className="hover:!text-primary-800 hover:!border-primary-800"
                        >
                          { "Applications"}
                        </Link>{" "}
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </Row>
        <Content style={{ padding: "48px" }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: "20px",
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
            color: "white",
            background: "#b98f00",
          }}
        >
          Copyright © 2024 INVESTBANK. All rights reserved.
        </Footer> */}
        <AppFooter />
      </>
    </Layout>
  );
};

export default ShellLayout;
