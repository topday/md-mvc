module.exports = {
  ucfirst: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  camelToSplit: function(str, splitter = '-') {

  },
  splitToCamel: function(str, splitter = '-') {
    const strSerial =  str.split(splitter)


  },
  guid: (len = 12) => {                                                                
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
    let text = "";                                                                     
    for (let i = 0; i < len; i++)                                                      
      text += possible.charAt(Math.floor(Math.random() * possible.length));            
      return text;                                                                       
   }                                                                                    
}

