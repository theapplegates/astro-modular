import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Blockquote, Paragraph, Text } from 'mdast';

interface CalloutMapping {
  type: string;
  icon: string;
  title: string;
}

const calloutMappings: Record<string, CalloutMapping> = {
  note: { type: 'note', icon: 'info', title: 'Note' },
  tip: { type: 'tip', icon: 'lightbulb', title: 'Tip' },
  important: { type: 'important', icon: 'star', title: 'Important' },
  warning: { type: 'warning', icon: 'triangle-alert', title: 'Warning' },
  caution: { type: 'caution', icon: 'circle-alert', title: 'Caution' },
  danger: { type: 'caution', icon: 'circle-x', title: 'Danger' },
  info: { type: 'note', icon: 'info', title: 'Info' },
  question: { type: 'important', icon: 'circle-help', title: 'Question' },
  success: { type: 'tip', icon: 'circle-check', title: 'Success' },
  failure: { type: 'caution', icon: 'circle-x', title: 'Failure' },
  bug: { type: 'caution', icon: 'bug', title: 'Bug' },
  example: { type: 'tip', icon: 'code', title: 'Example' },
  quote: { type: 'note', icon: 'quote', title: 'Quote' },
  abstract: { type: 'important', icon: 'file-text', title: 'Abstract' },
  summary: { type: 'important', icon: 'file-text', title: 'Summary' },
  tldr: { type: 'important', icon: 'file-text', title: 'TL;DR' }
};

const remarkCallouts: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'blockquote', (node: Blockquote, index, parent) => {
      // Check if this blockquote contains a callout pattern
      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'paragraph') return;
      
      const firstTextNode = (firstChild as Paragraph).children[0];
      if (!firstTextNode || firstTextNode.type !== 'text') return;
      
      const text = (firstTextNode as Text).value;
      const calloutMatch = text.match(/^\[!([\w-]+)\](?:\s+(.+))?/);
      
      if (!calloutMatch) return;
      
      const [fullMatch, calloutType, customTitle] = calloutMatch;
      const calloutKey = calloutType.toLowerCase();
      const mapping = calloutMappings[calloutKey] || {
        type: 'note',
        icon: 'info',
        title: calloutType.charAt(0).toUpperCase() + calloutType.slice(1)
      };
      
      // Remove the callout syntax from the first text node
      const remainingText = text.slice(fullMatch.length).trim();
      
      // Create HTML for the callout with icon
      const calloutTitle = customTitle || mapping.title;
      
      // Process the remaining content
      let contentChildren = [...node.children];
      
      if (remainingText) {
        // If there's remaining text on the first line, update the first text node
        (firstTextNode as Text).value = remainingText;
      } else {
        // Remove the first paragraph if it only contained the callout syntax
        contentChildren = contentChildren.slice(1);
      }
      
      // Transform the blockquote into a callout HTML structure
      const calloutHtml: any = {
        type: 'html',
        value: `<div class="callout callout-${mapping.type}" data-callout-initialized="false">
          <div class="callout-title">
            <i data-lucide="${mapping.icon}" class="callout-icon"></i>
            <span>${calloutTitle}</span>
          </div>
          <div class="callout-content">`
      };
      
      const closeHtml: any = {
        type: 'html',
        value: '</div></div>'
      };
      
      // Replace the blockquote with the callout structure
      if (parent && typeof index === 'number') {
        parent.children.splice(index, 1, calloutHtml, ...contentChildren, closeHtml);
      }
    });
  };
};


export default remarkCallouts;