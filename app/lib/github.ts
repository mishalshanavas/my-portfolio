interface ContributionDay {
  date: string;
  contributionCount: number;
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubContributions(
  username: string
): Promise<{ date: string; count: number }[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    const weeks: { contributionDays: ContributionDay[] }[] =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!weeks) return [];

    return weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      }))
    );
  } catch {
    return [];
  }
}
