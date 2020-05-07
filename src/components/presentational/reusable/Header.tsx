import React, { memo } from 'react';
import { Row, Col, Spinner } from 'reactstrap';

const Header = ({
  title,
  subtitle,
  inProgress,
  rightSideComponent
}: {
  title: string;
  subtitle: string[];
  inProgress?: boolean;
  rightSideComponent?: any;
}) => (
  <Row className="align-items-center">
    <Col lg={7} xs={12}>
      <div className="page-title-box">
        <h4 className="font-size-18">{title}</h4>
        <ol className="breadcrumb mb-0">
          {subtitle.map((text, index) => (
            <li key={`${text}-${index}`} className="breadcrumb-item">
              {text}
            </li>
          ))}
        </ol>
      </div>
    </Col>
    <Col lg={5} xs={12}>
      <div className="float-right mr-2">
        {inProgress ? <Spinner size="large" type="grow" color="warning" /> : rightSideComponent}
      </div>
    </Col>
  </Row>
);

export default memo(Header);
