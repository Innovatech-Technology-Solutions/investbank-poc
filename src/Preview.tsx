import SectionDetails from "./pages/SectionDetails";

const Preview = () => {
  return (
    <div>
      {/* Applicant Details */}
      <SectionDetails
        sectionHeader="Applicant Details"
        sectionData={[
          { key: "Full Name in Arabic", value: "Test" },
          { key: "Full Name in English", value: "Test" },
          { key: "Mobile Number", value: "Test" },
          { key: "Email", value: "Test" },
          { key: "Mother Name", value: "Test" },
          { key: "Sex", value: "Test" },
          { key: "Date of Birth", value: "Test" },
          { key: "Nationality", value: "Test" },
          { key: "National ID", value: "Test" },
          { key: "National ID Date", value: "Test" },
          { key: "National ID Expiry Date", value: "Test" },
          { key: "Is Bank Blacklisted?", value: "Test" },
          { key: "Birth Country", value: "Test" },
          { key: "Birth City", value: "Test" },
        ]}
      />

      {/* Social Status */}
      <SectionDetails
        sectionHeader="Social Status"
        sectionData={[
          { key: "Residance Status", value: "Test" },
          { key: "Martial Status", value: "Test" },
          { key: "Wife/Husband Name", value: "Test" },
          { key: "Childs Names", value: "Test" },
          { key: "Persoanl Identity Issuance Location", value: "Test" },
          { key: "Personal Identity Type", value: "Test" },
        ]}
      />

      {/* Residence Address */}
      <SectionDetails
        sectionHeader="Residence Address"
        sectionData={[
          { key: "City Name", value: "Test" },
          { key: "Area Name", value: "Test" },
          { key: "Street Name", value: "Test" },
          { key: "Apartment No", value: "Test" },
          { key: "Postal Code", value: "Test" },
          { key: "Home Landline", value: "Test" },
        ]}
      />

      {/* Employment and Financial Details */}
      <SectionDetails
        sectionHeader="Employment and Financial Details"
        sectionData={[
          { key: "Job", value: "Test", fieldKey:"accountOpeningPurpose" },
          { key: "Job Location", value: "Test" },
          { key: "Monthly Salary", value: "Test" },
          { key: "Income Source", value: "Test" },
          { key: "Other Income Sources", value: "Test" },
          { key: "Transaction Size Per Account", value: "Test" },
          { key: "Account Opening Purpose", value: "Test" },
        ]}
      />

      {/* Customer Information */}
      <SectionDetails
        sectionHeader="Customer Information"
        sectionData={[
          { key: "Prime Customer (Yes or No)", value: "Test" },
          { key: "Cusomter Number", value: "Test" },
          { key: "Branch Name", value: "Test" },
        ]}
      />

      {/* Account Information */}
      <SectionDetails
        sectionHeader="Account Information"
        sectionData={[
          { key: "Account Type", value: "Test" },
          { key: "Account Currency", value: "Test" },
          { key: "Account Number", value: "Test" },
          { key: "Account IBAN", value: "Test" },
        ]}
      />
    </div>
  );
};

export default Preview;
