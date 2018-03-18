```
npm init -y

git init
```

#### Single Entry Point
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

### Install Babel To Combile our ES6 Code.
now navigation to `server` folder and write `node index.js` you will be prompted with a error 
that's because node won't understand our es6 code so we will have to install babel.

```
npm install --save-dev babel-cli
```

Also install Express
```
npm install --save express.
```
### Setup Babel (.babelrc)
create a .babelrc file where we are going to use the bebel preset we are going to use.
``` .babelrc
{
  "presets": [
    "es2015"
  ]
}
```
Finally download the `es2015` preset

```
npm install --save-dev babel-preset-es2015
```

Now open up your `package.json` file and add a npm command.
```
"scripts": {
    "serve": "babel-node server/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
Here `babel-node` is a part of babel-cli package which will help us to compile our es6 node js code in our `server/index.js` 
  
**No finally you can run you server**
```
npm run serve
``` 

### Serving index.html file to the browser
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


### Install `nodemon` for the server.
```
npm install --save-dev nodemon
```
Setup nodemon server in `package.json` file
```
  "scripts": {
    "start": "nodemon --watch server --exec babel-node -- server/index.js",
    "serve": "babel-node server/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

**Here** we are going to use nodemon and we are going to --watch only server folder because
the client code that comes outside the server will be watched by webpack. Next we need to execute `--exec babel-node` 
the provide the file `server/index.js` file to nodemon therefore ` -- server/index.js`  
```
"start": "nodemon --watch server --exec babel-node -- server/index.js",
    
```
Go to terminal 

```
npm start
```



## Rendering our first React Component.
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
Create you composer `App.js` inside the components folder in client directory
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

### Setting up the webpack
Quickly Download the `webpack` and `webpack-dev-middleware`
```
npm install --save-dev webpack webpack-dev-middleware
```

As we are using express we will be using `webpack-dev-middleware` package so open up the `index.js` file
in the server.

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


**NOTE** Here the `webpack.config.dev.js` file is the webpack configuration file 
1) Create webpack.config.dev.js
```
import path from 'path';

export default {
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: '/'
    }
}
```

2) webpack does not know anything about javascript therefore we need it to instruct it how to handle javascript files so we need to
use some kind of loader.

```
module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                use: 'babel-loader'
            }
        ]
    }
```
Here we specified loader as `babel` which will be transpilling es6 code so we will have to install the `babel loader`
```
npm install --save-dev babel-loader
```

3) Babel Does not understand react so we need to provide another preset for babel to understant react.
```
npm install -save-dev babel-preset-react
```

Edit the `.babelrc` file
```
{
  "presets": [
    "es2015",
    "react"
  ]
}
```