import {Request, Response} from 'express';
import {GetMapping, PostMapping, RequestBodyValidator, RestController} from './decorators';

@RestController('/auth')
class LoginController {
  @GetMapping('/login')
  getLogin(req: Request, res: Response): void {
    const body: string = `
        <form method="POST">
            <div>
                <label for="email">Email</label>
                <input name="email" />
            </div>
            <div>
                <label for="password">Password</label>
                <input name="password" type="password" />
            </div>
            <button>Submit</button>
        </form>
    `;
    res.send(body);
  }

  @PostMapping('/login')
  @RequestBodyValidator('email', 'password')
  login(req: Request, res: Response) {
    const validUser = 'test@test.com';
    const {email, password} = req.body;
    if (email === validUser && password === 'test') {
      req.session = {loggedIn: true, email: validUser};
      res.redirect('/');
    } else {
      res.send(`
        <div>Invalid email or password</div>
        <a href="/auth/login">Try again</a>
      `);
    }
  }

  @GetMapping('/logout')
  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
