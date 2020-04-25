import React, { memo, useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Content from './Content';
import Spinner from '../../reusable/Spinner';

const Twitter = () => {
  const [showOnLoad, setShowOnLoad] = useState('none');

  return (
    <>
      {showOnLoad === 'none' && <Spinner />}
      <Content className={`d-${showOnLoad}`}>
        <TwitterTimelineEmbed
          sourceType="list"
          ownerScreenName="celoist"
          id="1242176827742982146"
          noHeader={false}
          onLoad={() => setShowOnLoad('block')}
        />
      </Content>
    </>
  );
};

export default memo(Twitter);
