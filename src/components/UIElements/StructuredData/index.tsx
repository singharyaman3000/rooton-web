import React from 'react';

type StructuredDataType = { data: { [key: string]: unknown } };

const StructuredData: React.FC<StructuredDataType> = ({ data }) => {
  return (
    <script
      key="structuredData"
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;
