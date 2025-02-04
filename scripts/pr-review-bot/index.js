import fs from 'fs';
import { JSDOM } from "jsdom";
import { commentOnPullRequest, getPRBody } from './github.js'

const genericMessage = "This PR does not meet all the required checklist items mentioned in the description. As a result, we are closing the PR. Please re-open it once all checklist items are completed (ensure they are checked in the description)."

import { marked } from 'marked';

// const filePath = '.github/pull_request_template.md';
// const fileContent = fs.readFileSync(filePath, 'utf8');
const prBody = await getPRBody()

// Parse the markdown to HTML or AST (Abstract Syntax Tree)
const lexer = marked.lexer(prBody);

// Find the checklist items in the parsed output
const checklistItems = lexer
    .filter(item => item.type === 'list') // Filter out non-list items and comments
    .flatMap(list => list.items) // Extract list items
    .filter(isChecklistItem) // Only checklist items
    .map(item => {
        const isChecked = item.raw.includes('[x]');
        const text = item.raw.replace(/- \[.\] /, '').trim(); // Remove the checklist syntax
        return { text, checked: isChecked };
    });

let checklistFailedTitles = ""

const lastTwoListItems = checklistItems.slice(-2);

// Create message for comment on PR
for (let index = 0; index < lastTwoListItems.length; index++) {
    const element = lastTwoListItems[index];
    if (!element.checked) {
        checklistFailedTitles += index + 1 + ": " + element.text + '\n'
    }
}

const title = "PR Checklist Failed"

if (checklistFailedTitles !== "") {
    // commentOnPullRequest(title, genericMessage, checklistFailedTitles);
    logMessage(title, genericMessage, checklistFailedTitles);
    process.exit(1);
} else {
    console.log("Sucess!!");
}

// Helper Functions

// Function to check if an item is a checklist
function isChecklistItem(item) {
    return item.raw && (item.raw.includes('[ ]') || item.raw.includes('[x]'));
}

function logMessage(title, message, failedItems) {
    try {
        // Construct the comment message
        const commentMessage = `
# ${title}
<br>
${message}
<br>
### Failed Items
<br>
${failedItems}`;

        const html = marked.parse(commentMessage);
        // Extract plain text from HTML using JSDOM
        const dom = new JSDOM(html);
        const plainText = dom.window.document.body.textContent;

        console.log(plainText);

    } catch (error) {
        console.error("Error creating comment:", error);
    }
}
