import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Staff } from './models/Schemas.js';

dotenv.config();

const mockFaculty = [
  { employeeId: 'EMP001', name: 'Dr. Vikram A. Dev', role: 'Correspondent', dept: 'Administration', qualification: 'Ph.D. (IIT-M)', exp: '20+ Yrs', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300', email: 'vikram.dev@villzoneschool.edu.in' },
  { employeeId: 'EMP002', name: 'Mrs. Shalini Prasad', role: 'Principal', dept: 'Administration', qualification: 'M.Sc., M.Ed.', exp: '18 Yrs', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300', email: 'shalini.prasad@villzoneschool.edu.in' },
  { employeeId: 'EMP003', name: 'Mr. Rajesh K. Varma', role: 'PGT Senior Coordinator', dept: 'Mathematics', qualification: 'M.Sc. Mathematics, B.Ed.', exp: '15 Yrs', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', email: 'rajesh.varma@villzoneschool.edu.in' },
  { employeeId: 'EMP004', name: 'Dr. Anjali Sen', role: 'PGT Physics', dept: 'Science', qualification: 'Ph.D. Physics', exp: '12 Yrs', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', email: 'anjali.sen@villzoneschool.edu.in' },
  { employeeId: 'EMP005', name: 'Mr. David Abraham', role: 'PGT Computer Science', dept: 'Computer Science', qualification: 'MCA, B.Ed.', exp: '10 Yrs', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300', email: 'david.abraham@villzoneschool.edu.in' },
  { employeeId: 'EMP006', name: 'Mrs. Kavitha Murugan', role: 'TGT Tamil Coordinator', dept: 'Languages', qualification: 'M.A. Tamil, M.Phil', exp: '14 Yrs', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300', email: 'kavitha.murugan@villzoneschool.edu.in' },
  { employeeId: 'EMP007', name: 'Mrs. Sarah Fernandez', role: 'PGT English Literature', dept: 'Languages', qualification: 'M.A. English, B.Ed.', exp: '9 Yrs', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300', email: 'sarah.fernandez@villzoneschool.edu.in' },
  { employeeId: 'EMP008', name: 'Mr. Amit Kumar Jha', role: 'PGT Chemistry', dept: 'Science', qualification: 'M.Sc. Chemistry, B.Ed.', exp: '11 Yrs', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300', email: 'amit.jha@villzoneschool.edu.in' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    await Staff.deleteMany({});
    await Staff.insertMany(mockFaculty);
    console.log(`Seeded ${mockFaculty.length} faculty items!`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

seed();
