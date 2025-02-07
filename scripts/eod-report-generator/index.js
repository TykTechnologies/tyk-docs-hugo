import { formatName } from "./sonet.js";
import { getOpenNonDraftPRs, getMergedPRsAfterDate,getRequestedReviewers, getPROwner, getPRReviews, isUserInOrg } from "./github.js";
import { categorizeBulletPoints } from "./helper.js";

const mainBoss = "" || process.env.MAIN_REVIEWER;

let eod_report_result = [];

const labelsToConsiderForGrouping = ["Release Notes", "future-release", "New IA Project"]

async function analyzePR(owner, repo, pr, ignoreBuger) {
    const pull_number = pr.number;
    const prName = await formatName(pr.title);
    const prUrl = pr.html_url;
    const prOwner = await getPROwner(owner, repo, pull_number);
    const isUserFromTykOrg = await isUserInOrg(prOwner)
    const reviews = await getPRReviews(owner, repo, pull_number);
    // const reviewers = await getRequestedReviewers(owner, repo, 5936)

    if (ignoreBuger && (prOwner === "buger")) {
        return
    }

    let mainBossStatus = "not_reviewed";
    const peerReviewers = [];

    // Get reviewers of a PR
    for (const review of reviews) {
        const reviewerName = review.user.login;
        const reviewStatus = review.state.toLowerCase();
        const isReviewerFromTykOrg = await isUserInOrg(reviewerName)

        if (reviewStatus === "commented" || reviewStatus === "dismissed") {
            continue
        }

        if (reviewerName === mainBoss) {
            mainBossStatus = reviewStatus;
        } else {
            // Check if existing reviewr, if yes update the status
            const existingReviewer = peerReviewers.find(reviewer => reviewer.name === reviewerName);

            if (existingReviewer) {
                existingReviewer.status = reviewStatus;
            } else {
                peerReviewers.push({
                    name: reviewerName,
                    status: reviewStatus,
                    isUserFromTykOrg: isReviewerFromTykOrg
                });
            }
        }
    }

    // This are reviewers who were requested
    // for (const review of reviewers) {
    // }   

    // Check if part of category
    const category = labelsToConsiderForGrouping.find(field =>
        pr.labels.some(label => label.name === field)
    ) || "Docs";

    eod_report_result.push({
        prName,
        prUrl,
        prOwner,
        peerReviewers,
        mainBossStatus,
        // isMerged: false,
        isUserFromTykOrg,
        category
    });
}


// Example usage
(async () => {
    const owner = "TykTechnologies";
    const repo = "tyk-docs";

    const date = process.env.PR_SCAN_DATE || new Date().toISOString();
    console.log("Report Date:", date); // Example output: "2025-02-04T15:30:00Z"


    try {
        // ###############################
        // Get Open Prs - In Making
        // ###############################
        console.log("============ Stats ============")
        const openPrs = await getOpenNonDraftPRs(owner, repo);
        console.log("Open PRs - Excluding Draft:", openPrs.length)

        // Populate "eod_report_result" variable with our JSON structure
        for (const pr of openPrs) {
            await analyzePR(owner, repo, pr, false);
        }

        // console.log(JSON.stringify(eod_report_result, null, 2));
        const inMaking = categorizeBulletPoints(eod_report_result);
        // console.log(inMaking);

        // ###############################
        // Get Merged PRs
        // ###############################

        const mergedPrs = await getMergedPRsAfterDate(owner, repo, date);

        eod_report_result = []; //Reset array
        for (const pr of mergedPrs) {
            await analyzePR(owner, repo, pr, true);
        }

        // console.log(JSON.stringify(eod_report_result, null, 2));
        // return
        let merged = categorizeBulletPoints(eod_report_result, true);
        if (merged === "") {
            merged = "No new pages published."
        }
        // console.log(merged);

        console.log("============ Final Print ============")

        console.log(`
Hi all, EOD status report for ${date}, is as follows:
:white_check_mark: New published pages :partywizard::partywizard::partywizard::partywizard:
================================
${merged}

In the making
================================
${inMaking}
`)


    } catch (error) {
        console.error("Error generating EOD report:", error);
    }
})();
