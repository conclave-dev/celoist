import React, { memo } from 'react';
import { Container, Row } from 'reactstrap';
import Header from './Header';
import Blogs from './Blogs';
import Twitter from './Twitter';

const Layout = () => (
  <Container fluid>
    <Header />
    <Row>
      <Blogs />
      <Twitter />
    </Row>
  </Container>
);

export default memo(Layout);
