import React, { memo } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

const Members = ({ isOpen }: { isOpen: boolean }) => (
  <Collapse isOpen={isOpen}>
    <Card>
      <CardBody>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </CardBody>
    </Card>
  </Collapse>
);

export default memo(Members);
