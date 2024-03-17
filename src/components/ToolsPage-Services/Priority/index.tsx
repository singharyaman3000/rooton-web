/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from './StrictModeDroppable';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { FaLock, FaSync } from 'react-icons/fa';
import style from './Priority.module.css';
import { H2 } from '@/components/H2';

const Priority = () => {
  // Initialize your default priority array with 'Field of study' at the start
  const [defaultPriority] = useState(['Field of study', 'Level', 'Budget', 'Duration', 'Province', 'Intake']);
  const [newPriority, setNewPriority] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    let storedPriority = defaultPriority;
    if (localStorage.getItem('prioritySaved')) {
      storedPriority = JSON.parse(localStorage.getItem('prioritySaved') || '[]');
    }
    setNewPriority([
      'Field of study',
      ...storedPriority.filter((item: string) => {
        return item !== 'Field of study';
      }),
    ]);
  }, []);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination || result.source.index === 0 || result.destination.index === 0) {
      // Do not reorder if the movement involves the first item ('Field of study')
      return;
    }

    const items = Array.from(newPriority);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local storage excluding 'Field of study'
    localStorage.setItem(
      'prioritySaved',
      JSON.stringify(
        items.filter((item) => {
          return item !== 'Field of study';
        }),
      ),
    );
    setNewPriority(items);
  };

  const handleReset = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsSpinning(true);
    // Reset priority excluding 'Field of study' in the reset logic
    setNewPriority(defaultPriority);
    localStorage.setItem(
      'prioritySaved',
      JSON.stringify(
        defaultPriority.filter((item) => {
          return item !== 'Field of study';
        }),
      ),
    );
    setTimeout(() => {
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <div className="flex align-left items-center justify-between">
        <H2 className="text-black">{'Priority'}</H2>
        <FaSync
          className={`${isSpinning ? style.spin : ''} ${style.resetIcon} ml-2 cursor-pointer`}
          onClick={handleReset}
        />
      </div>
      <div className="mb-2  text-black">Drag and Drop to update the priorities</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="priority">
          {(provided: {
            droppableProps: React.JSX.IntrinsicAttributes &
              React.ClassAttributes<HTMLElement> &
              React.HTMLAttributes<HTMLElement>;
            innerRef: React.LegacyRef<HTMLElement> | undefined;
            placeholder:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | React.PromiseLikeOfReactNode
              | null
              | undefined;
          }) => {
            return (
              <section {...provided.droppableProps} ref={provided.innerRef} className="list-parent mt-[4px]">
                <div className={`${style.list}`}>
                  {newPriority.map((item, index) => {
                    return (
                      <Draggable key={item} draggableId={item} index={index} isDragDisabled={item === 'Field of study'}>
                        {(provided) => {
                          return (
                            <div
                              {...provided.draggableProps}
                              {...(item !== 'Field of study' ? provided.dragHandleProps : {})}
                              ref={provided.innerRef}
                              className={`${style.list_item} ${item === 'Field of study' ? style.fieldOfStudy : ''}`}
                            >
                              {item === 'Field of study' ? (
                                <FaLock className="text-white relative top-[2px] right-[30px]" />
                              ) : (
                                <RxDragHandleDots2 className="relative top-[2px] right-[30px]" />
                              )}
                              <label className="margin-bottom-0 margin-left">{item}</label>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </div>
                {provided.placeholder}
              </section>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Priority;
