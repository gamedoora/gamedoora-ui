import Image from 'next/image';

export default function Brand({ signIn }: { signIn: boolean }) {
  return (
    <div className="text-center grid place-items-center">
      <h2 className="flex text-4xl font-bold text-center text-gray-700 dark:text-white">
        <Image src="/gamedoora.png" alt="Gamedoora" width={50} height={50} />
        <span className="ml-2">Gamedoora</span>
      </h2>
      <p className="mt-3 text-gray-500 dark:text-gray-300">
        {signIn
          ? 'Sign In to access your account'
          : 'Sign Up to create an account'}
      </p>
    </div>
  );
}
