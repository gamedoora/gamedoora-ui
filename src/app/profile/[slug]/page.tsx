/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

interface IUser {
  name: string;
  avatar: string | null;
  email: string;
  userID: string;
  phone: string;
}

// const fetchUserByUser = async (slug: string): Promise<IUser> => {
//   const user = await prisma.user.findUnique({
//     where: {
//       userID: slug,
//     },
//     select: {
//       name: true,
//       userID: true,
//       avatar: true,
//       email: true,
//       phone: true,
//     },
//   });
//   if (!user) {
//     notFound();
//   }
//   return user;
// };

export default async function Profile({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  // const user = await fetchUserByUser(params.slug);
  const session = await getServerSession();
  return (
    <>
      {session?.user?.name ? (
        <div>
          <div className="bg-gray-200 flex">
            <aside>
              <img
                className="w-60"
                src={`${session.user.image}`}
                alt="User Photo"
              ></img>
            </aside>
            <div className="p-2">
              <div>{session?.user?.name}</div>
              <div>{session?.user?.email}</div>
            </div>
          </div>
        </div>
      ) : (
        'Not logged in'
      )}
    </>
  );
}
