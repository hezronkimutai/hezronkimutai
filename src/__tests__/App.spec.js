import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('Test App', () => {
  test('renders without crashing', () => {
    expect(mount(<App />)).toMatchSnapshot();
  });
});
