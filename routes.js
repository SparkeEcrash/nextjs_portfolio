//THIS ENABLES DYNAMIC ROUTING WITHOUT HAVING TO MAKE FOLDERS LIKE [id] WITH FILES UNDERNEATH

const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
	.add('test', '/test/:id')
//http://localhost:3000/test/2


// https://github.com/fridays/next-routes