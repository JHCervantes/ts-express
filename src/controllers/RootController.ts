import {NextFunction, Request, Response} from 'express';
import {GetMapping, RestController, Use} from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('Not Permitted');
};

@RestController('')
class RootController {
  @GetMapping('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
    <div>
    <div>You are logged in</div>
    <a href="/protected">Protected Page</a>
    <br/>
    <br/>
    <a href="/auth/logout">Logout</a>
    </div>
    `);
    } else {
      res.send(`
    <div>
    <div>You are not logged in</div>
    <a href="/auth/login">Login</a>
    </div>
    `);
    }
  }

  @GetMapping('/protected')
  @Use(requireAuth)
  getProtected(req: Request, res: Response) {
    if (req.session && req.session.email) {
      res.send(`
        <div>Welcome to a protected route, '${req.session.email}'</div>
        <a href="/">Back Home</a>
       `);
    }
  }
}
