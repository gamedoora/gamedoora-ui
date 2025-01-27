/* eslint-disable @next/next/no-img-element */
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export default async function Profile({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession();

  return (
    <>
      {session?.user?.name ? (
        <div className="min-h-screen  py-8 px-4">
          {/* Header */}
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="w-28 h-28 rounded-full border-4 border-gray-800"
                  src={session.user.image || '/default-avatar.png'}
                  alt="User Avatar"
                />
                <div>
                  <h1 className="text-3xl text-black font-bold">
                    {session.user.name}
                  </h1>
                  <p className="text-gray-400">Senior Game Developer</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-400">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                  Share Profile
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Basic Information */}
            <div className=" rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <p>
                <strong>Location:</strong> San Francisco, CA, USA
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${session.user.email}`}
                  className="text-blue-400 hover:underline"
                >
                  {session.user.email}
                </a>
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Experience:</strong> 8 years
              </p>
            </div>

            {/* About Section */}
            <div className=" rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p>
                Experienced game developer with a passion for creating immersive
                gaming experiences. Specialized in Unity 3D and Unreal Engine
                development with a strong background in C++ programming.
              </p>
            </div>

            {/* Skills */}
            <div className=" rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'Unity 3D',
                  'Unreal Engine',
                  'C++',
                  'Game Design',
                  '3D Modeling',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Studios */}
            <div className=" rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">My Studios</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold">
                    Pixel Perfect Studios
                  </h3>
                  <p className="text-gray-400">Lead Developer</p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold">
                    GameCraft Interactive
                  </h3>
                  <p className="text-gray-400">Technical Director</p>
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className=" rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Awards & Achievements</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">🏆</span>
                  <div>
                    <p className="font-semibold">Best Mobile Game 2023</p>
                    <p className="text-gray-400 text-sm">GameDev Awards</p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-500">🌟</span>
                  <div>
                    <p className="font-semibold">Innovation Excellence</p>
                    <p className="text-gray-400 text-sm">
                      Industry Recognition
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p>{`This page needs to be visible to people even if they haven't logged in`}.</p>
        </div>
      )}
    </>
  );
}
