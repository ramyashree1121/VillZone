import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = "mongodb://shreeramya1121_db_user:villzone123@ac-zuweqyp-shard-00-00.knnwxw7.mongodb.net:27017,ac-zuweqyp-shard-00-01.knnwxw7.mongodb.net:27017,ac-zuweqyp-shard-00-02.knnwxw7.mongodb.net:27017/?ssl=true&replicaSet=atlas-g0h263-shard-0&authSource=admin&appName=Cluster0";

const schema = new mongoose.Schema({ title: String, description: String, displayOrder: Number, status: { type: String, default: 'Active'} });
const CurriculumBoard = mongoose.model('CurriculumBoard', schema);

const fSchema = new mongoose.Schema({ title: String, description: String, displayOrder: Number, status: { type: String, default: 'Active'} });
const CurriculumFeature = mongoose.model('CurriculumFeature', fSchema);

const cSchema = new mongoose.Schema({ idName: String, tabLabel: String, tags: String, title: String, description: String, subjects: [String], displayOrder: Number, status: { type: String, default: 'Active'} });
const CurriculumCategory = mongoose.model('CurriculumCategory', cSchema);

async function run() {
  await mongoose.connect(uri);
  const count = await CurriculumBoard.countDocuments();
  console.log('Boards count:', count);
  if (count === 0) {
    await CurriculumBoard.insertMany([
      { title: 'CBSE', description: 'Central Board of Secondary Education', displayOrder: 1 },
      { title: 'State Board', description: 'Tamil Nadu State Board Curriculum', displayOrder: 2 }
    ]);
    console.log('Boards inserted');
  }

  const countF = await CurriculumFeature.countDocuments();
  console.log('Features count:', countF);
  if (countF === 0) {
    await CurriculumFeature.insertMany([
        { title: 'Activity-Based Learning', description: '', displayOrder: 1 },
        { title: 'Experiential Learning', description: '', displayOrder: 2 },
        { title: 'Project-Based Learning', description: '', displayOrder: 3 },
        { title: 'Smart Classroom Learning', description: '', displayOrder: 4 },
        { title: 'Digital Learning Resources', description: '', displayOrder: 5 },
        { title: 'Collaborative Learning', description: '', displayOrder: 6 },
        { title: 'Continuous Assessment', description: '', displayOrder: 7 },
        { title: 'Value-Based Education', description: '', displayOrder: 8 }
      ]);
    console.log('Features inserted');
  }

  const countC = await CurriculumCategory.countDocuments();
  console.log('Categories count:', countC);
  if (countC === 0) {
    await CurriculumCategory.insertMany([
        { idName: 'Kindergarten', tabLabel: 'Kindergarten', tags: 'PRE-KG, LKG, UKG', title: 'Academic Objectives & Focus', description: 'Foundational literacy, motor skill cultivation, social values, and play-way interactive modules.', subjects: ['Phonics & English Reading', 'Basic Mathematics & Counting', 'EVS & Nature Studies', 'Storytelling, Music & Art', 'Fine Motor Activities'], displayOrder: 1 },
        { idName: 'Primary', tabLabel: 'Primary', tags: 'GRADES 1-5', title: 'Academic Objectives & Focus', description: 'Building strong foundations in literacy, numeracy, and environmental awareness while fostering creativity and critical thinking.', subjects: ['English Language Arts', 'Mathematics Foundation', 'Environmental Studies (EVS)', 'Basic Computer Science', 'Value Education', 'Physical Education'], displayOrder: 2 },
        { idName: 'Middle', tabLabel: 'Middle', tags: 'GRADES 6-8', title: 'Academic Objectives & Focus', description: 'Developing conceptual understanding, scientific inquiry, analytical skills, and holistic personal growth.', subjects: ['Languages (English, Regional)', 'Advanced Mathematics', 'Integrated Sciences', 'Social Sciences', 'Information Technology', 'Art & Physical Education'], displayOrder: 3 },
        { idName: 'HighSchool', tabLabel: 'HighSchool', tags: 'GRADES 9-10', title: 'Academic Objectives & Focus', description: 'Comprehensive preparation for board examinations with a focus on deep subject knowledge and career awareness.', subjects: ['English Language & Literature', 'Second Language Options', 'Mathematics', 'Science', 'Social Science', 'Artificial Intelligence / IT'], displayOrder: 4 },
        { idName: 'HigherSecondary', tabLabel: 'HigherSecondary', tags: 'GRADES 11-12', title: 'Academic Objectives & Focus', description: 'Specialized stream-based education preparing students for higher education and professional career pathways.', subjects: ['Science (Physics/Chem/Maths/Bio)', 'Commerce (Accounts/Business/Econ)', 'Humanities & Social Sciences', 'Computer Science', 'Core English', 'Skill Electives'], displayOrder: 5 }
      ]);
    console.log('Categories inserted');
  }

  process.exit(0);
}
run();
