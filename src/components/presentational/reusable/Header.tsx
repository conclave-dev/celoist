import React, { memo } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

const Header = ({ title, subtitle, inProgress }: { title: string; subtitle: string; inProgress: boolean }) => (
  <Row className="align-items-center">
    <Col xs={10}>
      <div className="page-title-box">
        <h4 className="font-size-18">{title}</h4>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item active">{subtitle}</li>
        </ol>
      </div>
    </Col>
    <Col xs={2}>
      <div className="float-right mr-2">{inProgress && <Spinner size="large" type="grow" color="warning" />}</div>
    </Col>
  </Row>
);

export default memo(Header);
