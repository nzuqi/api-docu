/***   Regex Markdown Parser by chalarangelo   ***/
// https://github.com/Chalarangelo/parse-md-js/blob/master/parsemd.js
// Replaces 'regex' with 'replacement' in 'str'
// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
const replaceRegex = (regex: RegExp, replacement: any) => {
    return (str: string) => {
        return str.replace(regex, replacement);
    }
}
// Regular expressions for Markdown (a bit strict, but they work)
const codeBlockRegex = /((\n\t)(.*))+/g;
const inlineCodeRegex = /(`)(.*?)\1/g;
const imageRegex = /!\[([^\[]+)\]\(([^\)]+)\)/g;
const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
const headingRegex = /\n(#+\s*)(.*)/g;
const boldItalicsRegex = /(\*{1,2})(.*?)\1/g;
const strikethroughRegex = /(\~\~)(.*?)\1/g;
const blockquoteRegex = /\n(&gt;|\>)(.*)/g;
const horizontalRuleRegex = /\n((\-{3,})|(={3,}))/g;
const unorderedListRegex = /(\n\s*(\-|\+)\s.*)+/g;
const orderedListRegex = /(\n\s*([0-9]+\.)\s.*)+/g;
const paragraphRegex = /\n+(?!<pre>)(?!<h)(?!<ul>)(?!<blockquote)(?!<hr)(?!\t)([^\n]+)\n/g;
// Replacer functions for Markdown
const codeBlockReplacer = (fullMatch: string) => {
    return '\n<pre>' + fullMatch + '</pre>';
}
const inlineCodeReplacer = (fullMatch: string, tagStart: string, tagContents: string) => {
    return '<code>' + tagContents + '</code>';
}
const imageReplacer = (fullMatch: string, tagTitle: string, tagURL: string) => {
    return '<img src="' + tagURL + '" alt="' + tagTitle + '" />';
}
const linkReplacer = (fullMatch: string, tagTitle: string, tagURL: string) => {
    return '<a href="' + tagURL + '">' + tagTitle + '</a>';
}
const headingReplacer = (fullMatch: string, tagStart: string, tagContents: string) => {
    return '\n<h' + tagStart.trim().length + '>' + tagContents + '</h' + tagStart.trim().length + '>';
}
const boldItalicsReplacer = (fullMatch: string, tagStart: string, tagContents: string) => {
    return '<' + ((tagStart.trim().length == 1) ? ('em') : ('strong')) + '>' + tagContents + '</' + ((tagStart.trim().length == 1) ? ('em') : ('strong')) + '>';
}
const strikethroughReplacer = (fullMatch: string, tagStart: string, tagContents: string) => {
    return '<del>' + tagContents + '</del>';
}
const blockquoteReplacer = (fullMatch: string, tagStart: string, tagContents: string) => {
    return '\n<blockquote>' + tagContents + '</blockquote>';
}
const horizontalRuleReplacer = (fullMatch: string) => {
    return '\n<hr />';
}
const unorderedListReplacer = (fullMatch: string) => {
    let items = '';
    fullMatch.trim().split('\n').forEach(item => { items += '<li>' + item.substring(2) + '</li>'; });
    return '\n<ul>' + items + '</ul>';
}
const orderedListReplacer = (fullMatch: string) => {
    let items = '';
    fullMatch.trim().split('\n').forEach(item => { items += '<li>' + item.substring(item.indexOf('.') + 2) + '</li>'; });
    return '\n<ol>' + items + '</ol>';
}
const paragraphReplacer = (fullMatch: string, tagContents: string) => {
    return '<p>' + tagContents + '</p>';
}
// Rules for Markdown parsing (use in order of appearance for best results)
const replaceCodeBlocks = replaceRegex(codeBlockRegex, codeBlockReplacer);
const replaceInlineCodes = replaceRegex(inlineCodeRegex, inlineCodeReplacer);
const replaceImages = replaceRegex(imageRegex, imageReplacer);
const replaceLinks = replaceRegex(linkRegex, linkReplacer);
const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
const replaceBoldItalics = replaceRegex(boldItalicsRegex, boldItalicsReplacer);
const replaceceStrikethrough = replaceRegex(strikethroughRegex, strikethroughReplacer);
const replaceBlockquotes = replaceRegex(blockquoteRegex, blockquoteReplacer);
const replaceHorizontalRules = replaceRegex(horizontalRuleRegex, horizontalRuleReplacer);
const replaceUnorderedLists = replaceRegex(unorderedListRegex, unorderedListReplacer);
const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);
// Fix for tab-indexed code blocks
const codeBlockFixRegex = /\n(<pre>)((\n|.)*)(<\/pre>)/g;
const codeBlockFixer = (fullMatch: string, tagStart: string, tagContents: string, lastMatch: string, tagEnd: string) => {
    let lines = '';
    tagContents.split('\n').forEach((line: string) => { lines += line.substring(1) + '\n'; });
    return tagStart + lines + tagEnd;
}
const fixCodeBlocks = replaceRegex(codeBlockFixRegex, codeBlockFixer);
// Replacement rule order function for Markdown
// Do not use as-is, prefer parseMarkdown as seen below
const replaceMarkdown = (str: string) => {
    return replaceParagraphs(replaceOrderedLists(replaceUnorderedLists(
        replaceHorizontalRules(replaceBlockquotes(replaceceStrikethrough(
            replaceBoldItalics(replaceHeadings(replaceLinks(replaceImages(
                replaceInlineCodes(replaceCodeBlocks(str))
            ))))
        )))
    )));
}
// Parser for Markdown (fixes code, adds empty lines around for parsing)
// Usage: parseMarkdown(strVar)
export const parseMarkdown = (str: string) => {
    return fixCodeBlocks(replaceMarkdown('\n' + str + '\n')).trim();
}