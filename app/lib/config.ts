export const metaData = {
  baseUrl: "http://localhost:3000/",
  title: "Mishal Shanavas()",
  name: "Mishal Shanavas",
  ogImage: "/opengraph-image.png",
  description:
    "Linux enthusiast and developer currently learning Rust. Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing projects, skills, and experiences in a modern and responsive design.",
};

export const socialLinks = {
  twitter: "https://x.com/mishal_shanavas",
  github: "https://github.com/mishalshanavas",
  instagram: "https://www.instagram.com/mishal_shanavas/",
  linkedin: "https://www.linkedin.com/in/mishalshanavas",
  email: "mailto:mishalshanavas@yahoo.com",
};

export const aboutMe = `Linux enthusiast currently learning Rust. I build web applications and automation tools using Python, C, and modern web technologies. Passionate about open source development and exploring new programming languages. Oh, I use Arch btw...`;

export const experiences = [
  {
    role: "Backend Developer",
    company: "GTech MuLearn",
    period: "2025 - Present",
    description:
      "Contributing to MuLearn backend development, implementing JWT authentication, company registration APIs, and job management features for the launchpad platform.",
  },
  {
    role: "Open Source Contributor",
    company: "Various Projects",
    period: "2024 - Present",
    description:
      "Active contributor with 301+ contributions in the last year. Working on multiple repositories including backend systems, automation tools, and educational platforms.",
  },
];

export const skills = [
  "Linux",
  "Rust",
  "C",
  "Bash",
  "Python",
  "Django",
  "mySQL",
  "Backend Development",
  "JWT Authentication",
];

export const projects = [
  {
    name: "SilkRoad Backend",
    url: "https://github.com/mishalshanavas/silkRoad-backend",
    description: "Backend system with recent active development",
    featured: true,
  },
  {
    name: "Notes Bot",
    url: "https://github.com/mishalshanavas/notes-bot",
    description: "A simple Python script to update current time in Instagram notes",
    featured: true,
  },
  {
    name: "Robomeetup",
    url: "https://github.com/mishalshanavas/Robomeetup",
    description: "Robotics meetup platform",
    featured: true,
  },
  {
    name: "Instagram DP",
    url: "https://github.com/mishalshanavas/Instagram-dp",
    description: "Instagram profile picture related tool",
    featured: false,
  },
  {
    name: "Snapscore Bot",
    url: "https://github.com/mishalshanavas/snapscore-bot",
    description: "Automated Snapchat score tracking bot",
    featured: false,
  },
  {
    name: "DSA Lab",
    url: "https://github.com/mishalshanavas/DSA-Lab",
    description: "Data Structures and Algorithms practice repository in C",
    featured: false,
  },
];

export const topProjects = projects.filter((p) => p.featured);
