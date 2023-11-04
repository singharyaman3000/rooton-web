import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useClientAPI = <T>({ apiFn, setData }: { apiFn: () => Promise<T>; setData?: Dispatch<SetStateAction<T>> }) => {
  const [data, setdata] = useState<T>();
  const [loading, isLoading] = useState(false);
  const [error, isError] = useState();

  useEffect(() => {
    isLoading(true);
    isError(undefined);
    apiFn()
      .then((apiRes) => {
        setdata(apiRes);
        if(setData){
          setData(apiRes);
        }
        isLoading(false);
      })
      .catch((err) => {
        isLoading(false);
        isError(err);
      });
  }, []);

  return { data, loading, error };
};

export default useClientAPI;
