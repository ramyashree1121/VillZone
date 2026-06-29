import React, { useState, useEffect } from 'react';
import Lightbox from '../components/Lightbox';
import AnimatedSection from '../components/AnimatedSection';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const mockGallery = [
    // Science & Labs (8 images)
    { imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800', title: 'State-of-the-art Science Lab', category: 'Science' },
    { imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800', title: 'Chemistry Lab Experiments', category: 'Science' },
    { imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800', title: 'Biology Dissection Session', category: 'Science' },
    { imageUrl: 'https://images.unsplash.com/photo-1581092921461-39b21c1e4f43?auto=format&fit=crop&q=80&w=800', title: 'Robotics & AI Workshop', category: 'Science' },
    { imageUrl: 'https://images.unsplash.com/photo-1567168544813-3e7e8e7e8e7e?auto=format&fit=crop&q=80&w=800', title: 'Physics Lab - Optics Experiments', category: 'Science' },
    { imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800', title: 'Science Fair Project Exhibition', category: 'Science' },
    { imageUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=800', title: '3D Printing & Design Lab', category: 'Science' },
    { imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800', title: 'Environmental Science Field Trip', category: 'Science' },

    // Campus (10 images)
    { imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800', title: 'Smart Classroom Interaction', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800', title: 'School Building Exterior', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800', title: 'Graduation Ceremony Hall', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', title: 'School Library Reading Area', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800', title: 'Computer Lab with Latest Systems', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800', title: 'Collaborative Learning Space', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', title: 'School Corridor & Art Displays', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1529543544282-ea9620f946f6?auto=format&fit=crop&q=80&w=800', title: 'School Auditorium Seating', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800', title: 'School Garden & Green Area', category: 'Campus' },
    { imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800', title: 'School Playground Equipment', category: 'Campus' },

    // Sports (10 images)
    { imageUrl: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&q=80&w=800', title: 'Annual Sports Day Football Finals', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&q=80&w=800', title: 'Cricket Practice Session', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800', title: 'Athletics Track Events', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1518406432532-359a1c5f7e30?auto=format&fit=crop&q=80&w=800', title: 'Basketball Tournament', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1628891431522-0e30eef824b9?auto=format&fit=crop&q=80&w=800', title: 'Indoor Badminton Court', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1518602164578-cd0074062767?auto=format&fit=crop&q=80&w=800', title: 'Cricket Net Practice', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800', title: 'Football Team Group Photo', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1518314911008-8fef36c8c529?auto=format&fit=crop&q=80&w=800', title: 'Volleyball Match', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800', title: 'Karate & Self-Defense Class', category: 'Sports' },
    { imageUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&q=80&w=800', title: 'Yoga & Meditation Session', category: 'Sports' },

    // Cultural (10 images)
    { imageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&q=80&w=800', title: 'Cultural Annual Day Celebration', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800', title: 'Traditional Dance Performance', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800', title: 'School Music Band Concert', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', title: 'Art & Drawing Competition', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=800', title: 'Diwali Celebration at School', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31fc5?auto=format&fit=crop&q=80&w=800', title: 'Inter-House Debate Competition', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', title: 'School Assembly Performance', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800', title: 'Fancy Dress Competition', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1529543544282-ea9620f946f6?auto=format&fit=crop&q=80&w=800', title: 'Republic Day Celebration', category: 'Cultural' },
    { imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', title: 'Pottery & Clay Modeling Workshop', category: 'Cultural' },

    // Videos (6 video thumbnails)
    { imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800', title: '📹 Virtual Campus Tour Video', category: 'Campus', type: 'youtube', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { imageUrl: 'https://images.unsplash.com/photo-1574999782562-2a8b170553bc?auto=format&fit=crop&q=80&w=800', title: '📹 Annual Day Highlights 2025', category: 'Cultural', type: 'youtube', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe84e74f6?auto=format&fit=crop&q=80&w=800', title: '📹 Sports Meet Highlights', category: 'Sports', type: 'youtube', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800', title: '📹 Science Lab Demo Video', category: 'Science', type: 'youtube', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800', title: '📹 School Documentary Film', category: 'Campus', type: 'youtube', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800', title: '📹 Cultural Fest Highlights', category: 'Cultural', type: 'youtube', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/gallery?status=Active`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Sort to show featured first
          const sortedData = data.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          setItems(sortedData);
        } else {
          setItems(mockGallery);
        }
      })
      .catch(() => {
        setItems(mockGallery);
      });
  }, []);

  const categories = ['All', 'Campus', 'Sports', 'Science', 'Cultural', 'Classroom', 'Facilities', 'Events'];

  const filteredItems = items.filter((item) => activeCategory === 'All' || item.category === activeCategory);

  const getMediaUrl = (url) => {
    if (!url) return '';
    return url.startsWith('/') ? `${import.meta.env.VITE_API_URL}${url}` : url;
  };

  const getThumbnail = (item) => {
    if (item.type === 'youtube') {
      return item.imageUrl || `https://img.youtube.com/vi/${item.videoUrl?.split('v=')[1]?.split('&')[0]}/maxresdefault.jpg`;
    }
    if (item.type === 'video' && !item.imageUrl) {
      // Fallback for MP4 if no thumb is generated
      return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800';
    }
    return getMediaUrl(item.imageUrl);
  };

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">

      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Media Gallery</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Glimpses of daily school assembly, project contests, and laboratory sessions.</p>
        </div>
      </section>

      {/* Filter Category Pills */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-sm ${activeCategory === cat
                  ? 'bg-secondary text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-style list grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <AnimatedSection
                key={idx}
                delay={(idx % 4) * 0.05}
                className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-premium-hover cursor-pointer group"
                onClick={() => setLightboxIndex(idx)}
              >
                <div className="relative h-52 overflow-hidden bg-slate-50">
                  <img
                    src={getThumbnail(item)}
                    alt={item.altText || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Unavailable'; }}
                  />
                  {(item.type === 'video' || item.type === 'youtube') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
                      <svg className="w-12 h-12 text-white opacity-90 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  )}
                  {item.isFeatured && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                      ★ Featured
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-primary text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-md shadow-sm">
                    {item.category}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== -1 && (
        <Lightbox
          images={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
        />
      )}

    </div>
  );
}
