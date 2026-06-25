export const knowledgeBase = [
  {
    topic: 'greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'welcome', 'morning', 'afternoon', 'evening'],
    response: "Hello! 👋 Welcome to VillZone International School.\n\nHow can I help you today? You can ask me about admissions, fees, facilities, transport, or school timings!"
  },
  {
    topic: 'admissions',
    keywords: ['admission', 'apply', 'enroll', 'join', 'process', 'application', 'registration'],
    response: "Our admissions for the upcoming academic year are now open!\n\n**Admission Process:**\n1. Submit an online enquiry or application.\n2. Attend a short counseling call.\n3. Complete a campus visit & interaction.\n4. Confirm enrollment.\n\nYou can start the process right now by visiting our Admissions page.",
    actionButton: { label: 'Go to Admissions', path: '/admissions' }
  },
  {
    topic: 'fees',
    keywords: ['fee', 'fees', 'cost', 'price', 'tuition', 'payment', 'structure'],
    response: "Our fee structure is designed to be affordable while providing premium CBSE education. The exact fee depends on the grade level your child is applying for.\n\nTo give you accurate details, our admissions team would love to share the exact fee breakdown for your desired grade. Would you like them to contact you?",
    triggerLead: true
  },
  {
    topic: 'timings',
    keywords: ['time', 'timings', 'hour', 'hours', 'open', 'close', 'working', 'schedule'],
    response: "The VillZone International School campus operates during the following hours:\n\n• **Monday to Friday:** 09:00 AM – 04:00 PM\n• **Saturday:** 09:00 AM – 01:00 PM\n• **Sunday:** Closed\n\nOur office is open during these hours for any walk-in inquiries or scheduled campus visits."
  },
  {
    topic: 'contact',
    keywords: ['contact', 'call', 'phone', 'email', 'number', 'reach', 'address', 'location'],
    response: "We are always here to help!\n\n📞 **Phone:** +91 8220524146\n📧 **Email:** admissions@villzone.edu.in\n📍 **Location:** VillZone Area, Tiruvannamalai, Tamil Nadu - 606601\n\nYou can also leave an enquiry on our Contact page.",
    actionButton: { label: 'Contact Page', path: '/contact' }
  },
  {
    topic: 'facilities',
    keywords: ['facility', 'facilities', 'infrastructure', 'lab', 'labs', 'library', 'smart', 'campus'],
    response: "We pride ourselves on providing world-class facilities to foster holistic development:\n\n• **Smart Classrooms:** Interactive digital learning.\n• **Science & Computer Labs:** Hands-on practical experimentation.\n• **Extensive Library:** Thousands of books to encourage reading.\n• **Art & Activity Rooms:** Nurturing creativity and cultural talents.",
    actionButton: { label: 'View Facilities', path: '/facilities' }
  },
  {
    topic: 'sports',
    keywords: ['sport', 'sports', 'game', 'games', 'playground', 'physical', 'athletics'],
    response: "Physical education is a core part of the VillZone experience! We have extensive sports facilities including:\n\n• Large multipurpose playground\n• Indoor sports arena\n• Dedicated coaching for athletics and team sports\n\nWe focus on both physical fitness and sportsmanship."
  },
  {
    topic: 'trust',
    keywords: ['trust', 'founder', 'history', 'established', 'management', 'who', 'villzone educational trust'],
    response: "VillZone International School is proudly run by the **VillZone Educational Trust**.\n\nEstablished in 1998, the trust was founded with a vision to make quality education accessible. We have over 25 years of educational excellence, nurturing over 10,000 alumni across our institutions."
  },
  {
    topic: 'academics',
    keywords: ['academic', 'academics', 'curriculum', 'syllabus', 'cbse', 'board', 'subjects', 'study'],
    response: "We follow the **CBSE Curriculum**, integrating modern teaching methodologies with strong foundational learning.\n\nOur focus is on concept-based learning rather than rote memorization, preparing students for competitive exams and global challenges.",
    actionButton: { label: 'Explore Academics', path: '/academics' }
  },
  {
    topic: 'transport',
    keywords: ['transport', 'bus', 'van', 'vehicle', 'commute', 'pickup', 'drop'],
    response: "Yes, we provide a safe and reliable **School Transport System**.\n\nOur buses cover major routes in and around Tiruvannamalai. All vehicles are GPS-enabled with trained staff to ensure the highest safety for our students.",
    actionButton: { label: 'Transport Details', path: '/transport' }
  },
  {
    topic: 'visit',
    keywords: ['visit', 'tour', 'see', 'campus visit'],
    response: "We would love to show you around! A campus visit allows you to see our smart classrooms, labs, and sports facilities in person.\n\nYou can book a personalized campus tour through our online form.",
    actionButton: { label: 'Book Campus Visit', path: '/contact' }
  },
  {
    topic: 'principal',
    keywords: ['principal', 'head', 'headmaster', 'director'],
    response: "Our Principal, **Dr. K. Raghavan**, brings decades of experience in educational leadership. Under his guidance, the school focuses on creating a safe, innovative, and holistic learning environment for every child."
  }
];

export const findBestMatch = (userInput) => {
  const normalizedInput = userInput.toLowerCase();
  
  // Simple tokenization (split by spaces and remove punctuation)
  const userTokens = normalizedInput.replace(/[^\w\s]/g, '').split(/\s+/);
  
  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;
    
    // Check for exact phrase matches first (higher weight)
    for (const keyword of item.keywords) {
      if (normalizedInput.includes(keyword)) {
        // Multi-word keywords get higher score
        const keywordWordCount = keyword.split(' ').length;
        score += (2 * keywordWordCount); 
      }
    }

    // Check token matches
    for (const token of userTokens) {
      if (item.keywords.includes(token)) {
        score += 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Threshold: if score is too low, we don't have a confident answer
  if (highestScore > 0) {
    return bestMatch;
  }
  
  return null;
};
