# Ambari Code Layout

_Ambari code checkout and build instructions are available in Ambari Development page._
_Ambari design and architecture is detailed in [Ambari Design](../ambari-design/index.md) page._
_Understanding the architecture of Ambari is helpful in navigating code easily._

Ambari's source has the following layout

```
ambari/
   ambari-agent/
   ambari-common/
   ambari-project/
   ambari-server/
   ambari-views/
   ambari-web/
   contrib/
   docs/
```

Major components of Ambari reside in their own sub-folders under the root folder, to maintain clean separation of code.

Folder | Components or Purpose
------|---------------------
ambari-server | Code for the main Ambari server which manages Hadoop through the agents installed on each node.
ambari-agent  | Code for the Ambari agents which run on each node that the server above manages.
ambari-web    | Code for Ambari Web UI which interacts with the Ambari server above.
ambari-views  | Code for Ambari Views, the framework for extending the Ambari Web UI.
ambari-common | Any common code between Ambari Server and Agents.
contrib       | Code for any custom contributions Ambari makes to other third party software or libraries.
docs          | Basic Ambari documentation, including the Ambari REST API.

Ambari Server and Agents interact with each other via an internal JSON protocol.
Ambari Web UI interacts with Ambari Server through the documented Ambari REST APIs.

## Ambari-Server

## Ambari-Agent

## Ambari-Views

## Ambari-Web

The Ambari Web UI is a purely browser side JavaScript application based on the [Ember](http://emberjs.com/) JavaScript framework. A good understanding of [Ember](http://emberjs.com/)  is necessary to easily understand the code and its layout.

Being a pure JavaScript application, all UI is rendered locally in browser; with data coming from the Ambari REST APIs provided by the Ambari Server.

```
ambari-web/
   app/
   config.coffee
   package.json
   pom.xml
   test/
   vendor/
```

Folder | Description
------|---------------------
app/          |The main application code. This contains Ember's views, templates, controllers, models, routes, etc. for rendering Ambari UI
config.coffee |[Brunch](http://brunch.io/) application builder configuration file
package.json  |[npm](https://npmjs.org/) package manager configuration file
test/         |Javascript test files testing functionality written in app/ folder
vendor/       |Third party javascript libraries and stylesheets used. Full list of third party libraries is documented in /ambari/ambari-web/app/assets/licenses/NOTICE.txt

Developers mainly work on javascript and other files in the app/ folder. Once that is done, the final javascript is built using Brunch (a HTML5 application assembler based on node.js) into the /ambari/ambari-web/public/ folder. This folder contains the index.html which bootstraps the Ambari web application.

Developers while working should use the

```bash
brunch w
```

command to launch Brunch in watch mode where it re-generates the final application on any change. Similarly

```bash
brunch watch --server (or use the shorthand: brunch w -s)
```

launches a HTTP server at http://localhost:3333 serving the final application. This is helpful in seeing UI with mock data, without the entire Ambari server deployed.

Note: see "[Coding Guidelines for Ambari](./coding-guidelines-for-ambari.md)" for more details on building and running Ambari Web locally.

**ambari-web/app**

Since ambari-web/app/ folder is where developers spend a majority of time, the major files and their purpose is listed below.

Folder or File | Description
------|---------------------
assets/      |  Mock data under assets/data. Static files given from server via assets/font, assets/img.
controllers/ |  The C in MVC. Ember controllers for the main application controllers/main, installer controllers/wizard, and common controllers controllers/global
data/        |  Meta data for the application (UI metadata, server data metadata, etc.)
mappers/     |  Classes which map server side JSON data structures into client side Ember models.
models/      |  The M in MVC. [Ember Data](http://emberjs.com/guides/models/) models used. Clusters, Services, Hosts, Alerts, etc. models are defined here
routes/      |  [Ember routes](http://emberjs.com/guides/routing/) defining the various page redirections in the application. main.js contains the main application routes. installer.js contains installer routes. Others are routings in various wizards etc.
styles/   |  CSS stylesheets represented in the [less](http://lesscss.org/) format. This is compiled by Brunch into the ambari-web/public/stylesheets/app.css
views/    |  The V in MVC. Contains all the Ember views of the application. Main application views under views/main, installer views under views/installer, and common views under views/commons
templates/ | The HTML templates used by the views above. Generally a view will have a template file. Sometimes views define the template content in themselves as strings
app.js     | The main Ember application
config.js  | Main configuration file for the javascript application. Developer can keep application in test mode using the App.testMode property etc.

If a developer adds, removes, or renames a model, view, controller, template, route, they should update the corresponding entry in models.js, views.js, controllers.js, templates.js, routes.js files.