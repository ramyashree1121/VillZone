import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, ArrowLeft, ShieldCheck } from 'lucide-react';

const DOC_DATA = {
  'cbse-affiliation': {
    title: 'CBSE Affiliation Letter (Extension)',
    subtitle: 'CENTRAL BOARD OF SECONDARY EDUCATION',
    authority: 'Shiksha Kendra, 2, Community Centre, Preet Vihar, Delhi-110092',
    certNo: 'CBSE/AFF/1930225/EX-00299-2627/2026',
    date: 'April 15, 2026',
    recipient: 'The Manager,\nVillZone International School,\nKilpennathur, Tiruvannamalai,\nTamil Nadu - 606601.',
    subject: 'Extension of General Affiliation up to Secondary/Senior Secondary Level - Reg.',
    content: [
      'With reference to your application on the subject cited above; I am directed to convey the approval for Extension of General Affiliation as per details given below:',
      'Affiliation No: 1930225',
      'School Code: 55198',
      'Affiliated for: Secondary & Senior Secondary School Examination Class I to XII',
      'Category: Extension of General Affiliation',
      'Period of Extension: 01.04.2026 to 31.03.2031',
      'The school will follow the syllabus on the basis of curriculum prescribed by NCERT and text books published by NCERT/CBSE for all classes. The school will follow syllabus and courses as per scheme of studies prescribed by the Board for Secondary/Sr. Secondary School Examination and guidelines issued by the Board from time to time.',
      'The school will maintain clean and hygienic environment, adequate drinking water facilities, and proper fire fighting equipment as per local administration rules.'
    ],
    signatory: 'Deputy Secretary (Affiliation)',
    sealText: 'CBSE AFFILIATION DIVISION'
  },
  'noc': {
    title: 'No Objection Certificate (NOC)',
    subtitle: 'DEPARTMENT OF SCHOOL EDUCATION',
    authority: 'Government of Tamil Nadu, Secretariat, Chennai - 600009',
    certNo: 'NOC No. DDIS-2018-88A',
    date: 'October 12, 2018',
    recipient: 'The Correspondent,\nVillZone Educational Trust,\nKilpennathur, Tiruvannamalai District.',
    subject: 'No Objection Certificate for affiliation to CBSE Stream - Reg.',
    content: [
      'The Government of Tamil Nadu has no objection to the VillZone Educational Trust, Kilpennathur, Tiruvannamalai running a school in the name and style of "VillZone International School" for affiliation to the Central Board of Secondary Education (CBSE), New Delhi.',
      'This certificate is granted subject to the condition that the school shall follow all educational norms, rules, and safety regulations prescribed by the state government and the CBSE board from time to time.',
      'The management shall maintain the infrastructure, qualified teachers, playground facilities, and ensure safety measures as per statutory requirements.'
    ],
    signatory: 'Joint Director of School Education (CBSE)',
    sealText: 'SECRETARIAT EDUCATION DEPT'
  },
  'school-recognition': {
    title: 'School Recognition Certificate',
    subtitle: 'OFFICE OF THE DIRECTORATE OF SCHOOL EDUCATION',
    authority: 'College Road, Nungambakkam, Chennai - 600006',
    certNo: 'Recognition No. RC-99-2019',
    date: 'June 05, 2019',
    recipient: 'The Principal,\nVillZone International School,\nKilpennathur, Tiruvannamalai - 606601.',
    subject: 'Grant of Recognition under Right of Children to Free and Compulsory Education Act, 2009.',
    content: [
      'The Competent Authority hereby grants formal Recognition to VillZone International School, Kilpennathur, Tiruvannamalai for Classes I to VIII under Tamil Nadu Right of Children to Free and Compulsory Education Rules, 2011.',
      'The school shall abide by the provisions of Right of Children to Free and Compulsory Education Act, 2009 and the rules framed thereunder.',
      'The Recognition is valid for a period of three years and subject to periodic inspection and compliance with state infrastructural norms.'
    ],
    signatory: 'Chief Educational Officer, Tiruvannamalai',
    sealText: 'CEO OFFICE - TIRUVANNAMALAI'
  },
  'building-safety': {
    title: 'Building Safety Certificate',
    subtitle: 'PUBLIC WORKS DEPARTMENT (BUILDING BRANCH)',
    authority: 'Office of the Executive Engineer, PWD, Tiruvannamalai Division',
    certNo: 'Safety Cert: BSC-2025-01',
    date: 'January 20, 2025',
    recipient: 'VillZone International School,\nOpposite Indian Bank, Kilpennathur,\nTiruvannamalai District.',
    subject: 'Certificate of Structural Soundness of School Building.',
    content: [
      'This is to certify that the school building blocks of VillZone International School located at Kilpennathur, Tiruvannamalai, Tamil Nadu, have been inspected by the PWD panel engineer on 15.01.2025.',
      'The building structural soundness is assessed and found to be structurally fit and safe for running class sessions for students under normal occupancy.',
      'This certificate is valid for a period of three years from the date of issue (up to 19.01.2028).'
    ],
    signatory: 'Executive Engineer, PWD',
    sealText: 'PUBLIC WORKS DEPT - BUILDINGS'
  },
  'fire-safety': {
    title: 'Fire Safety Certificate',
    subtitle: 'TAMIL NADU FIRE AND RESCUE SERVICES DEPARTMENT',
    authority: 'Fire & Rescue Station, Kilpennathur, Tiruvannamalai District',
    certNo: 'Fire Cert: FSC-2026-99',
    date: 'May 02, 2026',
    recipient: 'VillZone International School,\nKilpennathur, Tiruvannamalai - 606601.',
    subject: 'Issue of Fire Safety Certificate / No Objection Certificate.',
    content: [
      'Certified that the VillZone International School building premises comprising Ground Floor and two Upper Floors was inspected by the Fire Safety Officers on 28.04.2026.',
      'All fire prevention and fire safety measures recommended by the department have been successfully installed and verified in working condition.',
      'The premises are fit for educational occupancy and this certificate is valid for a period of one year (up to 01.05.2027).'
    ],
    signatory: 'Station Officer, Fire & Rescue Services',
    sealText: 'FIRE & RESCUE SERVICE KPT'
  },
  'water-sanitation': {
    title: 'Water & Sanitation Health Certificate',
    subtitle: 'DEPARTMENT OF PUBLIC HEALTH & PREVENTIVE MEDICINE',
    authority: 'Office of the Block Medical Officer, Government Primary Health Centre',
    certNo: 'Health Cert: WSH-2026-04',
    date: 'May 10, 2026',
    recipient: 'VillZone International School,\nKilpennathur, Tiruvannamalai - 606601.',
    subject: 'Sanitary Certificate - Safe Drinking Water and Sanitation Facilities.',
    content: [
      'This is to certify that the sanitary conditions and drinking water resources at VillZone International School, Kilpennathur, have been inspected and verified by the Health Inspector.',
      'The school has provided adequate water supply, safe drinking water facilities, and separate hygienic toilet blocks for male and female students and staff.',
      'The drinking water sample report certifies it safe for human consumption. This certificate is valid for one year.'
    ],
    signatory: 'Block Medical Officer / Health Authority',
    sealText: 'DEPT OF PUBLIC HEALTH TAMIL NADU'
  },
  'prospectus': {
    title: 'School Prospectus & Guidelines',
    subtitle: 'VILLZONE INTERNATIONAL SCHOOL',
    authority: 'CBSE Affiliation No. 1930225 | Kilpennathur, Tiruvannamalai',
    certNo: 'VHIS/PROS/2026-27',
    date: 'Academic Year 2026-27',
    recipient: 'To The Parents & Guardians,\nSeeking Admissions for the Academic Session 2026-27.',
    subject: 'Prospectus, Curricular Streams, and Campus Facilities.',
    content: [
      'Welcome to VillZone International School (VHIS), where we nurture leaders of tomorrow through holistic educational streams.',
      'Our Curricular Framework:',
      '• Play School Stream (Pre-KG, LKG, UKG): Activity-based experiential learning using Montessori methods.',
      '• Primary & Middle Streams (Grade 1 to 8): Structured CBSE syllabus focusing on core sciences, mathematics, and language proficiency.',
      '• Secondary & Senior Streams (Grade 9 to 12): In-depth academic tracks, lab practices, and specialized exam preparation.',
      'Key Amenities & Campus Features:',
      '• Smart Interactive Classroom interfaces in all study blocks.',
      '• State-of-the-Art Science and Computer Laboratories.',
      '• Extensive library holdings and sports facility arenas.',
      '• Certified school bus transport covering all main routes.',
      'Admission Guidelines:',
      'Please submit the multi-step online Application Form. Following verification, our desk will contact you to schedule parent counseling and interactive sessions.'
    ],
    signatory: 'Principal / Management Board',
    sealText: 'VILLZONE CENTRAL DESK'
  }
};

export default function DocumentViewer() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const doc = DOC_DATA[docId];

  if (!doc) {
    return (
      <div className="pt-28 text-center min-h-screen">
        <h2 className="text-xl font-bold text-red-500">Document Not Found</h2>
        <button onClick={() => navigate('/cbse-disclosure')} className="mt-4 px-4 py-2 bg-primary text-white rounded-xl">
          Back to Disclosures
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-0 pb-16 bg-slate-100 min-h-screen">
      
      {/* Control Panel (Hidden during Print) */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex justify-between items-center print:hidden">
        <button 
          onClick={() => docId === 'prospectus' ? navigate('/admissions') : navigate('/cbse-disclosure')}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border text-xs transition-all shadow-sm"
        >
          <ArrowLeft size={14} /> Back to {docId === 'prospectus' ? 'Admissions' : 'Disclosures'}
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md"
        >
          <Printer size={14} /> Print / Save PDF
        </button>
      </div>

      {/* Official Certificate Wrapper */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white border-8 border-double border-amber-800 p-8 sm:p-16 shadow-2xl relative overflow-hidden min-h-[1050px] font-serif print:border-none print:shadow-none print:p-0">
          
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <div className="w-96 h-96 rounded-full border-[20px] border-amber-800 flex items-center justify-center">
              <span className="text-8xl font-black text-amber-900 tracking-wider">VHIS</span>
            </div>
          </div>

          {/* Letterhead Header */}
          <div className="text-center border-b-4 border-amber-800 pb-6 mb-8">
            <span className="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-widest block mb-2">OFFICIAL COMPLIANCE DOCUMENT</span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-900 tracking-wide uppercase">{doc.subtitle}</h2>
            <p className="text-xs text-slate-600 font-sans mt-1 font-semibold">{doc.authority}</p>
          </div>

          {/* Document Meta Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 text-xs font-sans text-slate-700 font-bold border-b pb-4">
            <div>
              <span className="text-slate-400 font-medium block">DOCUMENT REF / CERTIFICATE NO:</span>
              <span className="text-[#0F172A] font-extrabold">{doc.certNo}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-400 font-medium block">DATE OF ISSUE:</span>
              <span className="text-[#0F172A] font-extrabold">{doc.date}</span>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="mb-8 text-xs font-sans text-slate-800 leading-relaxed">
            <span className="text-slate-400 font-bold block mb-1">ADDRESSED TO:</span>
            <pre className="font-sans font-semibold whitespace-pre-wrap">{doc.recipient}</pre>
          </div>

          {/* Subject Line */}
          <div className="bg-slate-50 border-l-4 border-amber-800 p-4 mb-8">
            <h3 className="text-xs font-sans font-black text-slate-400 uppercase mb-1">SUBJECT:</h3>
            <p className="text-sm font-bold text-amber-900 leading-snug">{doc.subject}</p>
          </div>

          {/* Main Content Body */}
          <div className="space-y-6 text-sm text-slate-800 leading-relaxed mb-16 text-justify">
            {doc.content.map((p, index) => {
              if (p.includes(':')) {
                const parts = p.split(':');
                return (
                  <div key={index} className="flex gap-2 text-xs font-sans pl-4">
                    <span className="text-slate-400 font-bold uppercase min-w-[120px]">{parts[0]}:</span>
                    <span className="text-slate-900 font-extrabold">{parts[1]}</span>
                  </div>
                );
              }
              return <p key={index} className="indent-8 font-serif leading-7">{p}</p>;
            })}
          </div>

          {/* Signatures & Seal Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-8 border-t border-slate-100">
            {/* Seal */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border-4 border-dashed border-blue-600/30 flex items-center justify-center text-center p-1 text-[8px] font-sans font-black text-blue-600/40 select-none uppercase tracking-wider leading-none">
                {doc.sealText}
              </div>
              <div className="text-xs font-sans font-bold text-slate-400">
                <span className="flex items-center gap-1 text-green-600 font-black"><ShieldCheck size={14} /> Digisigned Verified</span>
                <span>Audit Clearance Status: Approved</span>
              </div>
            </div>

            {/* Signature */}
            <div className="text-center sm:text-right">
              <div className="font-serif italic text-amber-950 text-base mb-1 select-none pr-4">
                {doc.signatory.split(' ').map(n => n[0]).join('') + '. ' + doc.signatory.split(' ').pop()}
              </div>
              <div className="border-t border-slate-300 pt-1.5 w-52 inline-block">
                <span className="text-xs font-sans font-black text-slate-800 block">{doc.signatory}</span>
                <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-widest block">Authorized Signatory</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
