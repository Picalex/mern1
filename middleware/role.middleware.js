const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {



         //decoded.roles.map((roles)=>{console.log(roles._id)})
        //decoded.userRoles.map((role)=>{console.log(role)})
        const name=[]
        function Nameless(decoded,name) {
            decoded.userRoles.map((UserRoles,index)=>{
            decoded.roles.map((roles)=>{
                    if(roles._id===UserRoles){
                        name[index]=roles.roleName
                    }
                })
            })

        }
        next()
        //Nameless(req.user,name)
       // if (t){
       //     console.log(name)
       //      next()
       // } else {
       //     return res.status(401).json({ message: 'нет доступа' })
       // }

    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}
