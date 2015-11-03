# History Service [![npm version](https://img.shields.io/npm/v/history-service.svg)](https://www.npmjs.com/package/history-service) [![license type](https://img.shields.io/npm/l/history-service.svg)](https://github.com/FreeAllMedia/history-service.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/history-service.svg)](https://www.npmjs.com/package/history-service) ![ECMAScript 6 & 5](https://img.shields.io/badge/ECMAScript-6%20/%205-red.svg)

**Description**

A standalone high-traffic logging service for servers and clients.

**Design Goals**

* Deferred execution of requests
    * via `kue` package
* Web Service endpoint that accepts any data to be logged
* Automatic timestamping
* Client timestamp correction
    * Client sends its own timestamp with the request
    * When request is received it reads the difference between the timestamp the request time
    * Corrects the event timestamp to be now minus the difference

**Stretch Goals**

* Client API for contacting history service

# Quality and Compatibility

[![Build Status](https://travis-ci.org/FreeAllMedia/history-service.png?branch=master)](https://travis-ci.org/FreeAllMedia/history-service) [![Coverage Status](https://coveralls.io/repos/FreeAllMedia/history-service/badge.svg)](https://coveralls.io/r/FreeAllMedia/history-service) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/history-service/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/history-service)  [![bitHound Score](https://www.bithound.io/github/FreeAllMedia/history-service/badges/score.svg)](https://www.bithound.io/github/FreeAllMedia/history-service)  [![Dependency Status](https://david-dm.org/FreeAllMedia/history-service.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/history-service?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/history-service/dev-status.svg)](https://david-dm.org/FreeAllMedia/history-service?theme=shields.io#info=devDependencies)

*Every build and release is automatically tested on the following platforms:*

![node 5.x](https://img.shields.io/badge/node-5.x-brightgreen.svg) ![node 4.x](https://img.shields.io/badge/node-4.x-brightgreen.svg) ![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg)
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)

*If your platform is not listed above, you can test your local environment for compatibility by copying and pasting the following commands into your terminal:*

```
npm install history-service
cd node_modules/history-service
gulp test-local
```

# Usage

1. `npm install history-service`
2. `include HistoryService from "history-service"`
3. **Start the service on a specified port:**

    *service.js:*

    ``` javascript
    const historyService = new HistoryService();

    historyService.listen(8045, () => {
      // Service is listening on designated port
    });
    ```

4. **Send some data to the service:**

    *client.js:*

    ``` javascript
    import Request from "appeal";

    Request
      .get
      .url("https://myserver.com/history")
      .results((error, result) => {
        if (error) { throw error; }
        // If no errors, request was accepted
      });
    ```

5. **Close the service when done:**

    *service.js:*

    ``` javascript
    historyService.close(() => {
      // Service is no longer listening
    });
    ```
