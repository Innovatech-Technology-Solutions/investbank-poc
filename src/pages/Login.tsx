import "../index.css";
import Logo from "../assets/Logo.png";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Spin, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";

const Login = () => {
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (values.username && values.password)
      login(values.username, values.password);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const login = async (username: string, password: string) => {
    setSpin(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/usermgmt/usermgmtsupport/Login`,
        {
          headers: {
            Authorization: `Basic ${btoa(username + ":" + password)}`,
          },
        }
      );
      console.log("Logged In successfully:", response);
      if (response.data?.output?.jwtToken) {
        localStorage.setItem("token", response.data?.output?.jwtToken);
        navigate("/investbank/dashboard");
      } else {
        notification.error({ message: "Invalid Username or password" });
      }
    } catch (error) {
      notification.error({ message: "Login failed",description:"Unable to login at the moment" });
    } finally {
      setSpin(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/investbank/dashboard");
  });

  return (
    <section className="grid grid-cols-[1fr_530px] h-[100vh] max-lg:grid-cols-1">
      <div className="background-container max-lg:hidden">
        <div className="text-center ml-20 flex flex-col gap-6 items-start font-[400] text-[40px] text-[#BD982E] mb-36">
          <div className="font-[400] text-[40px] text-[#BD982E]">
            Welcome to{" "}
            <span className="font-[500] text-[46px] text-[#BD982E]">
              INVESTBANK!
            </span>
          </div>
          <div className="font-[400] text-[40px] text-[#BD982E]">
            <span className="font-[500] text-[26px] text-[#808080]">
              Empower your finances, empower your future. Invest with purpose.
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#212020] h-full w-full flex flex-col justify-center items-center p-[1rem] relative">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="w-[230px] h-[65px] absolute top-[60px]"
        />
        <div className="flex flex-col gap-2 mt-[100px] items-center">
          <div className="font-[700] text-[24px] text-[#ffffff]">Sign In</div>
          <div className="font-[400] text-[12px] text-[#ffffff]">
            Welcome, please login with your credentials
          </div>
          <Form
            name="basic"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            style={{ width: "280px", marginTop: "20px" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                autoComplete="new-password"
                size="large"
                prefix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#bcbcbc"
                    viewBox="0 0 256 256"
                  >
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                  </svg>
                }
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                autoComplete="new-password"
                prefix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#bcbcbc"
                    viewBox="0 0 256 256"
                  >
                    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-80,84a12,12,0,1,1,12-12A12,12,0,0,1,128,164Zm32-84H96V56a32,32,0,0,1,64,0Z"></path>
                  </svg>
                }
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 0, span: 24 }}
            >
              <Checkbox className="!text-[#ffffff]">Remember Password</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full !bg-[#B78F01]"
                size="large"
              >
                {!spin ? (
                  "Login"
                ) : (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 24, color: "white" }}
                        spin
                      />
                    }
                  />
                )}
              </Button>
            </Form.Item>
          </Form>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <label className="text-[#B78F01]">Forgot Password?</label>
          </Form.Item>
        </div>
      </div>
    </section>
  );
};

export default Login;
