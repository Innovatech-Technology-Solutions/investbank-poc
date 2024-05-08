/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Steps, Form, Input, Select, DatePicker, Radio, Row, Col, Button, ConfigProvider } from 'antd';

const { Step } = Steps;
const { Option } = Select;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [form] = Form.useForm();

  const steps = [
    
  
        {
            title: 'Applicant Details',
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
                    <Form.Item name="nationalIDExpiryDate" label="National ID Expiry Date">
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
        title: 'Social Status',
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
                <Form.Item name="wifeHusbandName" label={form.getFieldValue('sex') === 'male' ? 'Wife Name' : 'Husband Name'}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="childsNames" label="Childs Names">
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="persoanlIdentityIssuanceLocation" label="Personal Identity Issuance Location">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="personalIdentityType" label="Personal Identity Type">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ),
      },
      {
        title: 'Residence Address',
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
        title: 'Salary Details',
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
                <Form.Item name="transactionSizePerAccount" label="Transaction Size Per Account">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="accountOpeningPurpose" label="Account Opening Purpose">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        ),
      },
      {
        title: 'Customer Information',
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
        title: 'Account Information',
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
    <div className='flex'>
        <div className='w-[50vw] bg-slate-300 p-4' >
      <Steps  status='process' direction='vertical'current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      </div>
      <div>
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
      </div>
      
     
    </div>
    </ConfigProvider>
  );
};

export default MultiStepForm;
