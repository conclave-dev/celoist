import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

interface SummaryItem {
  imgSrc: string;
  text: string;
  backgroundColor: string;
  value: number | string;
}

const SummaryItemBody = ({ backgroundColor, imgSrc, value, text }: SummaryItem) => (
  <Card className={`mb-4 bg-${backgroundColor}`}>
    <CardBody>
      <div className="float-right">
        <img src={imgSrc} width={48} />
      </div>
      <h5 className="font-20 mt-0 pt-1">{value}</h5>
      <p className="text-muted mb-0 text-truncate">{text}</p>
    </CardBody>
  </Card>
);

const SummaryItems = ({ summaryItems }: { summaryItems: SummaryItem[] }) => (
  <Row className="d-none d-lg-flex">
    {summaryItems.map(({ imgSrc, text, backgroundColor, value }, index) => (
      <Col
        key={`${text}-${value}-${index}`}
        lg={{
          size: 'auto'
        }}
        style={{ width: `${100 / summaryItems.length}%` }}
      >
        <SummaryItemBody backgroundColor={backgroundColor} imgSrc={imgSrc} value={value} text={text} />
      </Col>
    ))}
  </Row>
);

const MobileSummaryItems = ({ summaryItems }: { summaryItems: SummaryItem[] }) => (
  <Row className="d-block d-lg-none d-xs-block">
    {summaryItems.map(({ imgSrc, text, backgroundColor, value }, index) => (
      <Col
        key={`${text}-${value}-${index}`}
        xs={{ size: 'auto' }}
        style={{ width: '100%' }}
        className={`${index !== summaryItems.length - 1 && 'mb-2'}`}
      >
        <SummaryItemBody backgroundColor={backgroundColor} imgSrc={imgSrc} value={value} text={text} />
      </Col>
    ))}
  </Row>
);

const Summary = ({ summaryItems }: { summaryItems: SummaryItem[] }) => (
  <>
    <SummaryItems summaryItems={summaryItems} />
    <MobileSummaryItems summaryItems={summaryItems} />
  </>
);

export default memo(Summary);
