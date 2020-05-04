import React, { memo, useState } from 'react';
import { Row, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import BigNumber from 'bignumber.js';

const calculateReceiveAmount = (assetAmount: string, exchangeRate: BigNumber) => {
  const bigAssetAmount = new BigNumber(assetAmount);

  if (bigAssetAmount.isZero()) {
    return bigAssetAmount;
  }

  return bigAssetAmount.multipliedBy(exchangeRate);
};

const GoldToken = ({ amount }: { amount: string }) => <span style={{ color: '#fbcc5c' }}>{amount} cGLD</span>;
const DollarToken = ({ amount }: { amount: string }) => <span style={{ color: '#35D07F' }}>{amount} cUSD</span>;

const MemoizedGoldToken = memo(GoldToken);
const MemoizedDollarToken = memo(DollarToken);

const AssetExchangerReference = ({
  assetSymbol,
  assetExchangeRate
}: {
  assetSymbol: string;
  assetExchangeRate: any;
}) => {
  const counterAssetAmount = calculateReceiveAmount('1', assetExchangeRate).toPrecision();
  const assetToken = assetSymbol === 'cGLD' ? <MemoizedGoldToken amount="1" /> : <MemoizedDollarToken amount="1" />;
  const counterAssetToken =
    assetSymbol === 'cGLD' ? (
      <MemoizedDollarToken amount={counterAssetAmount} />
    ) : (
      <MemoizedGoldToken amount={counterAssetAmount} />
    );

  return (
    <p className="text-center">
      {assetToken} = {counterAssetToken}
    </p>
  );
};

const MemoizedAssetExchangerReference = memo(AssetExchangerReference);

const AssetExchanger = ({
  assetSymbol,
  exchangeRates: { dollarsToGold, goldToDollars }
}: {
  assetSymbol: string;
  exchangeRates: any;
}) => {
  const [assetAmount, setAssetAmount] = useState('');
  const assetExchangeRate = assetSymbol === 'cGLD' ? goldToDollars : dollarsToGold;
  const [counterAssetAmount, setCounterAssetAmount] = useState('');
  const counterAssetSymbol = assetSymbol === 'cGLD' ? 'cUSD' : 'cGLD';
  const counterAssetExchangeRate = assetSymbol === 'cGLD' ? dollarsToGold : goldToDollars;

  return (
    <Row className="justify-content-center">
      <Row noGutters className="justify-content-center pt-1" style={{ width: '80%' }}>
        <p className="text-center" style={{ marginBottom: 0 }}>
          Current exchange rate:
        </p>
      </Row>
      <Row noGutters className="justify-content-center" style={{ width: '65%' }}>
        <MemoizedAssetExchangerReference assetSymbol={assetSymbol} assetExchangeRate={assetExchangeRate} />
      </Row>
      <Row noGutters className="pt-1 pb-3" style={{ width: '80%' }}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{assetSymbol}</InputGroupText>
          </InputGroupAddon>
          <Input
            id="amount"
            value={assetAmount}
            onChange={({ currentTarget: { value } }) => {
              if (!value || Number.isNaN(parseFloat(value))) {
                setCounterAssetAmount('');
                return setAssetAmount('');
              }

              const newCounterAssetAmount = calculateReceiveAmount(value, assetExchangeRate);

              setAssetAmount(value);
              return setCounterAssetAmount(newCounterAssetAmount.toPrecision());
            }}
          />
        </InputGroup>
      </Row>
      <Row noGutters className="pt-1 pb-3" style={{ width: '80%' }}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{counterAssetSymbol}</InputGroupText>
          </InputGroupAddon>
          <Input
            value={counterAssetAmount}
            onChange={({ currentTarget: { value } }) => {
              if (!value || Number.isNaN(parseFloat(value))) {
                setCounterAssetAmount('');
                return setAssetAmount('');
              }

              const newAssetAmount = calculateReceiveAmount(value, counterAssetExchangeRate);

              setCounterAssetAmount(value);
              return setAssetAmount(newAssetAmount.toPrecision());
            }}
          />
        </InputGroup>
      </Row>
      <Row noGutters className="justify-content-center" style={{ width: '80%' }}>
        <p className="text-center" style={{ marginBottom: 8 }}>
          <small>Note: You may receive up to 1% less than what is shown.</small>
        </p>
      </Row>
    </Row>
  );
};

export default memo(AssetExchanger);
