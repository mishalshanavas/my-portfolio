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
    "Backend developer from Kerala working on APIs, infrastructure, Linux tooling, and open-source fixes."
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
  title: "I build backends, fix things in open source, and give small ideas their own infrastructure.",
  imageLight: "/profile-wt.webp",
  imageDark: "/profile-bl.webp",
  resumeUrl: "/resume.pdf",
};
export const contact = {
  text: `Reach me at <a href="mailto:mishalshanavas@yahoo.com" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">mishalshanavas@yahoo.com</a> or on <a href="https://www.linkedin.com/in/mishalshanavas" target="_blank" rel="noopener noreferrer" class="text-black dark:text-white border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors">LinkedIn</a>.`,
};

export const aboutMe = `Hey, I'm Mishal, a **backend developer** and CS student from Kerala. I work mostly with **Python**, **Django**, databases, and APIs. I've built backend flows for MuLearn, fixed bugs in Hyperledger projects, and adopted an AUR package that needed a maintainer. I also like Linux, learning **Rust**, and building little tools for problems I could probably live with. Probably.`

export const experiences = [
  {
    role: "Open-source Package Maintainer",
    company: "networkmanager-git",
    companyUrl: "https://aur.archlinux.org/packages/networkmanager-git",
    period: "2026 - Present",
    startDate: "2026-06-10",
    description:
      "I adopted the orphaned networkmanager-git AUR package and maintain its build recipe. So far, I've updated it for Meson and fixed a libsoup3 compatibility issue. This is Arch packaging work, not upstream NetworkManager development."
  },
  {
    role: "Backend Developer - Intern",
    company: "GTech MuLearn",
    companyUrl: "https://gtechmulearn.com",
    period: "2025 - 2026",
    startDate: "2025-01-01",
    description:
      "I built Django APIs for JWT login, company onboarding, and job management on MuLearn's Launchpad. I worked with frontend and design teammates to make those flows work in the actual product."
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

export const projectCategories = [
  { id: "featured", label: "Featured", description: "The builds and backend work that best show what I can do." },
  { id: "open-source", label: "Open Source", description: "Fixes merged upstream and an Arch package I maintain." },
  { id: "experiment", label: "Experiments", description: "Ideas I built to see if they would work." },
  { id: "archive", label: "Archive", description: "Smaller projects from earlier on." },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];

export type Project = {
  name: string;
  category: ProjectCategory;
  slug?: string;
  date: string;
  updatedAt?: string;
  url: string;
  contributionUrl?: string;
  description: string;
  homeDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
  imageAlt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  imageAlignment?: string;
  articleSlug?: string;
  role?: string;
  result?: string;
  tech: string[];
  caseStudy?: ProjectCaseStudy;
};

export const projects: Project[] = [
  {
    name: "Hyperledger Besu",
    category: "open-source",
    slug: "hyperledger-besu-rlp",
    date: "2026-07-16",
    updatedAt: "2026-08-26",
    url: "https://github.com/besu-eth/besu/pull/10736",
    description: "Fixed Besu's malformed RLP validation so bad transactions return Invalid params. Added tests for eight payloads; merged and released upstream.",
    homeDescription: "Fixed Besu's malformed transaction validation and tested eight invalid payloads. Merged upstream.",
    seoTitle: "Fixing Malformed RLP Transactions in Hyperledger Besu",
    seoDescription: "I fixed malformed RLP transaction validation in Hyperledger Besu, added regression tests for eight invalid payloads, and got the change merged upstream.",
    image: "/besu.webp",
    imageAlt: "Hyperledger Besu project mark",
    imageAlignment: "object-contain",
    role: "Open Source Contributor",
    result: "Merged upstream",
    tech: ["Java", "Ethereum", "JSON-RPC", "RLP", "JUnit"],
    caseStudy: {
      context: "Besu is a Java Ethereum client. An empty RLP transaction payload was being reported as a server error, even though the client had sent invalid input.",
      contribution: "I traced the 0x80 payload to TransactionDecoder, added the missing validation, and wrote parameterized tests for eight malformed inputs. The tests check that none reaches the transaction pool.",
      outcome: "The fix passed 36 checks and RPC compatibility tests, was merged by the maintainers, and shipped in Besu 26.7.1. One byte caused quite a detour.",
      highlights: [
        "Traced an empty RLP transaction payload through the JSON-RPC and transaction-decoding path.",
        "Changed malformed client input from an internal server error to the correct Invalid params response.",
        "Added parameterized regression coverage for eight invalid payload shapes and verified the transaction pool stays untouched.",
      ],
    },
  },
  {
    name: "Linux Foundation Hyperledger Fabric",
    category: "open-source",
    slug: "hyperledger-fabric-ci",
    date: "2026-04-30",
    updatedAt: "2026-08-26",
    url: "https://github.com/hyperledger/fabric",
    contributionUrl: "https://github.com/hyperledger/fabric/pull/5468",
    description: "Fixed Fabric's documentation link checker: regexes, response limit, and timeout. Revised the patch after maintainer review; merged upstream.",
    homeDescription: "Fixed Fabric's documentation link checker and workflow limits. Merged upstream after review.",
    seoTitle: "Hyperledger Fabric Broken-Link CI Fix",
    seoDescription: "How I fixed Hyperledger Fabric's documentation link-check workflow, tested the regex changes, responded to maintainer review, and merged the patch upstream.",
    image: "/fabric.webp",
    imageAlt: "Hyperledger Fabric project mark",
    imageAlignment: "object-contain",
    articleSlug: "hyperledger-fabric-ci",
    role: "Open Source Contributor",
    result: "Merged upstream",
    tech: ["Go", "GitHub Actions", "CI/CD", "Hyperledger Fabric"],
    caseStudy: {
      context: "Fabric runs a scheduled workflow to check links across several documentation versions. Its regexes and workflow settings meant some checks were not doing what they appeared to do.",
      contribution: "I corrected the regexes and job names, reduced the response buffer, and added timeouts. A maintainer caught an exclusion that was too broad; I tested the edge case and narrowed it.",
      outcome: "The revised patch was merged upstream. The review was a good reminder that a link checker is only useful if its exclusions are as carefully tested as its matches.",
      highlights: [
        "Corrected version, hostname, and character-range regexes without hiding valid documentation links.",
        "Reduced an INT32_MAX response buffer to a practical limit and added a 45-minute job timeout based on observed runs.",
        "Responded to maintainer review by narrowing an over-broad exclusion before the change was merged upstream.",
      ],
    },
  },
  {
    name: "networkmanager-git",
    category: "open-source",
    slug: "networkmanager-git",
    date: "2026-06-10",
    url: "https://aur.archlinux.org/packages/networkmanager-git",
    description: "Adopted and maintain the networkmanager-git AUR package. Updated its Meson build and libsoup3 compatibility; this is Arch packaging work.",
    homeDescription: "Maintain networkmanager-git in the AUR; updated its Meson build and libsoup3 compatibility.",
    seoTitle: "Maintaining the networkmanager-git AUR package",
    seoDescription: "Maintaining the networkmanager-git AUR package, including Meson build updates and a libsoup3 compatibility fix in the Arch packaging recipe.",
    image: "/aur.webp",
    imageAlt: "Arch User Repository logo",
    imageAlignment: "object-contain",
    role: "AUR Package Maintainer",
    result: "Maintained in AUR",
    tech: ["Arch Linux", "PKGBUILD", "Meson", "Bash", "libsoup3"],
    caseStudy: {
      context: "The networkmanager-git AUR package was orphaned, and its build recipe needed attention as upstream NetworkManager changed.",
      contribution: "I adopted the package, updated its Meson build recipe, and fixed a libsoup3 compatibility issue. These changes live in the AUR package, not NetworkManager's source code.",
      outcome: "The package has a maintainer again, and its recipe accounts for those upstream build changes.",
      highlights: [
        "Adopted the orphaned networkmanager-git package in the Arch User Repository.",
        "Updated the package build for Meson and fixed a libsoup3 compatibility issue.",
        "Maintain the AUR packaging separately from upstream NetworkManager development.",
      ],
    },
  },
  {
    name: "Terramine",
    category: "featured",
    slug: "terramine",
    date: "2026-06-01",
    updatedAt: "2026-08-26",
    url: "https://github.com/accidental-stuff/mc-server",
    description: "Made a Minecraft server reproducible with Terraform on GCP and Docker. Added HTTPS and off-site R2 backups so I can rebuild and restore it.",
    homeDescription: "A Minecraft server I can rebuild with Terraform on GCP, Docker, HTTPS, and off-site R2 backups.",
    seoTitle: "Terraform Minecraft Server on GCP",
    seoDescription: "How I made a Minecraft server reproducible with Terraform on GCP, Docker Compose, Caddy, Cloudflare DNS, and off-site R2 backups.",
    articleSlug: "terramine",
    tech: ["Terraform", "GCP", "Docker", "Caddy", "Cloudflare"],
    caseStudy: {
      context: "I wanted a Minecraft server for friends. Setting it up by clicking through cloud dashboards worked once, but gave me no reliable way to rebuild it.",
      contribution: "I defined the GCP infrastructure in Terraform, set up Cloudflare DNS and Caddy for the web panel, and ran the services with Docker Compose. Scheduled backups copy the world to R2.",
      outcome: "The server can be rebuilt from code, the panel has HTTPS, and the world has a restore path outside the VM. A lot of infrastructure for a few blocks, admittedly.",
      highlights: [
        "Provisioned the VM, network, firewall rules, static IP, DNS records, and SRV record as Terraform-managed infrastructure.",
        "Kept the Crafty admin service private behind Caddy while supporting HTTPS and live WebSocket console traffic.",
        "Made bootstrap and restore operations repeatable, with scheduled backups copied away from the VM to R2.",
      ],
    },
  },
  {
    name: "G-Tech MuLearn",
    category: "featured",
    slug: "gtech-mulearn",
    date: "2025-03-01",
    updatedAt: "2026-08-26",
    url: "https://github.com/gtech-mulearn/mulearnbackend",
    description: "Built Django and MySQL APIs for JWT login, company onboarding, and jobs on MuLearn Launchpad, working with frontend and design teammates.",
    homeDescription: "Built Django APIs for login, company onboarding, and job management on MuLearn Launchpad.",
    seoTitle: "Django APIs for MuLearn Launchpad",
    seoDescription: "My backend internship work on MuLearn Launchpad: Django and MySQL APIs for JWT login, company onboarding, and job management.",
    image: "/mulogo.webp",
    imageAlt: "GTech MuLearn project mark",
    coverImage: "/mulearn.png",
    coverImageAlt: "GTech MuLearn branding for the Launchpad platform",
    imageAlignment: "object-center",
    tech: ["Python", "Django", "Database Design", "MySQL", "JWT auth"],
    caseStudy: {
      context: "Launchpad connects students with companies and jobs. Its frontend needed backend flows for accounts, company onboarding, and job management.",
      contribution: "I built those APIs in Django with MySQL and JWT authentication. I worked with frontend and design teammates as the interface requirements changed.",
      outcome: "Those flows went into the platform used by MuLearn students across Kerala. Building for a real interface taught me more than building endpoints in isolation.",
      highlights: [
        "Implemented JWT-based authentication flows for clients consuming the Django API.",
        "Modelled company onboarding and job-management operations in MySQL-backed endpoints.",
        "Coordinated API contracts with frontend and design teammates as real interface requirements evolved.",
      ],
    },
  },
  {
    name: "file-spooder",
    category: "featured",
    slug: "file-spooder",
    date: "2026-08-09",
    updatedAt: "2026-10-01",
    url: "https://files.mishalshanavas.in",
    description: "Built a Cloudflare Workers and R2 file shelf for quick sharing and college projectors. Password-protected uploads, public links, and video seeking.",
    homeDescription: "A file shelf for college projectors and quick sharing, built with Cloudflare Workers and R2.",
    seoTitle: "file-spooder: a file shelf for any device",
    seoDescription: "A Cloudflare Workers and R2 file shelf for sharing links across devices, with private management, multipart uploads, and byte-range downloads.",
    articleSlug: "file-spooder",
    tech: ["Cloudflare Workers", "R2", "JavaScript", "HTTP"],
    caseStudy: {
      context: "At college, I needed to open files on a shared seminar projector without logging into my email there. I also wanted an easy way to share random files with friends.",
      contribution: "I built a file shelf on my own domain with a Cloudflare Worker and R2. Anyone with a link can view a file; uploads and management need a password. Multipart uploads and range requests handle bigger files and video seeking.",
      outcome: "I can upload a file once and open it from my phone, another device, or the classroom projector. My inbox stays off the projector, which is the whole point.",
      highlights: [
        "Built public file links with password-protected upload, rename, move, copy, and delete actions.",
        "Added multipart uploads for large files and byte-range responses so videos can seek without downloading from the start.",
        "Made folder listings paginated and copy operations careful about failures, because even a silly file shelf should keep the files intact.",
      ],
    },
  },
  {
    name: "Mappix",
    category: "experiment",
    slug: "mappix",
    date: "2026-05-01",
    updatedAt: "2026-08-26",
    url: "https://mappix.isacool.monster",
    description: "Made projected balls bounce off real sticky notes. Gray-code calibration and a homography align webcam and projector views for browser physics.",
    seoTitle: "Browser Projection Mapping with Gray-Code Calibration",
    seoDescription: "How I built Mappix, a browser projection-mapping experiment using Gray-code calibration, a homography, webcam input, and Matter.js physics.",
    image: "/mappix.webp",
    imageAlt: "Mappix browser projection-mapping demonstration",
    imageAlignment: "object-center",
    tech: ["Vue.js", "JavaScript", "Computer Vision", "Matter.js", "WebRTC"],
    caseStudy: {
      context: "A webcam and a projector see the same wall from different angles. To make projected objects react to real sticky notes, the browser first has to match those two views.",
      contribution: "I used Gray-code structured light to calibrate the projector, calculated a homography to map the webcam view, and connected the detected shapes to a Matter.js simulation.",
      outcome: "Stick shapes on a wall and projected balls collide with them in real time. It is computer vision applied to a wall toy, which feels about right.",
      highlights: [
        "Projected a Gray-code sequence so the webcam could identify projector coordinates across the physical surface.",
        "Calculated a homography that translates the camera perspective into the projector's coordinate space.",
        "Fed detected wall geometry into a Matter.js simulation so projected objects react in real time.",
      ],
    },
  },
  {
    name: "Notes Bot",
    category: "archive",
    date: "2024-06-01",
    url: "https://github.com/mishalshanavas/notes-bot",
    description: "A Python script that puts the current time in my Instagram note. Tiny automation for a task nobody asked me to automate.",
    image: "/notes.gif",
    imageAlignment: "object-left",
    tech: ["Python"],
  },
  {
    name: "Instagram PFP Switcher",
    category: "archive",
    date: "2024-02-15",
    url: "/blog/instagram-pfp",
    description: "A Python bot that changes my Instagram profile picture on a schedule, with saved sessions and retries. A very early side project.",
    image: "/pfp.gif",
    imageAlignment: "object-left",
    tech: ["Python"],
  },
];

export const launches = [
  {
    date: "2026-05-01",
    title: "Mappix",
    description:
      "Launched Mappix, a browser experiment that makes projected balls bounce off sticky notes on a real wall.",
    url: "https://mappix.isacool.monster",
  },
];

export const contributionHighlights = [
  {
    date: "2026-07-16",
    title: "Hyperledger Besu: fixed malformed RLP transaction handling",
    description:
      "Fixed validation for malformed RLP transactions so Besu returns a client error, with regression tests for eight invalid payloads.",
    url: "https://github.com/besu-eth/besu/pull/10736",
    openSource: true,
  },
  {
    date: "2026-06-10",
    title: "networkmanager-git: AUR package maintainer",
    description:
      "Adopted the orphaned AUR package and updated its build recipe for Meson and libsoup3 compatibility.",
    url: "https://aur.archlinux.org/packages/networkmanager-git",
    openSource: true,
  },
  {
    date: "2026-04-30",
    title: "Linux Foundation Hyperledger Fabric: fixed CI workflow",
    description:
      "Fixed Fabric's documentation link checker, including regexes and workflow limits; revised the patch after review and got it merged.",
    url: "https://github.com/hyperledger/fabric/",
    openSource: true,
  },
  {
    date: "2026-01-06",
    title: "sahrdaya.ac.in: reworked the entire college website",
    description:
      "Reworked my college website with Next.js, image optimization, and incremental static regeneration to improve load times.",
    url: "https://github.com/arxhr007/sahrdaya_website",
  },
];
