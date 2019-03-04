import React from 'react';
import ReactDOM from 'react-dom';

import TestRenderer from 'react-test-renderer';
import ChatItem from 'components/ChatItem';
import { withStyles } from '@material-ui/core/styles';

import appMainStyles from 'views/styles.js';
import DDTheme  from 'views/theme.js';
import MsgBubble from 'components/MsgBubble';
import Typography from '@material-ui/core/Typography';

const TestComponent = withStyles(appMainStyles, {withTheme: true})(ChatItem)

test('Test Chat Item', () => {
    const testRenderer = TestRenderer.create( <TestComponent name={'name'} login={'login'} message={'message abc'} id={'id'} reaction={null} /> );
    const testInstance = testRenderer.root;

    expect(testInstance.findByType(MsgBubble).findAllByType(Typography).length).toBe(1);
    expect(testInstance.findByType(MsgBubble).findAllByType(Typography)[0].props.children).toBe('message abc');
        
  });