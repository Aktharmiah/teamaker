import React from 'react';
import renderer from 'react-test-renderer';

import App from "./teamaker/index"


test('Link changes the class when hovered', () => {

  const component = renderer.create(
    App
  );

  let tree = component.toJSON();
  
  
  console.log("json tree", tree);
  
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();

  
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});