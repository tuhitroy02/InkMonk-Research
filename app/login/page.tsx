import { Suspense } from 'react';
import AnimatedLampLogin from '@/components/AnimatedLampLogin';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center font-bold bg-black text-purple-400 font-mono">
        INITIALIZING 3D SCHOLARLY GATEWAY…
      </div>
    }>
      <AnimatedLampLogin />
    </Suspense>
  );
}
