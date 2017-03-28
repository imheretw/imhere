import jwt from 'jsonwebtoken';
import User from 'models/user';
import config from 'config/appConfig';

export default function jwtMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ error: 'require jwt token' });
    return;
  }

  jwt.verify(token, config.auth.jwt, (err, user) => {
    if (err) {
      res.status(401).json({ error: 'invalid jwt token' });
      return;
    }

    // load user into req.user
    User
      .query({ where: { id: user.id } })
      .fetch()
      .then((userModel) => {
        if (!userModel) {
          res.status(401).send({ error: 'invalid jwt token' });
          return;
        }

        req.user = userModel;
        next();
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  }); // end of jwt verify
}
