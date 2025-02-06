'use client';
import Image from 'next/image';

interface SocialButtonProps {
  disabled?: boolean;
  color: string;
  iconPath: string;
  socialName: string;
  onClick: () => void;
}

export default function SocialButton({
  disabled = false,
  color,
  iconPath,
  socialName,
  onClick,
}: SocialButtonProps) {
  return (
    <button
      className="inline-flex items-center gap-2 px-4 py-2 text-white bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-gray-600"
      onClick={onClick}
      disabled={disabled}
    >
      <Image
        src={`${iconPath}`}
        alt="social"
        height={20}
        width={20}
        className="mr-2"
      />
      {socialName}
    </button>
  );
}
