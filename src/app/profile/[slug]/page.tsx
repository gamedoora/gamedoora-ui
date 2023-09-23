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
        <div className="min-h-screen bg-gray-100 flex justify-center mt-4">
          <div className="bg-white w-full p-6 rounded-lg shadow-xl max-w-screen-xl">
            <div>
              <img
                className="w-60 rounded-full"
                src={`${session.user.image}`}
                alt="User Photo"
              ></img>
              <div className="grid place-items-center">
                <h1 className="text-2xl font-semibold">
                  {session?.user?.name}
                </h1>
                <p className="text-gray-600">Game developer</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About Me</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae hendrerit ante. Vivamus semper, purus id fermentum
                posuere.
              </p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Contact Information
              </h2>
              <p className="text-gray-700">
                Email:{' '}
                <a href={`mailto:${session?.user?.email}`}>
                  {session?.user?.email}
                </a>
                <br />
                Phone: +91 9876543210
                <br />
                Location: Bharat
              </p>
            </div>
          </div>
        </div>
      ) : (
        'Not logged in'
      )}
    </>
  );
}
