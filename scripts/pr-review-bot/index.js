import { commentOnPullRequest, getPRBody } from './github.js'

const genericMessage = "This PR does not pass all the checklist mentioned in description, because of which we are closing the PR. Re-open it when all checklist items are passed"

import { marked } from 'marked';

const prBody = await getPRBody()
console.log("Read PR body")

// Function to check if an item is a checklist
function isChecklistItem(item) {
    return item.raw && (item.raw.includes('[ ]') || item.raw.includes('[x]'));
}

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
    console.log("Comment on pr & closing it")
    commentOnPullRequest(title, genericMessage, checklistFailedTitles);
}