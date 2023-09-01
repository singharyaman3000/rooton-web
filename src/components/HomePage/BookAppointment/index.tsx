'use client';

import React, { useContext } from 'react';
import { ModalShowContextname } from '@/providers/coreServicesMOdalOpenContext';
import BookAnAppointment from '@/components/UIElements/BookAnAppointment';

const BookAnAppointmentSection = () => {

  const { openCoreServiceList } = useContext(ModalShowContextname);

  return <BookAnAppointment onClick={openCoreServiceList} />;
};

export default BookAnAppointmentSection;
