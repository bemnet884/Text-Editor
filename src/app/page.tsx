import FroalaComponet from '@/components/FroalaComponet';
import HeroSection from '@/components/HeroSection';

const Home = () => {
  return (
    <div className="relative w-full h-screen bg-gray-800">
      <HeroSection />
      <div className="relative z-10 mt-12 px-4 max-w-5xl mx-auto">
        <FroalaComponet />
      </div>
    </div>
  );
};

export default Home;
