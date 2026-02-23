"use client";

import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "app/lib/config";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon, title }: { href: string; icon: React.ComponentType; title?: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      title={title} 
      aria-label={title}
      className="p-1 -m-1 hover:text-black dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 rounded"
    >
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-wrap text-lg gap-4 text-gray-600 dark:text-gray-400">
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
    <footer className="mt-16 sm:mt-24 pt-8 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <small className="text-gray-600 dark:text-gray-400 text-sm">
          <time>© {YEAR}</time>{" "}
          <a
            className="hover:text-black dark:hover:text-white transition-colors duration-200"
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            {metaData.title}
          </a>
        </small>
        <SocialLinks />
      </div>
    </footer>
  );
}
