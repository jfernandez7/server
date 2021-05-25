const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'pweeter',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const userLogin = (request, response) => {
  const email = parseInt(request.params.email)
  
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }) 
}

const getProfile = (request, response) => {
  const userId = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
      if (error) {
        throw error
      }
      const name = results.rows[0].name
      const email = results.rows[0].email
      console.log(email)
      pool.query('SELECT * FROM pweets WHERE email = $1', [email], (error, results) => {
        if (error) {
          throw error
        }
        const profile = {
          name: name,
          email: email,
          pweets: results.rows
        }
        response.status(200).json(profile)
      })
    })
  
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const createUser = (request, response) => {
const { name, email } = request.body

pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
    throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
})
}

const getPweets = (request, response) => {
    pool.query('SELECT * FROM pweets ORDER BY pweet_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getPweetById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM pweets WHERE pweet_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
const createPweet = (request, response) => {
const { email, pweet } = request.body

pool.query('INSERT INTO pweets (email, body) VALUES ($1, $2)', [email, pweet], (error, results) => {
    if (error) {
    throw error
    }
    response.status(201).send(`Pweet added with ID: ${result.insertId}`)
})
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    getPweets,
    getPweetById,
    createPweet,
    getProfile
  }




