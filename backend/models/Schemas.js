import mongoose from 'mongoose';

// Leadership Schema
const leadershipSchema = new mongoose.Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
  qualification: { type: String },
  image: { type: String },
  message: { type: String },
  email: { type: String },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

// User Schema (Admin Roles)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In production, use bcrypt
  name: { type: String, required: true },
  role: { type: String, enum: ['Super Admin', 'Content Manager', 'Admission Officer'], default: 'Content Manager' },
  createdAt: { type: Date, default: Date.now }
});

// Admission Schema
const admissionSchema = new mongoose.Schema({
  applicationNumber: { type: String, unique: true, required: true },
  studentName: { type: String, required: true },
  dateOfBirth: { type: String },
  gender: { type: String },
  classApplyingFor: { type: String, required: true },
  academicSession: { type: String, default: '2026-27' },
  bloodGroup: { type: String },
  nationality: { type: String, default: 'Indian' },
  religion: { type: String },
  motherTongue: { type: String },
  aadhaarNumber: { type: String },
  specialNeeds: { type: String },
  
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String },
  fatherQualification: { type: String },
  fatherMobile: { type: String, required: true },
  fatherEmail: { type: String, required: true },
  
  motherName: { type: String, required: true },
  motherOccupation: { type: String },
  motherQualification: { type: String },
  motherMobile: { type: String },
  motherEmail: { type: String },
  
  preferredCommunication: { type: String, default: 'WhatsApp' },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, default: 'Tamil Nadu' },
  country: { type: String, default: 'India' },
  pincode: { type: String, required: true },
  
  transportRequired: { type: Boolean, default: false },
  transportRoute: { type: String },
  
  previousSchool: { type: String },
  previousBoard: { type: String },
  previousGrade: { type: String },
  previousPerformance: { type: String },
  reasonForTransfer: { type: String },
  
  studentPhoto: { type: String },
  birthCertificate: { type: String },
  aadhaarCard: { type: String },
  transferCertificate: { type: String },
  previousMarksheet: { type: String },
  medicalRecords: { type: String },

  status: { type: String, enum: ['New', 'Verified', 'Under Review', 'Contacted', 'Documents Pending', 'Approved', 'Confirmed', 'Rejected'], default: 'New' },
  adminRemarks: { type: String },
  rejectionReason: { type: String },
  statusHistory: [{
    previousStatus: String,
    newStatus: String,
    adminName: String,
    remarks: String,
    date: { type: Date, default: Date.now }
  }],
  admissionReferenceNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Leads (Website Inquiries) Schema
const leadSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  studentName: { type: String },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  interestedClass: { type: String },
  leadSource: { type: String, default: 'Website' },
  subject: { type: String },
  message: { type: String },
  status: { type: String, enum: ['New', 'Read', 'Archived'], default: 'New' },
  notes: { type: String },
  followUpDate: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// AI Lead Schema
const aiLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  questionAsked: { type: String },
  conversationHistory: { type: Array, default: [] },
  leadSource: { type: String, default: 'AI Assistant' },
  status: { type: String, enum: ['New', 'Followed Up', 'Converted', 'Archived'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

// Notice Schema (School Announcements)
const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, default: 'General' },
  isImportant: { type: Boolean, default: false },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  seoTitle: { type: String },
  metaDescription: { type: String }
});

// Event Schema (School Calendar)
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date },
  venue: { type: String },
  imageUrl: { type: String },
  type: { type: String, default: 'Event' },
  color: { type: String, default: '#0A3D62' },
  isFeatured: { type: Boolean, default: false },
  seoTitle: { type: String },
  metaDescription: { type: String }
});

// Gallery Schema
const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'Campus' }, // Campus, Sports, Science, Cultural, Classroom, Facilities, Events
  type: { type: String, enum: ['image', 'video', 'youtube'], default: 'image' },
  status: { type: String, enum: ['Active', 'Hidden'], default: 'Active' },
  isFeatured: { type: Boolean, default: false },
  seoTitle: { type: String },
  metaDescription: { type: String },
  altText: { type: String },
  fileSize: { type: Number, default: 0 }, // in bytes
  createdAt: { type: Date, default: Date.now }
});

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // Parent, Student, Alumni
  content: { type: String, required: true },
  photoUrl: { type: String },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Faculty/Staff Schema
const staffSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  dept: { type: String, required: true },
  qualification: { type: String },
  exp: { type: String },
  email: { type: String },
  image: { type: String },
  message: { type: String }, // For Management Team quotes
  createdAt: { type: Date, default: Date.now }
});

// Activity Log Schema
const activityLogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  action: { type: String, required: true },
  module: { type: String, required: true },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  module: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Page SEO Schema (For URL specific SEO overrides)
const pageSEOSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // e.g. /about-us
  seoTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: { type: String },
  canonicalUrl: { type: String },
  ogTitle: { type: String },
  ogDescription: { type: String },
  ogImage: { type: String },
  twitterImage: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

// Settings & Global SEO Schema
const settingsSchema = new mongoose.Schema({
  // General Info
  academicYear: { type: String, default: '2026-27' },
  schoolLogoUrl: { type: String, default: '' },
  schoolPhone: { type: String, default: '+91 8220524146' },
  schoolEmail: { type: String, default: 'admissions@villzone.edu.in' },
  schoolAddress: { type: String, default: 'VillZone Area, Tiruvannamalai, Tamil Nadu - 606601' },
  
  // Principal Info
  principalName: { type: String, default: 'Dr. K. Raghavan, M.Sc., Ph.D.' },
  principalMessage: { type: String, default: 'Welcome to VillZone International School.' },
  principalPhotoUrl: { type: String, default: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600' },
  
  // Social Links
  facebookUrl: { type: String, default: 'https://facebook.com/villzone' },
  instagramUrl: { type: String, default: 'https://instagram.com/villzone' },
  youtubeUrl: { type: String, default: 'https://youtube.com/villzone' },
  
  // Homepage Content Sections
  heroTitle1: { type: String, default: 'Empowering Future Leaders' },
  heroDesc1: { type: String, default: 'CBSE & State Board Education from Pre-KG to Grade 12' },
  heroImg1: { type: String, default: 'https://images.unsplash.com/photo-1544717302-de2904281a85?auto=format&fit=crop&q=80&w=1920' },
  heroTitle2: { type: String, default: 'State-of-the-Art Smart Labs' },
  heroDesc2: { type: String, default: 'Concept-based visual learning & hands-on experimentations' },
  heroImg2: { type: String, default: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1920' },
  heroTitle3: { type: String, default: 'Holistic Co-curricular Focus' },
  heroDesc3: { type: String, default: 'Sports, Dance, Music, Yoga & Professional Olympiad Mentorships' },
  heroImg3: { type: String, default: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920' },

  // Global SEO Settings
  websiteTitle: { type: String, default: 'VillZone International School' },
  websiteTagline: { type: String, default: 'Excellence in Education' },
  defaultMetaTitle: { type: String, default: 'VillZone International School | Top CBSE School in Tiruvannamalai' },
  defaultMetaDescription: { type: String, default: 'VillZone International School offers world-class CBSE education in Tiruvannamalai with smart classrooms, sports facilities, and holistic development.' },
  defaultKeywords: { type: String, default: 'VillZone, International School, CBSE, Tiruvannamalai, Education' },
  canonicalDomain: { type: String, default: 'https://villzone.edu.in' },
  seoLogoUrl: { type: String, default: '' },
  defaultSocialImage: { type: String, default: '' },
  googleVerificationCode: { type: String, default: '' },
  bingVerificationCode: { type: String, default: '' },
  metaPixelCode: { type: String, default: '' },
  googleAnalyticsId: { type: String, default: '' }
});

// Campus Visit Schema
const campusVisitSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailAddress: { type: String },
  visitDate: { type: Date, required: true },
  message: { type: String },
  leadSource: { type: String, default: 'Campus Visit Popup' },
  status: { type: String, enum: ['Pending', 'Scheduled', 'Completed', 'Cancelled', 'No Show', 'New Lead', 'Contacted', 'Follow Up', 'Qualified', 'Confirmed Visit', 'Admission Applied', 'Converted', 'Closed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Syllabus Schema
const syllabusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
  fileSize: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Student Life - Toppers
const studentLifeTopperSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  score: { type: String, required: true }, // e.g. "98.6%"
  academicYear: { type: String },
  achievementDesc: { type: String },
  imageUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Student Life - Achievements
const studentLifeAchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  studentName: { type: String },
  category: { type: String, required: true }, // Academic, Sports, Cultural, Competition, Olympiad, Other
  description: { type: String },
  badge: { type: String }, // e.g. "State Rank"
  date: { type: Date },
  imageUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Student Life - Gallery
const studentLifeGallerySchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  category: { type: String }, // Classroom Activities, Sports Events, etc.
  eventName: { type: String },
  eventDate: { type: Date },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Curriculum - Boards
const curriculumBoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  displayOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Curriculum - Features
const curriculumFeatureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String }, // optional, for frontend to map to lucide icons if needed
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  displayOrder: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Curriculum - Category (Classes, Objectives, Subjects)
const curriculumCategorySchema = new mongoose.Schema({
  idName: { type: String, required: true, unique: true }, // e.g. 'Kindergarten'
  tabLabel: { type: String, required: true }, // e.g. 'Kindergarten'
  tags: { type: String }, // e.g. 'PRE-KG, LKG, UKG'
  title: { type: String, required: true }, // e.g. 'Academic Objectives & Focus'
  description: { type: String }, // e.g. 'Foundational literacy...'
  subjects: [{ type: String }], // e.g. ['Phonics & English Reading', 'Basic Mathematics...']
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Uniform Guidelines Schema
const uniformGuidelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Awards & Honours Schema
const awardHonorSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. 'Academic', 'Sports', 'Institutional'
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String }, // name of the lucide icon, e.g., 'Trophy', 'Award'
  imageUrl: { type: String },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
export const Admission = mongoose.model('Admission', admissionSchema);
export const Lead = mongoose.model('Lead', leadSchema);
export const Notice = mongoose.model('Notice', noticeSchema);
export const Event = mongoose.model('Event', eventSchema);
export const Gallery = mongoose.model('Gallery', gallerySchema);
export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export const Staff = mongoose.model('Staff', staffSchema);
export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export const Notification = mongoose.model('Notification', notificationSchema);
export const PageSEO = mongoose.model('PageSEO', pageSEOSchema);
export const Settings = mongoose.model('Settings', settingsSchema);
export const CampusVisit = mongoose.model('CampusVisit', campusVisitSchema);
export const AILead = mongoose.model('AILead', aiLeadSchema);
export const Syllabus = mongoose.model('Syllabus', syllabusSchema);
export const StudentLifeTopper = mongoose.model('StudentLifeTopper', studentLifeTopperSchema);
export const StudentLifeAchievement = mongoose.model('StudentLifeAchievement', studentLifeAchievementSchema);
export const StudentLifeGallery = mongoose.model('StudentLifeGallery', studentLifeGallerySchema);
export const CurriculumBoard = mongoose.model('CurriculumBoard', curriculumBoardSchema);
export const CurriculumFeature = mongoose.model('CurriculumFeature', curriculumFeatureSchema);
export const CurriculumCategory = mongoose.model('CurriculumCategory', curriculumCategorySchema);
export const UniformGuideline = mongoose.model('UniformGuideline', uniformGuidelineSchema);
export const AwardHonor = mongoose.model('AwardHonor', awardHonorSchema);
export const Leadership = mongoose.model('Leadership', leadershipSchema);
