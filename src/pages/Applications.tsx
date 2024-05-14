/* eslint-disable @typescript-eslint/no-explicit-any */

import Commontable from "./Commontable";
import { Link } from "react-router-dom";
import { TagChevron } from "@phosphor-icons/react";
import { useGetMyApplicationsQuery } from "../services/hostApiServices";
import { Empty, Tag } from "antd";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { isSales } from "../commonuitils";
import BreadCrumbs from "../BreadCrumbs";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Loader from "../Loader";
import AdvancedSearch from "../AdvnancedSearch";
import SearchBar from "../SearchBar";

// import { isValidApiResponse } from '../utils/Commonutils';
// import emitMessage from '../services/emitMessage';

type ApplicationsProps = {
  isMyapplications?: boolean;
};
const Applications = ({ isMyapplications = false }: ApplicationsProps) => {
  const apiData = useGetMyApplicationsQuery();
  const navigate = useNavigate();
  const { data, isFetching, isLoading, isSuccess } = apiData;

  function capitalizeFirstLetter(string) {
    if ([null, undefined, ""].includes(string)) return "";
    return string?.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
      title: <span className="pl-4">Request Id</span>,
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
      title: "Name",
      dataIndex: "fullNameEn",
      render: (item) => (
        <span className="capitalize">{capitalizeFirstLetter(item)}</span>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      render: (item) => (
        <span className="capitalize">{capitalizeFirstLetter(item)}</span>
      ),
    },
    {
      title: "Prime Customer",
      dataIndex: "primeCustomer",

      render: (status) => (
        <span>
          {status === "yes" ? (
            <Tag color="green" icon={<CheckCircleOutlined />}>
              {capitalizeFirstLetter(status)}
            </Tag>
          ) : status === "no" ? (
            <Tag color="red" icon={<CloseCircleOutlined />}>
              {capitalizeFirstLetter(status)}
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
            <Tag color="green">{capitalizeFirstLetter(status)}</Tag>
          )}
          {capitalizeFirstLetter(status) === "Submitted" && (
            <Tag color="blue">{capitalizeFirstLetter(status)}</Tag>
          )}
          {capitalizeFirstLetter(status) === "Rejected" && (
            <Tag color="red">{capitalizeFirstLetter(status)}</Tag>
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
            {isMyapplications ? "My Tasks" : "Applications"}
          </h2>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <BreadCrumbs
            itemFeed={[
              {
                label: isMyapplications ? "My Tasks" : "Applications",
                path: "#",
              },
            ]}
            homePath={"/investbank/dashboard"}
          />
        </div>
      </div>
      {data?.data?.output?.length > 0 && isSuccess ? (
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 justify-end">
            <SearchBar
              onSearch={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
              onAdvancedSearch={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            {isSales() && !isMyapplications ? (
              <div className="flex justify-end ">
                <Button
                  onClick={() => {
                    navigate("/investbank/account-request");
                  }}
                  sizeVariant="xs"
                >
                  Open Account
                </Button>
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
                  <Button
                    onClick={() => {
                      navigate("/investbank/account-request");
                    }}
                    sizeVariant="xs"
                  >
                    Open Account
                  </Button>
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
