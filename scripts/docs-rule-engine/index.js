import fs from 'fs';
import yaml from 'js-yaml';
import { evaluate } from './evaluate.js';
import { getPR, getFileContent, getAddedFiles } from './github.js';

const owner = "TykTechnologies";
const repo = "tyk-docs";
const pullNumber = process.env.PR_NUMBER;

(async () => {
    // Read the YAML file
    const fileContents = fs.readFileSync('./config.yaml', 'utf8');

    // Parse the YAML file
    const config = yaml.load(fileContents);

    const { data: prData } = await getPR(owner, repo, pullNumber)
    const headBranch = prData.head.ref; // Head branch (the branch from which the PR was raised)

    const { markdownAddedFiles, markdownModifiedFiles, otherFiles } = await getAddedFiles(owner, repo, pullNumber);
    console.log("Markdown files added:", markdownAddedFiles);
    console.log("Markdown files modified:", markdownModifiedFiles);
    console.log("Other files added:", otherFiles);

    const allFiles = [...markdownAddedFiles, ...markdownModifiedFiles];

    for (let i = 0; i < allFiles.length; i++) {
        // Get content of the file that was added
        const md = await getFileContent(owner, repo, allFiles[i], headBranch);
        evaluate(config, md)
    }

})()