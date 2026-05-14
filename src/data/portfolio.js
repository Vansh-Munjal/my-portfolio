// ── All Portfolio Data ──

export const personal = {
  name: 'Vansh Munjal',
  initials: 'VM',
  role: 'Full-Stack Developer & AI/ML Engineer',
  tagline: 'Building intelligent, scalable web applications — from backend API design with FastAPI to pixel-perfect React frontends and machine learning pipelines.',
  email: 'vanshmunjal0007@gmail.com',
  phone: '+91 8708538195',
  github: 'https://github.com/Vansh-Munjal',
  linkedin: 'https://www.linkedin.com/in/vansh-munjal-860159290/',
  githubHandle: 'Vansh-Munjal',
  linkedinHandle: 'vansh-munjal-860159290',
  available: true,
  photo: '/photo.jpeg',
  stats: [
    { value: '9.2', suffix: '/10', label: 'CGPA' },
    { value: '6', suffix: '+', label: 'Projects' },
    { value: '2', suffix: '×', label: "Dean's List" },
  ],
};

export const skills = [
  {
    category: 'Languages',
    color: 'gold',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'HTML / CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    color: 'blue',
    items: ['FastAPI', 'React', 'Node.js', 'Flask', 'Jinja2'],
  },
  {
    category: 'Data Science & ML',
    color: 'purple',
    items: ['pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'OpenCV'],
  },
  {
    category: 'Tools & Concepts',
    color: 'teal',
    items: ['Git / GitHub', 'VS Code', 'DSA', 'OOP', 'REST APIs'],
  },
];

export const projects = [
  {
    id: '01',
    title: 'Spotify Clone',
    description: 'Fully responsive music player with play/pause, song selection, playlist management, and a pixel-perfect recreation of Spotify\'s UI — built with pure HTML, CSS & JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    image: '/spotify.png',
    github: 'https://github.com/Vansh-Munjal/Spotify_project',
    category: 'frontend',
    featured: true,
  },
  {
    id: '02',
    title: 'Quick Deliver',
    description: 'Full-stack on-demand delivery platform featuring secure JWT authentication, real-time order tracking, streamlined processing pipelines, and a modern dashboard.',
    tags: ['FastAPI', 'React', 'MongoDB', 'JWT'],
    image: '/quick.jpeg',
    github: 'https://github.com/Vansh-Munjal/quick-deliver',
    category: 'fullstack',
    featured: true,
  },
  {
    id: '03',
    title: 'Stock Market Analyst',
    description: 'AI-powered system predicting stock prices using ensemble ML models, interactive dynamic charts, and real-time market data integration via financial APIs.',
    tags: ['Python', 'ML', 'pandas', 'Scikit-learn'],
    image: '/stock.png',
    github: 'https://github.com/Vansh-Munjal/stock-market-analyzer',
    category: 'ai',
    featured: true,
  },
  {
    id: '04',
    title: 'UdaanPath',
    description: 'Smart career guidance platform using ML clustering algorithms for personalized college recommendations, with an integrated AI chatbot for student assistance.',
    tags: ['Python', 'ML', 'Flask', 'NLP'],
    image: '/udaan.jpg',
    github: 'https://github.com/Vansh-Munjal/udaan-path',
    category: 'ai',
    featured: false,
  },
  {
    id: '05',
    title: 'Proctor Eye',
    description: 'AI-powered face monitoring system using OpenCV and CNN for real-time attention detection and anti-cheating surveillance during online examination sessions.',
    tags: ['OpenCV', 'CNN', 'Python', 'Computer Vision'],
    image: '/proctor.png',
    github: 'https://github.com/Vansh-Munjal/proctor-eye',
    category: 'ai',
    featured: false,
  },
  {
    id: '06',
    title: 'Prime Portfolio',
    description: 'AI-powered portfolio builder using FastAPI with dynamic Jinja2 templates, real-time content rendering, custom user theming, and automated resume parsing.',
    tags: ['FastAPI', 'Jinja2', 'Python', 'AI'],
    image: '/prime.png',
    github: 'https://github.com/Vansh-Munjal/prime-portfolio',
    category: 'fullstack',
    featured: false,
  },
];

export const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'Bennett University',
    period: '2022 – 2026',
    detail: 'Consistently achieving academic excellence with a CGPA of 9.2/10.0. Specializing in software engineering, algorithms, and AI/ML through research and project-based learning.',
    badge: "2× Dean's List Award",
    icon: '🎓',
    color: 'gold',
  },
  {
    degree: 'Senior & Secondary Education',
    school: 'Parth Public School',
    period: '2020 – 2022',
    detail: 'Built a strong academic foundation in Sciences and Mathematics, laying the groundwork for a career in technology and engineering.',
    icon: '📚',
    color: 'blue',
  },
];

export const achievements = [
  { label: "Dean's List Award", detail: '2 consecutive semesters', icon: '🏆' },
  { label: 'CGPA 9.2/10', detail: 'B.Tech Computer Science', icon: '⭐' },
  { label: '6+ Projects', detail: 'Full-stack & AI/ML', icon: '🚀' },
  { label: 'Open Source', detail: 'Active GitHub contributor', icon: '💻' },
];

export const filterCategories = [
  { key: 'all', label: 'All Projects' },
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'frontend', label: 'Frontend' },
];
