import SocialIcon from "~/components/social-icons";
import siteMetadata from "~/data/siteMetadata";
import Link from "./Link";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <nav className="mb-3 flex space-x-4" aria-label="Social Media">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            className="size-6"
          />
          <SocialIcon
            kind="github"
            href={siteMetadata.github}
            className="size-6"
          />
          <SocialIcon
            kind="facebook"
            href={siteMetadata.facebook}
            className="size-6"
          />
          <SocialIcon
            kind="youtube"
            href={siteMetadata.youtube}
            className="size-6"
          />
          <SocialIcon
            kind="linkedin"
            href={siteMetadata.linkedin}
            className="size-6"
          />
          <SocialIcon
            kind="twitter"
            href={siteMetadata.twitter}
            className="size-6"
          />
          <SocialIcon kind="x" href={siteMetadata.x} className="size-6" />
          <SocialIcon
            kind="instagram"
            href={siteMetadata.instagram}
            className="size-6"
          />
          <SocialIcon
            kind="threads"
            href={siteMetadata.threads}
            className="size-6"
          />
        </nav>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  );
}
