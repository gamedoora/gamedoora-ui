import { notFound } from 'next/navigation';

export default async function Profile({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return <div>This is the profile page for {params.slug}</div>;
}
