## Micro FE Setup

### App Architecture

The app is structured as follows:

- **Host Application (`jobs-app`)**:
    - Acts as the host for the microfrontends.

- **Search Microfrontend (`search-fe`)**:
    - Provides functionality for searching movies.
    - Contains components and views related to movie search.

- **Server Proxy FE (`server-fe`)**:
  - Proxy server to handle requests from microfrontends if needed.


### Setup

##### Host Application
[Setup Host App](jobs-app/README.md ':include')

##### Search Microfrontend
[Setup Search Microfrontend](search-fe/README.md ':include')

