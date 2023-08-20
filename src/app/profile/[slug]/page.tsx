/* eslint-disable @next/next/no-img-element */
import { PrismaClient, User } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface IUser {
  name: string;
  avatar: string | null;
  email: string;
  userID: string;
  phone: string;
}

const fetchUserByUser = async (slug: string): Promise<IUser> => {
  const user = await prisma.user.findUnique({
    where: {
      userID: slug,
    },
    select: {
      name: true,
      userID: true,
      avatar: true,
      email: true,
      phone: true,
    },
  });
  if (!user) {
    notFound();
  }
  return user;
};

export default async function Profile({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const user = await fetchUserByUser(params.slug);
  return (
    <div>
      <div className="bg-gray-200 flex">
        <aside>
          <img className="w-60" src={`${user.avatar}`} alt="User Photo"></img>
        </aside>
        <div className="p-2">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
        </div>
      </div>
    </div>
  );
}
