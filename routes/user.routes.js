const {check, validationResult} = require('express-validator')
const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const role = require('../middleware/role.middleware')
const router = Router()
const bcrypt = require('bcryptjs')

router.get('/', auth,role, async (req, res) => {
    try {
        const users = await User.find({})
        users.map((user,index)=>{
            if (user.id===req.user.userId){
                users.splice(index,1)
            }
        })

        res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post(
    '/create',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })
            }

            const {email, password,roles} = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword,roles })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


router.get('/info/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сссссс, попробуйте снова' })
    }
})

router.post('/edit', auth, role,  async (req, res) =>{
    try {
        const user = await User.findById(req.body.id)
        console.log(req.body.roles)
        user.name=req.body.name
        user.surname=req.body.surname
        user.roles=req.body.roles
        user.save()

        res.status(201).json({ message: 'Пользователь изменен' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сссссс, попробуйте снова' })
    }
})

router.post('/remove', auth,role,  async (req, res) => {
    try {
        const user = await User.findById(req.body.user._id)
        await user.remove()
        res.status(201).json({ message: 'Пользователь удален' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сссссс, попробуйте снова' })
    }
})


router.post('/admin', auth, role, async (req, res) => {
    try {
        const user = await User.findById(req.body._id)
        user.name=req.body.name
        user.surname=req.body.surname
        user.email=req.body.email
        await user.save()

        res.status(201).json({ message: 'Пользователь изменен' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так сссссс, попробуйте снова' })
    }
})

module.exports = router