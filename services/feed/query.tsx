import { useQuery } from '@tanstack/react-query';
import { axiosConfig } from '../../config/config';
import { TFeed } from './type';

// TODO: Implement catch async and wrap this function to it

const feedQueryKeys = {
  userFeedList: ['userFeed'] as const,
};

/**
 * Get feed for user
 * @returns returns feed for logged-in users
 */
const fetchFeed = async (
  uid: string
): Promise<{
  status: number;
  feed: TFeed[];
}> => {
  const { data } = await axiosConfig.get(`${uid}/feed`);
  return data;
};

export const useFetchFeed = (uid: string) =>
  useQuery(feedQueryKeys.userFeedList, () => fetchFeed(uid));
