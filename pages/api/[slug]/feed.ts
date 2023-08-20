import { NextApiRequest, NextApiResponse } from 'next';
export type TFeed = {
  id: string;
  author: string;
  description: string;
  title: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.json({
    status: 200,
    feed: [
      {
        id: 1,
        author: 'hybridx',
        description: 'Hello World, this an example feed response',
        title: 'Hello',
      },
    ],
  });
}
