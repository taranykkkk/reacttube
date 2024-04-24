import React from 'react';
import ContentLoader from 'react-content-loader';

function Skeleton(props) {
  return (
    <ContentLoader
      speed={2}
      width={291.15}
      height={271}
      style={{ width: '100%', height: '100%' }}
      viewBox="0 0 291.15 271"
      backgroundColor="#00d9ff56"
      foregroundColor="#53adbdb9"
      {...props}>
      <rect x="0" y="0" rx="5" ry="5" width="291" height="164" />
      <rect x="0" y="175" rx="5" ry="5" width="291" height="36" />
      <rect x="0" y="227" rx="5" ry="5" width="145" height="16" />
      <rect x="0" y="255" rx="5" ry="5" width="190" height="16" />
    </ContentLoader>
  );
}

export default Skeleton;
