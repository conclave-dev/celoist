import React, { memo, useState } from 'react';
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

const QueuedProposalButtons = ({ upvotes }: { upvotes: ProposalType['upvotes'] }) => (
  <Button {...buttonProps} style={{ border: 'none', color: '#fff', backgroundColor: '#35D07F' }}>
    <i className="mdi mdi-thumb-up mr-2" />
    {getTokenAmountFromUint256(upvotes).toFormat(0)}
  </Button>
);

const parsedProposalFormatter = (parsedProposalItem, showParsed) => {
  if (showParsed) {
    return `${parsedProposalItem.contract}.${parsedProposalItem.function}(${parsedProposalItem.argList.reduce(
      (argString, arg, argIndex) => {
        argString += arg.includes('0x') ? `"${arg}"` : arg;

        if (parsedProposalItem.argList[argIndex + 1]) {
          argString += ', ';
        }

        return argString;
      },
      ''
    )})`;
  }

  return JSON.stringify(parsedProposalItem);
};

const Proposal = ({
  proposal,
  proposalID,
  networkURL
}: {
  proposal: {
    proposalID: number;
    metadata: any;
    parsedProposal: ProposalType['proposal'];
    transactions: ProposalType['proposal'];
    votes: ProposalType['votes'];
    upvotes: ProposalType['upvotes'];
  };
  proposalID: number;
  networkURL: string;
}) => {
  const [showParsed, setShowParsed] = useState(true);
  const { parsedProposal, metadata, upvotes, votes } = proposal;
  const { proposer, deposit, descriptionURL } = metadata;
  const parsedProposalTextStyle = {
    color: '#3488ec',
    fontWeight: 700
  };

  return (
    <Card key={proposalID} className="mb-4">
      <CardBody>
        <div className="media">
          <div className="media-body">
            <h5 className="m-0">Proposal #{proposalID}</h5>
            <p>
              <small className="text-muted">
                Submitted by <Anchor href={`${networkURL}/address/${proposer}`}>{proposer}</Anchor> with a
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
            Details:
            <br />
            <Anchor href={descriptionURL} color="">
              {descriptionURL}
            </Anchor>
          </p>
          <p className="mt-0">Transactions:</p>
          {parsedProposal.map((p, pIndex) => (
            <Alert key={`proposal-tx-${pIndex}`} color="secondary">
              {parsedProposalFormatter(p[showParsed ? 'callDetails' : 'tx'], showParsed)}
            </Alert>
          ))}
          <p className="text-right mb-2 pr-2" style={{ marginTop: -8 }}>
            <small
              onClick={() => setShowParsed(true)}
              style={{
                ...(showParsed ? parsedProposalTextStyle : {})
              }}
            >
              Parsed
            </small>
            <small> | </small>
            <small
              onClick={() => setShowParsed(false)}
              style={{
                ...(!showParsed ? parsedProposalTextStyle : {})
              }}
            >
              Raw
            </small>
          </p>
        </div>
        {!new BigNumber(upvotes).isZero() ? (
          <QueuedProposalButtons upvotes={upvotes} />
        ) : (
          <DequeuedProposalButtons votes={votes} />
        )}
      </CardBody>
    </Card>
  );
};

export default memo(Proposal);
