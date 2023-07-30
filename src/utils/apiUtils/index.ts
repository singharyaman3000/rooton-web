

/**
 * @param revalidate defined in @interface RequestInit is used to control the revalidation frequency of the request,
 * if @param revalidate is 10 , then every request appearing within 10s will be served from cache
 */

export interface IFetchRes {
  status?: number;
  message?: string;
  error?: boolean;
}

export const getFetch = <T>(url: string, configs?: RequestInit): Promise<IFetchRes & T> => {
  return fetch(`${process.env.NEXT_API_BASE_URL}${url}`, configs)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      const errorObj = {
        status: error.response?.status || error.response?.data.statusCode,
        message: error.response?.statusText || error.response?.data.message || 'Something Went Wrong',
        ...error.response?.data,
        error: true,
      };
      return Promise.reject(errorObj);
    });
};
