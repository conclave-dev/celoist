import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'reactstrap';

const styles = {
  listGroupItemButton: { border: 'none', paddingTop: 2, paddingBottom: 2 },
  divider: { width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: 12, marginBottom: 12 }
};

const Submenu = ({
  title,
  submenuItems
}: {
  title: string;
  submenuItems: {
    label: string;
    count: number;
    color: string;
  }[];
}) => (
  <>
    <ListGroupItem style={{ border: 'none' }}>
      <small style={{ fontSize: 10 }}>{title}</small>
    </ListGroupItem>
    {submenuItems.map(({ label, count, color }) => (
      <ListGroupItem key={`${label}-${count}`} style={{ border: 'none' }}>
        <Link to="" style={{ color: '#5b626b' }}>
          <div className="d-flex justify-content-between align-items-center">
            {label}
            <Button className="btn" size="sm" style={{ backgroundColor: color, ...styles.listGroupItemButton }}>
              {count}
            </Button>
          </div>
        </Link>
      </ListGroupItem>
    ))}
  </>
);

const ProposalSubmenu = () => (
  <Submenu
    title="PROPOSALS"
    submenuItems={[
      { label: 'Passed', count: 0, color: '#35D07F' },
      { label: 'In-Progress', count: 0, color: '#fbcc5c' },
      { label: 'Failed', count: 0, color: '#fb7c6d' }
    ]}
  />
);

const HotfixSubmenu = () => (
  <Submenu
    title="HOTFIXES"
    submenuItems={[
      { label: 'Executed', count: 0, color: '#35D07F' },
      { label: 'Pending', count: 0, color: '#fbcc5c' },
      { label: 'Rejected', count: 0, color: '#fb7c6d' }
    ]}
  />
);

const Menu = () => (
  <Card className="card pt-2 pb-4 mb-4">
    <ListGroup>
      <ProposalSubmenu />
      <ListGroupItem style={{ border: 'none' }}>
        <hr style={styles.divider} />
      </ListGroupItem>
      <HotfixSubmenu />
    </ListGroup>
  </Card>
);

export default memo(Menu);
