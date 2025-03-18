import { checkImageResolution } from './image.js'
import { getPR } from './github.js'
import { getFrontmatter, printMarkdown, getShorcodes, getComments, getLinks, getHeadings } from './markdown.js'
import Case from 'case';
import yaml from 'js-yaml'
import fs from 'fs'
import { extractHeadings } from './sonet.js';

export async function evaluate(config, md) {
    const links = await getLinks(md)
    // console.log("Links", links)
    // return
    const headings = await getHeadings(md)
    const comments = await getComments(md)
    const shortCodes = await getShorcodes(md)

    for (let i = 0; i < config.rules.length; i++) {

        const rule = config.rules[i]

        if (!rule.enable) {
            // console.log(`Skipping rule: ${rule.title}`);
            continue
        }
        console.log('\n');

        switch (rule.id) {
            case 1:
                const filteredLinks = links.filter(link => !(link.href.startsWith('http') || link.href.startsWith('https') || link.raw.includes('({{')));

                if (filteredLinks.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                    console.log(filteredLinks);
                }
                break;

            case 2:
                const invalidTextLinks = links.filter(link => link.text.includes("'"));

                if (invalidTextLinks.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                    console.log(invalidTextLinks);
                }
                break;

            case 3:
                const headingsWithInvalidDepth = headings.filter(heading => {
                    return [1, 5, 6].includes(heading.depth)
                });

                if (headingsWithInvalidDepth.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                    console.log(headingsWithInvalidDepth);
                }

                break;

            case 4:
                const filteredHeadings = headings.filter((heading, index) => {
                    if (index === 0) {
                        return false
                    }
                    return !["title", "capital"].includes(Case.of(heading.text))
                });

                if (filteredHeadings.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                    console.log(filteredHeadings);
                }

                break;

            case 5:
                // Regular expression to match the alt attribute
                const altRegex = /alt\s*=\s*"([^"]*)"/;

                const filteredShortcodes = shortCodes.filter(shortCode => {
                    // Check if alt attribute exists
                    const hasAlt = altRegex.test(shortCode);

                    // If alt exists, check if it's empty
                    if (hasAlt) {
                        return shortCode.match(altRegex)[1].trim() === '';
                    }

                    // If alt doesn't exist, include it
                    return true;
                });

                if (filteredShortcodes.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                    console.log(filteredShortcodes);
                }

                break;

            case 6:
                if (comments.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                }
                break;

            case 7:
                // Get condensed template
                // Get headings of it
                // Evaluate against ours
                if (comments.length > 0) {
                    console.log("Comments are present")
                }
                break;

            case 8:
                const data = await getFrontmatter(md)

                if (Object.keys(data).length === 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                }
                const requiredKeys = ['title', 'date', 'description', 'tags', 'categories', 'summary', 'keywords'];

                const missingKeys = requiredKeys.filter(key => !(key in data));

                if (missingKeys.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                    console.log(`Missing required frontmatter keys: ${missingKeys.join(', ')}`);
                }

                break;

            case 9:
                const combinedString = headings.map((heading, index) => {
                    if (index === 0) {
                        return ''
                    }
                    return `${index}. ${heading.text}\n`;
                }).join('');

                const res = await extractHeadings(combinedString)

                const arr = JSON.stringify(res)

                if (arr.length > 0) {
                    console.log(`Rule ID ${rule.id} Failing : ${rule.title}`);
                    console.log(res);
                }

                break;

            default:
                break;
        }
    }

}