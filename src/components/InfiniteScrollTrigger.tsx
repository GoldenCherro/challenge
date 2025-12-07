'use client';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface InfiniteScrollTriggerProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export function InfiniteScrollTrigger({
  onLoadMore,
  hasMore,
  isLoading,
}: InfiniteScrollTriggerProps) {
  const triggerRef = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading,
    threshold: 300,
  });

  return <div ref={triggerRef} className="h-4" />;
}
