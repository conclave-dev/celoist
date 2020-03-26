import React, { memo } from 'react';

const Anchor = ({ href, children }: { href: string; children: any }) => (
  <a className="text-primary" rel="noopener noreferrer" target="_blank" href={href}>
    {children}
  </a>
);

export default memo(Anchor);
