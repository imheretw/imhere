import jwt from 'jsonwebtoken';
import User from 'models/user';
import config from 'config/appConfig';

export default function jwtMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: 'require jwt token' });
  }

  jwt.verify(token, config.auth.jwt, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'invalid jwt token' });
    }

    // load user into req.user
    User
      .query({ where: { id: user.id } })
      .fetch()
      .then((user) => {
        if (!user) {
          return res.status(401).send({ error: 'invalid jwt token' });
        }

        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  }); // end of jwt verify
}
