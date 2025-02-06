'use client';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Button } from '@mui/material';
import { useState } from 'react';
import LoginBgImage from '../components/LoginBgImage';
import LoginLogo from '../components/LoginLogo';
import TextBox from '../components/TextBox';
import SocialButton from '../components/SocialButton';

export default function SignInTest() {
  const { data: session } = useSession();

  if (session) {
    redirect(`/`);
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('login start');
    try {
      signIn();
    } catch (error) {
      console.log('error', error);
    }
    console.log('login start');
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center h-screen">
        <LoginBgImage />
        <div id="triangle" className="my-auto">
          <div className="w-20 h-20 bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-bl-lg	 absolute"></div>
        </div>
        <div className="w-full rounded-xl flex flex-col items-center  max-w-lg mx-auto">
          <div className="flex-col my-auto">
            <LoginLogo signIn={true} />
            <div className="flex-col">
              <form>
                <div className="flex-grow mt-4">
                  <TextBox
                    onChange={handleUsername}
                    height={12}
                    placeholder="example@gamedoora.com"
                    label="Username *"
                    id="username"
                    type="text"
                  />
                </div>
                <div className="flex-grow mt-4">
                  <TextBox
                    onChange={handlePassword}
                    height={12}
                    placeholder="********"
                    label="Password *"
                    id="password"
                    type="password"
                  />
                </div>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  className="flex-auto font-medium bg-orange-100 w-full h-12 mt-4"
                  sx={{
                    color: '#FF7600',
                    backgroundColor: '#FFE4CC',
                    '&:hover': {
                      backgroundColor: '#FFE4CC',
                    },
                  }}
                >
                  Login
                </Button>
                <div
                  id="reset-account"
                  className="flex mt-6 flex-col items-center"
                >
                  <div className="w-full h-2 flex-auto justify-center items-center">
                    <p
                      className="font-roboto font-medium text-center text-xsm"
                      style={{ color: '#26221F' }}
                    >
                      Having trouble logging in?&nbsp;
                      <a
                        href={'/sign-test'}
                        className="font-medium text-xsm"
                        style={{ color: '#FFA04D' }}
                      >
                        Forgot username or password
                      </a>
                    </p>
                  </div>
                </div>
                <div
                  id="divider"
                  className="flex justify-center w-full h-2 mt-4"
                >
                  <div className="flex-auto w-1/2 mt-3 border-t border-gray-400 "></div>
                  <div className=" mx-1 w-4 h-4">or</div>
                  <div className="flex-auto w-1/2 mt-3 border-t border-gray-400"></div>
                </div>
              </form>
              <div id="socials" className="flex flex-col mt-6 items-center">
                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                  <SocialButton
                    color="#D62D20"
                    iconPath="google.svg"
                    socialName="Google"
                    onClick={() => {
                      signIn('google');
                    }}
                    disabled={true}
                  />
                  <SocialButton
                    color="#24292E"
                    iconPath="git.svg"
                    socialName="GitHub"
                    onClick={() => {
                      signIn('github');
                    }}
                  />
                </div>
              </div>
              <div id="create-account" className="mt-5 w-full h-5">
                <Link
                  href={'/'}
                  className="font-semibold text-sm"
                  style={{ color: '#FFA04D' }}
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
          <div
            id="login-footer"
            className="flex flex-row mb-2 mt-auto w-full justify-around"
          >
            <div className="w-20 h-10">English</div>
            <div className="flex flex-row gap">
              <div className="h-10 flex flex-row gap-x-8">
                <div className="w-12 h-10">
                  <Link
                    href={'/sign-in'}
                    className="w-8 h-5 font-medium font-roboto"
                    style={{ color: '#26221F' }}
                  >
                    Help
                  </Link>
                </div>
                <div className="w-20 h-10">
                  <Link
                    href={'/sign-in'}
                    className="w-12 h-5 font-medium font-roboto"
                    style={{ color: '#26221F' }}
                  >
                    Privacy
                  </Link>
                </div>
                <div className="w-16 h-10">
                  <Link
                    href={'/sign-in'}
                    className="w-10 h-5 font-medium font-roboto"
                    style={{ color: '#26221F' }}
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
