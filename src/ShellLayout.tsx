/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Col,
  Drawer,
  Dropdown,
  Button as ANTBUTTON,
  Layout,
  List,
  Menu,
  Row,
  Tag,
  Typography,
  theme,
} from "antd";
import MultiStepForm from "./MultiStepForm";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { decodeToken } from "./commonuitils";
import {
  BellOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";

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
import { ArrowSquareOut, Bell, SignOut, User } from "@phosphor-icons/react";
import { useGetMyApplicationsQuery } from "./services/hostApiServices";
import LanguageModal from "./LanguageModal";
import { LanguageSVG } from "./constants/SVGS";
import useLanguage from "./hooks/useLanguage";
const { Text } = Typography;

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `Menu ${index + 1}`,
// }));

const ShellLayout: React.FC = () => {
  const [show, setShow] = useState(false);
  const { language } = useLanguage();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = decodeToken(localStorage.getItem("token") as any) as any;
  const [notificationCount, setNotificationCount] = useState(0);
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const uiConfiguration = uiData?.[language || "EN"];

  // Example function to increment notification count
  const incrementNotificationCount = () => {
    setNotificationCount(notificationCount + 1);
  };

  // Example function to reset notification count
  const resetNotificationCount = () => {
    setNotificationCount(0);
  };
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

  const apiData = useGetMyApplicationsQuery();
  const { data } = apiData;
  const [drawerVisible, setDrawerVisible] = useState(false);
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
                <div className="flex gap-4 items-center">
                  <Badge
                  showZero 

                    count={
                      data?.data?.output?.filter((i) => i.taskId?.length > 0)
                        ?.length
                    }
                    offset={[0, 0]}
                  >
                    <Bell onClick={() => setDrawerVisible(true)} size={29} />
                  </Badge>
                  {/* Conditionally display notification count */}
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
                                {language === "EN"
                                  ? user?.fullNameEn
                                  : user?.fullNameAr}
                              </span>
                            </div>
                          }
                          content={
                            <div className="p-3  w-max flex flex-col justify-center items-center">
                              <Button
                                onClick={() => {
                                  localStorage.clear();

                                  navigate("/login");
                                  window.location.reload();
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
                    <div className="header-navs-right float-right">
                      <ul className="flex items-center">
                        <li>
                          <a
                            onClick={() => setShow(true)}
                            className="lg:h-12 xl:h-14 lg:px-2 xl:px-3 flex items-center justify-center flex-shrink-0 no-underline !text-lg !font-normal cursor-pointer"
                          >
                            {language?.toLowerCase() === "en" ? "EN" : `عربي`}
                            <LanguageSVG />
                          </a>
                        </li>
                      </ul>
                      <LanguageModal
                        isVisible={show}
                        onClose={() => setShow(false)}
                      />
                    </div>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Header>
        <Row className="px-6" style={{ background: "#514a43" }}>
          <div className="header-navs  ">
            <div className="container" style={{ background: "#514a43" }}>
              <div className="flex content-between flex-wrap lg:flex-nowrap lg:justify-between lg:items-center">
                <nav className="main-navigation" aria-label="Main navigation">
                  <div className="menu-main-menu-container">
                    <ul className="menu nav-menu lg:flex lg:items-center lg:gap-1 xl:gap-2">
                      <li className="menu-item lg:inline-flex lg:items-center has-link-icon">
                        <Link
                          to="/investbank/dashboard"
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
                          <span>
                            {uiConfiguration?.UI_LABELS?.HOME || "Home"}
                          </span>
                        </Link>
                      </li>
                      <li className="menu-item lg:inline-flex lg:items-center">
                        {" "}
                        <Link
                          to="/investbank/mytasks"
                          className="hover:!text-primary-800 hover:!border-primary-800"
                        >
                          {uiConfiguration?.UI_LABELS?.MY_TASKS || "My Tasks"}
                        </Link>{" "}
                      </li>
                      <li className="menu-item lg:inline-flex lg:items-center">
                        {" "}
                        <Link
                          to="/investbank/applications"
                          className="hover:!text-primary-800 hover:!border-primary-800"
                        >
                          {uiConfiguration?.UI_LABELS?.APPLICATIONS ||
                            "Applications"}
                        </Link>{" "}
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </Row>
        <Content style={{ padding: "10px 48px" }}>
          <div
            style={{
              background: "#ffffff00",
              minHeight: 280,
              padding: "0px 20px",
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
        <Drawer
          title={uiConfiguration?.UI_LABELS?.NOTIFICATIONS || "Notifications"}
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={
            drawerVisible
          }
          width={400}
        >
          <List
          // locale={()=>data?.data?.output?.filter((i) => i.taskId?.length > 0).length>0?"d":""}
            dataSource={data?.data?.output?.filter((i) => i.taskId?.length > 0)}
            renderItem={(item: any) => (
              <List.Item
                key={item.taskId}
                onClick={() => setDrawerVisible(false)}
                style={{ cursor: "pointer" }}
              >
                <List.Item.Meta
                  title={
                    <Link
                      to={`/investbank/account-request/${item.requestId}`}
                      style={{ color: "inherit" }}
                    >
                      {item.requestId}
                    </Link>
                  }
                  description={
                    <div>
                      <Text type="secondary">
                        {uiConfiguration?.UI_LABELS?.TASK || "Task"}&nbsp;
                      </Text>
                      <Tag color="cyan">{item.taskId}</Tag>
                      <Text type="secondary">
                        {uiConfiguration?.UI_LABELS?.HAS_BEEN_ASSIGNED_TO_YOU ||
                          "has been assigned to you."}{" "}
                      </Text>
                      <Link
                        to={`/investbank/account-request/${item.requestId}`}
                        style={{ color: "inherit" }}
                      >
                        <ArrowSquareOut size={16} />
                      </Link>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          {/* Show message if there are no notifications */}
          {/* {data?.data?.output?.filter((i) => i.taskId?.length > 0)?.length ===
            0 && <p>No notifications</p>} */}
        </Drawer>
      </>
    </Layout>
  );
};

export default ShellLayout;
