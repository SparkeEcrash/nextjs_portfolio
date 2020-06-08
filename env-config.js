const prod = process.env.NODE_ENV === 'production';

module.exports = {
	'process.env.BASE_URL': prod ? 'http://realprodURL.com' : 'http://localhost:3000',
	'process.env.NAMESPACE': 'http://realprodURL.com',
	'process.env.CLIENT_ID': 'JAyqq9yEXPkFhB684tcCpvIIKJ3BRDWW'
}
