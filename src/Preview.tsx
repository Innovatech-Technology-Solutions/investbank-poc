/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionDetails from "./pages/SectionDetails";

const Preview = ({data}:any) => {
  return (
    <div>
      {/* Applicant Details */}
      <SectionDetails
        sectionHeader="Applicant Details"
        sectionData={[
          { key: "Full Name in Arabic", fieldKey: 'fullNameAr', value: data?.fullNameAr },
          { key: "Full Name in English", fieldKey: 'fullNameEn', value: data?.fullNameEn },
          { key: "Mobile Number", fieldKey: 'mobileNo', value: data?.mobileNo },
          { key: "Email", fieldKey: 'email', value: data?.email },
          { key: "Mother Name", fieldKey: 'motherName', value: data?.motherName },
          { key: "Sex", fieldKey: 'sex', value: data?.sex },
          { key: "Date of Birth", fieldKey: 'dateOfBirth', value: data?.dateOfBirth },
          { key: "Nationality", fieldKey: 'nationality', value: data?.nationality },
          { key: "National ID", fieldKey: 'nationalId', value: data?.nationalId },
          { key: "National ID Date", fieldKey: 'nationalIdDate', value: data?.nationalIdDate },
          { key: "National ID Expiry Date", fieldKey: 'nationalIdExpiryDate', value: data?.nationalIdExpiryDate },
          { key: "Is Bank Blacklisted?", fieldKey: 'isBankBlacklisted', value: data?.isBankBlacklisted },
          { key: "Birth Country", fieldKey: 'birthCountry', value: data?.birthCountry },
          { key: "Birth City", fieldKey: 'birthCity', value: data?.birthCity },
        ]}
      />

 {/* Residence Address */}
<SectionDetails
  sectionHeader="Residence Address"
  sectionData={[
    { key: "City Name", fieldKey: 'cityName', value: data?.cityName },
    { key: "Area Name", fieldKey: 'areaName', value: data?.areaName },
    { key: "Street Name", fieldKey: 'streetName', value: data?.streetName },
    { key: "Apartment No", fieldKey: 'apartmentNo', value: data?.apartmentNo },
    { key: "Postal Code", fieldKey: 'postalCode', value: data?.postalCode },
    { key: "Home Landline", fieldKey: 'homeLandLine', value: data?.homeLandLine },
  ]}
/>

{/* Employment and Financial Details */}
<SectionDetails
  sectionHeader="Employment and Financial Details"
  sectionData={[
    { key: "Job", fieldKey: 'job', value: data?.job },
    { key: "Job Location", fieldKey: 'jobLocation', value: data?.jobLocation },
    { key: "Monthly Salary", fieldKey: 'monthlySalary', value: data?.monthlySalary },
    { key: "Income Source", fieldKey: 'incomeSource', value: data?.incomeSource },
    { key: "Other Income Sources", fieldKey: 'otherIncomeSources', value: data?.otherIncomeSources },
    { key: "Transaction Size Per Account", fieldKey: 'transactionSizePerAccount', value: data?.transactionSizePerAccount },
    { key: "Account Opening Purpose", fieldKey: 'accountOpeningPurpose', value: data?.accountOpeningPurpose },
  ]}
/>

{/* Customer Information */}
<SectionDetails
  sectionHeader="Customer Information"
  sectionData={[
    { key: "Prime Customer (Yes or No)", fieldKey: 'primeCustomer', value: data?.primeCustomer },
    { key: "Customer Number", fieldKey: 'customerNumber', value: data?.customerNumber },
    { key: "Branch Name", fieldKey: 'branchName', value: data?.branchName },
  ]}
/>

{/* Account Information */}
<SectionDetails
  sectionHeader="Account Information"
  sectionData={[
    { key: "Account Type", fieldKey: 'accountType', value: data?.accountType },
    { key: "Account Currency", fieldKey: 'accountCurrency', value: data?.accountCurrency },
    { key: "Account Number", fieldKey: 'accountNumber', value: data?.accountNumber },
    { key: "Account IBAN", fieldKey: 'accountIban', value: data?.accountIban },
  ]}
/>

    </div>
  );
};

export default Preview;
