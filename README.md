```
git init
```
## Create a package.json File
As per every node project, the best way to start is by creating a directory and running npm init -y
```
npm init -y
```

## Install Babel To Combile our ES6 Code and Create .babelrc file
Node won't understand our es6 code so we will have to install babel. 
Now create another file, you can do this through the terminal `touch .babelrc` 
```
{"presets": ['env']}
```
According to the documentation we just need to use the `env` preset. With `.babelrc` 
configured, we just need to install the `babel-preset-env`
```
npm install babel-preset-env --save-dev

```                                                                     

## Install nodemon for server and bebel-node to compile our server code.
Next, we should install `nodemon` and `babel-node` globally.
```
npm install -g nodemon babel-node
```

## Install Express
```
npm install --save express.
```


## Testing What we have so far by Creating Single Entry Point
`/server/index.js`
```
    import express from 'express';
    
    let app = express();
    
    app.get('/*', (req, res) => {
        res.send('hello world');
    });
    
    app.listen(3000, () => {
        console.log('We are running on localhost:3000');
    });

```

## Configure package.json And Run the server 
Now open up your `package.json` file and add a npm command.
```
"scripts": {
    "start":"nodemon --exec babel-node server/index.js"
    "serve": "babel-node server/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
Here `babel-node` is a part of babel-cli package which will help us to compile our es6 node js code in our `server/index.js` 
  
**No finally you can run you server**
```
npm start
``` 


## Serving index.html file to the browser
```
import express from 'express';
import path from 'path';

let app = express();

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
});

app.listen(3000, () => {
    console.info('Server running on http://localhost:3000');
});

```





## Rendering our first React Component.
File Structure.
```
root/
    .babelrc
    package.json
    server/server.js
    webpack.config.js
    client/
        style/
            style.css
        components/
            App.js    
        index.html 
        index.js        
```

Install React and React Dom.

```
npm install --save react react-dom
```
Create `client` folder in the project root directory which `index.js` file init.

``` index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    import App from './components/App'
    
    
    ReactDOM.render(<App/>,
        document.getElementById('root')
    );
```


Create you component `App.js` inside the components folder in client directory
``` App.js

import React, {Component} from 'react';

export default () => {
    return (
        <h1>Hello world from react</h1>
    )
}

```

Add `bundle.js` which will be later compiled by webpack into your index.html file
```
<script type="text/javascript" src="bundle.js"></script>
```

## Setting up the webpack
index.js should be connected to index.html at the moment we aren't connecting them. We'd do that with webpack.
  
First let's tell babel to watch for the react syntax as well - we do that in .babelrc:
```
{"presets": ['env', 'react']}
```
Of course we'd need to install the preset:   `npm i --save-dev babel-preset-react`

  

## Quickly Download the `webpack` and `webpack-livereload-plugin `
```
npm install --save-dev webpack webpack-livereload-plugin 
```
### Setting up webpack rules
```
module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                use: 'babel-loader'
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
```
Very self explanatory, we are basically making sure that if the file being processed is with a .js extension, run it through babel-loader package (only in the client folder).

Note that using `babel-loader` seems to require `babel-core` as well.


### Adding Sass
```
npm i --save-dev sass-loader node-sass
```
webpack.config.js

```
,
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                },
                    {
                        loader: "css-loader", options: {
                        sourceMap: true
                    }
                    },
                    {
                        loader: "sass-loader", options: {
                        sourceMap: true
                    }
                    }]
            }
```
With that setup, in ./client/index.js we would be able to import SASS files in our react code and webpack would handle the conversion.

```
npm i --save-dev babel-loader style-loader css-loader babel-core

```

### Setting up plugins
```

    plugins: [
        new LiveReloadPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'views/index.html'
        // })
    ]
```

## Using the bundle
We've already decided to use express to send content to the browser.  
It makes sense that we need to get the bundle from webpack and serve it through express.  
To do this we will require `webpack-dev-middleware` package 
so open up the `server/index.js` file in the server.
```
npm i --save-dev webpack-dev-middleware

```

``` index.js

import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.js';

let app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
});

app.listen(3000, () => {
    console.info('Server running on http://localhost:3000');
});

```
**Benefit of using webpack-dev-middleware**
* No files are written to disk, rather it handles files in memory
* If files changed in watch mode, the middleware delays requests until compiling has completed.
* Supports hot module reload (HMR).


**NOTE** Here the `webpack.config.js` file is the webpack configuration file 
1) Create webpack.config.dev.js
```
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin'

import path from 'path';

const env = process.env.NODE_ENV;


export default {
    mode: env || 'development',
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                use: 'babel-loader'
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                },
                    {
                        loader: "css-loader", options: {
                        sourceMap: true
                    }
                    },
                    {
                        loader: "sass-loader", options: {
                        sourceMap: true
                    }
                    }]
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'views/index.html'
        // })
    ]
}
```

2) webpack does not know anything about javascript, css, sass therefore we need it to instruct it how to handle javascript files so we need to
use some kind of loader.

