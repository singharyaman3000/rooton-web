'use client';
import { motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import './styles.css'
export interface IsliderProps {
  pageNum: number;
  children: Array<ReactElement>;
  slideClass?: string;
  slideParentClass?:string;
  id:string;
  scrollPercent?:string|number;
}

const Slider = ({ pageNum, children, slideClass , slideParentClass  , id , scrollPercent}: IsliderProps) => {
  return (
    <div className="relative mx-[-12px]">
      <div className="relative overflow-hidden">
        <div
          
          className={`flex justify-between  w-full transition-transform md:delay-100 md:duration-300 snap-x snap-mandatory ${slideParentClass}`}
          style={{ transform: `translateX(${ scrollPercent ? scrollPercent :  -pageNum * 100 + '%'})` }}
          //   {...handlers}
          id={id}
        >
          {children?.map((child, index) => {
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                viewport={{ once: true }}
                className={`px-[12px] w-full md:w-[50%] flex-shrink-0 ${slideClass}`}
              >
                {child}
              </motion.article>
            );
          })}
        
        </div>
        <div className='w-[15%] absolute h-full  right-[0] slide-shader top-0'></div>
      </div>
    </div>
  );
};

export default Slider;
