const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("./auth-model")
const jwt = require("jsonwebtoken")
const restrict = require("./authenticate-middleware")

const router = express.Router()

router.get("/testusers", async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.get('/testusers/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});


router.get("/users", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,

            password: await bcrypt.hash(password, 14),
       
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
		}


		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
		}


      
        
		const token = jwt.sign({
			userID: user.id,
			userRole: "basic", 
		}, 'keyboard cat')


		res.header("token", token)

        res.json({
            message: `Welcome ${user.username}!`,
            token,
		})
	} catch(err) {
		next(err)
	}
})

router.delete("/testusers/:id", async (req, res, next) => {
  try{
    const deleted = await Users.remove(req.params.id)
    if(!deleted){
      return res.status(404).json({
        message: "not deleted"
      })
    }
    res.status(204).end()
	} catch(err) {
		next(err)
	}
})

module.exports = router