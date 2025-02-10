const githubSlackUserNameMapping = {
    "sharadregoti": "@sharad",
    "Eopayemi": "@Elizabeth",
    "sedkis": "@Sedky",
    "andrei-tyk": "@Andy",
    "caroltyk": "@carol",
    "letzya": "@yaara",
    "sredxny": "@sredny",
    "excieve": "@artem",
    "jeffy-mathew": "@Jeff",
    "DavidRollins": "@David Rollins",
    "Arturas-Salivonas": "@Arturas",
    "buger": "@leo",
    "tbuchaillot": "@tomas",
    "carlostyk": "@Carlos",
    "kofoworola": "@Kofo",
    "jay-deshmukh": "@Jay",
    "yurisasuke": "@keith",
    "buraksezer": "@buraksezer",
    "titpetric": "@Tit Petric",
    "umit": "@umit",
    "andyo-tyk": "@Andy",
    "munkiat": "@MK",
    "MFCaballero": "@Flor",
    "edsonmichaque": "@Edson",
    "JRWu": "@Jia Wu",
    "JoanCamosTyk": "@Joan",
    "LLe27": "@Long Le",
    "olamilekan000": "@Ola"
}

const githubStatusToMessageMapping = {
    "approved": "approved the pr",
    "changes_requested": "requested changes in the pr",
    "not_reviewed": "not reviewed the pr",
}

const getSlackUserName = (pr) => {
    if (!pr.isUserFromTykOrg) {
        return "ExternalUser"
    }
    return githubSlackUserNameMapping[pr.prOwner] || githubSlackUserNameMapping[pr.name] || 'undefined';
}

const peerStatusTemplate = (peer) => {
    const slackUsername = getSlackUserName(peer)
    const newStatusImprovedMessage = githubStatusToMessageMapping[peer.status] || peer.status

    return `${slackUsername} has ${newStatusImprovedMessage}`
}

const thankYouTemplate = (pr) => {
    const slackUsername = getSlackUserName(pr)
    return `- [${pr.prName}](${pr.prUrl}) - Thanks ${slackUsername}.`;
}

const inProgressTemplate = (pr) => {
    // Check if pr.prOwner exists in the mapping and replace it, otherwise use pr.prOwner or 'undefined'
    const slackUsername = getSlackUserName(pr)

    const peerReviewMessage = pr.peerReviewers.map(peerStatusTemplate).join("\n");

    const newStatusImprovedMessage = githubStatusToMessageMapping[pr.mainBossStatus] || pr.mainBossStatus

    let finalMessage = `- [${pr.prName}](${pr.prUrl}) - ${slackUsername} - I have ${newStatusImprovedMessage}.`
    if (peerReviewMessage !== "") {
        finalMessage += ` Regarding peer review, ${peerReviewMessage}`;
    }
    return finalMessage
}

export const categorizeBulletPoints = (prs, isThankYou) => {
    // Group the PRs by category
    const grouped = prs.reduce((acc, pr) => {
        const category = pr.category || 'Uncategorized'; // Default category if not present
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(pr);
        return acc;
    }, {});

    // Create the bullet points for each category
    let result = '';
    for (const [category, prsInCategory] of Object.entries(grouped)) {
        result += `*${category}*\n`;
        let bulletPoints = "";
        if (isThankYou) {
            bulletPoints = prsInCategory.map(thankYouTemplate).join("\n");
        } else {
            bulletPoints = prsInCategory.map(inProgressTemplate).join("\n");
        }
        result += bulletPoints + "\n\n"; // Add bullet points and spacing between categories
    }
    return result.trim(); // Trim extra newlines at the end
}