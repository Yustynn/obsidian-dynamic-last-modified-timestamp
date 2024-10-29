# Last Modified Timestamp in Status Bar
- Shows the note's creation date and last modified date in the Status bar for every note.
- Options to show/hide for `created` and `last modified`, along with date formatting customization.
- It pulls metadata directly from the .md files, so it works independently of the note's contents — no frontmatter or code needed.
- The "last modified" date is updated automatically every time you make a change to your note.
- No learning curve or coding required, works automatically out of the box.

This plugin eliminates the need for Templater scripts and frontmatter properties which achieve the same goal, so you can focus more on what matters: writing notes.

## Showcase

![demo](./img/demo.png)

## Customizability
- Enable/disable toggle for both **created** and **last modified** timestamps
- Timestamp format for both **created** and **last modified** timestamps
- Timestamp title in status bar for both **created** and **last modified** timestamps

![settings](./img/settings.png)

# Change Log
## 1.3.0
- (efficiency) Update modification time based on a change (vault `modify`) event, instead of constant polling

Thanks to @pjeby for the PR

## 1.2.0
- Add ability to toggle **Created** and **Last Modified** timestamps

Thanks to @joeraad for the PR

## 1.1.0
- Add **Created** timestamp
- Add ability to change the **Last Modified** refresh interval
