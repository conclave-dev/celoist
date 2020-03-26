import React, { memo, useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Members = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button
        className="btn btn-secondary"
        color="secondary"
        onClick={toggle}
        style={{ marginBottom: '1rem' }}
        caret
      ></Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default memo(Members);
