import * as React from "react";
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { ImageField } from 'react-admin';

export default () => (
  <div>

    <Card>
      {/* <CardHeader title="Welcome to the administration" /> */}
      {/* <CardContent>Lorem ipsum sic dolor amet...</CardContent> */}
      <img src="/img/logo.jpeg" width="500"/>
    </Card>
  </div>
);