# body-monitor
VueJS app for logging weight and other body measures.
It uses the [body monitor API](https://github.com/gryp17/body-monitor-api).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Configuration

1. API

  The API configuration file is located in

  > [/src/config.js](https://github.com/gryp17/body-monitor/blob/master/src/config.js)
  
2. Public path

  Change the publicPath rule based on your domain path.
  
  The vue config file is located in the root directory of the project
  
  > [/vue.config.js](https://github.com/gryp17/body-monitor/blob/master/vue.config.js)
  
   Examples:
   
  ```
  //http://body-monitor.com
  publicPath: ''
  ```
  
  ```
  //localhost/body-monitor
  publicPath: '/body-monitor'
  ```

