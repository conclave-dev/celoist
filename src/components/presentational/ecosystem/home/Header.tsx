import React, { memo } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

const Header = ({ inProgress }: { inProgress: boolean }) => (
  <Row className="align-items-center">
    <Col sm={6}>
      <div className="page-title-box">
        <h4 className="font-size-18">Home</h4>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item active">Our ecosystem in a nutshell</li>
        </ol>
      </div>
    </Col>
    <Col sm={6}>
      <div className="float-right d-none d-md-block">{inProgress && <Spinner size="large" color="warning" />}</div>
    </Col>
  </Row>
);

export default memo(Header);
