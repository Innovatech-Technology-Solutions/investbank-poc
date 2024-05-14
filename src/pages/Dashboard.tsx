import React from "react";
import BreadCrumbs from "../BreadCrumbs";
import { Card, ConfigProvider, Progress, Select } from "antd";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router";
import {
  useGetInterfaceByIDQuery,
  useGetTaskActionQuery,
  usePerformActionMutation,
} from "../services/hostApiServices";
import useLanguage from "../hooks/useLanguage";
import { ApexOptions } from "apexcharts";

const Dashboard = () => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];
  console.log("bb", uiConfiguration);
  const navigate = useNavigate();
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        uiConfiguration?.UI_LABELS?.JAN || "Jan",
        uiConfiguration?.UI_LABELS?.FEB || "Feb",
        uiConfiguration?.UI_LABELS?.MAR || "Mar",
        uiConfiguration?.UI_LABELS?.APR || "Apr",
        uiConfiguration?.UI_LABELS?.MAY || "May",
        uiConfiguration?.UI_LABELS?.JUN || "Jun",
        uiConfiguration?.UI_LABELS?.JUL || "Jul",
        uiConfiguration?.UI_LABELS?.AUG || "Aug",
        uiConfiguration?.UI_LABELS?.SEP || "Sep",
        uiConfiguration?.UI_LABELS?.OCT || "Oct",
        uiConfiguration?.UI_LABELS?.NOV || "Nov",
        uiConfiguration?.UI_LABELS?.DEC || "Dec",
      ],
    },
    yaxis: {
      opposite: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 60, 100],
        colorStops: [
          {
            offset: 0,
            color: "#BD982E",
            opacity: 1,
          },
          {
            offset: 60,
            color: "#BD982E",
            opacity: 0.4,
          },
        ],
      },
    },
    colors: ["#BD982E"],
  };

  const series = [
    {
      name: "Monthly Data",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 130, 120],
    },
  ];

  const options2: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
        barHeight: "60%",
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: [
        uiConfiguration?.UI_LABELS?.APPROVAL || "Approved",
        uiConfiguration?.UI_LABELS?.PENDING || "Pending",
        uiConfiguration?.UI_LABELS?.REJECTED || "Rejected",
      ],
      tickPlacement: "between",
      min: 0,
      max: 96,
      tickAmount: 4,
      labels: {
        formatter: (value) => `${value}hrs`,
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: `${language === "EN" ? "right" : "center"}`,
      },
    },
    fill: {
      type: "fill",
    },
    colors: ["#8BC34A", "#ffa500", "#f44336"],
  };

  const series2 = [
    {
      data: [
        { x: "Approved", y: 24, fillColor: "#8BC34A" },
        { x: "Pending", y: 72, fillColor: "#ffa500" },
        { x: "Rejected", y: 48, fillColor: "#f44336" },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col items-start md:flex-row md:items-center justify-between py-3">
        <div className="flex gap-2 items-center">
          <h2 className="text-lg text-blue-600 text-primary-600">
            {uiConfiguration?.UI_LABELS?.DASHBOARD || "Dashboard"}
          </h2>
        </div>{" "}
        <div className="flex items-center space-x-2">
          <BreadCrumbs
            itemFeed={[
              {
                label: uiConfiguration?.UI_LABELS?.DASHBOARD || "Dashboard",
                path: "#",
              },
            ]}
            homePath={"#"}
          />
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-6 max-xl:grid-cols-1">
        <section className="flex flex-col gap-6">
          <div className="flex flex-row gap-2 items-center max-lg:flex-col w-full">
            <div className="w-full bg-[#514a43] rounded-xl px-4 py-8 flex justify-center items-center">
              <div className="flex items-center gap-8 justify-between">
                <div className="relative">
                  <Progress
                    type="circle"
                    percent={75}
                    strokeColor={"#BD982E"}
                    trailColor="#ffffff"
                    className="absolute top-[-8px] left-[-8px]"
                    showInfo={false}
                    size={50}
                    strokeWidth={10}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ededed"
                    viewBox="0 0 256 256"
                  >
                    <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[#ffffff] font-[600] text-[25px]">
                    10,340
                  </div>
                  <div className="text-[#ffffff] font-[400] text-[13px]">
                    {uiConfiguration?.UI_LABELS?.TOTAL_APPLICATION_REQUESTS ||
                      "Total Application Requests"}
                  </div>
                </div>
                <div
                  className="rounded-full bg-[#ffffff]  flex justify-center items-center w-[40px] h-[40px] cursor-pointer"
                  onClick={() => {
                    navigate("/investbank/applications");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#a1810c"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full bg-[#514a43] rounded-xl px-4 py-8 flex justify-center items-center">
              <div className="flex items-center gap-4 justify-between">
                <div
                  className={`${
                    language === "EN"
                      ? "border-r-[#EAECF0] border-r-[1px] pr-2"
                      : "border-l-[#EAECF0] border-l-[1px] pl-2"
                  } `}
                >
                  <div className="flex flex-col justify-between items-center">
                    <div className="text-[#ffffff] font-[400] text-[13px] whitespace-nowrap">
                      {uiConfiguration?.UI_LABELS?.APPROVED_APPLICATIONS ||
                        "Approved Applications"}
                    </div>
                    <div className="font-[600] text-[25px] text-[#76BD85]">
                      5102
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    language === "EN"
                      ? "border-r-[#EAECF0] border-r-[1px] pr-2"
                      : "border-l-[#EAECF0] border-l-[1px] pl-2"
                  } `}
                >
                  <div className="flex flex-col justify-between items-center">
                    <div className="text-[#ffffff] font-[400] text-[13px] whitespace-nowrap">
                      {uiConfiguration?.UI_LABELS?.PENDING_APPLICATIONS ||
                        "Pending Applications"}
                    </div>
                    <div className="text-[#FC7B45] font-[600] text-[25px]">
                      1102
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col justify-between items-center">
                    <div className="text-[#ffffff] font-[400] text-[13px] whitespace-nowrap">
                      {uiConfiguration?.UI_LABELS?.REJECTED_APPLICATIONS ||
                        "Rejected Applications"}
                    </div>
                    <div className="text-[#FD524C] font-[600] text-[25px]">
                      6340
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* //Chart */}
            <Card className="w-full">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-4 justify-start items-start">
                    <div className="w-full whitespace-nowrap text-[16px] font-[700] ">
                      {uiConfiguration?.UI_LABELS?.TOTAL_APPLICATION_REQUESTS ||
                        "Total Application Requests"}{" "}
                      :<span className="text-[#a1810c]"> 10,340</span>
                    </div>
                    <div className="w-full whitespace-nowrap text-[12px] text-[#8D8E90] font-[500] translate-y-[-7px]">
                      {uiConfiguration?.UI_LABELS
                        ?.TOTAL_APPLICATIONS_OVER_THE_PERIOD_OF_TIME ||
                        "Total applications over the period of time"}
                    </div>
                  </div>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#cba344",
                        colorBorder: "#cba344",
                      },
                    }}
                  >
                    <Select
                      defaultValue={"2024"}
                      style={{ width: 120 }}
                      options={[
                        {
                          label: "2024",
                          value: "2024",
                        },
                        {
                          label: "2023",
                          value: "2023",
                        },
                        {
                          label: "2022",
                          value: "2022",
                        },
                      ]}
                    />
                  </ConfigProvider>
                </div>

                {/* Area chart */}
                <div>
                  <Chart
                    options={options}
                    series={series}
                    type="area"
                    height={350}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>
        <section className="w-full flex flex-col gap-2 max-xl:flex-row  max-xl:items-center max-lg:flex-col h-full">
          <Card className="w-full  h-full" bodyStyle={{ padding: "10px" }}>
            <div>
              <div className="text-[16px] font-[700] text-[#323438] ml-4">
                {uiConfiguration?.UI_LABELS
                  ?.AVERAGE_APPLICATION_PROCESSING_TIME ||
                  "Average Application Processing Time"}
              </div>
              <Chart
                options={options2}
                series={series2}
                type="bar"
                height={230}
              />
            </div>
            <div
              className="text-[12px] font-[400] text-[#323438] line-clamp-2 ml-4"
              style={{
                border: "1px solid #bdbdbd",
                padding: "2%",
                borderRadius: "5px",
              }}
            >
              {uiConfiguration?.UI_LABELS
                ?.TOTAL_NO_OF_APPLICATIONS_EXPERIENCING_DELAY_IN_RESPONSE ||
                "Total no of Applications experiencing delay in response"}{" "}
              :{" "}
              <span className="text-[#F24747] text-[18px] font-[500] ">
                1293
              </span>
            </div>
          </Card>
          <Card className="w-full  h-full" bodyStyle={{ padding: "10px" }}>
            <div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2 justify-start items-start ml-4">
                  <div className="w-full whitespace-nowrap text-[16px] font-[700] ">
                    {uiConfiguration?.UI_LABELS?.PENDING_TASKS ||
                      "Pending Tasks"}{" "}
                    :<span className="text-[#a1810c]"> 6</span>
                  </div>
                  <div className="w-full whitespace-nowrap text-[12px] text-[#8D8E90] font-[500] translate-y-[-7px]">
                    {uiConfiguration?.UI_LABELS?.TASKS_PENDING_FOR_TODAY ||
                      "Tasks pending for today"}
                  </div>
                </div>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#cba344",
                      colorBorder: "#cba344",
                    },
                  }}
                >
                  <Select
                    defaultValue={"this_week"}
                    style={{ width: 120 }}
                    options={[
                      {
                        label:
                          uiConfiguration?.UI_LABELS?.THIS_WEEK || "This Week",
                        value: "this_week",
                      },
                      {
                        label:
                          uiConfiguration?.UI_LABELS?.LAST_WEEK || "Last Week",
                        value: "last_week",
                      },
                    ]}
                  />
                </ConfigProvider>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Card
                  className="w-full h-[6rem] flex justify-center items-center"
                  bodyStyle={{ padding: "12px" }}
                >
                  <div className="flex items-center gap-8 justify-between ml-4">
                    <div className="relative">
                      <Progress
                        type="circle"
                        percent={80}
                        strokeColor={"#A9D8AC"}
                        trailColor="#E4F3E7"
                        className="absolute top-[-19px] left-[-19px]"
                        showInfo={false}
                        size={60}
                        strokeWidth={10}
                      />
                      <div className="text-[10px] text-[#408F51]">80%</div>
                    </div>
                    <div className="flex flex-col justify-start items-start ml-2">
                      <div className="text-[#323438] font-[700] text-[12px]">
                        {uiConfiguration?.UI_LABELS
                          ?.SUBMIT_APPLICATION_FOR_FURTHER_APPROVAL ||
                          "Submit application for further approval"}
                      </div>
                      <div className="text-[#8D8E90] font-[400] text-[10px]">
                        {uiConfiguration?.UI_LABELS
                          ?.FORWARD_APPROVAL_REQUEST_TO_XYZ_TEAM ||
                          "Forward approval request to xyz team"}
                      </div>
                    </div>
                    <div className="rounded-full bg-[#202020]  flex justify-center items-center w-[30px] h-[30px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                      </svg>
                    </div>
                  </div>
                </Card>

                <Card
                  className="w-full h-[6rem] flex justify-center items-center"
                  bodyStyle={{ padding: "12px" }}
                >
                  <div className="flex items-center gap-8 justify-between ml-4">
                    <div className="relative">
                      <Progress
                        type="circle"
                        percent={25}
                        strokeColor={"#EB5F24"}
                        trailColor="#FEF2F2"
                        className="absolute top-[-19px] left-[-19px]"
                        showInfo={false}
                        size={60}
                        strokeWidth={10}
                      />
                      <div className="text-[10px] text-[#408F51]">25%</div>
                    </div>
                    <div className="flex flex-col justify-start items-start ml-2">
                      <div className="text-[#323438] font-[700] text-[12px]">
                        {uiConfiguration?.UI_LABELS
                          ?.SUBMIT_APPLICATION_FOR_FURTHER_APPROVAL ||
                          "Submit application for further approval"}
                      </div>
                      <div className="text-[#8D8E90] font-[400] text-[10px]">
                        {uiConfiguration?.UI_LABELS
                          ?.FORWARD_APPROVAL_REQUEST_TO_XYZ_TEAM ||
                          "Forward approval request to xyz team"}
                      </div>
                    </div>
                    <div className="rounded-full bg-[#202020]  flex justify-center items-center w-[30px] h-[30px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"></path>
                      </svg>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
