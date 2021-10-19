const token = '123456';
const userInfo = {
  name: '袁天琪',
  sex: '男',
  mobile: '15614388196',
  menus: [
    {
      name: '登录页',
      path: '/index',
      component: 'Login',
    },
    {
      name: '首页',
      path: '/index',
      component: 'Layout',
    },
  ],
  token,
};

export default [
  {
    url: '/api/doLogin',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'blue' && body.password === '123456') {
        return {
          code: 200,
          message: '登录成功！',
          data: userInfo,
        };
      }
      return {
        code: 403,
        message: '用户名或密码错误！',
        data: {},
      };
    },
  },
  {
    url: '/api/checkToken',
    method: 'post',
    timeout: 1000,
    response: ({ body }) => {
      if (body.token === token) {
        return {
          code: 200,
          message: 'token校验通过！',
          data: userInfo,
        };
      }
      return {
        code: 403,
        message: '用户身份错误！',
        data: {},
      };
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = '';
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
];
