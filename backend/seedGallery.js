import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Gallery } from './models/Schemas.js';

dotenv.config();

const mockGallery = [
  // Science & Labs
  { imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800', title: 'State-of-the-art Science Lab', category: 'Science', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800', title: 'Chemistry Lab Experiments', category: 'Science', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800', title: 'Biology Dissection Session', category: 'Science', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1581092921461-39b21c1e4f43?auto=format&fit=crop&q=80&w=800', title: 'Robotics & AI Workshop', category: 'Science', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1567168544813-3e7e8e7e8e7e?auto=format&fit=crop&q=80&w=800', title: 'Physics Lab - Optics Experiments', category: 'Science', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800', title: 'Science Fair Project Exhibition', category: 'Science', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=800', title: '3D Printing & Design Lab', category: 'Science', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800', title: 'Environmental Science Field Trip', category: 'Science', type: 'image', status: 'Active' },

  // Campus
  { imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800', title: 'Smart Classroom Interaction', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800', title: 'School Building Exterior', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800', title: 'Graduation Ceremony Hall', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', title: 'School Library Reading Area', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800', title: 'Computer Lab with Latest Systems', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800', title: 'Collaborative Learning Space', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', title: 'School Corridor & Art Displays', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1529543544282-ea9620f946f6?auto=format&fit=crop&q=80&w=800', title: 'School Auditorium Seating', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800', title: 'School Garden & Green Area', category: 'Campus', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800', title: 'School Playground Equipment', category: 'Campus', type: 'image', status: 'Active' },

  // Sports
  { imageUrl: 'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&q=80&w=800', title: 'Annual Sports Day Football Finals', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&q=80&w=800', title: 'Cricket Practice Session', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800', title: 'Athletics Track Events', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1518406432532-359a1c5f7e30?auto=format&fit=crop&q=80&w=800', title: 'Basketball Tournament', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1628891431522-0e30eef824b9?auto=format&fit=crop&q=80&w=800', title: 'Indoor Badminton Court', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1518602164578-cd0074062767?auto=format&fit=crop&q=80&w=800', title: 'Cricket Net Practice', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800', title: 'Football Team Group Photo', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1518314911008-8fef36c8c529?auto=format&fit=crop&q=80&w=800', title: 'Volleyball Match', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800', title: 'Karate & Self-Defense Class', category: 'Sports', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&q=80&w=800', title: 'Yoga & Meditation Session', category: 'Sports', type: 'image', status: 'Active' },

  // Cultural
  { imageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&q=80&w=800', title: 'Cultural Annual Day Celebration', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800', title: 'Traditional Dance Performance', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800', title: 'School Music Band Concert', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', title: 'Art & Drawing Competition', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=800', title: 'Diwali Celebration at School', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31fc5?auto=format&fit=crop&q=80&w=800', title: 'Inter-House Debate Competition', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=800', title: 'School Assembly Performance', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800', title: 'Fancy Dress Competition', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1529543544282-ea9620f946f6?auto=format&fit=crop&q=80&w=800', title: 'Republic Day Celebration', category: 'Cultural', type: 'image', status: 'Active' },
  { imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', title: 'Pottery & Clay Modeling Workshop', category: 'Cultural', type: 'image', status: 'Active' },

  // Videos
  { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800', title: '📹 Virtual Campus Tour Video', category: 'Campus', type: 'youtube', status: 'Active' },
  { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', imageUrl: 'https://images.unsplash.com/photo-1574999782562-2a8b170553bc?auto=format&fit=crop&q=80&w=800', title: '📹 Annual Day Highlights 2025', category: 'Cultural', type: 'youtube', status: 'Active' },
  { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe84e74f6?auto=format&fit=crop&q=80&w=800', title: '📹 Sports Meet Highlights', category: 'Sports', type: 'youtube', status: 'Active' },
  { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800', title: '📹 Science Lab Demo Video', category: 'Science', type: 'youtube', status: 'Active' },
  { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800', title: '📹 School Documentary Film', category: 'Campus', type: 'youtube', status: 'Active' },
  { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800', title: '📹 Cultural Fest Highlights', category: 'Cultural', type: 'youtube', status: 'Active' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    await Gallery.deleteMany({}); // Clear existing to ensure clean seed
    await Gallery.insertMany(mockGallery);
    console.log(`Seeded ${mockGallery.length} gallery items!`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

seed();
