/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Steps,
  Form,
  Input,
  DatePicker,
  Radio,
  Row,
  Col,
  Button,
  ConfigProvider,
  Card,
} from "antd";
import dayjs from "dayjs";

import Stepper from "./Stepper";
import Accordion from "./Accordion";
import InputText from "./InputText";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePickerInput from "./DatePickerInput";
import Select from "./Select";

const { Step } = Steps;
const { Option } = Select;
// const uiConfiguration={}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);

  const schema = z.object({
    fullNameAr: z.string(),
    fullNameEn: z.string(),
    mobileNo: z.string(),
    email: z.string(),
    motherName: z.string(),
    sex: z.string(),
    dateOfBirth: z.string(),
    nationality: z.string(),
    nationalId: z.string(),
    nationalIdDate: z.string(),
    nationalIdExpiryDate: z.string(),
    isBankBlacklisted: z.string(),
    birthCountry: z.string(),
    birthCity: z.string(),
    residanceStatus: z.string(),
    maritalStatus: z.string(),
    wifeOrHusbandName: z.string(),
    childsName: z.string(),
    personalIdentityIssuanceLocation: z.string(),
    personalIdentityType: z.string(),
    jordanAddress: z.string(),
    cityName: z.string(),
    areaName: z.string(),
    streetName: z.string(),
    apartmentNo: z.string(),
    postalCode: z.string(),
    homeLandLine: z.string(),
    job: z.string(),
    jobLocation: z.string(),
    monthlySalary: z.string(),
    incomeSource: z.string(),
    otherIncomeSources: z.string(),
    transactionSizePerAccount: z.string(),
    accountOpeningPurpose: z.string(),
    primeCustomer: z.string(),
    customerNumber: z.string(),
    branchName: z.string(),
    accountType: z.string(),
    accountCurrency: z.string(),
    accountNumber: z.string(),
    accountIban: z.string(),
  });

  const [form] = Form.useForm();
  type formType = {
    order: number;
    label: string;
    name: string;
    id: string;
    placeholder: string;
    type: string;
    show?: boolean;
    isMandatory?: boolean;
    isNumeric?: boolean;
    options?: Array<any>;
  };
  const formControlsConfig: formType[] = [
    {
      order: 1,
      label: "Full Name in Arabic",
      name: "fullNameAr",
      id: "fullNameAr",
      placeholder: "Full Name in Arabic",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 2,
      label: "Full Name in English",
      name: "fullNameEn",
      id: "fullNameEn",
      placeholder: "Full Name in English",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 3,
      label: "Mobile Number",
      name: "mobileNo",
      id: "mobileNo",
      placeholder: "Mobile Number",
      type: "text",
      show: true,
      isMandatory: true,
      isNumeric: true,
    },
    {
      order: 4,
      label: "Email",
      name: "email",
      id: "email",
      placeholder: "Email",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 5,
      label: "Mother Name",
      name: "motherName",
      id: "motherName",
      placeholder: "Mother Name",
      type: "text",
      show: true,
    },
    {
      order: 6,
      label: "Sex",
      name: "sex",
      id: "sex",
      placeholder: "Sex",
      type: "select",
      show: true,
      options: [
        { label: "Male", value: 1 },
        { label: "Female", value: 0 },
      ],
    },
    {
      order: 7,
      label: "Date of Birth",
      name: "dateOfBirth",
      id: "dateOfBirth",
      placeholder: "Date of Birth",
      type: "date",
      show: true,
    },
    {
      order: 8,
      label: "Nationality",
      name: "nationality",
      id: "nationality",
      placeholder: "Nationality",
      type: "text",
      show: true,
    },
    {
      order: 9,
      label: "National ID",
      name: "nationalId",
      id: "nationalId",
      placeholder: "National ID",
      type: "text",
      show: true,
    },
    {
      order: 10,
      label: "National ID Date",
      name: "nationalIdDate",
      id: "nationalIdDate",
      placeholder: "National ID Date",
      type: "date",
      show: true,
    },
    {
      order: 11,
      label: "National ID Expiry Date",
      name: "nationalIdExpiryDate",
      id: "nationalIdExpiryDate",
      placeholder: "National ID Expiry Date",
      type: "date",
      show: true,
    },
    {
      order: 12,
      label: "Is Bank Blacklisted?",
      name: "isBankBlacklisted",
      id: "isBankBlacklisted",
      placeholder: "Is Bank Blacklisted?",
      type: "select",
      show: true,
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
    {
      order: 13,
      label: "Birth Country",
      name: "birthCountry",
      id: "birthCountry",
      placeholder: "Birth Country",
      type: "text",
      show: true,
    },
    {
      order: 14,
      label: "Birth City",
      name: "birthCity",
      id: "birthCity",
      placeholder: "Birth City",
      type: "text",
      show: true,
    },
  ];
  const socialStatusControlsConfig = [
    {
      order: 1,
      label: "Social Status",
      name: "socialStatus",
      id: "socialStatus",
      placeholder: "Social Status",
      type: "select",
      show: true,
      options: [
        { label: "Single", value: "single" },
        { label: "Married", value: "married" },
        { label: "Divorced", value: "divorced" },
        { label: "Widowed", value: "widowed" },
      ],
      isMandatory: true,
    },
    {
      order: 2,
      label: "Residence Status",
      name: "residenceStatus",
      id: "residenceStatus",
      placeholder: "Residence Status",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 3,
      label: "Personal Identity Issuance Location",
      name: "personalIdentityIssuanceLocation",
      id: "personalIdentityIssuanceLocation",
      placeholder: "Personal Identity Issuance Location",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 4,
      label: "Personal Identity Type",
      name: "personalIdentityType",
      id: "personalIdentityType",
      placeholder: "Personal Identity Type",
      type: "text",
      show: true,
      isMandatory: true,
    },
  ];
  
  const residenceAddressControlsConfig = [
    {
      order: 1,
      label: "City Name",
      name: "cityName",
      id: "cityName",
      placeholder: "City Name",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 2,
      label: "Area Name",
      name: "areaName",
      id: "areaName",
      placeholder: "Area Name",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 3,
      label: "Street Name",
      name: "streetName",
      id: "streetName",
      placeholder: "Street Name",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 4,
      label: "Apartment No",
      name: "apartmentNo",
      id: "apartmentNo",
      placeholder: "Apartment No",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 5,
      label: "Postal Code",
      name: "postalCode",
      id: "postalCode",
      placeholder: "Postal Code",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 6,
      label: "Home Landline",
      name: "homeLandline",
      id: "homeLandline",
      placeholder: "Home Landline",
      type: "text",
      show: true,
    },
  ];
  
  const employmentFinancialControlsConfig = [
    {
      order: 1,
      label: "Job",
      name: "job",
      id: "job",
      placeholder: "Job",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 2,
      label: "Job Location",
      name: "jobLocation",
      id: "jobLocation",
      placeholder: "Job Location",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 3,
      label: "Monthly Salary",
      name: "monthlySalary",
      id: "monthlySalary",
      placeholder: "Monthly Salary",
      type: "text",
      show: true,
      isMandatory: true,
      isNumeric: true,
    },
    {
      order: 4,
      label: "Income Source",
      name: "incomeSource",
      id: "incomeSource",
      placeholder: "Income Source",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 5,
      label: "Other Income Sources",
      name: "otherIncomeSources",
      id: "otherIncomeSources",
      placeholder: "Other Income Sources",
      type: "text",
      show: true,
    },
    {
      order: 6,
      label: "Transaction Size Per Account",
      name: "transactionSizePerAccount",
      id: "transactionSizePerAccount",
      placeholder: "Transaction Size Per Account",
      type: "text",
      show: true,
      isNumeric: true,
    },
    {
      order: 7,
      label: "Account Opening Purpose",
      name: "accountOpeningPurpose",
      id: "accountOpeningPurpose",
      placeholder: "Account Opening Purpose",
      type: "text",
      show: true,
    },
  ];
  
  const customerInformationControlsConfig = [
    {
      order: 1,
      label: "Prime Customer",
      name: "primeCustomer",
      id: "primeCustomer",
      placeholder: "Prime Customer",
      type: "select",
      show: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      isMandatory: true,
    },
    {
      order: 2,
      label: "Customer Number",
      name: "customerNumber",
      id: "customerNumber",
      placeholder: "Customer Number",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 3,
      label: "Branch Name",
      name: "branchName",
      id: "branchName",
      placeholder: "Branch Name",
      type: "text",
      show: true,
      isMandatory: true,
    },
  ];
  
  const accountInformationControlsConfig = [
    {
      order: 1,
      label: "Account Type",
      name: "accountType",
      id: "accountType",
      placeholder: "Account Type",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 2,
      label: "Account Currency",
      name: "accountCurrency",
      id: "accountCurrency",
      placeholder: "Account Currency",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 3,
      label: "Account Number",
      name: "accountNumber",
      id: "accountNumber",
      placeholder: "Account Number",
      type: "text",
      show: true,
      isMandatory: true,
    },
    {
      order: 4,
      label: "Account IBAN",
      name: "accountIBAN",
      id: "accountIBAN",
      placeholder: "Account IBAN",
      type: "text",
      show: true,
      isMandatory: true,
    },
  ];

  const steps = [
    {
      title: "Applicant Details",
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="fullNameArabic" label="Full Name in Arabic">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="fullNameEnglish" label="Full Name in English">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="mobileNumber" label="Mobile Number">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="motherName" label="Mother Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="sex" label="Sex">
                <Select>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="dateOfBirth" label="Date of Birth">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="nationality" label="Nationality">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="nationalID" label="National ID">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="nationalIDDate" label="National ID Date">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="nationalIDExpiryDate"
                label="National ID Expiry Date"
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="isBankBlacklisted" label="Is Bank Blacklisted?">
                <Select>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="birthCountry" label="Birth Country">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="birthCity" label="Birth City">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Social Status",
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="residanceStatus" label="Residence Status">
                <Select>
                  <Option value="citizen">Citizen</Option>
                  <Option value="resident">Resident</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="martialStatus" label="Marital Status">
                <Select>
                  <Option value="single">Single</Option>
                  <Option value="married">Married</Option>
                  {/* Add more options */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="wifeHusbandName"
                label={
                  form.getFieldValue("sex") === "male"
                    ? "Wife Name"
                    : "Husband Name"
                }
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="childsNames" label="Childs Names">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="persoanlIdentityIssuanceLocation"
                label="Personal Identity Issuance Location"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="personalIdentityType"
                label="Personal Identity Type"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Residence Address",
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="cityName" label="City Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="areaName" label="Area Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="streetName" label="Street Name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="apartmentNo" label="Apartment No">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="postalCode" label="Postal Code">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="homeLandline" label="Home Landline">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Salary Details",
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="job" label="Job">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="jobLocation" label="Job Location">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="monthlySalary" label="Monthly Salary">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="incomeSource" label="Income Source">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="otherIncomeSources" label="Other Income Sources">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="transactionSizePerAccount"
                label="Transaction Size Per Account"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="accountOpeningPurpose"
                label="Account Opening Purpose"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Customer Information",
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="primeCustomer" label="Prime Customer">
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="cusomterNumber" label="Customer Number">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="branchName" label="Branch Name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: "Account Information",
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="accountType" label="Account Type">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="accountCurrency" label="Account Currency">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="accountNumber" label="Account Number">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="accountIBAN" label="Account IBAN">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    // {
    //   title: 'Social Status',
    //   content: (
    //     <Form form={form} layout="vertical">
    //       <Form.Item name="residanceStatus" label="Residence Status">
    //         <Select>
    //           <Option value="citizen">Citizen</Option>
    //           <Option value="resident">Resident</Option>
    //         </Select>
    //       </Form.Item>
    //       <Form.Item name="martialStatus" label="Marital Status">
    //         <Select>
    //           <Option value="single">Single</Option>
    //           <Option value="married">Married</Option>
    //           {/* Add more options */}
    //         </Select>
    //       </Form.Item>
    //       <Form.Item name="wifeHusbandName" label={form.getFieldValue('sex') === 'male' ? 'Wife Name' : 'Husband Name'}>
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="childsNames" label="Childs Names">
    //         <Input.TextArea />
    //       </Form.Item>
    //       <Form.Item name="persoanlIdentityIssuanceLocation" label="Personal Identity Issuance Location">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="personalIdentityType" label="Personal Identity Type">
    //         <Input />
    //       </Form.Item>
    //     </Form>
    //   ),
    // },
    // {
    //   title: 'Residence Address',
    //   content: (
    //     <Form form={form} layout="vertical">
    //       <Form.Item name="cityName" label="City Name">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="areaName" label="Area Name">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="streetName" label="Street Name">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="apartmentNo" label="Apartment No">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="postalCode" label="Postal Code">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="homeLandline" label="Home Landline">
    //         <Input />
    //       </Form.Item>
    //     </Form>
    //   ),
    // },
    // {
    //   title: 'Employment and Financial Details',
    //   content: (
    //     <Form form={form} layout="vertical">
    //       <Form.Item name="job" label="Job">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="jobLocation" label="Job Location">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="monthlySalary" label="Monthly Salary">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="incomeSource" label="Income Source">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="otherIncomeSources" label="Other Income Sources">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="transactionSizePerAccount" label="Transaction Size Per Account">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="accountOpeningPurpose" label="Account Opening Purpose">
    //         <Input />
    //       </Form.Item>
    //     </Form>
    //   ),
    // },
    // {
    //   title: 'Customer Information',
    //   content: (
    //     <Form form={form} layout="vertical">
    //       <Form.Item name="primeCustomer" label="Prime Customer">
    //         <Radio.Group>
    //           <Radio value="yes">Yes</Radio>
    //           <Radio value="no">No</Radio>
    //         </Radio.Group>
    //       </Form.Item>
    //       <Form.Item name="cusomterNumber" label="Customer Number">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="branchName" label="Branch Name">
    //         <Input />
    //       </Form.Item>
    //     </Form>
    //   ),
    // },
    // {
    //   title: 'Account Information',
    //   content: (
    //     <Form form={form} layout="vertical">
    //       <Form.Item name="accountType" label="Account Type">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="accountCurrency" label="Account Currency">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="accountNumber" label="Account Number">
    //         <Input />
    //       </Form.Item>
    //       <Form.Item name="accountIBAN" label="Account IBAN">
    //         <Input />
    //       </Form.Item>
    //     </Form>
    //   ),
    // },
  ];

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const useFormMethods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "rgb(185, 144, 0)",
          },
        },
      }}
    >
      {/* <Steps  status='process' direction='vertical'current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps> */}
      <div className={"flex md:flex-col lg:flex-row pt-2 gap-2"}>
        <Card style={{ width: 350, paddingTop: "1.5rem" }}>
          <Stepper
            clickedIndex={() => {}}
            stepperItems={[
              {
                label: "Applicant Details",
                path: "#",
                stage: "current",
                stepperIndex: 1,
                isActive: true,
                isLastItem: false,
              },
              {
                label: "Social Status",
                path: "#",
                stage: "upcoming",
                stepperIndex: 2,
                isActive: false,
                isLastItem: false,
              },
              {
                label: "Residence Address",
                path: "#",
                stage: "upcoming",
                stepperIndex: 3,
                isActive: false,
                isLastItem: false,
              },
              {
                label: "Employment and Financial Details",
                path: "#",
                stage: "upcoming",
                stepperIndex: 4,
                isActive: false,
                isLastItem: false,
              },
              {
                label: "Customer Information",
                path: "#",
                stage: "upcoming",
                stepperIndex: 5,
                isActive: false,
                isLastItem: false,
              },
              {
                label: "Account Information",
                path: "#",
                stage: "upcoming",
                stepperIndex: 6,
                isActive: false,
                isLastItem: true,
              },
            ]}
          />
        </Card>
        <Card style={{ width: "100%" }}>
          <Accordion
            defaultIndex={activeIndex}
            clickedAccordion={(e: any) => setActiveIndex(e)}
            accordionItems={[
              {
                title: "Applicant Details",
                accordianIndex: 1,
                content: (
                  <div
                    id="stepidx-1"
                    className={
                      "md:col-span-3 grid grid-cols-1 gap-x-6 gap-y-[1.3rem] md:grid-cols-3 pb-[1.2rem]"
                    }
                  >
                    {formControlsConfig
                      .sort((a, b) => a.order - b.order)
                      .map(
                        ({
                          id,
                          type,
                          name,
                          placeholder,
                          show = true,
                          isMandatory = false,
                          isNumeric,
                          options = [],
                        }) =>
                          show ? (
                            <>
                              {type === "text" ? (
                                <div key={id}>
                                  <Controller
                                    name={name as any}
                                    control={useFormMethods.control}
                                    render={({
                                      field: { onChange, value },
                                      fieldState: { error },
                                    }) => (
                                      <InputText
                                        label={placeholder}
                                        isError={!!error}
                                        name={name}
                                        id={id}
                                        placeholder={placeholder}
                                        isMandatory={isMandatory}
                                        disabled={false}
                                        onlyNumeric={isNumeric}
                                        type={type}
                                        onInputChange={onChange}
                                        value={value}
                                        errorMessage={
                                          error ? error.message : ""
                                        }
                                      />
                                    )}
                                  />
                                </div>
                              ) : null}
                              {type === "select" ? (
                                <div>
                                  <Controller
                                    name={id as any}
                                    control={useFormMethods.control}
                                    render={({
                                      field: { onChange, value },
                                      fieldState: { error },
                                    }) => (
                                      <Select
                                        name={id as any}
                                        id={id}
                                        label={placeholder}
                                        size={"sm" as any}
                                        isMandatory={true}
                                        disableLabel={false}
                                        onChange={onChange}
                                        value={value}
                                        isError={!!error}
                                        errorMessage={error?.message}
                                        showPlaceHolder={true as any}
                                        options={options}
                                      />
                                    )}
                                  />
                                </div>
                              ) : null}
                              {type === "date" ? (
                                <div>
                                  <Controller
                                    name={name}
                                    control={useFormMethods.control}
                                    render={({
                                      field: { onChange, value },
                                      fieldState: { error },
                                    }) => (
                                      <DatePickerInput
                                        name={name}
                                        id={name}
                                        label={placeholder}
                                        picker="year"
                                        onChange={(_date, value) => {
                                          onChange(value);
                                        }}
                                        requiredLabel={true}
                                        format={"YYYY"}
                                        value={
                                          value &&
                                          dayjs(value, "YYYY").isValid()
                                            ? dayjs(value)
                                            : null
                                        }
                                        size="large"
                                        isError={!!error}
                                        errorMessage={error?.message}
                                      />
                                    )}
                                  />
                                </div>
                              ) : null}
                            </>
                          ) : null
                      )}
                  </div>
                ),
              },
              {
                title: "Social Status",
                accordianIndex: 2,
                content:    <div
                id="stepidx-1"
                className={
                  "md:col-span-3 grid grid-cols-1 gap-x-6 gap-y-[1.3rem] md:grid-cols-3 pb-[1.2rem]"
                }
              >
                {socialStatusControlsConfig
                  .sort((a, b) => a.order - b.order)
                  .map(
                    ({
                      id,
                      type,
                      name,
                      placeholder,
                      show = true,
                      isMandatory = false,
                      isNumeric,
                      options = [],
                    }) =>
                      show ? (
                        <>
                          {type === "text" ? (
                            <div key={id}>
                              <Controller
                                name={name as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <InputText
                                    label={placeholder}
                                    isError={!!error}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    isMandatory={isMandatory}
                                    disabled={false}
                                    onlyNumeric={isNumeric}
                                    type={type}
                                    onInputChange={onChange}
                                    value={value}
                                    errorMessage={
                                      error ? error.message : ""
                                    }
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "select" ? (
                            <div>
                              <Controller
                                name={id as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <Select
                                    name={id as any}
                                    id={id}
                                    label={placeholder}
                                    size={"sm" as any}
                                    isMandatory={true}
                                    disableLabel={false}
                                    onChange={onChange}
                                    value={value}
                                    isError={!!error}
                                    errorMessage={error?.message}
                                    showPlaceHolder={true as any}
                                    options={options}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "date" ? (
                            <div>
                              <Controller
                                name={name}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <DatePickerInput
                                    name={name}
                                    id={name}
                                    label={placeholder}
                                    picker="year"
                                    onChange={(_date, value) => {
                                      onChange(value);
                                    }}
                                    requiredLabel={true}
                                    format={"YYYY"}
                                    value={
                                      value &&
                                      dayjs(value, "YYYY").isValid()
                                        ? dayjs(value)
                                        : null
                                    }
                                    size="large"
                                    isError={!!error}
                                    errorMessage={error?.message}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                        </>
                      ) : null
                  )}
              </div>,
              },
              {
                title: "Residence Address",
                accordianIndex: 3,
                content: <div
                id="stepidx-1"
                className={
                  "md:col-span-3 grid grid-cols-1 gap-x-6 gap-y-[1.3rem] md:grid-cols-3 pb-[1.2rem]"
                }
              >
                {residenceAddressControlsConfig
                  .sort((a, b) => a.order - b.order)
                  .map(
                    ({
                      id,
                      type,
                      name,
                      placeholder,
                      show = true,
                      isMandatory = false,
                      isNumeric,
                      options = [],
                    }) =>
                      show ? (
                        <>
                          {type === "text" ? (
                            <div key={id}>
                              <Controller
                                name={name as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <InputText
                                    label={placeholder}
                                    isError={!!error}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    isMandatory={isMandatory}
                                    disabled={false}
                                    onlyNumeric={isNumeric}
                                    type={type}
                                    onInputChange={onChange}
                                    value={value}
                                    errorMessage={
                                      error ? error.message : ""
                                    }
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "select" ? (
                            <div>
                              <Controller
                                name={id as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <Select
                                    name={id as any}
                                    id={id}
                                    label={placeholder}
                                    size={"sm" as any}
                                    isMandatory={true}
                                    disableLabel={false}
                                    onChange={onChange}
                                    value={value}
                                    isError={!!error}
                                    errorMessage={error?.message}
                                    showPlaceHolder={true as any}
                                    options={options}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "date" ? (
                            <div>
                              <Controller
                                name={name}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <DatePickerInput
                                    name={name}
                                    id={name}
                                    label={placeholder}
                                    picker="year"
                                    onChange={(_date, value) => {
                                      onChange(value);
                                    }}
                                    requiredLabel={true}
                                    format={"YYYY"}
                                    value={
                                      value &&
                                      dayjs(value, "YYYY").isValid()
                                        ? dayjs(value)
                                        : null
                                    }
                                    size="large"
                                    isError={!!error}
                                    errorMessage={error?.message}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                        </>
                      ) : null
                  )}
              </div>,
              },
              {
                title: "Employment and Financial Details",
                accordianIndex: 4,
                content: <div
                id="stepidx-1"
                className={
                  "md:col-span-3 grid grid-cols-1 gap-x-6 gap-y-[1.3rem] md:grid-cols-3 pb-[1.2rem]"
                }
              >
                {employmentFinancialControlsConfig
                  .sort((a, b) => a.order - b.order)
                  .map(
                    ({
                      id,
                      type,
                      name,
                      placeholder,
                      show = true,
                      isMandatory = false,
                      isNumeric,
                      options = [],
                    }) =>
                      show ? (
                        <>
                          {type === "text" ? (
                            <div key={id}>
                              <Controller
                                name={name as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <InputText
                                    label={placeholder}
                                    isError={!!error}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    isMandatory={isMandatory}
                                    disabled={false}
                                    onlyNumeric={isNumeric}
                                    type={type}
                                    onInputChange={onChange}
                                    value={value}
                                    errorMessage={
                                      error ? error.message : ""
                                    }
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "select" ? (
                            <div>
                              <Controller
                                name={id as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <Select
                                    name={id as any}
                                    id={id}
                                    label={placeholder}
                                    size={"sm" as any}
                                    isMandatory={true}
                                    disableLabel={false}
                                    onChange={onChange}
                                    value={value}
                                    isError={!!error}
                                    errorMessage={error?.message}
                                    showPlaceHolder={true as any}
                                    options={options}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "date" ? (
                            <div>
                              <Controller
                                name={name}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <DatePickerInput
                                    name={name}
                                    id={name}
                                    label={placeholder}
                                    picker="year"
                                    onChange={(_date, value) => {
                                      onChange(value);
                                    }}
                                    requiredLabel={true}
                                    format={"YYYY"}
                                    value={
                                      value &&
                                      dayjs(value, "YYYY").isValid()
                                        ? dayjs(value)
                                        : null
                                    }
                                    size="large"
                                    isError={!!error}
                                    errorMessage={error?.message}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                        </>
                      ) : null
                  )}
              </div>,
              },
              {
                title: "Customer Information",
                accordianIndex: 5,
                content: <div
                id="stepidx-1"
                className={
                  "md:col-span-3 grid grid-cols-1 gap-x-6 gap-y-[1.3rem] md:grid-cols-3 pb-[1.2rem]"
                }
              >
                {customerInformationControlsConfig
                  .sort((a, b) => a.order - b.order)
                  .map(
                    ({
                      id,
                      type,
                      name,
                      placeholder,
                      show = true,
                      isMandatory = false,
                      isNumeric,
                      options = [],
                    }) =>
                      show ? (
                        <>
                          {type === "text" ? (
                            <div key={id}>
                              <Controller
                                name={name as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <InputText
                                    label={placeholder}
                                    isError={!!error}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    isMandatory={isMandatory}
                                    disabled={false}
                                    onlyNumeric={isNumeric}
                                    type={type}
                                    onInputChange={onChange}
                                    value={value}
                                    errorMessage={
                                      error ? error.message : ""
                                    }
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "select" ? (
                            <div>
                              <Controller
                                name={id as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <Select
                                    name={id as any}
                                    id={id}
                                    label={placeholder}
                                    size={"sm" as any}
                                    isMandatory={true}
                                    disableLabel={false}
                                    onChange={onChange}
                                    value={value}
                                    isError={!!error}
                                    errorMessage={error?.message}
                                    showPlaceHolder={true as any}
                                    options={options}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "date" ? (
                            <div>
                              <Controller
                                name={name}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <DatePickerInput
                                    name={name}
                                    id={name}
                                    label={placeholder}
                                    picker="year"
                                    onChange={(_date, value) => {
                                      onChange(value);
                                    }}
                                    requiredLabel={true}
                                    format={"YYYY"}
                                    value={
                                      value &&
                                      dayjs(value, "YYYY").isValid()
                                        ? dayjs(value)
                                        : null
                                    }
                                    size="large"
                                    isError={!!error}
                                    errorMessage={error?.message}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                        </>
                      ) : null
                  )}
              </div>,
              },
              {
                title: "Account Information",
                accordianIndex: 6,
                content: <div
                id="stepidx-1"
                className={
                  "md:col-span-3 grid grid-cols-1 gap-x-6 gap-y-[1.3rem] md:grid-cols-3 pb-[1.2rem]"
                }
              >
                {accountInformationControlsConfig
                  .sort((a, b) => a.order - b.order)
                  .map(
                    ({
                      id,
                      type,
                      name,
                      placeholder,
                      show = true,
                      isMandatory = false,
                      isNumeric,
                      options = [],
                    }) =>
                      show ? (
                        <>
                          {type === "text" ? (
                            <div key={id}>
                              <Controller
                                name={name as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <InputText
                                    label={placeholder}
                                    isError={!!error}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    isMandatory={isMandatory}
                                    disabled={false}
                                    onlyNumeric={isNumeric}
                                    type={type}
                                    onInputChange={onChange}
                                    value={value}
                                    errorMessage={
                                      error ? error.message : ""
                                    }
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "select" ? (
                            <div>
                              <Controller
                                name={id as any}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <Select
                                    name={id as any}
                                    id={id}
                                    label={placeholder}
                                    size={"sm" as any}
                                    isMandatory={true}
                                    disableLabel={false}
                                    onChange={onChange}
                                    value={value}
                                    isError={!!error}
                                    errorMessage={error?.message}
                                    showPlaceHolder={true as any}
                                    options={options}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                          {type === "date" ? (
                            <div>
                              <Controller
                                name={name}
                                control={useFormMethods.control}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <DatePickerInput
                                    name={name}
                                    id={name}
                                    label={placeholder}
                                    picker="year"
                                    onChange={(_date, value) => {
                                      onChange(value);
                                    }}
                                    requiredLabel={true}
                                    format={"YYYY"}
                                    value={
                                      value &&
                                      dayjs(value, "YYYY").isValid()
                                        ? dayjs(value)
                                        : null
                                    }
                                    size="large"
                                    isError={!!error}
                                    errorMessage={error?.message}
                                  />
                                )}
                              />
                            </div>
                          ) : null}
                        </>
                      ) : null
                  )}
              </div>,
              },
            ]}
          />

          {/* <div>
      <div className="steps-content p-2">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        )}
      </div>
      </div> */}
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default MultiStepForm;
