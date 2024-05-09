/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionDetails from "./pages/SectionDetails";
import Attachments from "./Attachments";

const Preview = ({ data }: any) => {
  console.log("datarrr", data);
  return (
    <div id="scrollableBox">
      {/* Applicant Details */}
      <SectionDetails
        stepId="stepidx-1"
        sectionHeader="Applicant Details"
        sectionData={[
          {
            key: "Full Name in Arabic",
            fieldKey: "fullNameAr",
            value: data?.fullNameAr,
          },
          {
            key: "Full Name in English",
            fieldKey: "fullNameEn",
            value: data?.fullNameEn,
          },
          { key: "Mobile Number", fieldKey: "mobileNo", value: data?.mobileNo },
          { key: "Email", fieldKey: "email", value: data?.email },
          {
            key: "Mother Name",
            fieldKey: "motherName",
            value: data?.motherName,
          },
          { key: "Sex", fieldKey: "sex", value: data?.sex },
          {
            key: "Date of Birth",
            fieldKey: "dateOfBirth",
            value: data?.dateOfBirth,
          },
          {
            key: "Nationality",
            fieldKey: "nationality",
            value: data?.nationality,
          },
          {
            key: "National ID",
            fieldKey: "nationalId",
            value: data?.nationalId,
          },
          {
            key: "National ID Date",
            fieldKey: "nationalIdDate",
            value: data?.nationalIdDate,
          },
          {
            key: "National ID Expiry Date",
            fieldKey: "nationalIdExpiryDate",
            value: data?.nationalIdExpiryDate,
          },
          {
            key: "Is Bank Blacklisted?",
            fieldKey: "isBankBlacklisted",
            value: data?.isBankBlacklisted,
          },
          {
            key: "Birth Country",
            fieldKey: "birthCountry",
            value: data?.birthCountry,
          },
          { key: "Birth City", fieldKey: "birthCity", value: data?.birthCity },
        ]}
      />

      {/* Residence Address */}
      <SectionDetails
        stepId="stepidx-2"
        sectionHeader="Social Status"
        sectionData={[
          {
            key: "Marital Status",
            fieldKey: "maritalStatus",
            value: data?.maritalStatus,
          },
          {
            key: "Residence Status",
            fieldKey: "residenceStatus",
            value: data?.residenceStatus,
          },
          {
            key: "Personal Identity Issuance Location",
            fieldKey: "personalIdentityIssuanceLocation",
            value: data?.personalIdentityIssuanceLocation,
          },
          {
            key: "Personal Identity Type",
            fieldKey: "personalIdentityType",
            value: data?.personalIdentityType,
          },
        ]}
      ></SectionDetails>
      <SectionDetails
        stepId="stepidx-3"
        sectionHeader="Residence Address"
        sectionData={[
          { key: "City Name", fieldKey: "cityName", value: data?.cityName },
          { key: "Area Name", fieldKey: "areaName", value: data?.areaName },
          {
            key: "Street Name",
            fieldKey: "streetName",
            value: data?.streetName,
          },
          {
            key: "Apartment No",
            fieldKey: "apartmentNo",
            value: data?.apartmentNo,
          },
          {
            key: "Postal Code",
            fieldKey: "postalCode",
            value: data?.postalCode,
          },
          {
            key: "Home Landline",
            fieldKey: "homeLandLine",
            value: data?.homeLandLine,
          },
        ]}
      />

      {/* Employment and Financial Details */}
      <SectionDetails
        stepId="stepidx-4"
        sectionHeader="Employment and Financial Details"
        sectionData={[
          { key: "Job", fieldKey: "job", value: data?.job },
          {
            key: "Job Location",
            fieldKey: "jobLocation",
            value: data?.jobLocation,
          },
          {
            key: "Monthly Salary",
            fieldKey: "monthlySalary",
            value: data?.monthlySalary,
          },
          {
            key: "Income Source",
            fieldKey: "incomeSource",
            value: data?.incomeSource,
          },
          {
            key: "Other Income Sources",
            fieldKey: "otherIncomeSources",
            value: data?.otherIncomeSources,
          },
          {
            key: "Transaction Size Per Account",
            fieldKey: "transactionSizePerAccount",
            value: data?.transactionSizePerAccount,
          },
          {
            key: "Account Opening Purpose",
            fieldKey: "accountOpeningPurpose",
            value: data?.accountOpeningPurpose,
          },
        ]}
      />

      {/* Customer Information */}
      <SectionDetails
        stepId="stepidx-5"
        sectionHeader="Customer Information"
        sectionData={[
          {
            key: "Prime Customer (Yes or No)",
            fieldKey: "primeCustomer",
            value: data?.primeCustomer,
          },
          {
            key: "Customer Number",
            fieldKey: "customerNumber",
            value: data?.customerNumber,
          },
          {
            key: "Branch Name",
            fieldKey: "branchName",
            value: data?.branchName,
          },
          {
            key: <span className="text-aegold-500">Recording</span>,
            value: (
              <Attachments
                readOnly={true}
                files={data?.attachments || []}
                attachmentID={"ATTYP_428"}
                requestId={data?.requestId}
                type={""}
                source={"DB"}
              />
            ),
          },
        ]}
      />

      {/* Account Information */}
      <SectionDetails
        stepId="stepidx-6"
        sectionHeader="Account Information"
        sectionData={[
          {
            key: "Account Type",
            fieldKey: "accountType",
            value: data?.accountType,
          },
          {
            key: "Account Currency",
            fieldKey: "accountCurrency",
            value: data?.accountCurrency,
          },
          {
            key: "Account Number",
            fieldKey: "accountNumber",
            value: data?.accountNumber,
          },
          {
            key: "Account IBAN",
            fieldKey: "accountIban",
            value: data?.accountIban,
          },
        ]}
      />
    </div>
  );
};

export default Preview;
