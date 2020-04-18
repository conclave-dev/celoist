import React, { memo } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Content from './Content';

const Twitter = () => (
  <Content icon="twitter">
    <TwitterTimelineEmbed sourceType="list" ownerScreenName="celoist" id="1242176827742982146" noHeader={false} noBorders />
  </Content>
);

export default memo(Twitter);
