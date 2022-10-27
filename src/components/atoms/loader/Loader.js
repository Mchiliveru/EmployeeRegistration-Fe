import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loader({requireCount}) {
  return (
    <Skeleton 
        count={requireCount}
        width='w-full'
    />
  )
}
