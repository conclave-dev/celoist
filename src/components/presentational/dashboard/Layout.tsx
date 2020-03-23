import React, { memo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Blogs from './Blogs';
import Header from './Header';

const Layout = () => (
  <Container fluid>
    <Header />
    <Row>
      <Blogs />
      <Col xl={6}></Col>
    </Row>
  </Container>
);

export default memo(Layout);
