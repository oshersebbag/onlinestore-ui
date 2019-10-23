import React from 'react';
import ReactDOM from 'react-dom';
import CartButton from './CartButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CartButton />, div);
  expect(div.querySelector("span").textContent).toBe('0');
  ReactDOM.unmountComponentAtNode(div);
});
