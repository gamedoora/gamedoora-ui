'use client';
import { Button } from '@mui/material';
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
    <Button
      variant="contained"
      style={{ borderRadius: '24px', backgroundColor: color }}
      className="font-medium font-roboto h-12 w-36"
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
    </Button>
  );
}
