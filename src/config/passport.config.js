import passport from "passport";
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { userModel } from "../dao/models/user.model.js";
import GithubStrategy from 'passport-github2'


const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true , usernameField: 'email' } , async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const exists = await userModel.findOne({email: username})
            if(exists){
                return done(null, false)
            }

            const user = await userModel.create({first_name, last_name, age , email: username , password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))})

            return done(null, user)

        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
        try {
            const user = await userModel.findOne({email:username})

            if(!user) {
                return done(null,false)
            }

            if(!bcrypt.compareSync(password, user.password)){
                return done(null,false)
            }

            return done(null, user)

        } catch (error) {
            return done(error)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.28524b200f8a7660' ,
        clientSecret: '77f9e783709d05eeb2076867b70e978cf9b814bf',
        callbackURL: 'http://localhost:8080/api/githubcallback' , 
        scope: ['user:email'],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            const email = profile.emails[0].value;
            const user = await userModel.findOne({email})

            if(!user) {
                const newUser = await userModel.create({
                first_name: profile._json.name,
                last_name: '',
                age: 18, 
                password: '',
                email
            })

            return done(null, newUser)
        }
        } catch (error) {
            return done(error)
        }

        
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser( async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializePassport;