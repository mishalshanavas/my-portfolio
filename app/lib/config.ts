export const profileMeta = {
  username: "mishalshanavas",
  location: "Kerala, India",
  memberSince: "2024",
};

export const metaData = {
  baseUrl: "https://www.mishalshanavas.in",
  title: "mishal shanavas",
  name: "Mishal Shanavas",
  ogImage: "/profile-wt.webp",
  description:
    "Backend developer specializing in Python, Django, and MySQL. Builds scalable APIs, open source tools, and cloud infrastructure on GCP and AWS."
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
  title: "Backend Developer & Cloud Enthusiast",
  imageLight: "/profile-wt.webp",
  imageDark: "/profile-bl.webp",
  resumeUrl: "/resume.pdf",
};
export const contact = {
  text: `I'm always open to connecting! Reach out via <a href="mailto:mishalshanavas@yahoo.com" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">email</a> or connect on <a href="https://www.linkedin.com/in/mishalshanavas" target="_blank" rel="noopener noreferrer" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">LinkedIn</a>.`,
};

export const aboutMe = `Hey, I'm Mishal. A **backend developer** focused on databases and APIs, building with **Python**, **Django**, and **MySQL**. I'm into automation, proxies, and writing clean CLI flows that just work. Lately expanding into **Terraform** and cloud infrastructure on **GCP** and **AWS**, while diving deeper into **Rust** and systems programming. When I'm not coding, I'm probably maintaining AUR packages, tweaking my Arch setup, or helping folks on Reddit.`

export const experiences = [
  {
    role: "AUR Package Maintainer",
    company: "networkmanager-git",
    companyUrl: "https://aur.archlinux.org/packages/networkmanager-git",
    period: "2026 - Present",
    startDate: "2026-06-10",
    description:
      "Maintain the networkmanager-git AUR package for Arch Linux, migrating the build to meson and resolving libsoup3 compatibility issues to keep the package building cleanly against upstream changes."
  },
  {
    role: "Backend Developer - Intern",
    company: "GTech MuLearn",
    companyUrl: "https://gtechmulearn.com",
    period: "2025 - 2026",
    startDate: "2025-01-01",
    description:
      "Developing and maintaining scalable backend APIs for the MuLearn launchpad platform. Implemented secure JWT authentication, company onboarding workflows, and job management modules using Django and mySQL. Collaborated with cross-functional teams to deliver robust features and improve system reliability."
  },
];

export const skillGroups = [
  {
    name: "Languages",
    skills: ["C", "Python", "Rust", "Bash", "JavaScript", "TypeScript", "Kotlin"],
  },
  {
    name: "Frontend",
    skills: ["Vue.js", "React", "Nuxt", "Tailwind CSS", "SCSS"],
  },
  {
    name: "Backend",
    skills: ["Django", "Express", "Node.js"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "SQLite", "DynamoDB"],
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS", "GCP", "Terraform", "Docker", "Cloudflare", "Linux"],
  },
];

export const skills = skillGroups.flatMap((g) => g.skills);

export const projects = [
  {
    name: "Linux Foundation Hyperledger Fabric",
    date: "2026-04-30",
    url: "https://github.com/hyperledger/fabric",
    description: "Merged a CI fix into the Linux Foundation's flagship enterprise blockchain framework, the same codebase running in production at IBM, Walmart, and HSBC. PR reviewed by core maintainers.",
    image: "/fabric.webp",
    imageAlignment: "object-contain",
    isContributor: true,
    featured: true,
    tech: ["Go", "GitHub Actions", "CI/CD", "Hyperledger Fabric"],
  },
  {
    name: "Terramine",
    date: "2026-06-01",
    url: "https://github.com/accidental-stuff/mc-server",
    description: "A fully infrastructure-as-code deployment on GCP: VM, networking, and DNS provisioned via Terraform and Cloudflare, reverse proxied through Caddy, with containerized workloads in Docker Compose and automated backups to Cloudflare R2.",
    featured: true,
    isSideQuest: true,
    tech: ["Terraform", "GCP", "Docker", "Caddy", "Cloudflare"],
  },
  {
    name: "G-Tech MuLearn",
    date: "2025-03-01",
    url: "https://github.com/gtech-mulearn/mulearnbackend",
    description: "Building robust APIs, implementing secure JWT authentication, and developing core features for the launchpad platform using Django and mySQL.",
    image: "/mulogo.webp",
    isContributor: true,
    imageAlignment: "object-center",
    featured: true,
    tech: ["Python", "Django", "Database Design","mySQL", "JWT auth"],
  },
  {
    name: "Mappix",
    date: "2026-05-01",
    url: "https://mappix.isacool.monster",
    description: "Real-time projection mapping in the browser. Point a webcam at a wall with sticky notes and physics balls bounce off them live. Built with Gray-code structured light calibration for sub-pixel accuracy and homography-based projector-camera mapping.",
    image: "/mappix.webp",
    imageAlignment: "object-center",
    featured: true,
    isSideQuest: true,
    tech: ["Vue.js", "JavaScript", "Computer Vision", "Matter.js", "WebRTC"],
  },
  {
    name: "Notes Bot",
    date: "2024-06-01",
    url: "https://github.com/mishalshanavas/notes-bot",
    description: "A Python automation script that updates your Instagram notes with the current time, showcasing simple social media automation using Python.",
    image: "/notes.gif",
    imageAlignment: "object-left",
    featured: false,
    isSideQuest: true,
    tech: ["Python"],
  },
  {
    name: "Instagram PFP Switcher",
    date: "2024-02-15",
    url: "/blog/instagram-pfp",
    description: "A tool to automate changing your Instagram profile picture, demonstrating Python scripting for interacting with social media platforms.",
    image: "/pfp.gif",
    featured: false,
    imageAlignment: "object-left",
    isSideQuest: true,
    tech: ["Python"],
  },
];

export const topProjects = projects.filter((p) => p.featured);

export const launches = [
  {
    date: "2026-05-01",
    title: "Mappix",
    description:
      "Public launch of Mappix, a browser-based projection-mapping tool with structured-light calibration and real-time physics.",
    url: "https://mappix.isacool.monster",
  },
];

export const contributionHighlights = [
  {
    date: "2026-06-10",
    title: "networkmanager-git: AUR package maintainer",
    description:
      "Took over maintenance of the orphaned networkmanager-git AUR package for Arch Linux, migrating the build to meson and resolving libsoup3 compatibility issues to keep the package building cleanly against upstream changes.",
    url: "https://aur.archlinux.org/packages/networkmanager-git",
    openSource: true,
  },
  {
    date: "2026-04-30",
    title: "Linux Foundation Hyperledger Fabric: fixed CI workflow",
    description:
      "Fixed a broken CI workflow in the official Hyperledger Fabric repo, the Linux Foundation's flagship enterprise blockchain framework running in production at IBM, HSBC etc. ",
    url: "https://github.com/hyperledger/fabric/",
    openSource: true,
  },
  {
    date: "2026-01-06",
    title: "sahrdaya.ac.in: reworked the entire college website",
    description:
      "Helped integrate core Next.js features including image optimization, incremental static regeneration, and more.",
    url: "https://github.com/arxhr007/sahrdaya_website",
  },
  {
    date: "2025-03-01",
    title: "gtech-mulearn/mulearnbackend",
    description:
      "Contributor to MuLearn's open-source Django backend: JWT auth, company onboarding flows, and job management APIs used by thousands of students across Kerala's tech ecosystem.",
    url: "https://github.com/gtech-mulearn/mulearnbackend",
    openSource: true,
  },
];
