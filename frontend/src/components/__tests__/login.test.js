import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {Login} from '../login/index';

const URL = '/auth/login';

const server = setupServer(
    rest.post(URL, (req, res, ctx) => {
      return res(ctx.json({message: 'token'}));
    }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 */
test('Log in load', async () => {
  render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<Login/>}/>
        </Routes>
      </BrowserRouter>,
  );
});

test('Test login', async () => {
  render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element= {<Login/>}/>
        </Routes>
      </BrowserRouter>,
  );
  const username = screen.getByPlaceholderText('username');
  expect(username.value).toBe('');
  fireEvent.change(username, {target: {value: 'fe.test'}});
  const password = screen.getByPlaceholderText('password');
  expect(password.value).toBe('');
  fireEvent.change(password, {target: {value: 'fe.test'}});
  fireEvent.click(screen.getByText('Login'));

  server.use(
      rest.post(URL, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
  );
});
