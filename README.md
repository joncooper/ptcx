# Pivotal Tracker Chrome Extension

Tweak the Pivotal Tracker UI for power users.

Features:

- Focused view: blocked stories only (tag: 'blocked_*')
- Focused view: stories for acceptance meeting only (finished, started,
  delivered)
- Toggle display of the header pane (60px) and focus on a single project
- Toggle display of blocked stories (tag: 'blocked_*')
- Toggle display of stories that need estimation (tag:
  'needs_estimation', or features with no estimate)
- Toggle display of accepted stories

To install:

- Clone repository
- Open Chrome
- Menu: Window -> Extensions
- Click plus to drop down 'Developer mode' if necessary
- Click 'Load unpacked extension...' and select the repo directory
- Click 'Enable' if necessary

To use:

- Go to a project page in Pivotal Tracker (i.e.
  https://www.pivotaltracker.com/projects/<something>)
- Click the button next to URL bar to launch; the header bar should hide
- Use the new 'Filter' menu

TODO:

- switch to a view that is just the current panel (i.e. 'Backlog' or 'My
  Work', along with changing min-width
- enable fast-loading of a single story if you click its URL
- shift-click a story to copy its ID; ctrl-shift-click to copy its URL
