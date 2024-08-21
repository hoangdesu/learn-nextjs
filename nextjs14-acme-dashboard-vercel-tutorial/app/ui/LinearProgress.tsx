import React from 'react';
import style from './LinearProgress.module.css';

export default function LinearProgress({ className }: { className: string }) {
  return (
    <progress
      className={`${style['pure-material-progress-linear']} ${className}`}
    />
  );
}
