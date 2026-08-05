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
    "Backend developer. Writes Python, Django, and MySQL. Ships APIs, open source tools, and cloud infra on GCP and AWS."
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
  text: `Reach me at <a href="mailto:mishalshanavas@yahoo.com" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">mishalshanavas@yahoo.com</a> or on <a href="https://www.linkedin.com/in/mishalshanavas" target="_blank" rel="noopener noreferrer" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">LinkedIn</a>.`,
};

export const aboutMe = `Hey, I'm Mishal. A **backend developer**. I work with databases and APIs, building with **Python**, **Django**, and **MySQL**. I'm into automation, proxies, and writing clean CLI flows that just work. Picking up **Terraform** and cloud infrastructure on **GCP** and **AWS**, and learning **Rust** and systems programming. When I'm not coding, I'm probably maintaining AUR packages, tweaking my Arch setup, or helping folks on Reddit.`

export const experiences = [
  {
    role: "AUR Package Maintainer",
    company: "networkmanager-git",
    companyUrl: "https://aur.archlinux.org/packages/networkmanager-git",
    period: "2026 - Present",
    startDate: "2026-06-10",
    description:
      "Maintain the networkmanager-git AUR package for Arch Linux. Migrated the build to meson and resolved libsoup3 compatibility issues so it builds cleanly against upstream."
  },
  {
    role: "Backend Developer - Intern",
    company: "GTech MuLearn",
    companyUrl: "https://gtechmulearn.com",
    period: "2025 - 2026",
    startDate: "2025-01-01",
    description:
      "Built backend APIs for MuLearn's launchpad platform. Shipped JWT authentication, company onboarding flows, and job management with Django and MySQL. Worked alongside frontend and design teams to deliver features used by students across Kerala."
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

export type ProjectCaseStudy = {
  context: string;
  contribution: string;
  outcome: string;
};

export type Project = {
  name: string;
  slug?: string;
  date: string;
  url: string;
  description: string;
  image?: string;
  imageAlignment?: string;
  featured: boolean;
  isContributor?: boolean;
  isSideQuest?: boolean;
  tech: string[];
  caseStudy?: ProjectCaseStudy;
};

export const projects: Project[] = [
  {
    name: "Hyperledger Besu",
    slug: "hyperledger-besu-rlp",
    date: "2026-07-16",
    url: "https://github.com/besu-eth/besu/pull/10736",
    description: "Fixed malformed raw transaction handling in the Java Ethereum client so empty RLP input returns JSON-RPC Invalid params instead of an internal server error. Added regression coverage across eight malformed payloads.",
    image: "/besu.webp",
    imageAlignment: "object-contain",
    isContributor: true,
    featured: true,
    tech: ["Java", "Ethereum", "JSON-RPC", "RLP", "JUnit"],
    caseStudy: {
      context: "Hyperledger Besu is an enterprise-grade Java Ethereum client for public, private, and permissioned networks. Its eth_sendRawTransaction method was misclassifying malformed client input as an internal server failure.",
      contribution: "Traced the 0x80 RLP payload to empty transaction bytes in TransactionDecoder, added an explicit validation guard, and covered eight malformed payload shapes with parameterized RPC tests that also verify the transaction pool is never touched.",
      outcome: "PR #10736 merged into main after maintainer review with 36 checks passing and no regressions in RPC compatibility Hive tests. The fix shipped in Besu 26.7.1.",
    },
  },
  {
    name: "Linux Foundation Hyperledger Fabric",
    slug: "hyperledger-fabric-ci",
    date: "2026-04-30",
    url: "https://github.com/hyperledger/fabric",
    description: "Merged a CI fix into the Linux Foundation's flagship enterprise blockchain framework, the same codebase running in production at IBM, Walmart, and HSBC. PR reviewed by core maintainers.",
    image: "/fabric.webp",
    imageAlignment: "object-contain",
    isContributor: true,
    featured: true,
    tech: ["Go", "GitHub Actions", "CI/CD", "Hyperledger Fabric"],
    caseStudy: {
      context: "Hyperledger Fabric is an enterprise blockchain framework maintained under the Linux Foundation.",
      contribution: "Investigated and fixed a broken CI workflow, then worked through review with core maintainers.",
      outcome: "The CI fix was merged upstream into the project’s main codebase.",
    },
  },
  {
    name: "Terramine",
    slug: "terramine",
    date: "2026-06-01",
    url: "https://github.com/accidental-stuff/mc-server",
    description: "Minecraft server deployed with infra-as-code on GCP. Terraform and Cloudflare handle networking and DNS, Caddy reverse-proxies, Docker Compose runs the workloads, backups land in Cloudflare R2.",
    featured: true,
    isSideQuest: true,
    tech: ["Terraform", "GCP", "Docker", "Caddy", "Cloudflare"],
    caseStudy: {
      context: "A Minecraft server needed repeatable infrastructure and reliable networking without manual server setup.",
      contribution: "Defined infrastructure with Terraform on GCP, configured Cloudflare DNS and networking, and ran workloads through Docker Compose and Caddy.",
      outcome: "The deployment, routing, and backup path are documented as infrastructure rather than one-off server configuration.",
    },
  },
  {
    name: "G-Tech MuLearn",
    slug: "gtech-mulearn",
    date: "2025-03-01",
    url: "https://github.com/gtech-mulearn/mulearnbackend",
    description: "Built APIs during my MuLearn internship: JWT authentication, company onboarding, and job management with Django and MySQL.",
    image: "/mulogo.webp",
    imageAlignment: "object-center",
    featured: true,
    tech: ["Python", "Django", "Database Design", "MySQL", "JWT auth"],
    caseStudy: {
      context: "MuLearn’s launchpad platform needed backend foundations for companies and students to use its job-management flows.",
      contribution: "Built Django and MySQL APIs for JWT authentication, company onboarding, and job management alongside frontend and design teams.",
      outcome: "The work shipped to a platform used by students across Kerala.",
    },
  },
  {
    name: "Mappix",
    slug: "mappix",
    date: "2026-05-01",
    url: "https://mappix.isacool.monster",
    description: "Real-time projection mapping in the browser. Point a webcam at a wall with sticky notes and physics balls bounce off them live. Built with Gray-code structured light calibration for sub-pixel accuracy and homography-based projector-camera mapping.",
    image: "/mappix.webp",
    imageAlignment: "object-center",
    featured: true,
    isSideQuest: true,
    tech: ["Vue.js", "JavaScript", "Computer Vision", "Matter.js", "WebRTC"],
    caseStudy: {
      context: "Projection mapping needs calibration that connects a physical wall and sticky notes to a browser-based experience.",
      contribution: "Built Gray-code structured-light calibration and homography-based projector-camera mapping, then connected it to real-time physics and webcam input.",
      outcome: "Users can point a webcam at a wall and see physics balls react to detected sticky notes in real time.",
    },
  },
  {
    name: "Notes Bot",
    date: "2024-06-01",
    url: "https://github.com/mishalshanavas/notes-bot",
    description: "Python script that updates your Instagram notes with the current time. Because typing the time manually was too much work.",
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
    description: "Automates changing your Instagram profile picture. Python script that talks to Instagram so you don't have to.",
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
    date: "2026-07-16",
    title: "Hyperledger Besu: fixed malformed RLP transaction handling",
    description:
      "Fixed eth_sendRawTransaction so malformed RLP payloads return JSON-RPC Invalid params instead of Internal Error, with regression coverage for eight invalid input shapes.",
    url: "https://github.com/besu-eth/besu/pull/10736",
    openSource: true,
  },
  {
    date: "2026-06-10",
    title: "networkmanager-git: AUR package maintainer",
    description:
      "Took over maintenance of the orphaned networkmanager-git AUR package for Arch Linux. Migrated the build to meson and resolved libsoup3 compatibility issues so it builds cleanly against upstream.",
    url: "https://aur.archlinux.org/packages/networkmanager-git",
    openSource: true,
  },
  {
    date: "2026-04-30",
    title: "Linux Foundation Hyperledger Fabric: fixed CI workflow",
    description:
      "Fixed a broken CI workflow in Hyperledger Fabric, the Linux Foundation's flagship blockchain framework. Runs in production at IBM, HSBC, and Walmart.",
    url: "https://github.com/hyperledger/fabric/",
    openSource: true,
  },
  {
    date: "2026-01-06",
    title: "sahrdaya.ac.in: reworked the entire college website",
    description:
      "Reworked the college website with Next.js: image optimization, incremental static regeneration, and performance fixes.",
    url: "https://github.com/arxhr007/sahrdaya_website",
  },
];
