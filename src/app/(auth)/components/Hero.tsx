import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div
      className="hidden bg-cover lg:block lg:w-2/3"
      style={{
        backgroundImage: `url("https://cdn.leonardo.ai/users/58b4ebe8-31b7-423d-8587-b03acce30173/generations/5d8ef9a3-f1fa-4373-832b-76038240b7b8/DreamShaper_v7_a_heros_journey_1.jpg")`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
        <div>
          <Link href={'/'} className="flex">
            <Image
              src="/gamedoora.png"
              alt="Gamedoora"
              width={50}
              height={50}
            />
            <h2 className="text-4xl ml-2 font-bold text-white">Gamedoora</h2>
          </Link>

          <p className="max-w-xl mt-3 text-gray-300">
            A platform for passionate people to connect and collaborate freely.
          </p>
        </div>
      </div>
    </div>
  );
}
