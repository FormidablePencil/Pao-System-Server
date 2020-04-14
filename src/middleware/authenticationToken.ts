import jwt from 'jsonwebtoken'

//@ 1. if successfully logged in then respond back with a token with incrypted username
//~ 2. if user requests for a certian data then authenticate token and if passed and decoded then take the 
//~ decoded username from token and get the data the client requested for 
//% get the data from db of the username that is along side token

const authenticateToken = (req: any, res: any, next: any): void => {
  const authHeader = req.headers['authorization'] //check header 
  const token = authHeader && authHeader.split(' ')[1] //if header has token then split
  if (token === null) return res.sendStatus(401) //else failed

  //compars client's token from header with the one on server
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
    (err: any, obj: any) => {
      if (err) return res.status(401).send('token does not exist')
      req.username = obj.username
      next() //if all went well then go onto the next part
    })
}

export default authenticateToken