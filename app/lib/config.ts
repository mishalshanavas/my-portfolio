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
  title: "I build backends, tinker with Linux, and make small ideas bigger than they need to be.",
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

export const projectCategories = [
  { id: "featured", label: "Featured", description: "My strongest engineering work." },
  { id: "open-source", label: "Open Source", description: "External contributions and package maintenance." },
  { id: "experiment", label: "Experiments", description: "Interesting things I build for fun and research." },
  { id: "archive", label: "Archive", description: "Older projects and early experiments." },
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
    description: "Fixed malformed RLP transaction handling in Besu so bad client input returns Invalid params instead of a server error. Added regression tests for eight invalid payloads; the fix was merged upstream and released.",
    seoTitle: "Fixing Malformed RLP Transactions in Hyperledger Besu",
    seoDescription: "How I fixed malformed RLP transaction handling in Hyperledger Besu so invalid eth_sendRawTransaction input returns Invalid params, with regression tests for eight payloads.",
    image: "/besu.webp",
    imageAlt: "Hyperledger Besu project mark",
    imageAlignment: "object-contain",
    role: "Open Source Contributor",
    result: "Merged upstream",
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
    category: "open-source",
    slug: "hyperledger-fabric-ci",
    date: "2026-04-30",
    updatedAt: "2026-08-26",
    url: "https://github.com/hyperledger/fabric",
    contributionUrl: "https://github.com/hyperledger/fabric/pull/5468",
    description: "Repaired Fabric's documentation link-check workflow: regex mistakes, an oversized response buffer, and a missing timeout. Revised the patch after maintainer review and got it merged upstream.",
    seoTitle: "Hyperledger Fabric Broken-Link CI Fix",
    seoDescription: "A Hyperledger Fabric case study covering broken-link checker regex fixes, safer response limits, workflow timeouts, maintainer review, and the merged upstream change.",
    image: "/fabric.webp",
    imageAlt: "Hyperledger Fabric project mark",
    imageAlignment: "object-contain",
    articleSlug: "hyperledger-fabric-ci",
    role: "Open Source Contributor",
    result: "Merged upstream",
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
    name: "networkmanager-git",
    category: "open-source",
    slug: "networkmanager-git",
    date: "2026-06-10",
    url: "https://aur.archlinux.org/packages/networkmanager-git",
    description: "Maintain the networkmanager-git AUR package, updating its Meson build and libsoup3 compatibility as NetworkManager changes. This is Arch packaging work, separate from upstream NetworkManager development.",
    seoTitle: "Maintaining the networkmanager-git AUR package",
    seoDescription: "Arch Linux AUR package maintenance for networkmanager-git: Meson build changes and libsoup3 compatibility, separate from upstream NetworkManager development.",
    image: "/aur.webp",
    imageAlt: "Arch User Repository logo",
    imageAlignment: "object-contain",
    role: "AUR Package Maintainer",
    result: "Maintained in AUR",
    tech: ["Arch Linux", "PKGBUILD", "Meson", "Bash", "libsoup3"],
    caseStudy: {
      context: "The networkmanager-git AUR package had been orphaned and needed updates to keep building against newer upstream NetworkManager sources.",
      contribution: "I took over the AUR package, moved its build recipe to Meson, and fixed a libsoup3 compatibility issue. This work is in the Arch packaging recipe; it is not a change to NetworkManager's upstream code.",
      outcome: "The package has a maintainer again and its build recipe tracks those upstream changes.",
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
    description: "Built a reproducible Minecraft server on GCP with Terraform, Docker, Caddy, Cloudflare DNS, and off-site R2 backups. The server can be rebuilt from code and restored from a backup.",
    seoTitle: "Terraform Minecraft Server on GCP",
    seoDescription: "A reproducible Minecraft server on GCP using Terraform, Docker Compose, Caddy, Cloudflare DNS, and automated off-site backups to Cloudflare R2.",
    articleSlug: "terramine",
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
    category: "featured",
    slug: "gtech-mulearn",
    date: "2025-03-01",
    updatedAt: "2026-08-26",
    url: "https://github.com/gtech-mulearn/mulearnbackend",
    description: "Built Django and MySQL APIs for JWT login, company onboarding, and job management on MuLearn's Launchpad. Worked with frontend and design teammates as the real interface shaped those flows.",
    seoTitle: "Django APIs for MuLearn Launchpad",
    seoDescription: "Backend internship case study: Django and MySQL APIs for JWT authentication, company onboarding, and job-management workflows on MuLearn Launchpad.",
    image: "/mulogo.webp",
    imageAlt: "GTech MuLearn project mark",
    coverImage: "/mulearn.png",
    coverImageAlt: "GTech MuLearn branding for the Launchpad platform",
    imageAlignment: "object-center",
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
    name: "file-spooder",
    category: "featured",
    slug: "file-spooder",
    date: "2026-08-09",
    updatedAt: "2026-10-01",
    url: "https://files.mishalshanavas.in",
    description: "Built a Cloudflare Workers and R2 file shelf so I can share files by link or open them on a college projector without signing into email. Added private management, multipart uploads, and byte-range downloads.",
    seoTitle: "file-spooder: a file shelf for any device",
    seoDescription: "How a college seminar annoyance became a small public file shelf built with Cloudflare Workers and R2.",
    articleSlug: "file-spooder",
    tech: ["Cloudflare Workers", "R2", "JavaScript", "HTTP"],
    caseStudy: {
      context: "At college, I wanted to open a file on a seminar projector without signing into my email on a shared machine or sending it to somebody else's inbox. I also wanted a quick place for the random things I share with friends.",
      contribution: "I built a small file shelf on my own domain. Anyone with a link can open a file; upload and management actions need my password. A Cloudflare Worker handles the requests and R2 holds the files.",
      outcome: "Now I can upload something once and open the link on my phone, a friend's device, or the classroom projector. The projector gets the file, not a tour of my inbox.",
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
    description: "Built a browser projection-mapping experiment where webcam-detected sticky notes become obstacles for projected physics. Gray-code calibration and a homography align the camera and projector views.",
    seoTitle: "Browser Projection Mapping with Gray-Code Calibration",
    seoDescription: "How Mappix maps a webcam to a projector in the browser using Gray-code structured light, homography calibration, WebRTC, and Matter.js physics.",
    image: "/mappix.webp",
    imageAlt: "Mappix browser projection-mapping demonstration",
    imageAlignment: "object-center",
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
    category: "archive",
    date: "2024-06-01",
    url: "https://github.com/mishalshanavas/notes-bot",
    description: "Python script that updates your Instagram notes with the current time. Because typing the time manually was too much work.",
    image: "/notes.gif",
    imageAlignment: "object-left",
    tech: ["Python"],
  },
  {
    name: "Instagram PFP Switcher",
    category: "archive",
    date: "2024-02-15",
    url: "/blog/instagram-pfp",
    description: "Automates changing your Instagram profile picture. Python script that talks to Instagram so you don't have to.",
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
