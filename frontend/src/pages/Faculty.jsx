import { useState, useEffect } from 'react';
import { Search, Mail } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

export default function Faculty() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [facultyList, setFacultyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/api/faculty')
      .then(res => res.json())
      .then(data => {
        setFacultyList(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch faculty:', err);
        // Fallback to mock data if API fails
        setFacultyList([
          { name: 'Dr. Vikram A. Dev', role: 'Correspondent', dept: 'Administration', qualification: 'Ph.D. (IIT-M)', exp: '20+ Yrs', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300', email: 'vikram.dev@villzoneschool.edu.in' },
          { name: 'Mrs. Shalini Prasad', role: 'Principal', dept: 'Administration', qualification: 'M.Sc., M.Ed.', exp: '18 Yrs', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300', email: 'shalini.prasad@villzoneschool.edu.in' },
          { name: 'Mr. Rajesh K. Varma', role: 'PGT Senior Coordinator', dept: 'Mathematics', qualification: 'M.Sc. Mathematics, B.Ed.', exp: '15 Yrs', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', email: 'rajesh.varma@villzoneschool.edu.in' },
          { name: 'Dr. Anjali Sen', role: 'PGT Physics', dept: 'Science', qualification: 'Ph.D. Physics', exp: '12 Yrs', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', email: 'anjali.sen@villzoneschool.edu.in' },
          { name: 'Mr. David Abraham', role: 'PGT Computer Science', dept: 'Computer Science', qualification: 'MCA, B.Ed.', exp: '10 Yrs', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300', email: 'david.abraham@villzoneschool.edu.in' },
          { name: 'Mrs. Kavitha Murugan', role: 'TGT Tamil Coordinator', dept: 'Languages', qualification: 'M.A. Tamil, M.Phil', exp: '14 Yrs', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300', email: 'kavitha.murugan@villzoneschool.edu.in' },
          { name: 'Mrs. Sarah Fernandez', role: 'PGT English Literature', dept: 'Languages', qualification: 'M.A. English, B.Ed.', exp: '9 Yrs', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300', email: 'sarah.fernandez@villzoneschool.edu.in' },
          { name: 'Mr. Amit Kumar Jha', role: 'PGT Chemistry', dept: 'Science', qualification: 'M.Sc. Chemistry, B.Ed.', exp: '11 Yrs', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300', email: 'amit.jha@villzoneschool.edu.in' }
        ]);
        setIsLoading(false);
      });
  }, []);

  const departments = ['All', ...new Set(facultyList.map(f => f.dept).filter(Boolean))];

  const filteredFaculty = facultyList.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || f.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="pt-0 bg-slate-50 min-h-screen">

      {/* Banner */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000')" }} />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">Faculty & Mentors</h1>
          <p className="text-slate-200 max-w-xl mx-auto font-light">Meet our highly certified educators steering students to academic success.</p>
        </div>
      </section>

      {/* Filter and Search controls */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-premium flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search teacher by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary text-sm font-medium transition-colors"
              />
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedDept === dept
                    ? 'bg-secondary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {dept}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Faculty list grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-slate-500 font-bold">Loading faculty...</p>
            </div>
          ) : filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredFaculty.map((fac, idx) => (
                <AnimatedSection key={fac._id || idx} delay={(idx % 4) * 0.05} className="bg-white rounded-2xl overflow-hidden shadow-premium border border-slate-100 group">

                  {/* Portrait */}
                  <div className="relative h-64 overflow-hidden bg-slate-50">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm uppercase">
                      {fac.dept}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-5">
                    <h3 className="font-extrabold text-primary text-lg leading-tight mb-1">{fac.name}</h3>
                    <span className="text-xs font-semibold text-slate-400 block mb-4">{fac.role}</span>

                    <div className="space-y-1.5 text-xs text-slate-500 mb-5 border-t border-slate-50 pt-4">
                      <div className="flex justify-between">
                        <span>Qualification:</span>
                        <span className="font-bold text-slate-700">{fac.qualification}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-bold text-slate-700">{fac.exp}</span>
                      </div>
                    </div>
                  </div>

                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-bold">No faculty member matches your filters.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}