export const profile = {
  name: 'Sankalp M Tellur',
  firstName: 'Sankalp',
  role: 'Software Developer',
  focus: 'Full-stack · Frontend · AI',
  email: 'sankalp.tellur2024@nst.rishihood.edu.in',
  location: 'India',
  timeZone: 'Asia/Kolkata',
  university: 'Rishihood University',
  degree: 'B.Tech, Computer Science & AI',
  year: '3rd year',
  resume: '/resume.pdf',
}

export const links = {
  linkedin: 'https://www.linkedin.com/in/sankalpmt/',
  github: 'https://github.com/sankalpmtellur',
  leetcode: 'https://leetcode.com/u/sankalpmtellur/',
  leetcodeCertificate: 'https://drive.google.com/file/d/1Nv_6dsOLp9GV6YUZs9FUHlnaww5ia6nn/view',
}

export const socials = [
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'GitHub', href: links.github },
  { label: 'LeetCode', href: links.leetcode },
]

export const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
  { label: 'Work', target: 'work' },
  { label: 'Skills', target: 'skills' },
  { label: 'Contact', target: 'contact' },
]

export type Project = {
  slug: string
  index: string
  title: string
  category: string
  summary: string
  overview: string
  focus: string[]
  stack: string[]
  platform: string
  status: string
  url?: string
  image?: { src: string; small: string; width: number; height: number }
  tone: string
}

export const projects: Project[] = [
  {
    slug: 'purchase-assistant',
    index: '01',
    title: 'Purchase Assistant',
    category: 'AI automation',
    summary: 'An AI agent that captures order details and updates the database only after a human verifies them.',
    overview:
      'A Windows desktop application that automates purchase-order processing. The assistant captures and processes incoming order details, then holds every change for human verification before it touches the database — so the team keeps control while the repetitive data entry disappears.',
    focus: [
      'Automated capture and processing of order details',
      'Human-in-the-loop verification before every database update',
      'Packaged as a Windows executable, running on the team’s own machines',
      'Built to cut down employees’ manual workload',
    ],
    stack: ['AI agent', 'Human-in-the-loop', 'Windows'],
    platform: 'Windows desktop (.exe)',
    status: 'In use · Private deployment',
    tone: '#8b7cff',
  },
  {
    slug: 'shweta-drug-distributors',
    index: '02',
    title: 'Shweta Drug Distributors',
    category: 'Full-stack · Business',
    summary: 'A full-stack platform giving a drug distributor an online presence and automating everyday workflows.',
    overview:
      'A full-stack website for Shweta Drug Distributors that establishes their online presence and automates internal business workflows. The goal: reduce employees’ manual workload by roughly 30%.',
    focus: [
      'Public-facing website for the distributor’s online presence',
      'Workflow automation for repetitive back-office tasks',
      'Express.js API with MongoDB and Prisma for data',
      'Targeting ~30% less manual work for the team',
    ],
    stack: ['Next.js', 'Express.js', 'MongoDB', 'Prisma'],
    platform: 'Web',
    status: 'In progress',
    url: 'https://shwetadrug.vercel.app/',
    image: { src: '/assets/shwetadrug.webp', small: '/assets/shwetadrug-800.webp', width: 1600, height: 884 },
    tone: '#3ccf91',
  },
  {
    slug: 'onyu',
    index: '03',
    title: 'Onyu',
    category: 'Startup website',
    summary: 'A product website for a startup building a smart ring — showcasing the product, its features and brand.',
    overview:
      'Onyu is a startup building a smart ring. I built their frontend website to present the product, explain its features and carry the brand — clean, confident and motion-led.',
    focus: [
      'Product storytelling for a hardware startup',
      'Feature highlights with scroll-driven motion',
      'Brand-consistent, minimal visual language',
      'Fully responsive frontend in TypeScript',
    ],
    stack: ['TypeScript', 'Tailwind CSS', 'GSAP'],
    platform: 'Web',
    status: 'Live',
    url: 'https://onyu-tech.vercel.app/',
    image: { src: '/assets/onyu.webp', small: '/assets/onyu-800.webp', width: 1600, height: 882 },
    tone: '#ff6b3d',
  },
  {
    slug: 'aikyam',
    index: '04',
    title: 'Aikyam',
    category: 'Hospitality website',
    summary: 'A website for Aikyam Women’s PG in Bangalore, designed for clear information and easy discovery.',
    overview:
      'A website for Aikyam Women’s PG in Bangalore. The brief was simple: help people find what they need quickly — rooms, amenities and how to get in touch — with a calm, trustworthy feel.',
    focus: [
      'Clear information architecture for prospective residents',
      'Easy discovery of rooms, amenities and contact',
      'Fast, mobile-first Next.js build',
      'Warm, trustworthy visual tone',
    ],
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    platform: 'Web',
    status: 'Live',
    url: 'https://aikyam-pg.vercel.app/',
    image: { src: '/assets/aikyam.webp', small: '/assets/aikyam-800.webp', width: 1600, height: 884 },
    tone: '#4a8cff',
  },
  {
    slug: 'irctc-3d',
    index: '05',
    title: 'IRCTC / 3D',
    category: 'Experimental 3D',
    summary: 'An experimental 3D take on a familiar travel-booking experience — still in motion.',
    overview:
      'An experiment in reimagining a familiar Indian travel-booking flow as an immersive 3D interface. It’s a playground for exploring how depth and motion can make an everyday task feel new.',
    focus: [
      'Immersive 3D scene built with Three.js',
      'Rethinking a familiar booking journey',
      'Exploring depth, motion and interaction',
      'Ongoing experiment — evolving with each iteration',
    ],
    stack: ['TypeScript', 'Three.js', 'Tailwind CSS'],
    platform: 'Web',
    status: 'In progress',
    url: 'https://irctc-frontend-eight.vercel.app/',
    image: { src: '/assets/irctc.webp', small: '/assets/irctc-800.webp', width: 1600, height: 886 },
    tone: '#c58bff',
  },
]

export const experience = [
  {
    period: 'Apr 2025 — Jul 2025',
    role: 'Software Engineer Intern',
    company: 'AgroEdge',
    mode: 'Remote',
    summary:
      'Worked on the main website and the operations platform across a three-month internship, shipping both product UI and backend workflows.',
    points: [
      'Implemented multi-language support for 20+ Indian and international languages.',
      'Independently built a mentorship module for Admin, Mentor and Farmer roles — scheduling, authentication, data management and role-based access.',
      'Designed the module’s UI/UX in Figma and improved frontend UI across the platform.',
      'Worked closely with my manager and team to iterate on features.',
    ],
    stack: ['TypeScript', 'Tailwind CSS', 'Supabase', 'Calendly', 'Figma'],
  },
]

export const stats = [
  { value: 20, suffix: '+', label: 'Languages shipped in one i18n rollout' },
  { value: 150, suffix: '+', label: 'LeetCode problems solved' },
  { value: 5, suffix: '', label: 'Products designed & built' },
  { value: 3, suffix: '', label: 'Months shipping at AgroEdge' },
]

export const skillGroups = [
  { title: 'Languages', items: ['Python', 'JavaScript', 'TypeScript'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'Supabase'] },
  { title: 'Data & Design', items: ['MongoDB', 'MySQL', 'Pandas', 'Figma'] },
]

export const education = [
  { period: '2024 — Present', school: 'Rishihood University', detail: 'B.Tech in Computer Science & AI', note: 'Current' },
  { period: '2022 — 2024', school: 'Canara Vikaas PU College', detail: 'Class XII · Science (PCMC)', note: '86.1%' },
  { period: '2017 — 2022', school: 'Bhuvana Jyothi Residential School', detail: 'Class X · CBSE', note: '89.2%' },
]

export const principles = [
  { title: 'Build to learn', body: 'Every project is a way to make an idea tangible — and to find out what I don’t know yet.' },
  { title: 'Think in systems', body: 'Interfaces are only as good as the data, workflows and decisions underneath them.' },
  { title: 'Ship for people', body: 'Real users, real workloads. Software should take work off someone’s plate.' },
]
