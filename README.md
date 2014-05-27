# Delorean Flux Template

Delorean is a series of opionated project structures for creating ambitious single-page web applications. This variant is targeted at building applications following close to the [Flux](https://facebook.github.io/react/docs/flux-overview.html) architecture with [React](https://facebook.github.io/react/) and [RxJS](http://reactive-extensions.github.io/RxJS/).

## Features
- Multiple projects can be made using a single template to share common code and functionality
- Tasks are available to generate code and build applications with a single command
- Source code is written in JavaScript with CommonJS in mind
- JSX transformations are automatically made provided the pragma is included
- Routing is included with support for push state if available
- 3rd party dependencies can be added using NPM and `package.json`
- Stylesheets are written using LESS (Bootstrap can easily be integrated)
- A simple server is included for testing or to expand upon

## Tools
- [Webpack](https://webpack.github.io/) handles building and joining modules together into static files
- [Scaffolt](https://github.com/paulmillr/scaffolt) provides ways to generate files, reducing the need for writing boilerplate
- [Karma](https://karma-runner.github.io/) handles running unit tests across multiple browsers with ease
- [Express](http://expressjs.com/) provides a server for development/testing/etc.

## Requirements
- [node.js](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
- [Git](http://git-scm.com/)
- [Jake](https://github.com/mde/jake)

## Project Structure
    ├── build                 # Assets/code/styles for the client application
    │   ├── project-a         # A project from src built
    │   ├── project-b         # Another project from src built
    │   └── ...
    ├── server                # Simple server provided for development/testing
    ├── src                   # Source code for projects and shared modules
    │   ├── project-a         # A project
    │   ├── project-b         # Another project
    │   ├── ...
    │   ├── main              # Default starter project generated
    │   │   ├── main          # Angular controllers
    │   └── shared            # Common functionality that projects share
    ├── karma.conf.js         # Karma runner setup
    ├── package.json          # Node project dependencies and configuration
    └── webpack.config.js     # Webpack build setup
