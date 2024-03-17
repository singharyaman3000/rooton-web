import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

export const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {return setEnabled(true);});

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Droppable {...props}>{children}</Droppable>;
};