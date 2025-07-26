export const metaData = {
  baseUrl: "http://localhost:3000/",
  title: "mishal shanavas",
  name: "Mishal Shanavas",
  ogImage: "/opengraph-image.png",
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
  image: "/profile.png",
};
export const contact = {
  text: `I'm always open to connecting! Reach out via <a href="mailto:mishalshanavas@yahoo.com" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">email</a> or connect on <a href="https://www.linkedin.com/in/mishalshanavas" target="_blank" rel="noopener noreferrer" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">LinkedIn</a>.`,
};
export const aboutMe = `Hey there! I'm **Mishal** — a **Linux enthusiast, backend developer, and automation dude** who loves building things that solve real-world problems. I specialize in creating **lightweight, efficient tools** using **Python, Bash, and occasionally C**. My projects range from **bots that automate Instagram and Snapchat to custom API backends and network utilities**. With a strong background in **networking** and a growing interest in **Rust**, I often dive deep into **system internals, proxy setups, and CLI workflows**.
When I’m not coding, I’m probably exploring **obscure Linux distros, optimizing my setup, or helping others troubleshoot on Reddit**. I'm passionate about **open source, clean code, and the kind of learning that happens when you break stuff and fix it better**.\n Oh, I use Arch btw!`;

export const experiences = [
  {
    role: "Backend Developer - Intern",
    company: "GTech MuLearn",
    companyUrl: "https://gtechmulearn.com",
    period: "2025 - Present",
    description:
      "Contributing to MuLearn backend development, implementing JWT authentication, company registration APIs, and job management features for the launchpad platform."
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
  "Docker",
  "AWS",
  "Azure",
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
    url: "https://github.com/mishalshanavas/Instagram-dp",
    description: "A tool to automate changing your Instagram profile picture, demonstrating Python scripting for interacting with social media platforms.",
    image: "https://github.com/user-attachments/assets/83b23108-116a-4a98-9d53-658ad9dec2a6",
    featured: true,
    imageAlignment: "object-left",
    tech: ["Python"],
  },
];


export const topProjects = projects.filter((p) => p.featured);
