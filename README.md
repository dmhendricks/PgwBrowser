# PgwBrowser

The full documentation and an example are available on [pgwjs.com/pgwbrowser](http://pgwjs.com/pgwbrowser/).

## Installation

According to your system, select the preferred installation mode:

### JavaScript

Download the plugin by cliking the button **Download ZIP** on the right.  
To get the plugin updates, fork it on Github and regularly verify your plugin version.

### Node / NPM

    npm install pgwbrowser

### Composer

**GitHub Repo:**

	"repositories": [
	    {
	        "type": "git",
	        "url": "https://github.com/dmhendricks/PgwBrowser.git"
	    }
	],
	"require": {
	    "dmhendricks/PgwBrowser": "~1.3"
	}

**Distribution ZIP:**

	"repositories": [
	    {
    	    "type": "package",
	        "package": {
	          "name": "dmhendricks/PgwBrowser",
	          "version": "master",
	          "dist": {
	            "type": "zip",
	            "url": "https://github.com/dmhendricks/PgwBrowser/archive/1.2.0.zip",
	            "reference": "master"
	          },
	          "autoload": {
	              "classmap": ["."]
	          }
	      }
	    }
	],
	"require": {
	  "dmhendricks/PgwBrowser": "dev-master"
	}


## Requirements

jQuery 1.0 or Zepto.js 1.0 (minimal version)


Contributing
---------

All issues or pull requests must be submitted through GitHub.

* To report an issue or a feature request, please use [GitHub Issues](https://github.com/dmhendricks/PgwBrowser/issues).
* To make a pull request, please create a new branch for each feature or issue.


ChangeLog
---------

* 2015-03-19 - Added new elements (Version 1.3)
* 2014-08-17 - Added more browsers and platforms (Version 1.2)
* 2014-08-03 - Added resize and orientation events (Version 1.1)
* 2014-08-02 - First commit (Version 1.0)
