import { Octokit } from "@octokit/rest";

// Initialize Octokit with your GitHub token
const octokit = new Octokit({
    auth: "" || process.env.GITHUB_TOKEN,
});

export async function getPR(owner, repo, pull_number) {
    return await octokit.pulls.get({
        owner,
        repo,
        pull_number,
    });
}

export async function getAddedFiles(owner, repo, pull_number) {
    try {
        const files = await octokit.paginate(octokit.pulls.listFiles, {
            owner,
            repo,
            pull_number,
            per_page: 100,
        });

        // console.log("Files", files);
        
        const addedFiles = files.filter(file => file.status === "added");
        const modifiedFiles = files.filter(file => file.status === "modified");

        const markdownAddedFiles = addedFiles
            .filter(file => file.filename.endsWith(".md"))
            .map(file => file.filename);
        const markdownModifiedFiles = modifiedFiles
            .filter(file => file.filename.endsWith(".md"))
            .map(file => file.filename);
        const otherFiles = addedFiles
            .filter(file => !file.filename.endsWith(".md"))
            .map(file => file.filename);

        return { markdownAddedFiles, markdownModifiedFiles, otherFiles };
    } catch (error) {
        console.error("Error fetching added files from PR:", error);
        return { markdownAddedFiles: [], markdownModifiedFiles: [], otherFiles: [] };
    }
}

export async function getDeletedFiles(owner, repo, pull_number) {
    try {
        // Fetch list of files changed in the PR and filter for deleted files
        const files = await octokit.paginate(octokit.pulls.listFiles, {
            owner,
            repo,
            pull_number,
            per_page: 100,
        });
        const deletedFiles = files.filter(file => file.status === "removed");

        // Extract only the filenames of deleted files
        return deletedFiles.map(file => file.filename);
    } catch (error) {
        console.error("Error fetching deleted files from PR:", error);
        return [];
    }
}

export async function getFileContent(owner, repo, filePath, ref) {
    try {
        const { data: fileContentData } = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
            ref, // Specify the commit SHA or branch reference
        });

        // Decode Base64 content and return it as a string
        return Buffer.from(fileContentData.content, "base64").toString("utf-8");
    } catch (error) {
        console.error(`Error fetching content for ${filePath}:`, error);
        return null;
    }
}