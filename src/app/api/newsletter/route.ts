import { NewsletterAPI } from "pliny/newsletter";
import type { NewsletterConfig } from "pliny/newsletter";
import siteMetadata from "~/data/siteMetadata";

const handler = NewsletterAPI({
  provider: siteMetadata.newsletter?.provider as NewsletterConfig["provider"],
});

export { handler as GET, handler as POST };
