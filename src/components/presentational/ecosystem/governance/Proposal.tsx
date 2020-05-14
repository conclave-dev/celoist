import React, { memo } from 'react';
import { Card, CardBody, Alert, Button, Badge } from 'reactstrap';
import BigNumber from 'bignumber.js';
import { Proposal as ProposalType } from '../../../../data/types/governance';
import Anchor from '../../reusable/Anchor';
import { formatTokens, getTokenAmountFromUint256 } from '../../../../util/numbers';

const buttonProps = {
  className: 'mt-2',
  size: 'sm'
};

const DequeuedProposalButtons = ({ votes }: { votes: ProposalType['votes'] }) => (
  <>
    <Button
      {...buttonProps}
      className={`${buttonProps.className} mr-1`}
      style={{ border: 'none', color: '#fff', backgroundColor: '#35D07F' }}
    >
      <i className="mdi mdi-thumb-up mr-2" />
      {getTokenAmountFromUint256(votes.Yes).toFormat(0)}
    </Button>
    <Button
      {...buttonProps}
      className={`${buttonProps.className} mr-1`}
      style={{ border: 'none', color: '#fff', backgroundColor: '#fb7c6d' }}
    >
      <i className="mdi mdi-thumb-down mr-2" />
      {getTokenAmountFromUint256(votes.No).toFormat(0)}
    </Button>
    <Button
      {...buttonProps}
      className={`${buttonProps.className} mr-1`}
      style={{ border: 'none', color: '#fff', backgroundColor: '#9ca8b3' }}
    >
      <i className="mdi mdi-hand-left mr-2" />
      {getTokenAmountFromUint256(votes.Abstain).toFormat(0)}
    </Button>
  </>
);

const QueuedProposalButtons = ({ upvotes, upvote }: { upvotes: ProposalType['upvotes']; upvote: any }) => (
  <Button {...buttonProps} style={{ border: 'none', color: '#fff', backgroundColor: '#35D07F' }} onClick={upvote}>
    <i className="mdi mdi-thumb-up mr-2" />
    {getTokenAmountFromUint256(upvotes).toFormat(0)}
  </Button>
);

const Proposal = ({
  proposalID,
  metadata,
  transactions,
  votes,
  upvotes,
  upvote,
  networkURL
}: {
  proposalID: number;
  metadata: any;
  transactions: ProposalType['proposal'];
  votes: ProposalType['votes'];
  upvotes: ProposalType['upvotes'];
  upvote: any;
  networkURL: string;
}) => {
  const { proposer, deposit, descriptionURL } = metadata;

  return (
    <Card key={proposalID} className="mb-4">
      <CardBody>
        <div className="media">
          <div className="media-body">
            <h5 className="m-0">Proposal #{proposalID}</h5>
            <p>
              <small className="text-muted">
                Submitted by{' '}
                <Anchor href={`${networkURL}/address/${proposer}`}>{proposer}</Anchor>{' '}
                with a
              </small>{' '}
              <Badge style={{ backgroundColor: '#fbcc5c', borderRadius: 2, padding: 3 }}>
                {formatTokens(deposit)} cGLD
              </Badge>{' '}
              <small>deposit</small>
            </p>
          </div>
        </div>
        <div>
          <p className="mt-0 text-truncate">
            Description Link:
            <br />
            <Anchor href={descriptionURL} color="">
              {descriptionURL}
            </Anchor>
          </p>
          <p className="mt-0">Proposed Transactions:</p>
          {transactions.map((tx, txIndex) => (
            <Alert key={`${proposalID}-${txIndex}`} color="secondary">
              {JSON.stringify(tx)}
            </Alert>
          ))}
        </div>
        {!new BigNumber(upvotes).isZero() ? (
          <QueuedProposalButtons upvotes={upvotes} upvote={() => upvote(proposalID)} />
        ) : (
          <DequeuedProposalButtons votes={votes} />
        )}
      </CardBody>
    </Card>
  );
};

export default memo(Proposal);
