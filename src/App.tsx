import React from 'react';
import { Layout, Menu, theme } from 'antd';
import MultiStepForm from './MultiStepForm';

const { Header, Content, Footer } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
  key: index + 1,
  label: `Menu ${index + 1}`,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', color:'white',background:'rgba(83,69,44,0.70)' ,alignItems: 'center' }}>
        <div className="demo-logo" >
        <div className="">
              <a className="" href="/en" title="Home">
          <img src="https://www.investbank.jo/sites/all/themes/investbank_subtheme/logo.png?v1" alt="Home"/>
        </a>
        </div>
          </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0,background:'rgba(83,69,44,0.70)' }}
        />
      </Header>
      <Content style={{ padding: '48px' }}>
      Welcome to INVESTBANK's Internet Banking

        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <MultiStepForm/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', color:'white',background:'#b98f00' }}>
      Copyright © 2024 INVESTBANK. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default App;