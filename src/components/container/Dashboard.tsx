import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Layout from '../presentational/dashboard/Layout';
import { fetchBlogs } from '../../data/actions/dashboard';

const mapState = ({ dashboard }) => ({ dashboard });
const mapDispatch = { fetchBlogs };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Dashboard extends PureComponent<Props> {
  componentDidMount = () => {
    this.props.fetchBlogs();
  };

  render = () => {
    return (
      <>
        <Layout />
      </>
    );
  };
}

export default connector(Dashboard);
