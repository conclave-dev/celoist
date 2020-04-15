import React, { memo } from 'react';

const Anchor = ({ href, children, color }: { href: string; children: any; color: string }) => (
  <a rel="noopener noreferrer" target="_blank" href={href} style={{ color }} className="text-truncate">
    {children}
  </a>
);

export default memo(Anchor);
