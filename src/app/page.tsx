"use client";
import React from 'react'
// import { CoolMode } from '@/components/magicui/cool-mode';
import SparklesText from "@/components/magicui/sparkles-text";
import RetroGrid from '@/components/magicui/retro-grid';
import { CoolMode } from '@/components/magicui/cool-mode';
import { useRouter } from 'next/navigation';

const page = () => {

  const router = useRouter();

  return (
    <div className="relative flex h-[100vh] w-full flex-col items-center py-10 overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <SparklesText text="Authentication Page" className='text-black text-3xl sm:text-4xl md:text-6xl' />
      <h2 className='text-xl md:text-2xl font-bold self-center md:self-end mr-10'>By Aryan Biswas</h2>
      <div className='flex h-full justify-center items-center gap-x-14'>
        <CoolMode>
          <button onClick={() => router?.push('/login')} className='bg-black text-white px-7 py-1.5 rounded-full text-xl font-semibold '>
            Login
          </button>
        </CoolMode>
        <CoolMode>
          <button onClick={() => router?.push('/signup')} className='bg-black text-white px-7 py-1.5 rounded-full text-xl font-semibold '>
            Signup
          </button>
        </CoolMode>
      </div>

      <RetroGrid />
    </div>
  )
}

export default page