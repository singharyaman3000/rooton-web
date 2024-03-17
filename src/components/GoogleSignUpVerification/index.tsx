'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="px-10">
      <TailSpin
        visible
        height="60"
        width="60"
        color="#E7BA42"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

interface ExtendedJwtPayload extends JwtPayload {
  access_token: string;
  FirstName: string;
  LastName: string;
  Email: string;
}

const GoogleVerification = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      try {
        const firstDecoded = jwtDecode(token) as ExtendedJwtPayload;
        if (firstDecoded && firstDecoded.exp) {
          const expirationTime = new Date(firstDecoded.exp * 1000);
          if (new Date() > expirationTime) {
            const errorUrl = params.lang ? `/${params.lang}/login/error` : '/login/error';
            window.location.href = errorUrl;
            setLoading(false);
          } else {
            const token1 = firstDecoded.access_token;
            if (token1) {
              localStorage.setItem('token', token1);
              const toolsUrl = params.lang ? `/${params.lang}/tools` : '/tools';
              window.location.href = toolsUrl;
            }
          }
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      window.location.href = params.lang ? `/${params.lang}/signup` : '/signup';
      setLoading(false);
    }
  }, [params.lang]);

  return (
    <div className="h-screen">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{loading && <Loader />}</div>
    </div>
  );
};

export default GoogleVerification;
