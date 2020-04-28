## ROADMAP

### Popups

- Better UI for the popups
- Fix the bugs

### API

- Back up / cache API results? (SPOF)

### Known issues
 
 * Creatures don't get displayed properly by React because the component that transforms the API response into a table has a [bug](https://github.com/thehyve/react-json-to-table/pull/11#pullrequestreview-401831293). There is an open PR that fixes the issue but the maintainers haven't merged it as of April 2020.
 * I have [forked the repo](https://github.com/taichoup/react-json-to-table) in the meantime to apply the patch, and this needs to be npm installed locally on any machine running the app.
