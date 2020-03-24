import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';

const Header = () => (
  <Row className="align-items-center">
    <Col sm={6}>
      <div className="page-title-box">
        <h4 className="font-size-18">Dashboard</h4>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item active">A macro view of our ecosystem</li>
        </ol>
      </div>
    </Col>
  </Row>
);

export default memo(Header);
