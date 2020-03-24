import React, { memo } from 'react';
import { Row, Col, Card, CardHeader } from 'reactstrap';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import SimpleBar from 'simplebar-react';

const Twitter = () => (
  <Col xl={6}>
    <Card>
      <CardHeader style={{ backgroundColor: '#fff', borderBottom: 'none' }}>
        <Row>
          <Col xl={6}>
            <i className="mdi mdi-twitter" />
          </Col>
          <Col xl={6}>
            <p className="text-right mb-0">@celoist</p>
          </Col>
        </Row>
      </CardHeader>
      <SimpleBar style={{ maxHeight: '100vh' }}>
        <TwitterTimelineEmbed sourceType="list" id="1242176827742982146" noHeader={true} />
      </SimpleBar>
    </Card>
  </Col>
);

export default memo(Twitter);
