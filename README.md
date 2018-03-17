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
