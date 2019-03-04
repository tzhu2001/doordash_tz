import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const DDTheme = createMuiTheme({
    palette: {      
      primary: { main: red[500] }, // Purple and green play nicely together.      
    }
  });

export default DDTheme;