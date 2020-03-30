import React, { memo } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

const Header = ({ title, subtitle, inProgress }: { title: string; subtitle: string; inProgress: boolean }) => (
  <Row className="align-items-center">
    <Col xs={6}>
      <div className="page-title-box">
        <h4 className="font-size-18">{title}</h4>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item active">{subtitle}</li>
        </ol>
      </div>
    </Col>
    <Col xs={6}>
      <div className="float-right">{inProgress && <Spinner size="large" color="warning" />}</div>
    </Col>
  </Row>
);

export default memo(Header);
