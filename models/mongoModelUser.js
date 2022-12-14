import mongoose from 'mongoose'
const {Schema,model} = mongoose
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.pre("save",async function(next){
    const user = this;
    if(!user.isModified("password")) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        throw new Error('fallo el hasheo')
    }
})

userSchema.methods.comparePassword = async function(frontendPassword){
    return await bcrypt.compare(frontendPassword, this.password)
}

export const User =  model('User',userSchema)