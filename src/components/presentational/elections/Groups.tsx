import React, { memo } from 'react';
import { Col, Table, Card, CardBody } from 'reactstrap';
import { map, isEmpty } from 'lodash';
import Group from './Group';
import { Election } from '../../../data/reducers/types';

import vote from '../../../assets/png/vote.png';
import member from '../../../assets/png/member.png';
import group from '../../../assets/png/group.png';
import cash from '../../../assets/png/cash.png';
import score from '../../../assets/png/score.png';

const Groups = ({ groups, groupMembers }: { groups: Election['groups']; groupMembers: Election['groupMembers'] }) => {
  let rowCount = 0;

  return (
    <Col xl={12}>
      <Card>
        <CardBody className="pt-2">
          <Table responsive={true} className="project-list" style={{ borderTopColor: 'transparent' }}>
            <thead style={{ borderTopColor: 'transparent' }}>
              <tr>
                <th
                  className="pb-3"
                  scope="col"
                  style={{ width: '25%', paddingLeft: 0, borderTopColor: 'transparent' }}
                >
                  <img className="mr-1" src={vote} width={24} />
                  <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
                    Votes
                  </span>
                </th>
                <th
                  className="pb-3"
                  scope="col"
                  style={{ width: '45%', paddingLeft: 0, borderTopColor: 'transparent' }}
                >
                  <img className="mr-1" src={group} width={24} />
                  <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
                    Group
                  </span>
                </th>
                <th
                  className="pb-3"
                  scope="col"
                  style={{ width: '15%', paddingLeft: 0, borderTopColor: 'transparent' }}
                >
                  <img className="mr-1" src={cash} width={24} />
                  <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
                    Earnings
                  </span>
                </th>
                <th
                  className="pb-3"
                  scope="col"
                  style={{ width: '15%', paddingLeft: 0, borderTopColor: 'transparent' }}
                >
                  <img className="mr-1" src={score} width={24} />
                  <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
                    Score
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>{!isEmpty(groups) ? map(groups, group => <Group key={group.address} {...group} />) : <></>}</tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default memo(Groups);
