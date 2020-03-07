## TODO

### Data

Probably should try to get it all from the network.
If I can get it lazily somehow that's better (search in the API??)
If not, then getting everything in one go and making it available could be done in a service worker perhaps?
For now, I call it with axios from the public folder (which means at least that webpack doesn't put it in a js file)

### Routing

Should probably make a page with network calls for the sections, on top of the existing page with the search bar?

### Network calls

Try using fetch instead of Axios
