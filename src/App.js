import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import jsonServerProvider from 'ra-data-json-server';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import Dashboard from './Entities/Home';
import NotFound from './Entities/NotFoundPage';
import MyLoginPage from './Entities/LoginPage'
import { createMuiTheme } from '@material-ui/core/styles';

import { BankList, BankCreate, BankEdit } from './Entities/Bank'
import { PaymentMethodList, PaymentMethodCreate, PaymentMethodEdit } from './Entities/PaymentMethod'
import { UserList, UserCreate, UserEdit } from './Entities/User'
import { SessionList, SessionCreate, SessionEdit } from './Entities/Session'
import { SaleList, SaleCreate, SaleEdit } from './Entities/Sale'
import { ProviderList, ProviderCreate, ProviderEdit } from './Entities/Provider'
import { PaymentList, PaymentCreate, PaymentEdit } from './Entities/Payment'

const httpClient = (url, options = {}) => {
  // if (!options.headers) {
  //     options.headers = new Headers({ Accept: 'application/json' });
  // }
  // add your own headers here

  options.headers = new Headers()

  options.headers.set('Content-Type', 'application/json');
  options.headers.set('Authorization', localStorage.getItem('session_token'));
  options.headers.set('session', localStorage.getItem('session_id'));
  return fetchUtils.fetchJson(url, options);
}

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

const App = () => {

  return <Admin 
    dashboard={ Dashboard } 
    authProvider={ authProvider } 
    dataProvider={ dataProvider }
    catchAll={ NotFound }
    // theme={ theme }
  >
    {/* <Resource name="bank" list={ BankList } edit={ BankEdit } create={ BankCreate } /> */}
    <Resource options={{ label: 'Ventas' }} name="sale" list={ SaleList } create={ SaleCreate } />
    <Resource options={{ label: 'Pagos' }} name="payment" list={ PaymentList } edit={ PaymentEdit } create={ PaymentCreate } />
    <Resource options={{ label: 'Proveedores' }} name="provider" list={ ProviderList } edit={ ProviderEdit } create={ ProviderCreate } />
    <Resource options={{ label: 'Métodos de Pago' }} name="paymentMethod" list={ PaymentMethodList } />
    {/* <Resource name="user" list={ UserList } edit={ UserEdit } create={ UserCreate } /> */}
    {/* <Resource name="session" list={ SessionList } /> */}
  </Admin>
};

export default App;
