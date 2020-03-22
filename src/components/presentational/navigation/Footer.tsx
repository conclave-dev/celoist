import React, { memo } from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">&copy; Conclave, Inc.</div>
      </div>
    </div>
  </footer>
);

export default memo(Footer);
