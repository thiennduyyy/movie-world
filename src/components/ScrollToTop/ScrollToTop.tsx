'use client';

import { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type ScrollToTopProps = {
  children: ReactNode;
};

export default function ScrollToTop({ children }: ScrollToTopProps): React.ReactElement {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, searchParams]);

  return <>{children}</>;
}