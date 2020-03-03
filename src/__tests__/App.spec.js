import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Test App', () => {
  test('renders without crashing', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
