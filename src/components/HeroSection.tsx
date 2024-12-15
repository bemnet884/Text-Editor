'use client';

import { Button } from './ui/button';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full px-6 py-16">
        <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-left">
            Create, Write, <br /> and Share Like Never Before
          </h1>
          <p className="text-lg md:text-xl mb-6 text-left max-w-3xl">
            Use our powerful text editor to bring your ideas to life. Start writing now and see your creativity flow!
          </p>

          <Button className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white text-xl font-semibold shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-400">
            Start Writing Now
          </Button>
        </div>

        <div className="w-full h-full text-center">
          <iframe
            src="https://my.spline.design/purplediamond-3750e29679e498435ecde25e5c7b9bc1/"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
    </section>
  );
}
