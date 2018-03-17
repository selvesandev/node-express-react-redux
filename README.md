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