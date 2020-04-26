import React, { PureComponent, memo, useState } from 'react';
import { ListGroup, ListGroupItem, Card, CardBody, Button, Row, Col } from 'reactstrap';
import BigNumber from 'bignumber.js';
import ProfileAssetsChart from './ProfileAssetsChart';
// import Anchor from '../reusable/Anchor';
// import AssetExchanger from './AssetExchanger';

class ProfileAssets extends PureComponent<{ cGLD: BigNumber; cUSD: BigNumber }> {
  render = () => {
    // const [exchangerAssetSymbol, setExchangerAssetSymbol] = useState('');
    // const clearExchangerAssetSymbol = () => setExchangerAssetSymbol('');

    return (
      <Card>
        <CardBody>
          <h4 className="card-title">Assets</h4>
          <Row className="mb-3">
            <Col xs={12}>
              <ProfileAssetsChart cGLD={this.props.cGLD} cUSD={this.props.cUSD} />
            </Col>
          </Row>
          <Row noGutters className="justify-content-center">
            <Button
              className="waves-effect waves-light m-2"
              style={{
                color: '#FFF',
                backgroundColor: '#fbcc5c',
                border: 'none',
                height: 36
              }}
              onClick={() => null}
            >
              <i className="mdi mdi-plus" />
              <span className="text-truncate">cGLD</span>
            </Button>
            <Button
              className="waves-effect waves-light m-2"
              style={{
                color: '#FFF',
                backgroundColor: '#35D07F',
                border: 'none',
                height: 36
              }}
              onClick={() => null}
            >
              <i className="mdi mdi-plus" />
              <span className="text-truncate">cUSD</span>
            </Button>
          </Row>
        </CardBody>
      </Card>
    );
  };
}

// <CardBody style={{ padding: 0, width: '100%' }} className="d-flex justify-content-center">
//   {exchangerAssetSymbol &&
//     (exchangerAssetSymbol === 'cGLD' ? (
//       <AssetExchanger
//         cGLD={cGLD}
//         cUSD={cUSD}
//         assetSymbol="cGLD"
//         clearExchangerAssetSymbol={clearExchangerAssetSymbol}
//       />
//     ) : (
//       <AssetExchanger
//         cGLD={cGLD}
//         cUSD={cUSD}
//         assetSymbol="cUSD"
//         clearExchangerAssetSymbol={clearExchangerAssetSymbol}
//       />
//     ))}
// </CardBody>
export default ProfileAssets;
