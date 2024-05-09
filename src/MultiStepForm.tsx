/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState,  forwardRef } from "react";
import LeaderLine from "react-leader-line";

import {
  Steps,
  Form,
  ConfigProvider,
  Card,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import Stepper from "./Stepper";
import Accordion from "./Accordion";
import InputText from "./InputText";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePickerInput from "./DatePickerInput";
import Select from "./Select";
import Button from "./Button";
import FieldComments from "./FieldComments";
import { notification, Space } from "antd";
import Preview from "./Preview";
import {useNavigate, useParams} from 'react-router-dom'
import { decodeToken, isSales } from "./commonuitils";
import React from "react";
import { isValidResponse } from "./utils/Commonutils";
import emitMessage from "./services/emitMessage";
import { useGetApplicationByReqIDQuery, useGetFieldCommentsQuery } from "./services/hostApiServices";
const { Step } = Steps;
const { Option } = Select;
// const uiConfiguration={}


// const RectComp = forwardRef(({ children, ...props }, ref) => (
//   <div ref={ref} {...props}>
//     {children}
//   </div>
// ));

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [showComments, setShowComments] = useState(0);
  const{requestIDSlug}=useParams();
  const {data:appData,isLoading,isFetching,isSuccess}=useGetApplicationByReqIDQuery(requestIDSlug as any,{skip:[null,undefined,''].includes(requestIDSlug)})
const{data:fieldcomments,refetch}=useGetFieldCommentsQuery(requestIDSlug as any,{skip:[null,undefined,''].includes(requestIDSlug)})
  const navigate=useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);



  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
      const recordedBlob = new Blob(recordedChunksRef.current, {
        type: "video/webm",
      });
      const recordedUrl = URL.createObjectURL(recordedBlob);
      if (recordedVideoRef.current) {
        recordedVideoRef.current.src = recordedUrl;
      }
    }
  };
  console.log(videoRef, recordedVideoRef);

  // Function to fetch the bearer token from local storage
  const getBearerToken = () => {
    return localStorage.getItem("token");
  };

  // Define your payload

  // Define your API endpoint

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
    monthlySalary: z.any(),
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
      type: "select",
      options:[
        { "label": "-- select one --", "value": "" },
        { "label": "Afghan", "value": "afghan" },
        { "label": "Albanian", "value": "albanian" },
        { "label": "Algerian", "value": "algerian" },
        { "label": "American", "value": "american" },
        { "label": "Andorran", "value": "andorran" },
        { "label": "Angolan", "value": "angolan" },
        { "label": "Antiguans", "value": "antiguans" },
        { "label": "Argentinean", "value": "argentinean" },
        { "label": "Armenian", "value": "armenian" },
        { "label": "Australian", "value": "australian" },
        { "label": "Austrian", "value": "austrian" },
        { "label": "Azerbaijani", "value": "azerbaijani" },
        { "label": "Bahamian", "value": "bahamian" },
        { "label": "Bahraini", "value": "bahraini" },
        { "label": "Bangladeshi", "value": "bangladeshi" },
        { "label": "Barbadian", "value": "barbadian" },
        { "label": "Barbudans", "value": "barbudans" },
        { "label": "Batswana", "value": "batswana" },
        { "label": "Belarusian", "value": "belarusian" },
        { "label": "Belgian", "value": "belgian" },
        { "label": "Belizean", "value": "belizean" },
        { "label": "Beninese", "value": "beninese" },
        { "label": "Bhutanese", "value": "bhutanese" },
        { "label": "Bolivian", "value": "bolivian" },
        { "label": "Bosnian", "value": "bosnian" },
        { "label": "Brazilian", "value": "brazilian" },
        { "label": "British", "value": "british" },
        { "label": "Bruneian", "value": "bruneian" },
        { "label": "Bulgarian", "value": "bulgarian" },
        { "label": "Burkinabe", "value": "burkinabe" },
        { "label": "Burmese", "value": "burmese" },
        { "label": "Burundian", "value": "burundian" },
        { "label": "Cambodian", "value": "cambodian" },
        { "label": "Cameroonian", "value": "cameroonian" },
        { "label": "Canadian", "value": "canadian" },
        { "label": "Cape Verdean", "value": "cape verdean" },
        { "label": "Central African", "value": "central african" },
        { "label": "Chadian", "value": "chadian" },
        { "label": "Chilean", "value": "chilean" },
        { "label": "Chinese", "value": "chinese" },
        { "label": "Colombian", "value": "colombian" },
        { "label": "Comoran", "value": "comoran" },
        { "label": "Congolese", "value": "congolese" },
        { "label": "Costa Rican", "value": "costa rican" },
        { "label": "Croatian", "value": "croatian" },
        { "label": "Cuban", "value": "cuban" },
        { "label": "Cypriot", "value": "cypriot" },
        { "label": "Czech", "value": "czech" },
        { "label": "Danish", "value": "danish" },
        { "label": "Djibouti", "value": "djibouti" },
        { "label": "Dominican", "value": "dominican" },
        { "label": "Dutch", "value": "dutch" },
        { "label": "East Timorese", "value": "east timorese" },
        { "label": "Ecuadorean", "value": "ecuadorean" },
        { "label": "Egyptian", "value": "egyptian" },
        { "label": "Emirian", "value": "emirian" },
        { "label": "Equatorial Guinean", "value": "equatorial guinean" },
        { "label": "Eritrean", "value": "eritrean" },
        { "label": "Estonian", "value": "estonian" },
        { "label": "Ethiopian", "value": "ethiopian" },
        { "label": "Fijian", "value": "fijian" },
        { "label": "Filipino", "value": "filipino" },
        { "label": "Finnish", "value": "finnish" },
        { "label": "French", "value": "french" },
        { "label": "Gabonese", "value": "gabonese" },
        { "label": "Gambian", "value": "gambian" },
        { "label": "Georgian", "value": "georgian" },
        { "label": "German", "value": "german" },
        { "label": "Ghanaian", "value": "ghanaian" },
        { "label": "Greek", "value": "greek" },
        { "label": "Grenadian", "value": "grenadian" },
        { "label": "Guatemalan", "value": "guatemalan" },
        { "label": "Guinea-Bissauan", "value": "guinea-bissauan" },
        { "label": "Guinean", "value": "guinean" },
        { "label": "Guyanese", "value": "guyanese" },
        { "label": "Haitian", "value": "haitian" },
        { "label": "Herzegovinian", "value": "herzegovinian" },
        { "label": "Honduran", "value": "honduran" },
        { "label": "Hungarian", "value": "hungarian" },
        { "label": "Icelander", "value": "icelander" },
        { "label": "Indian", "value": "indian" },
        { "label": "Indonesian", "value": "indonesian" },
        { "label": "Iranian", "value": "iranian" },
        { "label": "Iraqi", "value": "iraqi" },
        { "label": "Irish", "value": "irish" },
        { "label": "Israeli", "value": "israeli" },
        { "label": "Italian", "value": "italian" },
        { "label": "Ivorian", "value": "ivorian" },
        { "label": "Jamaican", "value": "jamaican" },
        { "label": "Japanese", "value": "japanese" },
        { "label": "Jordanian", "value": "jordanian" },
        { "label": "Kazakhstani", "value": "kazakhstani" },
        { "label": "Kenyan", "value": "kenyan" },
        { "label": "Kittian and Nevisian", "value": "kittian and nevisian" },
        { "label": "Kuwaiti", "value": "kuwaiti" },
        { "label": "Kyrgyz", "value": "kyrgyz" },
        { "label": "Laotian", "value": "laotian" },
        { "label": "Latvian", "value": "latvian" },
        { "label": "Lebanese", "value": "lebanese" },
        { "label": "Liberian", "value": "liberian" },
        { "label": "Libyan", "value": "libyan" },
        { "label": "Liechtensteiner", "value": "liechtensteiner" },
        { "label": "Lithuanian", "value": "lithuanian" },
        { "label": "Luxembourger", "value": "luxembourger" },
        { "label": "Macedonian", "value": "macedonian" },
        { "label": "Malagasy", "value": "malagasy" },
        { "label": "Malawian", "value": "malawian" },
        { "label": "Malaysian", "value": "malaysian" },
        { "label": "Maldivan", "value": "maldivan" },
        { "label": "Malian", "value": "malian" },
        { "label": "Maltese", "value": "maltese" },
        { "label": "Marshallese", "value": "marshallese" },
        { "label": "Mauritanian", "value": "mauritanian" },
        { "label": "Mauritian", "value": "mauritian" },
        { "label": "Mexican", "value": "mexican" },
        { "label": "Micronesian", "value": "micronesian" },
        { "label": "Moldovan", "value": "moldovan" },
        { "label": "Monacan", "value": "monacan" },
        { "label": "Mongolian", "value": "mongolian" },
        { "label": "Moroccan", "value": "moroccan" },
        { "label": "Mosotho", "value": "mosotho" },
        { "label": "Motswana", "value": "motswana" },
        { "label": "Mozambican", "value": "mozambican" },
        { "label": "Namibian", "value": "namibian" },
        { "label": "Nauruan", "value": "nauruan" },
        { "label": "Nepalese", "value": "nepalese" },
        { "label": "New Zealander", "value": "new zealander" },
        { "label": "Ni-Vanuatu", "value": "ni-vanuatu" },
        { "label": "Nicaraguan", "value": "nicaraguan" },
        { "label": "Nigerien", "value": "nigerien" },
        { "label": "North Korean", "value": "north korean" },
        { "label": "Northern Irish", "value": "northern irish" },
        { "label": "Norwegian", "value": "norwegian" },
        { "label": "Omani", "value": "omani" },
        { "label": "Pakistani", "value": "pakistani" },
        { "label": "Palauan", "value": "palauan" },
        { "label": "Panamanian", "value": "panamanian" },
        { "label": "Papua New Guinean", "value": "papua new guinean" },
        { "label": "Paraguayan", "value": "paraguayan" },
        { "label": "Peruvian", "value": "peruvian" },
        { "label": "Polish", "value": "polish" },
        { "label": "Portuguese", "value": "portuguese" },
        { "label": "Qatari", "value": "qatari" },
        { "label": "Romanian", "value": "romanian" },
        { "label": "Russian", "value": "russian" },
        { "label": "Rwandan", "value": "rwandan" },
        { "label": "Saint Lucian", "value": "saint lucian" },
        { "label": "Salvadoran", "value": "salvadoran" },
        { "label": "Samoan", "value": "samoan" },
        { "label": "San Marinese", "value": "san marinese" },
        { "label": "Sao Tomean", "value": "sao tomean" },
        { "label": "Saudi", "value": "saudi" },
        { "label": "Scottish", "value": "scottish" },
        { "label": "Senegalese", "value": "senegalese" },
        { "label": "Serbian", "value": "serbian" },
        { "label": "Seychellois", "value": "seychellois" },
        { "label": "Sierra Leonean", "value": "sierra leonean" },
        { "label": "Singaporean", "value": "singaporean" },
        { "label": "Slovakian", "value": "slovakian" },
        { "label": "Slovenian", "value": "slovenian" },
        { "label": "Solomon Islander", "value": "solomon islander" },
        { "label": "Somali", "value": "somali" },
        { "label": "South African", "value": "south african" },
        { "label": "South Korean", "value": "south korean" },
        { "label": "Spanish", "value": "spanish" },
        { "label": "Sri Lankan", "value": "sri lankan" },
        { "label": "Sudanese", "value": "sudanese" },
        { "label": "Surinamer", "value": "surinamer" },
        { "label": "Swazi", "value": "swazi" },
        { "label": "Swedish", "value": "swedish" },
        { "label": "Swiss", "value": "swiss" },
        { "label": "Syrian", "value": "syrian" },
        { "label": "Taiwanese", "value": "taiwanese" },
        { "label": "Tajik", "value": "tajik" },
        { "label": "Tanzanian", "value": "tanzanian" },
        { "label": "Thai", "value": "thai" },
        { "label": "Togolese", "value": "togolese" },
        { "label": "Tongan", "value": "tongan" },
        { "label": "Trinidadian or Tobagonian", "value": "trinidadian or tobagonian" },
        { "label": "Tunisian", "value": "tunisian" },
        { "label": "Turkish", "value": "turkish" },
        { "label": "Tuvaluan", "value": "tuvaluan" },
        { "label": "Ugandan", "value": "ugandan" },
        { "label": "Ukrainian", "value": "ukrainian" },
        { "label": "Uruguayan", "value": "uruguayan" },
        { "label": "Uzbekistani", "value": "uzbekistani" },
        { "label": "Venezuelan", "value": "venezuelan" },
        { "label": "Vietnamese", "value": "vietnamese" },
        { "label": "Welsh", "value": "welsh" },
        { "label": "Yemenite", "value": "yemenite" },
        { "label": "Zambian", "value": "zambian" },
        { "label": "Zimbabwean", "value": "zimbabwean" }
      ]
      ,
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
  const maritalStatusControlsConfig = [
    {
      order: 1,
      label: "Marital Status",
      name: "maritalStatus",
      id: "maritalStatus",
      placeholder: "Marital Status",
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
      name: "homeLandLine",
      id: "homeLandLine",
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
      type: "number",
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
      type: "number",
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
      name: "accountIban",
      id: "accountIban",
      placeholder: "Account IBAN",
      type: "text",
      show: true,
      isMandatory: true,
    },
  ];

  const comments = [
    {
      id: '1',
      requestId: 'REQ001',
      fieldId: 'accountOpeningPurpose',
      comment: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
      createdBy: 'Raja',
      createdDate: '29-02-2023'
    },
    {
      id: '2',
      requestId: 'REQ002',
      fieldId: 'primeCustomer',
      comment: 'Another sample comment',
      createdBy: 'Dua Lipa',
      createdDate: '30-03-2023'
    },
    {
      id: '3',
      requestId: 'REQ003',
      fieldId: 'incomeVerification',
      comment: 'Yet another sample comment',
      createdBy: 'Sowjanya',
      createdDate: '15-04-2023'
    }
  ];

  const viewCommentRef=(commentId:string)=>{
    console.log(commentId, document.getElementById(`comment_${commentId}`), document.getElementById(commentId))
  let line =
    new LeaderLine(LeaderLine.mouseHoverAnchor(document.getElementById(`comment_${commentId}`)),document.getElementById(commentId),  {dash: true});
  console.log(line)
  }
  

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
  type NotificationType = "success" | "info" | "warning" | "error";

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Success",
      description: "Form Submitted Successfully",
    });
  };
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
     
      <div className={"flex justify-end gap-2"}>
      {requestIDSlug?<Button sizeVariant="xs"
          onClick={() => {
            setShowComments(showComments==1 ? 0 : 1)
          }}
        >
          Show Reviewer Comments
        </Button>:null}
        {isSales()&&<Button sizeVariant="xs"
          onClick={() => {
            console.log(useFormMethods.getValues());

            const apiUrl = `${
              import.meta.env.VITE_BASE_URL
            }/gateway/Investbankpoc/InvestBankPoc?action=SUBMIT`;

            // Define your headers
            const headers = {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getBearerToken()}`, // Include the Bearer token
            };
const payload=structuredClone(useFormMethods.getValues())
payload["status"]='submitted'
            // Make the POST request
            axios
              .post(apiUrl, payload, { headers })
              .then((response: any) => {
                // Handle success
              if(isValidResponse(response))
              {
                emitMessage("Submitted successfully",'success')
                navigate("/investbank/applications")
              }
              })
              .catch((error: any) => {
                // Handle error
                console.error("Error:", error);
              });
          }}
        >
          Submit
        </Button>}
      </div>

      <div className={"flex md:flex-col lg:flex-row pt-2 gap-2"}>
      {showComments == 0 &&    <Card style={{ width: 350, paddingTop: "1.5rem" }}>
        <Stepper 

            clickedIndex={(e) => {
              console.log("ee",e)
              setActiveIndex(e)}}
            stepperItems={[
              {
                label: "Applicant Details",
                path: "#",
                stage:  activeIndex!==1?"upcoming":"current",
                stepperIndex: 1,
                isActive: activeIndex==1,
                isLastItem: false,
              },
              {
                label: "Marital Status",
                path: "#",
                stage: activeIndex!==2?"upcoming":"current",
                stepperIndex: 2,
                isActive: activeIndex==2,
                isLastItem: false,
              },
              {
                label: "Residence Address",
                path: "#",
                stage:  activeIndex!==3?"upcoming":"current",
                stepperIndex: 3,
                isActive: activeIndex==3,
                isLastItem: false,
              },
              {
                label: "Employment and Financial Details",
                path: "#",
                stage:  activeIndex!==4?"upcoming":"current",
                stepperIndex: 4,
                isActive: activeIndex==4,
                isLastItem: false,
              },
              {
                label: "Customer Information",
                path: "#",
                stage:  activeIndex!==5?"upcoming":"current",
                stepperIndex: 5,
                isActive: activeIndex==5,
                isLastItem: false,
              },
              {
                label: "Account Information",
                path: "#",
                stage:  activeIndex!==6?"upcoming":"current",
                stepperIndex: 6,
                isActive: activeIndex==6,
                isLastItem: true,
              },
            ]}
          /> 
        </Card> }
        <Card style={{ width: "100%" }}>
          {!requestIDSlug&&isSales() ? (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {contextHolder}

              <Accordion
                defaultIndex={activeIndex}
                showFooterButtons={true}
                clickedAccordion={(e: any) => setActiveIndex(e)}
                accordionItems={[
                  {
                    title: "Applicant Details",
                    accordianIndex: 1,
                    content: (
                      <>
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
                                              picker="date"
                                              onChange={(_date, value) => {
                                                onChange(value);
                                              }}
                                              requiredLabel={true}
                                              format='YYYY-MM-DD'
                                              value={
                                                value && dayjs(value).isValid() ? dayjs(value) : null
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
                        {/* <div
                    className={
                      'flex justify-between   flex-col  lg:flex-row gap-2 pb-2'}
                  >
                    <Button onClick={() => setActiveIndex(2)}>
                      {'Next Step'} <CaretRight size={32} />
                    </Button>
                  </div> */}
                      </>
                    ),
                  },
                  {
                    title: "Marital Status",
                    accordianIndex: 2,
                    content: (
                      <>
                        {" "}
                        <div
                          id="stepidx-1"
                          className={
                            "md:col-span-3 grid grid-cols-1 gap-x-6 gap-y-[1.3rem] md:grid-cols-3 pb-[1.2rem]"
                          }
                        >
                          {maritalStatusControlsConfig
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
                                              picker="date"
                                              onChange={(_date, value) => {
                                                onChange(value);
                                              }}
                                              requiredLabel={true}
                                              format='YYYY-MM-DD'

                                              value={
                                                value && dayjs(value).isValid() ? dayjs(value) : null
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
                      </>
                    ),
                  },
                  {
                    title: "Residence Address",
                    accordianIndex: 3,
                    content: (
                      <div
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
                                            picker="date"
                                            onChange={(_date, value) => {
                                              onChange(value);
                                            }}
                                            requiredLabel={true}
                                            format='YYYY-MM-DD'
                                            value={
                                              value && dayjs(value).isValid() ? dayjs(value) : null
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
                    title: "Employment and Financial Details",
                    accordianIndex: 4,
                    content: (
                      <div
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
                                    {type === "number" ? (
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
                                            onlyNumeric={true}
                                            min={0}
                                            max={10000000}
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
                                            picker="date"
                                            onChange={(_date, value) => {
                                              onChange(value);
                                            }}
                                            requiredLabel={true}
                                            format='YYYY-MM-DD'

                                            value={
                                              value && dayjs(value).isValid() ? dayjs(value) : null
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
                    title: "Customer Information",
                    accordianIndex: 5,
                    content: (
                      <div>
                        <div>
                          <div className="flex flex-end gap-2">
                            <Button onClick={startRecording}>
                              Start Recording
                            </Button>
                            <Button onClick={stopRecording}>
                              Stop Recording
                            </Button>
                            {videoRef !== null && (
                              <div>
                                <video ref={videoRef} autoPlay></video>
                              </div>
                            )}
                            {recordedVideoRef !== null && (
                              <div>
                                <video ref={recordedVideoRef} controls></video>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
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
                                              picker="date"
                                              onChange={(_date, value) => {
                                                onChange(value);
                                              }}
                                              requiredLabel={true}
                                              format='YYYY-MM-DD'

                                              value={
                                                value && dayjs(value).isValid() ? dayjs(value) : null
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
                      </div>
                    ),
                  },
                  {
                    title: "Account Information",
                    accordianIndex: 6,
                    content: (
                      <div
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
                                            picker="date"
                                            onChange={(_date, value) => {
                                              onChange(value);
                                            }}
                                            requiredLabel={true}
                                            format='YYYY-MM-DD'

                                            value={
                                              value && dayjs(value).isValid() ? dayjs(value) : null
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
                ]}
              />
            </form>
          ) : (
            <Preview data={appData?.data?.output||{}} />
          )}

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
        {showComments == 1 &&   <FieldComments comments={fieldcomments?.data?.output||[]} viewCommentRef={viewCommentRef}/>}
      </div>
    </ConfigProvider>
  );
};

export default MultiStepForm;
