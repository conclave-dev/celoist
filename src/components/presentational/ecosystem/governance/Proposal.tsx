import React, { memo } from 'react';
import { Card, CardBody, Alert, Button, Badge } from 'reactstrap';
import { Proposal as ProposalType } from '../../../../data/reducers/types';

const buttonProps = {
  className: 'mt-2',
  outline: true,
  color: 'muted',
  size: 'sm'
};

const ProposalButtons = ({
  stage,
  upvotes,
  votes
}: {
  stage: ProposalType['stage'];
  upvotes: ProposalType['upvotes'];
  votes: ProposalType['votes'];
}) =>
  stage === 'Queued' ? (
    <Button {...buttonProps} style={{ borderColor: '#35D07F', color: '#35D07F' }}>
      <i className="mdi mdi-thumb-up mr-2" />
      {upvotes.toFixed(0)}
    </Button>
  ) : (
    <>
      <Button
        {...buttonProps}
        className={`${buttonProps.className} mr-1`}
        style={{ borderColor: '#35D07F', color: '#35D07F' }}
      >
        <i className="mdi mdi-thumb-up mr-2" />
        {votes.Yes.toFixed(0)}
      </Button>
      <Button
        {...buttonProps}
        className={`${buttonProps.className} mr-1`}
        style={{ borderColor: '#fb7c6d', color: '#fb7c6d' }}
      >
        <i className="mdi mdi-thumb-down mr-2" />
        {votes.No.toFixed(0)}
      </Button>
      <Button
        {...buttonProps}
        className={`${buttonProps.className} mr-1`}
        style={{ borderColor: '#2e3338', color: '#2e3338' }}
      >
        <i className="mdi mdi-hand-left mr-2" />
        {votes.Abstain.toFixed(0)}
      </Button>
    </>
  );

const Proposal = ({
  proposalID,
  metadataString,
  transactions,
  votes,
  upvotes,
  stage
}: {
  proposalID: number;
  metadataString: string;
  transactions: ProposalType['proposal'];
  votes: ProposalType['votes'];
  upvotes: ProposalType['upvotes'];
  stage: ProposalType['stage'];
}) => (
  <Card key={proposalID} className="mb-4">
    <CardBody>
      <div className="media">
        <div className="media-body">
          <h5 className="m-0">#{proposalID}</h5>
          <Badge style={{ backgroundColor: stage === 'Queued' ? '#9ca8b3' : '#fb7c6d' }}>{stage}</Badge>
          <p>
            <small className="text-muted">{metadataString}</small>
          </p>
        </div>
      </div>
      <p className="mt-0">Transactions</p>
      {transactions.map((tx, txIndex) => (
        <Alert key={`${proposalID}-${txIndex}`} color="secondary">
          {JSON.stringify(tx)}
        </Alert>
      ))}
      <ProposalButtons stage={stage} upvotes={upvotes} votes={votes} />
    </CardBody>
  </Card>
);

export default memo(Proposal);
