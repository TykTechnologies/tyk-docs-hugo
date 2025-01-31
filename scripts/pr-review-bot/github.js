import { Octokit } from "@octokit/rest";

// Variables
const owner = "TykTechnologies";
const repo = "tyk-docs";
// const pull_number = parseInt(process.env.PR_NUMBER); // Convert to integer
const pull_number =  process.env.PR_NUMBER; // Convert to integer
const github_token = process.env.GITHUB_TOKEN

// Create a new Octokit instance with your personal access token
const octokit = new Octokit({ auth: github_token });

export async function getPRBody() {
    try {
        const { data } = await octokit.pulls.get({
            owner,
            repo,
            pull_number
        });

        // Access and log the pull request body
        return data.body;
    } catch (error) {
        console.error('Error fetching PR:', error);
    }
}

export async function commentOnPullRequest(title, message, failedItems) {
    try {
        // Get the pull request details
        const { data: pullRequest } = await octokit.rest.pulls.get({
            owner,
            repo,
            pull_number,
        });

        // Get the author's login name
        const author = pullRequest.user.login;

        // Construct the comment message
        const commentMessage = `
# ${title}

@${author} ${message}

### Failed Items
${failedItems}`;

        // Create a comment on the pull request
        await octokit.rest.issues.createComment({
            owner,
            repo,
            issue_number: pull_number,
            body: commentMessage,
        });

        // Update the pull request status to draft
        await octokit.rest.pulls.update({
            owner,
            repo,
            pull_number,
            state: 'closed', // Set draft to true
        });

        console.log("Pull request status changed to draft successfully!");

        console.log("Comment created successfully!");
    } catch (error) {
        console.error("Error creating comment:", error);
    }
}