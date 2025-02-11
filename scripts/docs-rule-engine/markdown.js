import { marked } from 'marked';
import markdownLinkExtractor from 'markdown-link-extractor'
import matter from 'gray-matter';

export async function printMarkdown(md) {
    const tokens = marked.lexer(md);
    console.dir(tokens, { depth: null });
}

export async function getShorcodes(md) {
    const tokens = marked.lexer(md);
    const shortcodes = [];
    const youtube = "{{< youtube"
    const images = "{{< img"
    tokens.forEach((token) => {
        if (token.type !== 'paragraph') {
            return;
        }

        if (token.raw.includes(youtube) || token.raw.includes(images)) {
            shortcodes.push(token.raw)
        }
    });
    return shortcodes
}

export async function getComments(md) {
    const tokens = marked.lexer(md);
    const comments = [];
    tokens.forEach((token) => {
        if (token.type === 'html') {
            comments.push(token.raw);
        }
    });
    return comments
}

export async function getHeadings(md) {
    const headings = []
    const renderer = new marked.Renderer();
    renderer.heading = function (heading, depth) {
        headings.push(
            {
                "raw": heading.raw,
                "text": heading.text,
                "depth": heading.depth
            }
        )
        return ''
    }
    marked(md, { renderer: renderer });
    return headings
}

export async function getLinks(md) {
    const links = [];
    const renderer = new marked.Renderer();
    renderer.link = function (link, title, text) {
        // console.log("Link", href);
        if (link.raw !== link.href) {
            links.push({
                "raw": link.raw,
                "text": link.text,
                "href": link.href
            });
        }
        return '';
    };

    // Extend the default tokenizer
    const tokenizer = new marked.Tokenizer();
    const oldLink = tokenizer.link.bind(tokenizer);
    tokenizer.link = function (src) {
        const hugoLinkRegex = /^\[([^\]]+)\]\(\{\{<\s*ref\s+"([^"]+)"\s*>\}\}\)/;
        const match = src.match(hugoLinkRegex);
        if (match) {
            return {
                type: 'link',
                raw: match[0],
                text: match[1],
                href: `/custom-base-path/${match[2]}`,
                tokens: this.lexer.inlineTokens(match[1])
            };
        }
        return oldLink(src);
    };

    marked.setOptions({
        renderer: renderer,
        tokenizer: tokenizer
    });

    marked(md);
    return links;
}

export async function getFrontmatter(md) {
    // Parse the frontmatter
    const { data, content } = matter(md);
    return data
}