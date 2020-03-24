import React, { memo } from 'react';
import { Container, Row } from 'reactstrap';
import Header from './Header';
import Summary from './Summary';
import Blogs from './Blogs';
import Twitter from './Twitter';

const Layout = () => (
  <Container fluid>
    <Header />
    <Summary />
    <Row className="mt-4">
      <Blogs />
      <Twitter />
    </Row>
  </Container>
);

export default memo(Layout);
