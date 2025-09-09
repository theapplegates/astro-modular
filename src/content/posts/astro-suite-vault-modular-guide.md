---
title: Astro Suite Vault (Modular) Guide
date: 2025-08-25
description: How to use this Astro Suite Obsidian vault.
tags:
  - tutorial
  - setup
  - configuration
  - astro
  - obsidian
image: "[[images/astro-composer-suite-for-obsidian.png]]"
imageAlt: Astro and Obsidian logos stacked vertically with a "+" (plus) sign between them.
imageOG: true
hideCoverImage: true
targetKeyword: astro suite modular vault
draft: false
---
![Astro and Obsidian logos stacked vertically with a "+" (plus) sign between them.](/posts/images/astro-composer-suite-for-obsidian.png)

## Overview

All plugins, key bindings, and the theme can be customized to your liking, but this is what's on by default. Optimized for use with the [Modular Astro theme](https://github.com/davidvkimball/astro-modular).

## Philosophy 

1. Plug-and-play Astro blogging experience. 
2. Emphasis on modularity. 
3. Customize your experience to get it just right.

## Theme

For out-of-the-box customization, [Minimal](https://minimal.guide/home) theme is used. It uses an understated color scheme with high contract options. 

The [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings), [Hider](https://github.com/kepano/obsidian-hider), and [Style Settings](https://obsidian.md/plugins?id=obsidian-style-settings) community plugins are also installed by default, giving you complete control over your experience. 

## CSS Snippets

An optional custom CSS snippet called `custom-draggable-top-area.css` makes moving your window is easier when the window frame is hidden and there's no tab bar. There are also versions specific to Windows and Mac that have OS-specific UI offsets, or just use the base version for no offsets. All can be configured in Settings > Appearance > CSS Snippets. None of these are active in mobile.

`hide-tabs-icon-mobile.css` removes the tabs icon in the mobile version of Obsidian. If you enable the Disable Tabs plugin, you may want to enable this snippet as well.

Both `hide-longpress-flair-mobile.css` and `hide-header-title-mobile.css` are also related to making the mobile interface more simple. Enable any of these snippets to hide these elements.

## Important Hotkeys

Here's a guide for some important hotkeys set especially for this theme:
- Toggle left side panel: `CTRL + ALT + Z`
- Toggle right side panel: `CTRL + ALT + X`
- Toggle tab bar: `CTRL + ALT + S`
- Navigate back: `ALT + ←`
- Navigate forward: `ALT + →`
- Open homepage: `CTRL + M` 
- Add a new property: `CTRL + ;`
- Toggle reading view: `CTRL + E`
- Toggle Zen mode: `CTRL + SHIFT + Z`
- Insert image: `CTRL + '`
- Insert callout: `CTRL + SHIFT + C`
- Start Terminal: `CTRL + SHIFT + D`
- Open config file: `CTRL + SHIFT + ,`
- Git: Commit and Sync `CTRL + SHIFT + S`

If you're on Mac, `CTRL` = `CMD`.

## Plugins 

Disabled default core plugins: 
- Canvas
- Daily notes
- Note composer
- Page preview
- Templates
- Sync

Community plugins enabled: 
- Astro Composer
- Default New Tab Page
- Git
- Hider
- Homepage
- Image Inserter
- Minimal Theme Settings
- mdx as md
- Paste image rename
- Property Over Filename
- ProZen
- Shell commands
- Style Settings
- Title-Only Tab

### Astro Composer 

Handy for easily creating new notes as Astro blog posts. Just create a new note with `CTRL + N`, type in a title in Title case or with special characters, and the note or folder name generated is a kebab-case version of the title without special characters. This is ideal for automating post slugs. 

You can also define and set default properties that can be generated automatically or manually set for any open note as well.

Unlike other themes, you can use Wikilinks or standard markdown links, ***without*** having to convert those to internal links for Astro with the "Convert internal links for Astro" command. This theme supports any internal link that works with Obsidian.

### Homepage and Default New Tab Page

Both of these work together so you're default screen is a `.base` file that's a directory of all of your blog posts, listed in reverse-chronological order. You're able to customize the note properties in the views to your liking. 

The Base is nested within a folder called `_bases` because Astro will ignore files and folders with an underscore prefix, letting you use this for Obsidian without processing it for the live site.

I call this "Home Base."

### Minimal Theme Settings, Hider, and Style Settings

As mentioned earlier, these plugins keep you focused and distraction-free while allowing for customization of your experience. 

Should you need to reveal any of the main hidden panels, you can use `CTRL + ALT Z` for the left side panel, `CTRL + ALT + X` for the right side panel, or `CTRL + ALT + S` for the tab bar. Pressing it again will hide it. 

In Style Settings, the only options that have been modified are hiding the Properties heading and the "Add Property" button.

### Paste Image Rename 

Quickly drag and drop image files or paste directly from your clipboard and give them kebab-case, SEO-friendly names. 

### Image Inserter

Pull in images from Unsplash or other sources easily with just a few keystrokes. Just use `CTRL + '` to insert an image - and immediately set a SEO-friendly filename for it via the Paste Image Rename plugin..

### Title-Only Tab

Pulls from the `title` property instead of using the filename for any tab. With the tab bar hidden, you won't see this unless you unhide it.

### Property Over Filename

When linking or searching notes, you can use the `title` property as its primary identifier, which is more helpful semantically for linking between and searching for posts and pages, since note filenames are post/page slugs in kebab case instead of titles. 

When you link to another note, its `title` is automatically set as the hyperlinked text, but you can easily change it to something else after it's been inserted.

### ProZen

Zen mode offers another quick option to focus on your writing. Pressing `CTRL + SHIFT + Z` will enter Zen mode: automatic full-screen, all elements removed except for your content. This is a great alternative if you don't prefer to use Hider to remove the UI, and prefer to toggle it all on or off at once as needed. Alternatively, you can use the Focus Mode included in the Minimal theme.

### Shell commands and Commander

Shell commands helps us open two things quickly: terminal and Astro's `config.ts` file. 

To open terminal quickly, use the `Start Terminal` command. It's been modified for Windows, macOS, and Linux to start terminal in the relevant directory so you can easily do standard package manager commands like `npm` or `pnpm`. It can be activated with `CTRL + SHIFT + D`. 

To open your `config.ts` file quickly, simply use the `Astro Configuration` command. You can also press `CTRL + SHIFT + ,` to open it with your default application. 

Commander helps us place a button for each of these actions on the file explorer UI.

> [!warning] Linux User Warning
> On Linux, there isn't a universal method to open the default terminal. Additionally, the widely used Flatpak (via Flathub) employs non-trivial sandboxing, which introduces further challenges. To address this, both commands utilize FreeDesktop's `xdg-open` to access the configuration file and launch the file manager. Most file managers offer a right-click option like `Open in Terminal`, so if you're using a Linux distribution, you can rely on that feature.

### BRAT (Temporary)

Only used temporarily to load Astro Composer and Disable Tabs plugins before they're available in the Obsidian plugin directory. Future versions of this vault will remove BRAT in favor of the official releases.

## Git

With the [Git](https://obsidian.md/plugins?id=obsidian-git) plugin, you can easily publish to your Astro blog without leaving Obsidian using `CTRL + SHIFT + S`. Simply configure with git to enable it.

### Disable Tabs

This is off by default, but if enabled, opening any new tab replaces the current one only. Especially nice for when you're hiding the tab bar and don't want multiple tabs. When combined with the Homepage and New Default Tab plugins, `CTRL + T` and `CTRL + M` essentially do the same thing.