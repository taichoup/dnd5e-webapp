## ROADMAP

- Optional battleground grid with adjustable scale and grid snap for avatars
- Nicer animations and transitions with http://reactcommunity.org/react-transition-group/css-transition ?
- Additional generated info for each creature on the battleground
- Names by race (a lot of work)
- Several map types / dynamic stylesheets (with a dedicated battleground component, probably)
    - choose shape of battleground (rectangle, natural, circle)
    - choose terrain type
- use https://animista.net/ to add fancy animations?
- model the contentEditable fields in the battle table after the input in https://globster.xyz
- BUG: drawing mode / canvas should be a layer below the creatures on the battleground

### Popups

- Better UI for the popups
- Don't display rows with empty values

### Search bar

- mimick design of Firefox search field in dark mode new tabs

### API

- Back up / cache API results? (SPOF)

### Issues (to upload as GiHub issues later)

- not possible to add creatures to the battlefield in the middle of combat without resetting everything
- when battlefield is popped out, canvas is too small
- popping battlefield out in the middle of battle resets everything
