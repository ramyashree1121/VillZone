import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Notice, Event, Gallery, Settings, Lead, User, Admission, Testimonial, Staff, ActivityLog, Notification, PageSEO, CampusVisit, AILead, Syllabus, StudentLifeTopper, StudentLifeAchievement, StudentLifeGallery } from './models/Schemas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// console.log("MONGODB_URI =", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'villzone_secret_key_12345';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Set up static folder for uploads
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images, videos, and PDFs are allowed!'));
    }
  }
});
// MOCK STORAGE FALLBACK (For environments without MongoDB)
let isDbConnected = false;
const memoryStorage = {
  users: [{ username: 'admin', password: 'admin123', role: 'Super Admin', name: 'School Administrator' }],
  leads: [], notices: [], events: [], gallery: [], admissions: [], testimonials: [], staff: [], logs: [], notifications: [], pageSeo: [], campusVisits: [], aiLeads: [], studentLifeToppers: [], studentLifeAchievements: [], studentLifeGallery: [],
  syllabus: [
    { _id: 'syl_1', title: 'CBSE Kindergarten Curriculum Guide', gradeLevel: 'Pre-KG', pdfUrl: '#', status: 'Published', fileSize: 1024000, createdAt: new Date() },
    { _id: 'syl_2', title: 'CBSE Primary Syllabus 2026-27', gradeLevel: 'Grade 1-5', pdfUrl: '#', status: 'Published', fileSize: 2500000, createdAt: new Date() },
    { _id: 'syl_3', title: 'CBSE Middle School Syllabus', gradeLevel: 'Grade 6-8', pdfUrl: '#', status: 'Published', fileSize: 3000000, createdAt: new Date() },
    { _id: 'syl_4', title: 'CBSE Secondary Syllabus', gradeLevel: 'Grade 9-10', pdfUrl: '#', status: 'Published', fileSize: 4500000, createdAt: new Date() },
    { _id: 'syl_5', title: 'CBSE Senior Secondary Science', gradeLevel: 'Grade 11-12', pdfUrl: '#', status: 'Published', fileSize: 5200000, createdAt: new Date() }
  ],
  settings: {
    academicYear: '2026-27', schoolLogoUrl: '', schoolPhone: '+91 8220524146', schoolEmail: 'admissions@villzone.edu.in',
    schoolAddress: 'VillZone Area, Tiruvannamalai, Tamil Nadu - 606601', principalName: 'Dr. K. Raghavan, M.Sc., Ph.D.',
    principalMessage: 'Welcome to VillZone International School.',
    websiteTitle: 'VillZone International School', websiteTagline: 'Excellence in Education',
    defaultMetaTitle: 'VillZone International School | Top CBSE School in Tiruvannamalai',
    defaultMetaDescription: 'VillZone International School offers world-class CBSE education in Tiruvannamalai.',
    canonicalDomain: 'https://villzone.edu.in'
  }
};

const seedDatabase = async () => {
  try {
    // Seed Settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      await new Settings(memoryStorage.settings).save();
      console.log('Default settings seeded.');
    }
    // Seed Admin User
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      await new User({ username: 'admin', password: 'admin123', role: 'Super Admin', name: 'School Administrator' }).save();
      console.log('Default Admin user seeded.');
    } else {
      existingAdmin.password = 'admin123';
      if (!existingAdmin.name) existingAdmin.name = 'School Administrator';
      await existingAdmin.save();
      console.log('Admin password reset to admin123.');
    }

    // Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
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
        { videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800', title: '📹 Cultural Fest Highlights', category: 'Cultural', type: 'youtube', status: 'Active' },
      ];
      await Gallery.insertMany(mockGallery);
      console.log('Default Gallery images seeded.');
    }

    // Seed Syllabus
    const syllabusCount = await Syllabus.countDocuments();
    if (syllabusCount === 0) {
      const dbSyllabus = memoryStorage.syllabus.map(s => {
        const { _id, ...rest } = s;
        return rest;
      });
      await Syllabus.insertMany(dbSyllabus);
      console.log('Mock syllabus seeded.');
    }

  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected successfully!');
    isDbConnected = true;
    seedDatabase();
  })
  .catch(err => {
    console.error("MongoDB Error:", err);
    console.warn('MongoDB connection failed. Using Memory Mock Storage.');
  });

// --- UTILITIES & MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Authentication required' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { username, role, name }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Activity Logger
const logActivity = async (username, action, module, details = '') => {
  if (isDbConnected) {
    await new ActivityLog({ username, action, module, details }).save();
  } else {
    memoryStorage.logs.unshift({ _id: Date.now().toString(), username, action, module, details, createdAt: new Date() });
  }
};

// Notification Creator
const createNotification = async (title, message, module) => {
  if (isDbConnected) {
    await new Notification({ title, message, module }).save();
  } else {
    memoryStorage.notifications.unshift({ _id: Date.now().toString(), title, message, module, isRead: false, createdAt: new Date() });
  }
};

// --- AUTH API ---
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  let user;
  if (isDbConnected) {
    user = await User.findOne({ username, password }); // plaintext for MVP, use bcrypt in prod
  } else {
    user = memoryStorage.users.find(u => u.username === username && u.password === password);
  }

  if (user) {
    const token = jwt.sign({ username: user.username, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '24h' });
    await logActivity(user.username, 'Login', 'Auth');
    return res.json({ token, role: user.role, name: user.name, message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// --- DASHBOARD STATS ---
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    let stats = { leads: 0, events: 0, admissions: 0, gallery: 0, notices: 0, campusVisits: { total: 0, new: 0, confirmed: 0, thisMonth: 0 } };
    if (isDbConnected) {
      stats.leads = await Lead.countDocuments();
      stats.events = await Event.countDocuments();
      stats.admissions = await Admission.countDocuments();
      stats.gallery = await Gallery.countDocuments();
      stats.notices = await Notice.countDocuments();

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const [totalVisits, newVisits, confirmedVisits, thisMonthVisits] = await Promise.all([
        CampusVisit.countDocuments(),
        CampusVisit.countDocuments({ status: 'New' }),
        CampusVisit.countDocuments({ status: 'Confirmed' }),
        CampusVisit.countDocuments({ createdAt: { $gte: startOfMonth } })
      ]);
      stats.campusVisits = { total: totalVisits, new: newVisits, confirmed: confirmedVisits, thisMonth: thisMonthVisits };
    } else {
      stats.leads = memoryStorage.leads.length;
      stats.events = memoryStorage.events.length;
      stats.admissions = memoryStorage.admissions.length;
      stats.gallery = memoryStorage.gallery.length;
      stats.notices = memoryStorage.notices.length;

      const totalVisits = memoryStorage.campusVisits.length;
      const newVisits = memoryStorage.campusVisits.filter(v => v.status === 'New').length;
      const confirmedVisits = memoryStorage.campusVisits.filter(v => v.status === 'Confirmed').length;
      const thisMonthVisits = memoryStorage.campusVisits.filter(v => new Date(v.createdAt).getMonth() === new Date().getMonth()).length;
      stats.campusVisits = { total: totalVisits, new: newVisits, confirmed: confirmedVisits, thisMonth: thisMonthVisits };
    }
    res.json(stats);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- ADMISSIONS API ---
app.post('/api/admissions', async (req, res) => {
  try {
    const appNumber = `VHIS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const data = { ...req.body, applicationNumber: appNumber, status: 'New' };
    let admission;
    if (isDbConnected) {
      admission = new Admission(data);
      await admission.save();
    } else {
      admission = { _id: Date.now().toString(), ...data, statusHistory: [], createdAt: new Date() };
      memoryStorage.admissions.push(admission);
    }
    await createNotification('New Admission', `Application ${appNumber} received for ${data.studentName}`, 'Admissions');
    res.status(201).json({ success: true, data: admission });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/admissions/track', async (req, res) => {
  const { applicationNumber, mobileNumber } = req.query;
  try {
    let app;
    if (isDbConnected) {
      app = await Admission.findOne({ applicationNumber, fatherMobile: mobileNumber });
    } else {
      app = memoryStorage.admissions.find(a => a.applicationNumber === applicationNumber && a.fatherMobile === mobileNumber);
    }
    if (app) res.json(app);
    else res.status(404).json({ message: 'Application not found' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/admissions', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) res.json(await Admission.find().sort({ createdAt: -1 }));
    else res.json(memoryStorage.admissions);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/admissions/:id/status', authenticateToken, async (req, res) => {
  const { status, rejectionReason, adminRemarks } = req.body;
  try {
    let updated;
    const adminName = req.user.name || req.user.username;

    if (isDbConnected) {
      const current = await Admission.findById(req.params.id);
      const historyEntry = { previousStatus: current.status, newStatus: status, adminName, remarks: adminRemarks || rejectionReason, date: new Date() };
      updated = await Admission.findByIdAndUpdate(req.params.id, {
        status, rejectionReason, adminRemarks, updatedAt: new Date(),
        $push: { statusHistory: historyEntry }
      }, { new: true });
    } else {
      const idx = memoryStorage.admissions.findIndex(a => a._id === req.params.id);
      if (idx !== -1) {
        const currentStatus = memoryStorage.admissions[idx].status;
        const historyEntry = { previousStatus: currentStatus, newStatus: status, adminName, remarks: adminRemarks || rejectionReason, date: new Date() };
        if (!memoryStorage.admissions[idx].statusHistory) memoryStorage.admissions[idx].statusHistory = [];
        memoryStorage.admissions[idx].statusHistory.push(historyEntry);

        memoryStorage.admissions[idx] = { ...memoryStorage.admissions[idx], status, rejectionReason, adminRemarks, updatedAt: new Date() };
        updated = memoryStorage.admissions[idx];
      }
    }

    if (['Approved', 'Confirmed', 'Rejected'].includes(status)) {
      console.log(`[SIMULATED EMAIL] Sent to applicant for ${updated?.applicationNumber}: Your admission status is now ${status}. Remarks: ${adminRemarks || 'None'}`);
    }

    await logActivity(req.user.username, `Updated Application Status to ${status}`, 'Admissions', updated?.applicationNumber);
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- INQUIRIES / LEADS API ---
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;
    const data = { parentName: name, phoneNumber: mobile, email, subject, message, status: 'New' };
    let lead;
    if (isDbConnected) {
      lead = new Lead(data);
      await lead.save();
    } else {
      lead = { _id: Date.now().toString(), ...data, createdAt: new Date() };
      memoryStorage.leads.push(lead);
    }
    await createNotification('New Enquiry', `Enquiry from ${name}: ${subject}`, 'CRM');
    res.status(201).json({ success: true, data: lead });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/leads', authenticateToken, async (req, res) => {
  if (isDbConnected) res.json(await Lead.find().sort({ createdAt: -1 }));
  else res.json(memoryStorage.leads);
});

app.put('/api/leads/:id/status', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status });
    else {
      const idx = memoryStorage.leads.findIndex(l => l._id === req.params.id);
      if (idx > -1) memoryStorage.leads[idx].status = req.body.status;
    }
    await logActivity(req.user.username, `Updated Enquiry Status`, 'CRM');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/leads/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) await Lead.findByIdAndDelete(req.params.id);
    else memoryStorage.leads = memoryStorage.leads.filter(l => l._id !== req.params.id);
    await logActivity(req.user.username, `Deleted Enquiry`, 'CRM');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- AI LEADS API ---
app.post('/api/ai-leads', async (req, res) => {
  try {
    const data = req.body;
    let aiLead;
    if (isDbConnected) {
      aiLead = new AILead({ ...data, status: 'New' });
      await aiLead.save();
    } else {
      aiLead = { _id: Date.now().toString(), ...data, status: 'New', createdAt: new Date() };
      memoryStorage.aiLeads.push(aiLead);
    }
    await createNotification('New AI Lead', `AI Lead from ${data.name}: ${data.questionAsked}`, 'AI Chat');
    res.status(201).json({ success: true, data: aiLead });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/ai-leads', authenticateToken, async (req, res) => {
  if (isDbConnected) res.json(await AILead.find().sort({ createdAt: -1 }));
  else res.json(memoryStorage.aiLeads);
});

app.patch('/api/ai-leads/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) await AILead.findByIdAndUpdate(req.params.id, { status: req.body.status });
    else {
      const idx = memoryStorage.aiLeads.findIndex(l => l._id === req.params.id);
      if (idx > -1) memoryStorage.aiLeads[idx].status = req.body.status;
    }
    await logActivity(req.user.username, `Updated AI Lead Status`, 'AI Chat');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- SETTINGS & GLOBAL SEO ---
app.get('/api/settings', async (req, res) => {
  if (isDbConnected) {
    const s = await Settings.findOne();
    res.json(s || memoryStorage.settings);
  } else res.json(memoryStorage.settings);
});

app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    let settings;
    if (isDbConnected) {
      settings = await Settings.findOne();
      if (!settings) settings = new Settings(req.body);
      else Object.assign(settings, req.body);
      await settings.save();
    } else {
      memoryStorage.settings = { ...memoryStorage.settings, ...req.body };
      settings = memoryStorage.settings;
    }
    await logActivity(req.user.username, 'Updated Website Settings & Global SEO', 'Settings');
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- PAGE SEO ---
app.get('/api/pageseo', async (req, res) => {
  if (isDbConnected) res.json(await PageSEO.find());
  else res.json(memoryStorage.pageSeo);
});
app.put('/api/pageseo/:slug', authenticateToken, async (req, res) => {
  try {
    let seo;
    if (isDbConnected) {
      seo = await PageSEO.findOneAndUpdate({ slug: req.params.slug }, { ...req.body, slug: req.params.slug }, { new: true, upsert: true });
    } else {
      const idx = memoryStorage.pageSeo.findIndex(p => p.slug === req.params.slug);
      if (idx > -1) { memoryStorage.pageSeo[idx] = { ...req.body, slug: req.params.slug }; seo = memoryStorage.pageSeo[idx]; }
      else { seo = { ...req.body, slug: req.params.slug, _id: Date.now().toString() }; memoryStorage.pageSeo.push(seo); }
    }
    await logActivity(req.user.username, `Updated SEO for ${req.params.slug}`, 'SEO');
    res.json(seo);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- ACTIVITY LOGS & NOTIFICATIONS ---
app.get('/api/logs', authenticateToken, async (req, res) => {
  if (isDbConnected) res.json(await ActivityLog.find().sort({ createdAt: -1 }).limit(50));
  else res.json(memoryStorage.logs);
});

app.get('/api/notifications', authenticateToken, async (req, res) => {
  if (isDbConnected) res.json(await Notification.find().sort({ createdAt: -1 }).limit(20));
  else res.json(memoryStorage.notifications);
});

app.put('/api/notifications/readall', authenticateToken, async (req, res) => {
  if (isDbConnected) await Notification.updateMany({ isRead: false }, { isRead: true });
  else memoryStorage.notifications.forEach(n => n.isRead = true);
  res.json({ success: true });
});

// --- CAMPUS VISITS API ---
app.post('/api/campus-visits', async (req, res) => {
  try {
    const data = req.body;
    let visit;
    if (isDbConnected) {
      visit = await new CampusVisit(data).save();
    } else {
      visit = { _id: Date.now().toString(), ...data, leadSource: 'Campus Visit Popup', status: 'New Lead', createdAt: new Date() };
      memoryStorage.campusVisits.unshift(visit);
    }
    await createNotification('New Campus Visit Lead', `Campus visit lead received from ${data.parentName} for ${new Date(data.visitDate).toLocaleDateString()}`, 'Admissions');
    res.status(201).json({ success: true, data: visit });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/campus-visits', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) res.json(await CampusVisit.find().sort({ createdAt: -1 }));
    else res.json(memoryStorage.campusVisits);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/campus-visits/:id/status', authenticateToken, async (req, res) => {
  const { status } = req.body;
  try {
    let updated;
    if (isDbConnected) {
      updated = await CampusVisit.findByIdAndUpdate(req.params.id, { status, updatedAt: new Date() }, { new: true });
    } else {
      const idx = memoryStorage.campusVisits.findIndex(v => v._id === req.params.id);
      if (idx !== -1) {
        memoryStorage.campusVisits[idx] = { ...memoryStorage.campusVisits[idx], status, updatedAt: new Date() };
        updated = memoryStorage.campusVisits[idx];
      }
    }
    await logActivity(req.user.username, `Updated Campus Visit Status to ${status}`, 'Admissions');
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/campus-visits/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) {
      await CampusVisit.findByIdAndDelete(req.params.id);
    } else {
      memoryStorage.campusVisits = memoryStorage.campusVisits.filter(v => v._id !== req.params.id);
    }
    await logActivity(req.user.username, 'Deleted Campus Visit Request', 'Admissions');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- NOTICES API ---
app.get('/api/notices', async (req, res) => {
  try {
    if (isDbConnected) res.json(await Notice.find().sort({ date: -1 }).limit(10));
    else res.json(memoryStorage.notices);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/notices', authenticateToken, async (req, res) => {
  try {
    let saved;
    if (isDbConnected) {
      saved = await new Notice(req.body).save();
    } else {
      saved = { _id: Date.now().toString(), ...req.body, date: req.body.date || new Date() };
      memoryStorage.notices.unshift(saved);
    }
    await logActivity(req.user.username, 'Created a Notice', 'News & Alerts', req.body.title);
    res.status(201).json(saved);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/notices/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) await Notice.findByIdAndDelete(req.params.id);
    else memoryStorage.notices = memoryStorage.notices.filter(n => n._id !== req.params.id);
    await logActivity(req.user.username, 'Deleted a Notice', 'News & Alerts');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/notices/:id', authenticateToken, async (req, res) => {
  try {
    let updated;
    if (isDbConnected) {
      updated = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } else {
      const idx = memoryStorage.notices.findIndex(n => n._id === req.params.id);
      if (idx > -1) {
        memoryStorage.notices[idx] = { ...memoryStorage.notices[idx], ...req.body };
        updated = memoryStorage.notices[idx];
      }
    }
    await logActivity(req.user.username, 'Updated a Notice', 'News & Alerts', req.body.title);
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- EVENTS API ---
app.get('/api/events', async (req, res) => {
  try {
    if (isDbConnected) res.json(await Event.find().sort({ start: 1 }).limit(20));
    else res.json(memoryStorage.events);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/events', authenticateToken, async (req, res) => {
  try {
    let saved;
    if (isDbConnected) {
      saved = await new Event(req.body).save();
    } else {
      saved = { _id: Date.now().toString(), ...req.body };
      memoryStorage.events.unshift(saved);
    }
    await logActivity(req.user.username, 'Created an Event', 'Events', req.body.title);
    res.status(201).json(saved);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) await Event.findByIdAndDelete(req.params.id);
    else memoryStorage.events = memoryStorage.events.filter(e => e._id !== req.params.id);
    await logActivity(req.user.username, 'Deleted an Event', 'Events');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/events/:id', authenticateToken, async (req, res) => {
  try {
    let updated;
    if (isDbConnected) {
      updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } else {
      const idx = memoryStorage.events.findIndex(e => e._id === req.params.id);
      if (idx > -1) {
        memoryStorage.events[idx] = { ...memoryStorage.events[idx], ...req.body };
        updated = memoryStorage.events[idx];
      }
    }
    await logActivity(req.user.username, 'Updated an Event', 'Events', req.body.title);
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- UPLOAD API ---
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- SYLLABUS API ---
app.get('/api/syllabus', async (req, res) => {
  try {
    if (isDbConnected) res.json(await Syllabus.find().sort({ gradeLevel: 1, createdAt: -1 }));
    else res.json(memoryStorage.syllabus || []);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/syllabus', authenticateToken, upload.single('pdfFile'), async (req, res) => {
  try {
    const syllabusData = {
      title: req.body.title,
      gradeLevel: req.body.gradeLevel,
      status: req.body.status || 'Published'
    };

    if (req.file) {
      syllabusData.pdfUrl = `/uploads/${req.file.filename}`;
      syllabusData.fileSize = req.file.size;
    } else if (!req.body.pdfUrl) {
      return res.status(400).json({ message: 'PDF file is required' });
    } else {
      syllabusData.pdfUrl = req.body.pdfUrl; // Allow passing URL directly
    }

    let saved;
    if (isDbConnected) {
      saved = await new Syllabus(syllabusData).save();
    } else {
      saved = { _id: Date.now().toString(), createdAt: new Date(), ...syllabusData };
      memoryStorage.syllabus.unshift(saved);
    }
    await logActivity(req.user.username, 'Added a Syllabus', 'Syllabus', syllabusData.title);
    res.status(201).json(saved);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/syllabus/:id', authenticateToken, upload.single('pdfFile'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      gradeLevel: req.body.gradeLevel,
      status: req.body.status,
      updatedAt: new Date()
    };

    if (req.file) {
      updateData.pdfUrl = `/uploads/${req.file.filename}`;
      updateData.fileSize = req.file.size;
    }

    let updated;
    if (isDbConnected) {
      updated = await Syllabus.findByIdAndUpdate(req.params.id, updateData, { new: true });
    } else {
      const idx = memoryStorage.syllabus.findIndex(s => s._id === req.params.id);
      if (idx > -1) {
        memoryStorage.syllabus[idx] = { ...memoryStorage.syllabus[idx], ...updateData };
        updated = memoryStorage.syllabus[idx];
      }
    }
    await logActivity(req.user.username, 'Updated a Syllabus', 'Syllabus', updateData.title);
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/syllabus/:id', authenticateToken, async (req, res) => {
  try {
    let deleted;
    if (isDbConnected) {
      deleted = await Syllabus.findByIdAndDelete(req.params.id);
    } else {
      const idx = memoryStorage.syllabus.findIndex(s => s._id === req.params.id);
      if (idx > -1) {
        deleted = memoryStorage.syllabus[idx];
        memoryStorage.syllabus.splice(idx, 1);
      }
    }
    if (deleted) {
      await logActivity(req.user.username, 'Deleted a Syllabus', 'Syllabus', deleted.title);
    }
    res.json({ message: 'Syllabus deleted successfully' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- FACULTY API ---
app.get('/api/faculty', async (req, res) => {
  try {
    if (isDbConnected) res.json(await Staff.find().sort({ createdAt: -1 }));
    else res.json(memoryStorage.faculty || []);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/faculty', authenticateToken, async (req, res) => {
  try {
    let saved;
    if (isDbConnected) {
      saved = await new Staff(req.body).save();
    } else {
      saved = { _id: Date.now().toString(), ...req.body };
      if (!memoryStorage.faculty) memoryStorage.faculty = [];
      memoryStorage.faculty.unshift(saved);
    }
    await logActivity(req.user.username, 'Added Faculty Member', 'Faculty', req.body.name);
    res.status(201).json(saved);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/faculty/:id', authenticateToken, async (req, res) => {
  try {
    let updated;
    if (isDbConnected) {
      updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } else {
      if (!memoryStorage.faculty) memoryStorage.faculty = [];
      const idx = memoryStorage.faculty.findIndex(f => f._id === req.params.id);
      if (idx > -1) {
        memoryStorage.faculty[idx] = { ...memoryStorage.faculty[idx], ...req.body };
        updated = memoryStorage.faculty[idx];
      }
    }
    await logActivity(req.user.username, 'Updated Faculty Member', 'Faculty', req.body.name);
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/faculty/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) await Staff.findByIdAndDelete(req.params.id);
    else if (memoryStorage.faculty) memoryStorage.faculty = memoryStorage.faculty.filter(f => f._id !== req.params.id);
    await logActivity(req.user.username, 'Deleted Faculty Member', 'Faculty');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- GALLERY API ---
app.get('/api/gallery/stats', authenticateToken, async (req, res) => {
  try {
    let totalMedia = 0, totalImages = 0, totalVideos = 0, featuredMedia = 0, storageUsage = 0;
    if (isDbConnected) {
      const items = await Gallery.find();
      totalMedia = items.length;
      totalImages = items.filter(i => i.type === 'image').length;
      totalVideos = items.filter(i => i.type === 'video' || i.type === 'youtube').length;
      featuredMedia = items.filter(i => i.isFeatured).length;
      storageUsage = items.reduce((sum, i) => sum + (i.fileSize || 0), 0);
    } else {
      totalMedia = memoryStorage.gallery.length;
      totalImages = memoryStorage.gallery.filter(i => i.type === 'image').length;
      totalVideos = memoryStorage.gallery.filter(i => i.type === 'video' || i.type === 'youtube').length;
      featuredMedia = memoryStorage.gallery.filter(i => i.isFeatured).length;
      storageUsage = memoryStorage.gallery.reduce((sum, i) => sum + (i.fileSize || 0), 0);
    }
    res.json({ totalMedia, totalImages, totalVideos, featuredMedia, storageUsage });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const { search, category, type, status } = req.query;
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category && category !== 'All') query.category = category;
    if (type && type !== 'All') {
      if (type === 'all_videos') query.type = { $in: ['video', 'youtube'] };
      else query.type = type;
    }
    if (status && status !== 'All') query.status = status;

    if (isDbConnected) res.json(await Gallery.find(query).sort({ createdAt: -1 }));
    else {
      let result = memoryStorage.gallery;
      if (search) result = result.filter(g => g.title?.toLowerCase().includes(search.toLowerCase()));
      if (category && category !== 'All') result = result.filter(g => g.category === category);
      if (type && type !== 'All') {
        if (type === 'all_videos') result = result.filter(g => g.type === 'video' || g.type === 'youtube');
        else result = result.filter(g => g.type === type);
      }
      if (status && status !== 'All') result = result.filter(g => g.status === status);
      res.json(result);
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/gallery', authenticateToken, upload.single('mediaFile'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
      data.fileSize = req.file.size;
    }
    // Handle booleans
    if (data.isFeatured === 'true' || data.isFeatured === true) data.isFeatured = true;
    else data.isFeatured = false;

    let saved;
    if (isDbConnected) {
      saved = await new Gallery(data).save();
    } else {
      saved = { _id: Date.now().toString(), ...data, createdAt: new Date() };
      memoryStorage.gallery.unshift(saved);
    }
    await logActivity(req.user.username, 'Uploaded Gallery Media', 'Gallery', data.title || 'No Title');
    res.status(201).json(saved);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/gallery/bulk', authenticateToken, async (req, res) => {
  try {
    const { ids, action, value } = req.body; // action: 'delete', 'hide', 'show', 'category', 'featured'
    if (isDbConnected) {
      if (action === 'delete') {
        // Also remove files from fs if local
        const items = await Gallery.find({ _id: { $in: ids } });
        items.forEach(item => {
          if (item.imageUrl && item.imageUrl.startsWith('/uploads/')) {
            const fp = path.join(__dirname, 'public', item.imageUrl);
            if (fs.existsSync(fp)) fs.unlinkSync(fp);
          }
        });
        await Gallery.deleteMany({ _id: { $in: ids } });
      } else if (action === 'hide') {
        await Gallery.updateMany({ _id: { $in: ids } }, { status: 'Hidden' });
      } else if (action === 'show') {
        await Gallery.updateMany({ _id: { $in: ids } }, { status: 'Active' });
      } else if (action === 'category') {
        await Gallery.updateMany({ _id: { $in: ids } }, { category: value });
      } else if (action === 'featured') {
        await Gallery.updateMany({ _id: { $in: ids } }, { isFeatured: value });
      }
    } else {
      if (action === 'delete') {
        memoryStorage.gallery = memoryStorage.gallery.filter(g => !ids.includes(g._id));
      } else {
        memoryStorage.gallery.forEach(g => {
          if (ids.includes(g._id)) {
            if (action === 'hide') g.status = 'Hidden';
            if (action === 'show') g.status = 'Active';
            if (action === 'category') g.category = value;
            if (action === 'featured') g.isFeatured = value;
          }
        });
      }
    }
    await logActivity(req.user.username, `Bulk Action: ${action}`, 'Gallery', `${ids.length} items affected`);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/gallery/:id', authenticateToken, upload.single('mediaFile'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
      data.fileSize = req.file.size;
    }
    if (data.isFeatured === 'true' || data.isFeatured === true) data.isFeatured = true;
    else data.isFeatured = false;

    let updated;
    if (isDbConnected) {
      updated = await Gallery.findByIdAndUpdate(req.params.id, data, { new: true });
    } else {
      const idx = memoryStorage.gallery.findIndex(g => g._id === req.params.id);
      if (idx > -1) {
        memoryStorage.gallery[idx] = { ...memoryStorage.gallery[idx], ...data };
        updated = memoryStorage.gallery[idx];
      }
    }
    await logActivity(req.user.username, 'Updated a Gallery Item', 'Gallery', data.title || 'No Title');
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/gallery/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) {
      const item = await Gallery.findById(req.params.id);
      if (item && item.imageUrl && item.imageUrl.startsWith('/uploads/')) {
        const fp = path.join(__dirname, 'public', item.imageUrl);
        if (fs.existsSync(fp)) fs.unlinkSync(fp);
      }
      await Gallery.findByIdAndDelete(req.params.id);
    } else {
      memoryStorage.gallery = memoryStorage.gallery.filter(g => g._id !== req.params.id);
    }
    await logActivity(req.user.username, 'Deleted a Photo', 'Gallery');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- STUDENT LIFE API ROUTES ---

// TOPPERS
app.get('/api/student-life/toppers', async (req, res) => {
  try {
    const data = isDbConnected ? await StudentLifeTopper.find().sort({ displayOrder: 1, createdAt: -1 }) : memoryStorage.studentLifeToppers;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/student-life/toppers', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const newTopperData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };
    let savedData;
    if (isDbConnected) {
      savedData = await new StudentLifeTopper(newTopperData).save();
    } else {
      savedData = { _id: Date.now().toString(), ...newTopperData, createdAt: new Date() };
      memoryStorage.studentLifeToppers.push(savedData);
    }
    await logActivity(req.user.username, 'Added a Topper', 'Student Life');
    res.json(savedData);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/student-life/toppers/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    if (isDbConnected) {
      await StudentLifeTopper.findByIdAndUpdate(req.params.id, updateData);
    } else {
      const idx = memoryStorage.studentLifeToppers.findIndex(t => t._id === req.params.id);
      if (idx !== -1) memoryStorage.studentLifeToppers[idx] = { ...memoryStorage.studentLifeToppers[idx], ...updateData };
    }
    await logActivity(req.user.username, 'Updated a Topper', 'Student Life');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/student-life/toppers/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) {
      await StudentLifeTopper.findByIdAndDelete(req.params.id);
    } else {
      memoryStorage.studentLifeToppers = memoryStorage.studentLifeToppers.filter(t => t._id !== req.params.id);
    }
    await logActivity(req.user.username, 'Deleted a Topper', 'Student Life');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ACHIEVEMENTS
app.get('/api/student-life/achievements', async (req, res) => {
  try {
    const data = isDbConnected ? await StudentLifeAchievement.find().sort({ displayOrder: 1, createdAt: -1 }) : memoryStorage.studentLifeAchievements;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/student-life/achievements', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const newData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    };
    let savedData;
    if (isDbConnected) {
      savedData = await new StudentLifeAchievement(newData).save();
    } else {
      savedData = { _id: Date.now().toString(), ...newData, createdAt: new Date() };
      memoryStorage.studentLifeAchievements.push(savedData);
    }
    await logActivity(req.user.username, 'Added an Achievement', 'Student Life');
    res.json(savedData);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/student-life/achievements/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    if (isDbConnected) {
      await StudentLifeAchievement.findByIdAndUpdate(req.params.id, updateData);
    } else {
      const idx = memoryStorage.studentLifeAchievements.findIndex(t => t._id === req.params.id);
      if (idx !== -1) memoryStorage.studentLifeAchievements[idx] = { ...memoryStorage.studentLifeAchievements[idx], ...updateData };
    }
    await logActivity(req.user.username, 'Updated an Achievement', 'Student Life');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/student-life/achievements/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) {
      await StudentLifeAchievement.findByIdAndDelete(req.params.id);
    } else {
      memoryStorage.studentLifeAchievements = memoryStorage.studentLifeAchievements.filter(t => t._id !== req.params.id);
    }
    await logActivity(req.user.username, 'Deleted an Achievement', 'Student Life');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GALLERY
app.get('/api/student-life/gallery', async (req, res) => {
  try {
    const data = isDbConnected ? await StudentLifeGallery.find().sort({ displayOrder: 1, createdAt: -1 }) : memoryStorage.studentLifeGallery;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.post('/api/student-life/gallery', authenticateToken, upload.single('media'), async (req, res) => {
  try {
    let mediaUrl = null;
    let mediaType = 'image';
    if (req.file) {
      mediaUrl = `/uploads/${req.file.filename}`;
      if (req.file.mimetype.startsWith('video/')) mediaType = 'video';
    }

    const newData = {
      ...req.body,
      mediaUrl: mediaUrl || req.body.mediaUrl, // fallback to provided URL if no file uploaded
      mediaType: req.body.mediaType || mediaType
    };

    let savedData;
    if (isDbConnected) {
      savedData = await new StudentLifeGallery(newData).save();
    } else {
      savedData = { _id: Date.now().toString(), ...newData, createdAt: new Date() };
      memoryStorage.studentLifeGallery.push(savedData);
    }
    await logActivity(req.user.username, 'Added a Gallery Item', 'Student Life');
    res.json(savedData);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.put('/api/student-life/gallery/:id', authenticateToken, upload.single('media'), async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    if (req.file) {
      updateData.mediaUrl = `/uploads/${req.file.filename}`;
      if (req.file.mimetype.startsWith('video/')) updateData.mediaType = 'video';
      else updateData.mediaType = 'image';
    }

    if (isDbConnected) {
      await StudentLifeGallery.findByIdAndUpdate(req.params.id, updateData);
    } else {
      const idx = memoryStorage.studentLifeGallery.findIndex(t => t._id === req.params.id);
      if (idx !== -1) memoryStorage.studentLifeGallery[idx] = { ...memoryStorage.studentLifeGallery[idx], ...updateData };
    }
    await logActivity(req.user.username, 'Updated a Gallery Item', 'Student Life');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

app.delete('/api/student-life/gallery/:id', authenticateToken, async (req, res) => {
  try {
    if (isDbConnected) {
      await StudentLifeGallery.findByIdAndDelete(req.params.id);
    } else {
      memoryStorage.studentLifeGallery = memoryStorage.studentLifeGallery.filter(t => t._id !== req.params.id);
    }
    await logActivity(req.user.username, 'Deleted a Gallery Item', 'Student Life');
    res.json({ success: true });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// --- SITEMAP.XML GENERATOR ---
app.get('/sitemap.xml', async (req, res) => {
  try {
    const settings = isDbConnected ? await Settings.findOne() : memoryStorage.settings;
    const domain = settings?.canonicalDomain || 'https://villzone.edu.in';

    // Core pages
    const pages = ['/', '/about', '/academics', '/admissions', '/facilities', '/contact'];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    pages.forEach(p => {
      xml += `  <url>\n    <loc>${domain}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    res.header('Content-Type', 'application/xml');
    res.send(xml + '</urlset>');
  } catch (err) { res.status(500).send('Error generating sitemap'); }
});

app.get('/robots.txt', async (req, res) => {
  const settings = isDbConnected ? await Settings.findOne() : memoryStorage.settings;
  const domain = settings?.canonicalDomain || 'https://villzone.edu.in';
  res.type('text/plain');
  res.send(`User-agent: *\nDisallow: /admin\nAllow: /\n\nSitemap: ${domain}/sitemap.xml`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});