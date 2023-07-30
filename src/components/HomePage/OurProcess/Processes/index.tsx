'use client';

import React from 'react';
import ProcessesDeskTopView from './ProcessesDeskTopView';
import { IOurProcessData } from '../interfaces';
import ProcessesMobileView from './ProcessesMobileView';

const Processes = ({ process }: IOurProcessData) => {
  return (
    <>
      <ProcessesDeskTopView process={process} />
      <ProcessesMobileView process={process} />
    </>
  );
};

export default Processes;
