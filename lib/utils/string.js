module.exports = {
  ucfirst: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  camelToSplit: function(str, splitter = '-') {
    return str.match(/[A-Z][a-z0-9]+/g).join(splitter).toLowerCase()
  },
  splitToCamel: function(str, splitter = '-') {
    return str.split(splitter).map(nameNode => {      
      return nameNode.replace(/^[a-z]/, function(m, w) {
        return m.toUpperCase()
      })
    }).join('')
  },
  guid: (len = 12) => {                                                                
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    let text = "";                                                                     
    for (let i = 0; i < len; i++)                                                      
      text += possible.charAt(Math.floor(Math.random() * possible.length));            
      return text;                                                                       
   }                                                                                    
}

