"use client";

import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaRss,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "app/lib/config";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon, title }: { href: string; icon: React.ComponentType; title?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title} aria-label={title}>
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-lg gap-3.5 float-right transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} title="Twitter/X" />
      <SocialLink href={socialLinks.github} icon={FaGithub} title="GitHub" />
      <SocialLink href={socialLinks.instagram} icon={FaInstagram} title="Instagram" />
      <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} title="LinkedIn" />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} title="Email" />
      <SocialLink href="/rss.xml" icon={FaRss} title="RSS Feed" />
    </div>
  );
}

export default function Footer() {
  return (
    <small className="block lg:mt-24 mt-16 text-[#1C1C1C] dark:text-[#D4D4D4]">
      <time>© {YEAR}</time>{" "}
      <a
        className="no-underline"
        href={socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
      >
        {metaData.title}
      </a>
      <style jsx>{`
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
      <SocialLinks />
    </small>
  );
}
