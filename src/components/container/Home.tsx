import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Layout from '../presentational/home/Layout';
import { fetchBlogs } from '../../data/actions/home';

const mapState = ({ home }) => ({ home });
const mapDispatch = { fetchBlogs };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

class Home extends PureComponent<Props> {
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

export default connector(Home);
