"use client";

import React from "react";
import Link from "next/link";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "../lib/config";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon, title }: { href: string; icon: React.ComponentType; title?: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      title={title} 
      aria-label={title}
      className="p-2.5 -m-2.5 text-gray-500 dark:text-gray-400 hover:text-[color:var(--accent)] transition-colors duration-150 rounded"
    >
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap text-lg gap-4 text-gray-500 dark:text-gray-400">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} title="Twitter/X" />
      <SocialLink href={socialLinks.github} icon={FaGithub} title="GitHub" />
      <SocialLink href={socialLinks.instagram} icon={FaInstagram} title="Instagram" />
      <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} title="LinkedIn" />
      <SocialLink href={socialLinks.email} icon={TbMailFilled} title="Email" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-24 pt-6 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <small className="text-gray-500 dark:text-gray-400 text-sm font-normal">
          <time>© {YEAR}</time>{" "}
          <Link
            className="hover:text-[color:var(--accent)] transition-colors duration-150"
            href="/"
          >
            {metaData.title}
          </Link>
        </small>
        <SocialLinks />
      </div>
    </footer>
  );
}
