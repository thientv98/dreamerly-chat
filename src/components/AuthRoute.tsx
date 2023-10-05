import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRoute: React.FunctionComponent<any> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log('unauthorized');
        navigate('/login');
      }
    });

    return () => AuthCheck();
  }, [auth, navigate]);

  if (loading) return <p>loading ...</p>;

  return <>{children}</>;
};

export default AuthRoute;
