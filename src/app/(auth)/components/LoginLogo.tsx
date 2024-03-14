import Image from 'next/image';

export default function LoginLogo({ signIn }: { signIn: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/GD_Title.svg" alt="Gamedoora" width={320} height={128} />
      <p className="mt-10 text-2xl" style={{color: '#7D7A77'}}>
        {signIn
          ? 'Login'
          : 'Sign Up'}
      </p>
    </div>
  );
}
