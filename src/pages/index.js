import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Index page that redirects directly to the enhancer
 * 
 * @returns {null} No rendering, redirects immediately
 */
const IndexPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/enhancer');
  }, [router]);
  
  return null;
};

export default IndexPage;