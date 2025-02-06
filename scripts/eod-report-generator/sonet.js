import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: '' || process.env.ANTHROPIC_KEY, 
});

export async function extractHeadings(combinedString) {
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: `
Below are some markdown headings. Extract the headings which is using acronyms or shortcodes like K8s for kubernetes in it. 

Exclude the following acronysms ["API"]

The output should be an array of strings. No explanation required.

${combinedString}` }],
    });

    return msg.content[0].text;
}

export async function formatName(prName) {
    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [{ role: "user", content: `
    Hello, Claude. 
    
    Remove the Jira ticket reference from the below string. Don't include any explanation text. The output will be read by a machine.
    
    ${prName}
    ` }],
    });

    return msg.content[0].text;
}

