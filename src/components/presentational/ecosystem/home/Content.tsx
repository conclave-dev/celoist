import React, { memo, ReactChild } from 'react';
import { Row, Col, Card, CardHeader } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const Content = ({ icon, className, children }: { icon?: string; className?: string; children: ReactChild }) => (
  <Card className={className}>
    {icon && (
      <CardHeader style={{ backgroundColor: '#fff' }}>
        <Row>
          <Col xs={6}>
            <i className={`mdi mdi-${icon}`} />
          </Col>
          <Col xs={6}>
            <p className="text-right mb-0">@celoist</p>
          </Col>
        </Row>
      </CardHeader>
    )}
    <SimpleBar style={{ maxHeight: '100vh' }}>{children}</SimpleBar>
  </Card>
);

export default memo(Content);
