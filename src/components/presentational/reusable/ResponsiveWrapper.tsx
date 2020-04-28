import React, { memo, ReactChild } from 'react';

const ResponsiveWrapper = ({
  children,
  mobileClasses = '',
  desktopClasses = ''
}: {
  children: ReactChild;
  mobileClasses?: string;
  desktopClasses?: string;
}) => (
  <>
    <div className={`${mobileClasses} d-block d-lg-none`}>{children}</div>
    <div className={`${desktopClasses} d-none d-lg-block`}>{children}</div>
  </>
);

export default memo(ResponsiveWrapper);
