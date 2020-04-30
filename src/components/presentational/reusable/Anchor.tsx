import React, { memo, ReactChild } from 'react';

const Anchor = ({ href, children, color }: { href: string; children: ReactChild; color: string }) => (
  <a rel="noopener noreferrer" target="_blank" href={href} style={{ color }} className="text-truncate">
    {children}
  </a>
);

export default memo(Anchor);
