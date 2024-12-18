const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const connectionDB = require('../connections/connectionDB')
const User = require('../models/user')



module.exports = passport => {
	const options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: connectionDB.jwt
	}
	passport.use(
		new JwtStrategy(options, (payload, done) => {
			const user = User.findByIds(payload.userId)
			user.then((datas) => {
				if (datas !== null) {
					done(null, datas)
				} else {

					done(null, false)
				}
			})
		})
	)
}