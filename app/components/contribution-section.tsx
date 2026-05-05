import { fetchGitHubContributions } from "../lib/github";
import { profileMeta } from "../lib/config";
import ContributionChart from "./contribution-chart";

export default async function ContributionSection() {
  const data = await fetchGitHubContributions(profileMeta.username);
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 overflow-hidden">
      <ContributionChart data={data} />
    </div>
  );
}
