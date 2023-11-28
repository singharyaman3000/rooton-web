import React from 'react';

type StructuredDataType<T> = { data: T, id:string };

const StructuredData = <T,>({ data, id }: StructuredDataType<T>) => {
  return (
    <script
      key={`${id}-structuredData`}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;
