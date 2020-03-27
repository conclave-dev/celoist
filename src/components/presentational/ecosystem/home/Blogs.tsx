import React, { memo } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Col, Card, Badge, CardBody, CardHeader } from 'reactstrap';
import SimpleBar from 'simplebar-react';

const mapState = ({ home: { blogs, blogIds } }) => ({ blogs, blogIds });
const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Blogs = ({ blogs, blogIds }: Props) => {
  const [firstBlogId] = blogIds;

  return (
    <Col xl={6}>
      <Card>
        <CardHeader style={{ backgroundColor: '#fff' }}>
          <Row>
            <Col xl={6}>
              <i className="mdi mdi-medium" />
            </Col>
            <Col xl={6}>
              <p className="text-right mb-0">@{firstBlogId}</p>
            </Col>
          </Row>
        </CardHeader>
        <SimpleBar style={{ maxHeight: '100vh' }}>
          {isEmpty(blogs) ? (
            <></>
          ) : (
            blogs[firstBlogId].posts.map(({ link, title, thumbnail, author, categories, excerpt, pubDate }) => {
              return (
                <Card key={link} className="mb-0" style={{ border: 'none' }}>
                  <CardBody className="pb-1">
                    <h5 className="card-title mt-0 mb-1 text-truncate">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="card-link">
                        {title}
                      </a>
                    </h5>
                    <small className="text-muted">
                      By {author} | {moment(pubDate).format('MMMM Do YYYY')}
                    </small>
                    <p className="mt-2 mb-2">
                      {categories.map(category => (
                        <Badge key={category} color="secondary" className="mr-1">
                          {category}
                        </Badge>
                      ))}
                    </p>
                  </CardBody>
                  <img
                    className="card-img-top img-fluid mx-auto"
                    src={thumbnail}
                    alt={title}
                    style={{ width: '90%' }}
                  />
                  <CardBody>
                    <p className="card-text text-muted font-italic">{excerpt}</p>
                  </CardBody>
                  <hr />
                </Card>
              );
            })
          )}
        </SimpleBar>
      </Card>
    </Col>
  );
};

export default connector(memo(Blogs));
