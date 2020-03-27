import React, { memo } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

const Header = ({ inProgress }: { inProgress: boolean }) => (
  <div className="page-title-box">
    <Row className="align-items-center">
      <Col sm={6}>
        <h4 className="page-title">Elections</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Election #0</li>
          <li className="breadcrumb-item">{`Block #0`}</li>
        </ol>
      </Col>
      <Col sm={6}>
        <div className="float-right d-none d-md-block">{inProgress && <Spinner size="large" color="warning" />}</div>
      </Col>
    </Row>
  </div>
);

export default memo(Header);
