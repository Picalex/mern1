const {Router} = require('express')
const config = require('config')
const Role = require('../models/Role')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()
const jwt = require('jsonwebtoken')

router.post('/create', auth, async (req, res) => {
    try {
        const {name} = req.body
        const condidate=await Role.findOne({roleName:name})
        if(condidate){
            res.status(201).json({ message: 'Role already have' })
        }
        const role = new Role({roleName:name})
        await role.save()
        console.log('add__'+role)
        res.status(201).json({ message: 'add ok' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const roles = await Role.find({})

        res.json(roles)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/remove', auth, async (req, res) => {
    try {

        const role = await Role.findById(req.body.role._id)
        const users = await User.find({})
        users.map((user)=>{
            let a=[]
            user.roles.map((roleUser)=>{
                if (role._id.toString()!==roleUser.toString()){
                   //a=user.roles.filter(test=>test!==roleUser)
                    a.push(roleUser)
                }

            })
            user.roles=a
            user.save()
        })

        console.log('remove__'+role)
        await role.remove()
        res.status(201).json({ message: 'delete ok' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
