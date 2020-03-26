import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';

const Header = () => (
  <div className="page-title-box">
    <Row className="align-items-center">
      <Col sm={6}>
        <h4 className="page-title">Elections</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Election #0</li>
          <li className="breadcrumb-item">{`Block #0`}</li>
        </ol>
      </Col>
    </Row>
  </div>
);

export default memo(Header);
