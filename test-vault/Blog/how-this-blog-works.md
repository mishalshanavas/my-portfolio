---
title: "How This Blog Works (I Automated My Own Writing Workflow)"
date: "2025-12-23"
description: "That time I built an entire content pipeline because copy-pasting markdown felt like too much effort."
tags: ["Obsidian", "Automation", "Next.js", "GitHub Actions", "DevOps"]
slug: "how-this-blog-works"
draft: false
---

# How This Blog Works

It's 2 AM. I'm staring at my Next.js portfolio repo, manually copy-pasting a blog post from Obsidian, fixing broken links, re-uploading images, and questioning every life decision that led me here.

My brain: *"What if you never had to do this again?"*

And that's how I accidentally built an entire automated content pipeline instead of just... writing more blogs. **Peak developer energy**, right?

## The Problem: I'm Chronically Lazy

Here's the thing. I write in **Obsidian** because it's beautiful, it's local-first, and it makes me feel like a productivity influencer. But my portfolio runs on **Next.js** because I like pain and also because it's actually really good.

The problem? These two don't talk to each other. At all.

So every time I wanted to publish a post, I had to:

1. Write in Obsidian (the fun part)
2. Copy-paste to my repo (annoying)
3. Fix all the `[[wikilinks]]` that broke (painful)
4. Manually upload images (why)
5. Convert Obsidian callouts to JSX components (kill me)
6. Push to GitHub (finally)
7. Wait for deployment (eternal)

> [!note] The Realization
> I spent more time preparing posts for publishing than actually writing them. Something had to change.

## The Solution: Over-Engineering (Obviously)

Instead of accepting my fate like a normal person, I decided to build a fully automated pipeline that syncs my Obsidian vault to my blog. Because apparently I'd rather spend a weekend coding than 10 minutes copy-pasting.

**The architecture is stupid simple:**

```
Obsidian Vault → GitHub (private) → GitHub Actions → Portfolio Repo → Cloudflare Pages
```

One direction. No conflicts. No manual intervention. Just vibes.

> [!tip] The Best Part
> I write in Obsidian, save the file, and my blog updates itself. That's it. That's the whole workflow.

## How It Actually Works

### Step 1: Write Like a Normal Human

I open Obsidian, create a file in my `Blog/` folder, slap some frontmatter on it, and start typing. No special syntax. No weird formatting. Just markdown with Obsidian's nice features.

The frontmatter looks like this:

```yaml
---
title: "My Post Title"
date: "2025-12-23"
description: "A witty summary"
tags: ["tag1", "tag2"]
draft: false
---
```

Set `draft: true` and it stays private. Set it to `false` and it goes live. Revolutionary technology, I know.

### Step 2: GitHub Actions Does the Heavy Lifting

Every day at midnight (or when I'm impatient and trigger it manually), a GitHub Action wakes up and:

1. **Clones my private Obsidian vault** (the one with all my unhinged daily notes that nobody should ever see)
2. **Extracts only the Blog folder** (crisis averted)
3. **Converts Obsidian syntax to Next.js-compatible MDX**
4. **Copies images with proper naming** (no more conflicts)
5. **Commits everything to my portfolio repo**
6. **Cloudflare auto-deploys** because it's watching for commits

The whole thing takes like 30 seconds. I've spent longer deciding what to eat for dinner.

> [!warning] Security Note
> My private notes never touch the public repo. The action specifically extracts `Blog/` and ignores everything else. My 3 AM journal entries about existential dread remain safely private.

### Step 3: Magic Preprocessing

Here's where it gets fun. The preprocessing script handles all the Obsidian-specific syntax:

**Wikilinks** get converted automatically:
- `[[other-post]]` → proper blog links
- `[[post-title|Custom Text]]` → links with display text

**Callouts** become React components:
- `> [!note]` → `<Callout emoji="📝">`
- `> [!tip]` → `<Callout emoji="💡">`
- `> [!warning]` → `<Callout emoji="⚠️">`

**Images** get slug-prefixed to prevent conflicts:
- `![[screenshot.png]]` → `/blog-images/post-slug-screenshot.png`

All the annoying manual work I used to do? Automated. Gone. Deleted from my life.

## The Tech Stack

| Component | Tech | Why |
|-----------|------|-----|
| Writing | Obsidian | Because it sparks joy |
| Vault Backup | Git + Syncthing | Redundancy is my love language |
| Processing | TypeScript + Remark | Unified ecosystem goes hard |
| Hosting | Cloudflare Pages | Free tier is *chef's kiss* |
| Automation | GitHub Actions | 2000 free minutes/month |
| Framework | Next.js 15 | App Router supremacy |

> [!success] Total Monthly Cost
> $0.00. The entire pipeline runs on free tiers. My Azure-traumatized wallet is finally healing.

## Why Not Just Use a CMS?

Look, I considered it. Sanity, Contentful, Notion as a CMS — they're all valid options. But here's the thing:

1. **Vendor lock-in gives me anxiety**
2. **I already write in Obsidian anyway**
3. **Local-first means I can write offline** (crucial for those airplane productivity sessions that never actually happen)
4. **It was a fun weekend project** (the real reason)

Plus, building your own system means you understand every piece of it. When something breaks at 3 AM, I know exactly where to look. Usually it's my own fault, but at least I know *how* it's my fault.

> [!tip] The Real Flex
> My blog posts are just markdown files on my laptop. No databases. No APIs. No "the service is down" excuses. Just files.

## The Obsidian Experience

Writing in Obsidian hits different. I get:

- **Graph view** for seeing how my posts connect (even if I never look at it)
- **Backlinks** for free internal linking
- **Local files** that I actually own
- **Vim keybindings** because I hate myself (affectionately)
- **Custom CSS** to make it pretty

And when I'm done writing, I just... save. That's it. No "publish" button. No deployment. The automation handles everything.

## The Syncthing Saga (Device Sync Arc)

Here's where it gets even better. I write on multiple devices — laptop, desktop, sometimes my phone when inspiration hits at 3 AM in bed. The problem? Obsidian vaults don't magically sync themselves.

Enter **Syncthing** — the open-source, peer-to-peer file sync tool that makes Dropbox look like it's trying too hard.

The setup:
1. Install Syncthing on all my devices
2. Point it at my Obsidian vault
3. Watch files sync in real-time like magic
4. Never think about it again

Now I can start a post on my laptop, continue on my desktop, make edits on my phone, and everything just... works. No cloud storage middleman. No subscription fees. No "you've exceeded your storage limit" emails.

> [!tip] The Beautiful Part
> Syncthing + Git backup means my vault is synced across devices AND version-controlled. Triple redundancy. My data hoarding instincts are very satisfied.

The best part? When I save a file on any device, it syncs everywhere instantly. And since my vault is also backed up to a private GitHub repo, the blog automation picks it up from there. Write anywhere → sync everywhere → publish automatically.

It's like having my own personal iCloud, except it's free, I control it, and it doesn't randomly delete my files.

## Things That Went Wrong (Plot Twist Section)

Obviously, this wasn't smooth sailing. Here's my hall of shame:

**Attempt 1:** Tried to use remark plugins for everything. Turns out, Obsidian syntax is weird and plugins kept fighting each other. Solution: string-level preprocessing before remark even touches it.

**Attempt 2:** Forgot to filter draft posts. Accidentally published my unfinished rant about JavaScript frameworks. Had to speedrun a fix at 2 AM.

**Attempt 3:** Images weren't copying because I typo'd the assets path. Spent 20 minutes debugging what turned out to be "assests" instead of "assets". Classic.

> [!bug] The Dumbest Bug
> My callout converter broke on callouts with no content. Edge case that took an embarrassingly long time to find because I kept testing with *actual* content like a reasonable person.

## What I Learned

1. **Automation compounds** — 10 minutes saved per post × dozens of posts = hours of my life back
2. **GitHub Actions is criminally underrated** for personal projects
3. **Simple architectures win** — one-way data flow, no sync conflicts, no headaches
4. **The unified/remark ecosystem is powerful** once you stop fighting it
5. **Building tools for yourself is underrated** — I'll use this for years

## The Current Vibe

Right now, my workflow is:

1. Open Obsidian
2. Write
3. Save
4. Forget about it
5. Blog magically updates

No deploy buttons. No copy-pasting. No manual image uploads. Just writing and automated publishing.

Is it over-engineered for a personal blog? Probably.

Would I do it again? Absolutely.

Was it worth the weekend I spent building it instead of actually writing content? 

...Let's not answer that.

> [!quote] The Real Tea
> Sometimes the best productivity hack is spending 10 hours automating a 10-minute task. The math doesn't math, but the vibes? The vibes are immaculate.

## Try It Yourself?

If you're also an Obsidian user with a Next.js blog and too much free time, the whole setup is in my [[instagram-pfp|portfolio repo]]. Feel free to steal the workflow, judge my code, or tell me there was an easier way to do this the whole time.

The preprocessing script handles wikilinks, callouts, images, and frontmatter conversion. It's not pretty, but it works, and honestly that's all I ask from my code at this point.

---

*Built with Obsidian, automated with GitHub Actions, powered by the eternal developer urge to never do anything manually twice...*
