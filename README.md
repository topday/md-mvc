# Quick overview:

## Apply MVC strategy and OO JS on NodeJS level. 

### Aiming to normalise:
 
- [x] clearly split MVC and provide the comunication flow direction 
```
  controller -> model -> (models, libraries)
      |
      v
    view
```
- [ ] minimise libraries declaration then loading models
- [ ] self unit test schema generator 
- [ ] self performance diagnostic and visualisation for bottle neck based on socket timing 
- [ ] DRY: decalre once and the find the rest depencies
- [ ] resolve relative path for business models
- [ ] Rich caching engine using the RAM memory under the patterns: *Press, Events, Blind*

## Business features 
 1. Transparent RESTful url notation
    - Example: http://localhost:9000/shop/tickets/cancelation/
      - On server: 
        - create file: `~/mvc/controller/shop/tickets.js` and create controller class as shown in `mvc/controller/index.js`
        - declar method inside controller `getCancelationAction` with output `return {cancel: 'tickets'}`
      - On browser: 
        - refresh page and witness the output

## Instalation procedure

```
npm install 
npm run watch
```

### to access public/client side web page 
On browsers: localhost:9000

### to access admin side web page
On browsers: localhost:9000/admin/

### In node world it is important to know supporting node versions used to develop the framework:
```
node -v # v10.2.1
npm -v  # 5.6.0
uname -a # 4.13.0-43-generic #48~16.04.1-Ubuntu 
```



