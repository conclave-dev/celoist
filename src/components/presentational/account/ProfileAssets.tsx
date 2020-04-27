import React, { memo, useState } from 'react';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import BigNumber from 'bignumber.js';
import ProfileAssetsChart from './ProfileAssetsChart';
// import Anchor from '../reusable/Anchor';
import AssetExchanger from './AssetExchanger';
import whiteCoin from '../../../assets/png/whiteCoin.png';

const ResponsiveHeaderWrapper = ({ children }) => (
  <>
    <div className="d-none d-lg-block">{children}</div>
    <div className="d-none d-lg-none d-xs-block d-flex justify-content-center">{children}</div>
  </>
);

const ProfileAssets = ({ cGLD, cUSD }) => {
  const [exchangerAssetSymbol, setExchangerAssetSymbol] = useState('');
  const clearExchangerAssetSymbol = () => setExchangerAssetSymbol('');
  const hasBalance = !cGLD.isZero() || !cUSD.isZero();

  return (
    <Card>
      {exchangerAssetSymbol &&
        (exchangerAssetSymbol === 'cGLD' ? (
          <AssetExchanger
            cGLD={cGLD}
            cUSD={cUSD}
            assetSymbol="cGLD"
            clearExchangerAssetSymbol={clearExchangerAssetSymbol}
          />
        ) : (
          <AssetExchanger
            cGLD={cGLD}
            cUSD={cUSD}
            assetSymbol="cUSD"
            clearExchangerAssetSymbol={clearExchangerAssetSymbol}
          />
        ))}
      <CardBody>
        <ResponsiveHeaderWrapper>
          <Row
            noGutters
            className="justify-content-between align-items-center"
            style={{ width: '100%', flexWrap: 'nowrap' }}
          >
            <Col lg={5} xs={5}>
              <h4 className="card-title">Assets</h4>
            </Col>
            <Col lg={7} xs={7} className="d-flex justify-content-end" style={{ flexWrap: 'nowrap', paddingRight: 0 }}>
              <Button
                className="waves-effect waves-light mr-1"
                style={{
                  color: '#FFF',
                  backgroundColor: '#fbcc5c',
                  border: 'none',
                  height: 32,
                  paddingTop: 0,
                  paddingBottom: 0
                }}
                onClick={() => setExchangerAssetSymbol('cGLD')}
              >
                <div className="d-flex align-items-center">
                  <i className="mdi mdi-swap-horizontal" />
                  <img src={whiteCoin} height={16} alt="coin" />
                </div>
              </Button>
              <Button
                className="waves-effect waves-light ml-1"
                style={{
                  color: '#FFF',
                  backgroundColor: '#35D07F',
                  border: 'none',
                  height: 32,
                  paddingTop: 0,
                  paddingBottom: 0
                }}
                onClick={() => setExchangerAssetSymbol('cUSD')}
              >
                <div className="d-flex align-items-center">
                  <i className="mdi mdi-swap-horizontal" />
                  <img src={whiteCoin} height={16} alt="coin" />
                </div>
              </Button>
            </Col>
          </Row>
        </ResponsiveHeaderWrapper>
        <Row style={{ minHeight: 300 }}>
          <Col
            xs={12}
            className="d-flex justify-content-center align-items-center p-0"
            style={{ marginLeft: hasBalance ? -12.5 : 0 }}
          >
            {hasBalance ? (
              <ProfileAssetsChart cGLD={cGLD} cUSD={cUSD} />
            ) : (
              <p className="text-truncate">No assets found</p>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default memo(ProfileAssets);
