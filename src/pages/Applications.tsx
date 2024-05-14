/* eslint-disable @typescript-eslint/no-explicit-any */

import Commontable from "./Commontable";
import { Link } from "react-router-dom";
import { TagChevron, XCircle } from "@phosphor-icons/react";
import {
  useDownloadRDLMutation,
  useGetMyApplicationsQuery,
} from "../services/hostApiServices";
import { useGetInterfaceByIDQuery } from "../services/hostApiServices";
import useLanguage from "../hooks/useLanguage";
import { Empty, Tag } from "antd";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { isSales } from "../commonuitils";
import BreadCrumbs from "../BreadCrumbs";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Loader from "../Loader";
import AdvancedSearch from "../AdvnancedSearch";
import SearchBar from "../SearchBar";
import { isValidResponse } from "../utils/Commonutils";
import MenuDropDown from "../MenuDrioDown";

// import { isValidApiResponse } from '../utils/Commonutils';
// import emitMessage from '../services/emitMessage';

type ApplicationsProps = {
  isMyapplications?: boolean;
};
const Applications = ({ isMyapplications = false }: ApplicationsProps) => {
  const [params, setParams] = useState("");
  const apiData = useGetMyApplicationsQuery(params as any);
  const [downLoadRDl] = useDownloadRDLMutation();
  const navigate = useNavigate();
  const { data, isFetching, isLoading, isSuccess } = apiData;
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];

  function capitalizeFirstLetter(string) {
    if ([null, undefined, ""].includes(string)) return "";
    return string?.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  let debounceTimer; // Variable to store the timer ID

  const debounceSearch = (value) => {
    clearTimeout(debounceTimer); // Clear previous timeout
    debounceTimer = setTimeout(() => {
      setParams(`&search=${value}`); // Set parameters after debounce time
    }, 300); // 300 milliseconds debounce delay, adjust as needed
  };
  function downloadBase64File(base64String, fileName) {
    // Convert base64 string to Blob
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  }

  const sortedDataSource = (source) =>
    [...structuredClone(source)].sort((a, b) => {
      const aHasTaskId = "taskId" in a && a.taskId !== null;
      const bHasTaskId = "taskId" in b && b.taskId !== null;

      if (aHasTaskId && !bHasTaskId) {
        return -1;
      }
      if (!aHasTaskId && bHasTaskId) {
        return 1;
      }
      return 0;
    });
  const columns = [
    {
      title: (
        <span className="pl-4">
          {uiConfiguration?.UI_LABELS?.REQUEST_ID || "Request Id"}
        </span>
      ),
      dataIndex: "requestId",
      render: (text: any, record: any, idx: any) => (
        <div className={"flex items-center gap-1"}>
          {record?.taskId && !isMyapplications ? (
            <span style={{ fontSize: "20px", color: "#FFD701" }}>
              <TagChevron weight="fill" />
            </span>
          ) : (
            <span className={"pl-5"}></span>
          )}
          {text ? (
            <Link to={`/investbank/account-request/${text}`}>{text}</Link>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      title: uiConfiguration?.UI_LABELS?.NAME || "Name",
      dataIndex: "fullNameEn",
      render: (item) => (
        <span className="capitalize">{capitalizeFirstLetter(item)}</span>
      ),
    },
    {
      title: uiConfiguration?.UI_LABELS?.MOBILE || "Mobile",
      dataIndex: "mobileNo",
    },
    {
      title: uiConfiguration?.UI_LABELS?.NATIONALITY || "Nationality",
      dataIndex: "nationality",
      render: (item) => (
        <span className="capitalize">{capitalizeFirstLetter(item)}</span>
      ),
    },
    {
      title: uiConfiguration?.UI_LABELS?.PRIME_CUSTOMER || "Prime Customer",
      dataIndex: "primeCustomer",

      render: (status) => (
        <span>
          {status === "yes" ? (
            <Tag color="green" icon={<CheckCircleOutlined />}>
              {capitalizeFirstLetter(uiConfiguration?.UI_LABELS?.YES || status)}
            </Tag>
          ) : status === "no" ? (
            <Tag color="red" icon={<CloseCircleOutlined />}>
              {capitalizeFirstLetter(uiConfiguration?.UI_LABELS?.NO || status)}
            </Tag>
          ) : (
            <Tag color="blue">{capitalizeFirstLetter(status)}</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span>
          {capitalizeFirstLetter(status) === "Approved" && (
            <Tag color="green">
              {capitalizeFirstLetter(
                uiConfiguration?.UI_LABELS?.APPROVAL || status
              )}
            </Tag>
          )}
          {capitalizeFirstLetter(status) === "Submitted" && (
            <Tag color="blue">
              {capitalizeFirstLetter(
                uiConfiguration?.UI_LABELS?.SUBMITTED || status
              )}
            </Tag>
          )}
          {capitalizeFirstLetter(status) === "Rejected" && (
            <Tag color="red">
              {capitalizeFirstLetter(
                uiConfiguration?.UI_LABELS?.REJECTED || status
              )}
            </Tag>
          )}

          {capitalizeFirstLetter(status) !== "Approved" &&
            capitalizeFirstLetter(status) !== "Rejected" &&
            capitalizeFirstLetter(status) !== "Submitted" &&
            capitalizeFirstLetter(status)}
        </span>
      ),
    },
  ];
  if (isLoading || isFetching)
    return (
      <div className="flex h-[50vh] justify-center items-center">
        <Loader />
      </div>
    );
  return (
    <>
      <div className="flex flex-col items-start md:flex-row md:items-center justify-between py-3">
        <div className="flex gap-2 items-center">
          <h2 className="text-lg text-blue-600 text-primary-600">
            {isMyapplications
              ? uiConfiguration?.UI_LABELS?.MY_TASKS || "My Tasks"
              : uiConfiguration?.UI_LABELS?.APPLICATIONS || "Applications"}
          </h2>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <BreadCrumbs
            itemFeed={[
              {
                label: isMyapplications
                  ? uiConfiguration?.UI_LABELS?.MY_TASKS || "My Tasks"
                  : uiConfiguration?.UI_LABELS?.APPLICATIONS || "Applications",
                path: "#",
              },
            ]}
            homePath={"/investbank/dashboard"}
          />
        </div>
      </div>
      {data?.data?.output?.length > 0 && isSuccess ? (
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 justify-end items-center">
            <SearchBar
              onSearch={function (value: string): void {
                debounceSearch(value);
              }}
              onAdvancedSearch={function (val): void {
                console.log(val);
                setParams(`&${val}`);
              }}
            />
            {isSales() && !isMyapplications ? (
              <div className="flex justify-end gap-2 ">
                <Button
                  onClick={() => {
                    navigate("/investbank/account-request");
                  }}
                  sizeVariant="xs"
                >
                  Open Account
                </Button>
                <MenuDropDown
                  buttonSize="xs"
                  buttonText="Export"
                  items={[
                    { label: "PDF", value: "pdf" },
                    { label: "Excel", value: "xls" },
                  ]}
                  onItemClick={async (e) => {
                    try {
                      const res: any = await downLoadRDl().unwrap();
                      if (isValidResponse(res)) {
                        console.log("ff", res?.data?.fileContent);
                        downloadBase64File(
                          res?.data?.fileContent,
                          `Report.${e}`
                        );
                      }
                    } catch (e) {
                      console.log("ee", e);
                    }
                  }}
                />
              </div>
            ) : null}
          </div>
          <Commontable
            scroll={{ x: true }}
            loading={{
              spinning: isLoading || isFetching,
              tip: "Loading...",
            }}
            columns={columns}
            rowKey="requestId"
            dataSource={
              isMyapplications
                ? data?.data?.output?.filter((i) => i.taskId?.length > 0)
                : sortedDataSource(data?.data?.output)
            }
          />
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="flex flex-col gap-2">
              <div>No Application found. </div>
              {isSales() && !isMyapplications ? (
                <div>
                  {!params ? (
                    <Button
                      onClick={() => {
                        navigate("/investbank/account-request");
                      }}
                      sizeVariant="xs"
                    >
                      Open Account
                    </Button>
                  ) : (
                    <Button
                      styleVariant="secondary"
                      onClick={() => {
                        setParams("");
                      }}
                      sizeVariant="xs"
                    >
                      Clear Search <XCircle size={32} />
                    </Button>
                  )}
                </div>
              ) : null}
            </div>
          }
        />
      )}
    </>
  );
};

export default Applications;
