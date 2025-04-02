'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToTopWrapper(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop {...props} />
    </Suspense>
  );
}

function ScrollToTop({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, searchParams]);

  return <>{children}</>;
}