import SampleAnimation from '@/components/sample-animation';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center p-24">
      <Image width={100} height={100} src={'/next.svg'} alt="next" />
      <SampleAnimation />
    </main>
  );
}
