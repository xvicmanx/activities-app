// @flow

import { useState, useEffect } from 'react';

import type { Result } from './helpers';
import { DEFAULT_RESULT } from './helpers';

const useTableItemsFetch = (fn: Function, payload: Object): Result => {
  const [result, setResult] = useState(DEFAULT_RESULT);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fn(payload);
      setResult(result);
    };  
    fetchData();
  }, [fn, payload]);

  return result;
};

export default useTableItemsFetch;
