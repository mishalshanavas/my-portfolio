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
    "Backend developer from Kerala. I build APIs, automate things, mess with cloud infrastructure, and occasionally fix bugs in large open-source projects."
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
  title: "Backend developer who likes APIs, Linux, and cloud stuff",
  imageLight: "/profile-wt.webp",
  imageDark: "/profile-bl.webp",
  resumeUrl: "/resume.pdf",
};
export const contact = {
  text: `Reach me at <a href="mailto:mishalshanavas@yahoo.com" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">mishalshanavas@yahoo.com</a> or on <a href="https://www.linkedin.com/in/mishalshanavas" target="_blank" rel="noopener noreferrer" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">LinkedIn</a>.`,
};

export const aboutMe = `Hey, I'm Mishal, a **backend developer** and CS student from Kerala. I mostly work with **Python**, **Django**, databases, and APIs—the parts of a product you do not see until they stop working. I also like automating boring jobs and turning suspiciously small ideas into cloud infrastructure. Lately I have been learning **Rust**, contributing to open source, maintaining an AUR package, and tweaking my Arch setup for the hundredth time. I sometimes help people on Reddit too.`

export const experiences = [
  {
    role: "Open-source Package Maintainer",
    company: "networkmanager-git",
    companyUrl: "https://aur.archlinux.org/packages/networkmanager-git",
    period: "2026 - Present",
    startDate: "2026-06-10",
    description:
      "I took over an orphaned Arch Linux package and now keep it building against upstream NetworkManager. So far that has meant moving the build to Meson, fixing a libsoup3 compatibility issue, and learning that package maintenance is mostly detective work."
  },
  {
    role: "Backend Developer - Intern",
    company: "GTech MuLearn",
    companyUrl: "https://gtechmulearn.com",
    period: "2025 - 2026",
    startDate: "2025-01-01",
    description:
      "I worked on the Django backend behind MuLearn's Launchpad. My part covered JWT login, company onboarding, and job-management APIs, with plenty of back-and-forth with the frontend and design teams before everything behaved."
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
  highlights: string[];
};

export type Project = {
  name: string;
  slug?: string;
  date: string;
  updatedAt?: string;
  url: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
  imageAlt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  imageAlignment?: string;
  articleSlug?: string;
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
    updatedAt: "2026-08-26",
    url: "https://github.com/besu-eth/besu/pull/10736",
    description: "A tiny malformed Ethereum transaction was making Besu respond with a server error. I traced it through the Java code, fixed the validation, and added tests for eight different bad inputs.",
    seoTitle: "Fixing Malformed RLP Transactions in Hyperledger Besu",
    seoDescription: "How I fixed malformed RLP transaction handling in Hyperledger Besu so invalid eth_sendRawTransaction input returns Invalid params, with regression tests for eight payloads.",
    image: "/besu.webp",
    imageAlt: "Hyperledger Besu project mark",
    imageAlignment: "object-contain",
    isContributor: true,
    featured: true,
    tech: ["Java", "Ethereum", "JSON-RPC", "RLP", "JUnit"],
    caseStudy: {
      context: "Besu is a Java Ethereum client. One odd input—an RLP payload containing no transaction bytes—was slipping through as if the server had broken, even though the client had simply sent bad data.",
      contribution: "I followed the 0x80 payload down to TransactionDecoder, added the missing validation, and wrote parameterized tests for eight malformed inputs. The tests also make sure none of them ever reach the transaction pool.",
      outcome: "The maintainers merged the fix after all 36 checks passed. It also cleared the RPC compatibility tests and went out in Besu 26.7.1. Tiny input, surprisingly long journey.",
      highlights: [
        "Traced an empty RLP transaction payload through the JSON-RPC and transaction-decoding path.",
        "Changed malformed client input from an internal server error to the correct Invalid params response.",
        "Added parameterized regression coverage for eight invalid payload shapes and verified the transaction pool stays untouched.",
      ],
    },
  },
  {
    name: "Linux Foundation Hyperledger Fabric",
    slug: "hyperledger-fabric-ci",
    date: "2026-04-30",
    updatedAt: "2026-08-26",
    url: "https://github.com/hyperledger/fabric",
    description: "I found a documentation checker with a few bad regexes and an enormous buffer. The cleanup survived maintainer review and became my first merged change in Hyperledger Fabric.",
    seoTitle: "Hyperledger Fabric Broken-Link CI Fix",
    seoDescription: "A Hyperledger Fabric case study covering broken-link checker regex fixes, safer response limits, workflow timeouts, maintainer review, and the merged upstream change.",
    image: "/fabric.webp",
    imageAlt: "Hyperledger Fabric project mark",
    imageAlignment: "object-contain",
    articleSlug: "hyperledger-fabric-ci",
    isContributor: true,
    featured: true,
    tech: ["Go", "GitHub Actions", "CI/CD", "Hyperledger Fabric"],
    caseStudy: {
      context: "Hyperledger Fabric has a scheduled workflow that checks links across several versions of its documentation. A handful of small mistakes meant the checker was not quite checking what it thought it was.",
      contribution: "I fixed the regexes, corrected the job names, reduced a wildly oversized response buffer, and added sensible timeouts. Review caught one assumption I had wrong, so I went back, tested it properly, and updated the patch.",
      outcome: "The maintainers merged the change. More importantly, I got a very practical introduction to contributing to a large project: read carefully, explain your choices, and do not argue with the regex tests.",
      highlights: [
        "Corrected version, hostname, and character-range regexes without hiding valid documentation links.",
        "Reduced an INT32_MAX response buffer to a practical limit and added a 45-minute job timeout based on observed runs.",
        "Responded to maintainer review by narrowing an over-broad exclusion before the change was merged upstream.",
      ],
    },
  },
  {
    name: "Terramine",
    slug: "terramine",
    date: "2026-06-01",
    updatedAt: "2026-08-26",
    url: "https://github.com/accidental-stuff/mc-server",
    description: "It started as “let's host Minecraft” and somehow became Terraform, Docker, automatic TLS, Cloudflare DNS, and off-site backups. At least rebuilding the server is easy now.",
    seoTitle: "Terraform Minecraft Server on GCP",
    seoDescription: "A reproducible Minecraft server on GCP using Terraform, Docker Compose, Caddy, Cloudflare DNS, and automated off-site backups to Cloudflare R2.",
    articleSlug: "terramine",
    featured: true,
    isSideQuest: true,
    tech: ["Terraform", "GCP", "Docker", "Caddy", "Cloudflare"],
    caseStudy: {
      context: "The original plan was to put a Minecraft server online for friends. Clicking through cloud dashboards worked once, but it left no reliable way to rebuild the thing when I inevitably broke it.",
      contribution: "I described the GCP infrastructure in Terraform, wired up Cloudflare DNS, put Caddy in front of the web panel, and ran the services with Docker Compose. Backups go to R2 because trusting one VM with a Minecraft world feels brave in the wrong way.",
      outcome: "The server can now be rebuilt from code, the web panel has proper HTTPS, and the world has an off-site restore path. A completely reasonable amount of infrastructure for placing blocks with friends.",
      highlights: [
        "Provisioned the VM, network, firewall rules, static IP, DNS records, and SRV record as Terraform-managed infrastructure.",
        "Kept the Crafty admin service private behind Caddy while supporting HTTPS and live WebSocket console traffic.",
        "Made bootstrap and restore operations repeatable, with scheduled backups copied away from the VM to R2.",
      ],
    },
  },
  {
    name: "G-Tech MuLearn",
    slug: "gtech-mulearn",
    date: "2025-03-01",
    updatedAt: "2026-08-26",
    url: "https://github.com/gtech-mulearn/mulearnbackend",
    description: "My internship work on MuLearn's Launchpad: JWT login, company onboarding, and job-management APIs built with Django and MySQL.",
    seoTitle: "Django APIs for MuLearn Launchpad",
    seoDescription: "Backend internship case study: Django and MySQL APIs for JWT authentication, company onboarding, and job-management workflows on MuLearn Launchpad.",
    image: "/mulogo.webp",
    imageAlt: "GTech MuLearn project mark",
    coverImage: "/mulearn.png",
    coverImageAlt: "GTech MuLearn branding for the Launchpad platform",
    imageAlignment: "object-center",
    featured: true,
    tech: ["Python", "Django", "Database Design", "MySQL", "JWT auth"],
    caseStudy: {
      context: "Launchpad connects students with companies and job opportunities. The frontend needed a backend that could handle accounts, company onboarding, and the full job flow without turning every request into a special case.",
      contribution: "I built the Django and MySQL APIs for JWT authentication, onboarding, and job management. I also worked directly with frontend and design teammates whenever the neat API plan met the messier real interface.",
      outcome: "Those flows made it into the platform used by MuLearn students across Kerala. It was my first proper lesson in building for other people, not just for localhost.",
      highlights: [
        "Implemented JWT-based authentication flows for clients consuming the Django API.",
        "Modelled company onboarding and job-management operations in MySQL-backed endpoints.",
        "Coordinated API contracts with frontend and design teammates as real interface requirements evolved.",
      ],
    },
  },
  {
    name: "Mappix",
    slug: "mappix",
    date: "2026-05-01",
    updatedAt: "2026-08-26",
    url: "https://mappix.isacool.monster",
    description: "Point a webcam at sticky notes on a wall and projected balls bounce off them. It runs in the browser, which sounded much simpler before I learned about camera-projector calibration.",
    seoTitle: "Browser Projection Mapping with Gray-Code Calibration",
    seoDescription: "How Mappix maps a webcam to a projector in the browser using Gray-code structured light, homography calibration, WebRTC, and Matter.js physics.",
    image: "/mappix.webp",
    imageAlt: "Mappix browser projection-mapping demonstration",
    imageAlignment: "object-center",
    featured: true,
    isSideQuest: true,
    tech: ["Vue.js", "JavaScript", "Computer Vision", "Matter.js", "WebRTC"],
    caseStudy: {
      context: "A projector and a webcam see the same wall from completely different angles. Before anything can bounce off a real sticky note, the browser has to work out how those two views line up.",
      contribution: "I built Gray-code structured-light calibration, used a homography to map the camera view to the projector, and connected the result to webcam input and a small physics simulation.",
      outcome: "You can stick shapes on a wall and watch projected balls collide with them live. It is part computer vision experiment, part unnecessarily advanced wall toy.",
      highlights: [
        "Projected a Gray-code sequence so the webcam could identify projector coordinates across the physical surface.",
        "Calculated a homography that translates the camera perspective into the projector's coordinate space.",
        "Fed detected wall geometry into a Matter.js simulation so projected objects react in real time.",
      ],
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
      "Put Mappix online: a browser experiment where projected physics reacts to sticky notes on a real wall.",
    url: "https://mappix.isacool.monster",
  },
];

export const contributionHighlights = [
  {
    date: "2026-07-16",
    title: "Hyperledger Besu: fixed malformed RLP transaction handling",
    description:
      "Tracked down why one malformed transaction looked like a server crash, fixed the response, and added tests for eight ways clients could send bad input.",
    url: "https://github.com/besu-eth/besu/pull/10736",
    openSource: true,
  },
  {
    date: "2026-06-10",
    title: "networkmanager-git: AUR package maintainer",
    description:
      "Adopted an orphaned Arch package, moved its build to Meson, and fixed a libsoup3 issue so it behaves with upstream again.",
    url: "https://aur.archlinux.org/packages/networkmanager-git",
    openSource: true,
  },
  {
    date: "2026-04-30",
    title: "Linux Foundation Hyperledger Fabric: fixed CI workflow",
    description:
      "Cleaned up a broken documentation workflow, learned a few things during review, and got the patch merged by Fabric's maintainers.",
    url: "https://github.com/hyperledger/fabric/",
    openSource: true,
  },
  {
    date: "2026-01-06",
    title: "sahrdaya.ac.in: reworked the entire college website",
    description:
      "Reworked my college website with Next.js, faster images, incremental static regeneration, and fewer reasons to stare at a loading screen.",
    url: "https://github.com/arxhr007/sahrdaya_website",
  },
];
