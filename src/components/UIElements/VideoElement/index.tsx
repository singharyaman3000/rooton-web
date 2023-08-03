import React from 'react';

export interface IVideoElement {
  src: string;
  poster: string;
  constrols?: boolean;
  loop?: boolean;
  cssClass?: string;
  muted?:boolean
}

const VideoElement = ({ src, constrols = true, loop = false, cssClass , muted }: IVideoElement) => {
  return <video className={cssClass} controls={constrols} src={src} autoPlay muted={muted} loop={loop} preload="metadata" />;
};

export default VideoElement;
