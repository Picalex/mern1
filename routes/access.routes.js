const {Router} = require('express')
const config = require('config')
const Role = require('../models/Role')
const Access = require('../models/Access')
const auth = require('../middleware/auth.middleware')
const router = Router()
const jwt = require('jsonwebtoken')



router.post('/', auth, async (req, res) => {
    const a=[]
    let prov
    try {
        req.user.userRoles.map((userRole)=>{
            req.user.roles.map((role)=>{
                if (userRole===role._id){
                    a.push(role.roleName)
                }
            })
        })
        prov=false
        a.map((role)=>{
            if(role===req.body.access){
                // console.log(1)
                prov=true
            }
        })
        // console.log(req.user.roles)
        // console.log(req.user.userRoles)
        // console.log(prov)
        res.json(prov)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})




module.exports = router
