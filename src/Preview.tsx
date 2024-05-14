/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SectionDetails from "./pages/SectionDetails";
import Attachments from "./Attachments";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

const Preview = ({ data }: any) => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];

  console.log(
    "datarrr",
    data?.attachments?.[0]?.filePath,
    import.meta.env?.VITE_BASE_URL
  );
  return (
    <div id="scrollableBox">
      {/* Applicant Details */}
      <SectionDetails
        stepId="stepidx-1"
        sectionHeader={
          uiConfiguration?.UI_LABELS?.APPLICANT_DETAILS || "Applicant Details"
        }
        sectionData={[
          {
            key:
              uiConfiguration?.UI_LABELS?.FULL_NAME_IN_ARABIC ||
              "Full Name in Arabic",
            fieldKey: "fullNameAr",
            value: data?.fullNameAr,
            direction: "rtl",
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.FULL_NAME_IN_ENGLISH ||
              "Full Name in English",
            fieldKey: "fullNameEn",
            value: data?.fullNameEn,
          },
          {
            key: uiConfiguration?.UI_LABELS?.MOBILE_NUMBER || "Mobile Number",
            fieldKey: "mobileNo",
            value: data?.mobileNo,
          },
          {
            key: uiConfiguration?.UI_LABELS?.EMAIL || "Email",
            fieldKey: "email",
            value: data?.email,
          },
          {
            key: uiConfiguration?.UI_LABELS?.MOTHER_NAME || "Mother Name",
            fieldKey: "motherName",
            value: data?.motherName,
          },
          {
            key: uiConfiguration?.UI_LABELS?.SEX || "Sex",
            fieldKey: "sex",
            value: data?.sex,
          },
          {
            key: uiConfiguration?.UI_LABELS?.DATE_OF_BIRTH || "Date of Birth",
            fieldKey: "dateOfBirth",
            value: data?.dateOfBirth,
          },
          {
            key: uiConfiguration?.UI_LABELS?.NATIONALITY || "Nationality",
            fieldKey: "nationality",
            value: data?.nationality,
          },
          {
            key: uiConfiguration?.UI_LABELS?.NATIONAL_ID || "National ID",
            fieldKey: "nationalId",
            value: data?.nationalId,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.NATIONAL_ID_DATE ||
              "National ID Date",
            fieldKey: "nationalIdDate",
            value: data?.nationalIdDate,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.NATIONAL_ID_EXPIRY_DATE ||
              "National ID Expiry Date",
            fieldKey: "nationalIdExpiryDate",
            value: data?.nationalIdExpiryDate,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.IS_BANK_BLACKLISTED ||
              "Is Bank Blacklisted?",
            fieldKey: "isBankBlacklisted",
            value: data?.isBankBlacklisted,
          },
          {
            key: uiConfiguration?.UI_LABELS?.BIRTH_COUNTRY || "Birth Country",
            fieldKey: "birthCountry",
            value: data?.birthCountry,
          },
          {
            key: uiConfiguration?.UI_LABELS?.BIRTH_CITY || "Birth City",
            fieldKey: "birthCity",
            value: data?.birthCity,
          },
        ]}
      />

      {/* Residence Address */}
      <SectionDetails
        stepId="stepidx-2"
        sectionHeader={
          uiConfiguration?.UI_LABELS?.SOCIAL_STATUS || "Social Status"
        }
        sectionData={[
          {
            key: uiConfiguration?.UI_LABELS?.MARTIAL_STATUS || "Marital Status",
            fieldKey: "maritalStatus",
            value: data?.maritalStatus,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.RESIDENCE_STATUS ||
              "Residence Status",
            fieldKey: "residenceStatus",
            value: data?.residenceStatus,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.PERSONAL_IDENTITY_ISSUANCE_LOCATION ||
              "Personal Identity Issuance Location",
            fieldKey: "personalIdentityIssuanceLocation",
            value: data?.personalIdentityIssuanceLocation,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.PERSONAL_IDENTITY_TYPE ||
              "Personal Identity Type",
            fieldKey: "personalIdentityType",
            value: data?.personalIdentityType,
          },
        ]}
      ></SectionDetails>
      <SectionDetails
        stepId="stepidx-3"
        sectionHeader={
          uiConfiguration?.UI_LABELS?.RESIDENCE_ADDRESS || "Residence Address"
        }
        sectionData={[
          {
            key: uiConfiguration?.UI_LABELS?.CITY_NAME || "City Name",
            fieldKey: "cityName",
            value: data?.cityName,
          },
          {
            key: uiConfiguration?.UI_LABELS?.AREA_NAME || "Area Name",
            fieldKey: "areaName",
            value: data?.areaName,
          },
          {
            key: uiConfiguration?.UI_LABELS?.STREET_NAME || "Street Name",
            fieldKey: "streetName",
            value: data?.streetName,
          },
          {
            key: uiConfiguration?.UI_LABELS?.APARTMENT_NO || "Apartment No",
            fieldKey: "apartmentNo",
            value: data?.apartmentNo,
          },
          {
            key: uiConfiguration?.UI_LABELS?.POSTAL_CODE || "Postal Code",
            fieldKey: "postalCode",
            value: data?.postalCode,
          },
          {
            key: uiConfiguration?.UI_LABELS?.HOME_LANDLINE || "Home Landline",
            fieldKey: "homeLandLine",
            value: data?.homeLandLine,
          },
        ]}
      />

      {/* Employment and Financial Details */}
      <SectionDetails
        stepId="stepidx-4"
        sectionHeader={
          uiConfiguration?.UI_LABELS?.EMPLOYEMENT_AND_FINANCIAL_DETAILS ||
          "Employment and Financial Details"
        }
        sectionData={[
          {
            key: uiConfiguration?.UI_LABELS?.JOB || "Job",
            fieldKey: "job",
            value: data?.job,
          },
          {
            key: uiConfiguration?.UI_LABELS?.JOB_LOCATION || "Job Location",
            fieldKey: "jobLocation",
            value: data?.jobLocation,
          },
          {
            key: uiConfiguration?.UI_LABELS?.MONTHLY_SALARY || "Monthly Salary",
            fieldKey: "monthlySalary",
            value: data?.monthlySalary,
          },
          {
            key: uiConfiguration?.UI_LABELS?.INCOME_SOURCE || "Income Source",
            fieldKey: "incomeSource",
            value: data?.incomeSource,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.OTHER_INCOME_SOURCES ||
              "Other Income Sources",
            fieldKey: "otherIncomeSources",
            value: data?.otherIncomeSources,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.TRANSACTION_SIZE_PER_ACCOUNT ||
              "Transaction Size Per Account",
            fieldKey: "transactionSizePerAccount",
            value: data?.transactionSizePerAccount,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.ACCOUNT_OPENING_PURPOSE ||
              "Account Opening Purpose",
            fieldKey: "accountOpeningPurpose",
            value: data?.accountOpeningPurpose,
          },
        ]}
      />

      {/* Customer Information */}
      <SectionDetails
        stepId="stepidx-5"
        sectionHeader={
          uiConfiguration?.UI_LABELS?.CUSTOMER_INFORMATION ||
          "Customer Information"
        }
        sectionData={[
          {
            key:
              uiConfiguration?.UI_LABELS?.PRIME_CUSTOMER_YES_OR_NO ||
              "Prime Customer (Yes or No)",
            fieldKey: "primeCustomer",
            value: data?.primeCustomer,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.CUSTOMER_NUMBER || "Customer Number",
            fieldKey: "customerNumber",
            value: data?.customerNumber,
          },
          {
            key: uiConfiguration?.UI_LABELS?.BRANCH_NAME || "Branch Name",
            fieldKey: "branchName",
            value: data?.branchName,
          },
          {
            key: (
              <span className="text-aegold-500">
                {" "}
                {uiConfiguration?.UI_LABELS?.RECORDING || "Recording"}
              </span>
            ),
            value: data?.attachments ? (
              <video width="740" height="310" controls>
                <source
                  src={`${
                    import.meta.env?.VITE_BASE_URL
                  }/api/ixcommon/supporting/GetFileContentByPath?filePath=${
                    data?.attachments?.[0]?.filePath
                  }`}
                />
                {uiConfiguration?.UI_LABELS?.VIDEO_TAG ||
                  "Your browser does not support the video tag."}
              </video>
            ) : null,
          },
        ]}
      />

      {/* Account Information */}
      <SectionDetails
        stepId="stepidx-6"
        sectionHeader={
          uiConfiguration?.UI_LABELS?.ACCOUNT_INFORMATION ||
          "Account Information"
        }
        sectionData={[
          {
            key: uiConfiguration?.UI_LABELS?.ACCOUNT_TYPE || "Account Type",
            fieldKey: "accountType",
            value: data?.accountType,
          },
          {
            key:
              uiConfiguration?.UI_LABELS?.ACCOUNT_CURRENCY ||
              "Account Currency",
            fieldKey: "accountCurrency",
            value: data?.accountCurrency,
          },
          {
            key: uiConfiguration?.UI_LABELS?.ACCOUNT_NUMBER || "Account Number",
            fieldKey: "accountNumber",
            value: data?.accountNumber,
          },
          {
            key: uiConfiguration?.UI_LABELS?.ACCOUNT_IBAN || "Account IBAN",
            fieldKey: "accountIban",
            value: data?.accountIban,
          },
        ]}
      />
    </div>
  );
};

export default Preview;
