/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Col, Dropdown, Layout, Menu, Row, theme } from "antd";
import MultiStepForm from "./MultiStepForm";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { decodeToken } from "./commonuitils";
import AppFooter from "./AppFooter";
const { Header, Content, Footer } = Layout;
import { Navigate, Outlet, useLocation,useNavigate } from 'react-router-dom';
import Button from "./Button";
import Popover from "./pages/Popover";
import { SignOut, User } from '@phosphor-icons/react';

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
    return words.map(word => word[0]).join('').toUpperCase();
}
const navigate=useNavigate()
console.log(user)
if(user===null) return <Navigate to ="/login"/>
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
            <div className='header-navs-right'>
      <ul className='flex items-center'>
        <li className='flex gap-2 item-center justify-center '>
          <a className='lg:h-12 xl:h-14  gap-2 lg:px-2 xl:px-3 flex items-center justify-center flex-shrink-0 no-underline !text-lg !font-normal cursor-pointer'>
            <Popover
              interaction='click'
              trigger={<div className="flex gap-2">
                      <Avatar style={{ backgroundColor: '#b28708' }}>{getShortName(user?.fullNameEn)}</Avatar>

                <span className="flex text-sm text-slate-950 items-center justify-center">{user?.fullNameEn}</span></div>}
              content={
                <div className='p-3  w-max flex flex-col justify-center items-center'>
              
                  <Button onClick={()=>{localStorage.clear()
navigate("/login")                
                }} styleVariant='link' className='!px-[0.5rem]'>
                    <>
                      <SignOut size={16} />
                      { 'Logout'}
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
        <Content style={{ padding: "48px" }}>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
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
