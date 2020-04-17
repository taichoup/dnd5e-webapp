## TODO

### Data

Probably should try to get it all from the network.
If I can get it lazily somehow that's better (search in the API??)
If not, then getting everything in one go and making it available could be done in a service worker perhaps?
For now, I call it with axios from the public folder (which means at least that webpack doesn't put it in a js file)

### Routing

Should probably make a page with network calls for the sections, on top of the existing page with the search bar?
UPDATE: now the main search returns links to the api. If clicking those links could trigger a request and display the response that would be dope.

### Network calls

Try using fetch instead of Axios

### A lire

- https://reactjs.org/docs/hooks-effect.html
- https://reactjs.org/docs/hooks-rules.html
- https://reactjs.org/docs/hooks-custom.html

- https://medium.com/better-programming/how-to-fetch-data-from-an-api-with-react-hooks-9e7202b8afcd
- https://github.com/mdn/fetch-examples/blob/master/fetch-json/index.html
- https://sabe.io/tutorials/how-to-create-modal-popup-box

### Comments from Etienne the React instructor

- no need to have the db in the state (heavy) --> service worker?
- debounce ? (not on every hit)
- search button ?
- service worker (separate thread)

### Test
