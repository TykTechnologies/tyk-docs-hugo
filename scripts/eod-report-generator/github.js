import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: "" || process.env.GITHUB_TOKEN,
});

const org = "TykTechnologies";

export async function isUserInOrg(username) {
    try {
        await octokit.rest.orgs.checkMembershipForUser({
            org,
            username,
        });
        //   console.log(`${username} is a member of ${org}`);
        return true;
    } catch (error) {
        if (error.status === 404) {
            console.log(`${username} is NOT a member of ${org}`);
            return false;
        }
        console.error("Error checking membership:", error);
        throw error;
    }
}

export async function getOpenNonDraftPRs(owner, repo) {
    try {
        const openPRs = await octokit.paginate(octokit.rest.pulls.list, {
            owner,
            repo,
            state: "open",
            per_page: 1, // This does not work.
        });

        console.log("Total Open PRs", openPRs.length);

        return openPRs.filter((pr) => pr.draft === false || pr.draft === undefined);
    } catch (error) {
        console.error("Error fetching open non-draft PRs:", error);
        throw error;
    }
}

export async function getPROwner(owner, repo, pull_number) {
    try {
        const { data } = await octokit.rest.pulls.get({
            owner,
            repo,
            pull_number,
        });

        return data.user.login;
    } catch (error) {
        console.error("Error fetching PR owner:", error);
        throw error;
    }
}

export async function getRequestedReviewers(owner, repo, pullNumber) {
    try {
        const response = await octokit.rest.pulls.listRequestedReviewers({
            owner,
            repo,
            pull_number: pullNumber,
        });

        let reviewers = []
        for (const user of response.data.users) {
            const isReviewerFromTykOrg = await isUserInOrg(reviewerName)
            reviewers.push({
                name: user.login,
                status: "not_reviewed",
                isUserFromTykOrg: isReviewerFromTykOrg
            })
        }

        return reviewers
    } catch (error) {
        console.error("Error fetching requested reviewers:", error);
    }
}

export async function getPRReviews(owner, repo, pull_number) {
    try {
        const reviews = await octokit.paginate(octokit.rest.pulls.listReviews, {
            owner,
            repo,
            pull_number,
            per_page: 100,
        });

        return reviews;
    } catch (error) {
        console.error("Error fetching PR reviews:", error);
        throw error;
    }
}

export async function getMergedPRsAfterDate(owner, repo, mergeDate) {
    try {
        // Convert the provided merge date to a Date object for comparison
        const mergeDateObj = new Date(mergeDate);

        // Fetch all closed PRs (this includes merged PRs)
        const allClosedPRs = await octokit.request(`GET /repos/${owner}/${repo}/pulls?state=closed&per_page=30`, {
            owner: owner,
            repo: repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        console.log("Total Closed PRs:", allClosedPRs.data.length);

        // Filter merged PRs and only return those merged after the provided mergeDate
        const mergedPRs = allClosedPRs.data.filter((pr) => {

            if (pr.merged_at) {
                const mergedAtDate = new Date(pr.merged_at);
                // console.log("Merged date:", pr.merged_at, mergedAtDate, mergeDateObj);
                return mergedAtDate > mergeDateObj; // Only consider merged PRs after the given date
            }
            return false; // Exclude PRs that are closed but not merged
        });

        console.log(`Total Closed PRs after date ${mergeDate}`, mergedPRs.length);
        return mergedPRs;
    } catch (error) {
        console.error("Error fetching merged PRs after the specified date:", error);
        throw error;
    }
}