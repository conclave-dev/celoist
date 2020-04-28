import React, { memo } from 'react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { Card, Badge, CardBody } from 'reactstrap';
import Content from './Content';
import { Blog } from '../../../../data/types/home';
import Spinner from '../../reusable/Spinner';

const Blogs = ({ blogs, blogIds }: { blogs: { [key: string]: Blog }; blogIds: string[] }) => {
  const [firstBlogId] = blogIds;

  return (
    <Content icon="medium">
      {isEmpty(blogs) ? (
        <Spinner />
      ) : (
        blogs[firstBlogId].posts.map(({ link, title, thumbnail, author, categories, excerpt, pubDate }) => (
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
                {categories.map((category) => (
                  <Badge key={category} color="secondary" className="mr-1">
                    {category}
                  </Badge>
                ))}
              </p>
            </CardBody>
            <img className="card-img-top img-fluid mx-auto" src={thumbnail} alt={title} style={{ width: '90%' }} />
            <CardBody>
              <p className="card-text text-muted font-italic">{excerpt}</p>
            </CardBody>
            <hr />
          </Card>
        ))
      )}
    </Content>
  );
};

export default memo(Blogs);
