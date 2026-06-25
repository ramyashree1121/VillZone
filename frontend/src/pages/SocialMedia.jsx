import React from 'react';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';

export default function SocialMedia() {
  const feeds = [
    {
      platform: 'YouTube',
      title: 'Highlights of Silver Jubilee Annual Day Celebrations 2025',
      desc: 'Watch our primary and high school students display Carnatic vocals, regional folk dance assemblies, and drama plays.',
      likes: '1.2K Views',
      icon: FaYoutube,
      color: 'text-red-500',
      link: '#'
    },
    {
      platform: 'Facebook',
      title: 'Congratulations Class 10 & 12 Board Toppers!',
      desc: 'We are incredibly proud to celebrate a 100% pass rate. Special congratulations to our toppers Abhinav and Meera for securing centum scores.',
      likes: '450 Likes',
      icon: FaFacebook,
      color: 'text-blue-600',
      link: '#'
    },
    {
      platform: 'Instagram',
      title: 'Active Smart Classes & Drone Robotics Experiments',
      desc: 'Visual glimpses from our new Drone Tech lab station. Grade 9 students practicing assembly and flight trials under instructor guidance.',
      likes: '800 Likes',
      icon: FaInstagram,
      color: 'text-pink-500',
      link: '#'
    }
  ];

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">
      
      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Social Feed Hub</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Explore recent posts, educational videos, and school community stories.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feeds.map((feed, idx) => {
              const Icon = feed.icon;
              return (
                <AnimatedSection key={idx} delay={idx * 0.1} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 flex flex-col justify-between group hover:shadow-premium-hover transition-shadow duration-300">
                  
                  {/* Top Header */}
                  <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <span className="text-xs font-black uppercase text-slate-500 flex items-center gap-1.5">
                      <Icon className={feed.color} size={18} /> {feed.platform} Feed
                    </span>
                    <a href={feed.link} className="text-slate-400 hover:text-primary transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {/* Body Text */}
                  <div className="p-6 flex-grow">
                    <h3 className="font-extrabold text-primary text-base mb-3 leading-snug group-hover:text-secondary transition-colors duration-300">
                      {feed.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {feed.desc}
                    </p>
                  </div>

                  {/* Footer likes */}
                  <div className="p-6 border-t border-slate-50 flex items-center gap-4 text-xs font-bold text-slate-500 bg-slate-50/50">
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="fill-red-500 text-red-500" /> {feed.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} /> Comment
                    </span>
                  </div>

                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
