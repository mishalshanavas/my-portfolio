export const metaData = {
  baseUrl: "https://www.mishalshanavas.in",
  title: "mishal shanavas",
  name: "Mishal Shanavas",
  ogImage: "/profile-wt.jpg",
  description:
    "Linux enthusiast and developer currently learning Rust. Passionate about Cloud Computing, Open Source, and Web Development. I build web applications and automation tools using Python, C, and modern web technologies."
};

export const socialLinks = {
  twitter: "https://x.com/mishal_shanavas",
  github: "https://github.com/mishalshanavas",
  instagram: "https://www.instagram.com/mishal_shanavas/",
  linkedin: "https://www.linkedin.com/in/mishalshanavas",
  email: "mailto:mishalshanavas@yahoo.com"
};

export const hero = {
  name: metaData.name,
  title: "Backend Developer • Cloud and Linux Enthusiast",
  imageLight: "/profile-wt.jpg",
  imageDark: "/profile-bl.jpg",
  resumeUrl: "/resume.pdf",
};
export const contact = {
  text: `I'm always open to connecting! Reach out via <a href="mailto:mishalshanavas@yahoo.com" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">email</a> or connect on <a href="https://www.linkedin.com/in/mishalshanavas" target="_blank" rel="noopener noreferrer" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">LinkedIn</a>.`,
};

export const aboutMe = `Hey, I'm **Mishal** — a **Linux enjoyer** and **backend dev** who builds **lightweight, efficient tools** with **Python**, **Bash**, and sometimes **C**. I’m into **automation**, **proxies**, and writing **clean CLI flows** that just work. Lately vibing with **Rust** and diving deeper into **system stuff** and **networking**. When I’m not coding, I’m probably **tweaking my linux setup**, testing weird distros, or **helping folks on Reddit**.  
And yeah... **I use Arch**`;

export const experiences = [
  {
    role: "Backend Developer - Intern",
    company: "GTech MuLearn",
    companyUrl: "https://gtechmulearn.com",
    period: "2025 - Present",
    description:
      "Developing and maintaining scalable backend APIs for the MuLearn launchpad platform. Implemented secure JWT authentication, company onboarding workflows, and job management modules using Django and mySQL. Collaborated with cross-functional teams to deliver robust features and improve system reliability."
  },
];

export const skills = [
  // Languages
  "C",
  "Python",
  "Rust",
  "Bash",
  // Frontend
  "Vue.js",
  "React",
  "Nuxt",
  "Tailwind CSS",
  "SCSS",
  // Backend
  "Django",
  // Databases
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "SQLite",
  "DynamoDB",
  // Cloud
  "AWS",
  "GCP",
  "Lambda",
  "EC2",
  "S3",
  "RDS",
  "CloudWatch",
  // DevOps
  "Docker",
  "Linux",
];

export const projects = [
  {
    name: "G-Tech MuLearn",
    url: "https://github.com/gtech-mulearn/mulearnbackend",
    description: "Contributor to G-Tech MuLearn backend, building robust APIs, implementing secure JWT authentication, and developing core features for the launchpad platform using Django and mySQL.",
    image: "/mulearn.png",
    imageAlignment: "object-center",
    featured: true,
    tech: ["Python", "Django", "Database Design","mySQL", "JWT Authentication"],
  },
  {
    name: "Notes Bot",
    url: "https://github.com/mishalshanavas/notes-bot",
    description: "A Python automation script that updates your Instagram notes with the current time, showcasing simple social media automation using Python.",
    image: "https://github.com/mishalshanavas/notes-bot/assets/70484516/cdd408dd-fae2-43e5-aa51-b6f61c8c0ffa",
    imageAlignment: "object-left",
    featured: true,
    tech: ["Python"],
  },
  {
    name: "Instagram PFP Switcher",
    url: "/blog/instagram-pfp",
    description: "A tool to automate changing your Instagram profile picture, demonstrating Python scripting for interacting with social media platforms.",
    image: "https://github.com/user-attachments/assets/83b23108-116a-4a98-9d53-658ad9dec2a6",
    featured: true,
    imageAlignment: "object-left",
    tech: ["Python"],
  },
];


export const topProjects = projects.filter((p) => p.featured);
