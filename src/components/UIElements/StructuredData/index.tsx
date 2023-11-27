import React from 'react';

type StructuredDataType<T> = { data: T };

const StructuredData = <T,>({ data }: StructuredDataType<T>) => {
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
