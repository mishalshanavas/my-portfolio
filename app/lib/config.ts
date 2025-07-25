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
  text: "Feel free to reach out via email or connect on LinkedIn.",
};

export const aboutMe = `Linux enthusiast currently learning Rust. I build web applications and automation tools using Python, C, and modern web technologies. Passionate about open source development.  Oh, I use Arch btw...`;

export const experiences = [
  {
    role: "Backend Developer - Intern",
    company: "GTech MuLearn",
    period: "2025 - Present",
    description:
      "Contributing to MuLearn backend development, implementing JWT authentication, company registration APIs, and job management features for the launchpad platform."
  },
  {
    role: "Open Source Contributor",
    company: "Various Projects",
    period: "2024 - Present",
    description:
      "Active contributor with 301+ contributions in the last year. Working on multiple repositories including backend systems, automation tools, and educational platforms."
  }
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
    description: "Key contributor to the MuLearn backend, building robust APIs, implementing secure JWT authentication, and developing core features for the launchpad platform using Django and mySQL.",
    image: "https://github.com/user-attachments/assets/19b857b4-46f3-4daf-af79-19e21706ac27",
    imageAlignment: "object-left",
    featured: true,
    tech: ["Python", "Django", "mySQL", "JWT Authentication"],
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
