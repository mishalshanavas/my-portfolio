import { fetchGitHubContributions } from "../lib/github";
import { profileMeta } from "../lib/config";
import ContributionChart from "./contribution-chart";

export default async function ContributionSection() {
  const data = await fetchGitHubContributions(profileMeta.username);
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 overflow-hidden">
      {data.length > 0 ? (
        <ContributionChart data={data} />
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          GitHub activity is unavailable right now. Visit the{" "}
          <a
            className="text-[color:var(--accent)] hover:underline"
            href={`https://github.com/${profileMeta.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile
          </a>{" "}
          for recent work.
        </p>
      )}
    </div>
  );
}
