
const express = require('express');
const compression = require('compression');
const path = require('path');
const next = require('next');
const mongoose = require('mongoose');
const routes = require('../routes');

// SERVICE
const authService = require('./services/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = routes.getRequestHandler(app);
const config = require('./config');

const Book = require('./models/book');
const bodyParser = require('body-parser');

const bookRoutes = require('./routes/book');
const portfolioRoutes = require('./routes/portfolio');
const blogRoutes = require('./routes/blog')

const robotsOptions = {
	root: path.join(__dirname, "../public"),
	headers: {
		'Content-Type': 'text/plain;charset=UTF-8'
	}
}

const secretData = [
	{
		title: 'SecretData 1',
		description: 'Plans how to build spaceship'
	},
	{
		title: 'SecretData 2',
		description: 'My secret passwords'
	}
]

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Database Connected!'))
	.catch(err => console.error(err))

// async() => (await mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 	.then(() => console.log('Database Connected!'))
// 	.catch(err => console.error(err))
// )()

app.prepare().then(() => { 
	const server = express();
	//the bottom line compresses all compiled script and images to be as small in size as possible
	server.use(compression());
	server.use(bodyParser.json());

	server.use('/api/v1/books', bookRoutes);
	server.use('/api/v1/portfolios', portfolioRoutes);
	server.use('/api/v1/blogs', blogRoutes);

	server.get('/robots.txt', (req, res) => {
		return res.status(200).sendFile('robots.txt', robotsOptions);
	})

	server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
		return res.json(secretData);
	})

	server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
		console.log(req.user);
		return res.json(secretData);
	})

	server.get('*', (req, res) => {
		return handle(req, res);
	})

	server.use(function (err, req, res, next) {
		if (err.name === 'UnauthorizedError') {
			res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!'});
		}
	});

	const PORT = process.env.PORT || 3000;
	server.listen(PORT, (err) => {
		if(err) { console.log(err); }
		console.log(`> Ready on port ${PORT}`)
	})
})