import * as React from 'react';
import { range } from '../utility';
import { IdolParameter } from './IdolParameter';

export const IdolParameterForm: React.FC = () => (
  <details className='border p-1'>
    <summary>아이돌 스탯</summary>
    <IdolParameter/>
    {
      range(4).map(i => (
        <IdolParameter key={i} produce={false} index={i}/>
      ))
    }
  </details>
);
