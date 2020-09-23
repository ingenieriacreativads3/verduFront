import * as React from "react";
import { cloneElement, useMemo } from 'react';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import PropTypes from 'prop-types';
import { 
  useListContext,
  TopToolbar,
  CreateButton,
  ExportButton,
  Button,
  sanitizeListRestProps,
  List,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  ReferenceInput,
  SelectInput,
  Filter,
  Edit,
  SimpleForm,
  Create,
  ReferenceField,
  EditButton,
  TabbedShowLayout,
  Tab,
  NumberField,
  NumberInput,
  useNotify,
  useRefresh,
  useRedirect,
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';
import { Typography } from '@material-ui/core';

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

const ListActions = (props) => {
  const {
    className,
    exporter,
    filters,
    maxResults,
    ...rest
  } = props;
  const {
    currentSort,
    resource,
    displayedFilters,
    filterValues,
    hasCreate,
    basePath,
    selectedIds,
    showFilter,
    total,
  } = useListContext();
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {
        filters && cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button',
        })
      }
      <CreateButton basePath={basePath} />
      <ExportButton
        disabled={total === 0}
        resource={resource}
        sort={currentSort}
        filterValues={filterValues}
        maxResults={maxResults}
      />
      {/* Add your custom actions */}
      {/* <Button
        onClick={() => { alert('Your custom action'); }}
        label="Show calendar"
      >
        <IconEvent />
      </Button> */}
    </TopToolbar>
  );
};

const SaleFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="q" alwaysOn /> */}
    <ReferenceInput label="Sale" source="name" reference="sale" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const SaleList = (props) => {

  const resource ='/sale'
  const apiUrl = 'http://localhost:303';
  const url = apiUrl + resource + '/schema'


  return <div>
      <List 
      {...props}
      title=""
      actions={<ListActions />}
      // filters={<SaleFilter />}
    >
      <Datagrid>
        {/* <EditButton /> */}
        <NumberField source="totalPrice" />
        {/* <TextField source="operationType" /> */}
        {/* <ReferenceField source="creationUser" reference="user">
          <TextField source="email" />
        </ReferenceField> */}
        {/* <ReferenceField source="updateUser" reference="user">
          <TextField source="email" />
        </ReferenceField> */}
        <DateField source="creationDate" />
        {/* <DateField source="updateDate" /> */}
      </Datagrid>
    </List>
  </div>

};

export const SaleEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <NumberInput source="totalPrice" />
    </SimpleForm>
  </Edit>
);

const Aside = (props) => (
  <div style={{ width: 300, margin: '1em' }}>
    <List {...props} title=" " >
      <Datagrid>
        <NumberField source="totalPrice" />
      </Datagrid>
    </List>
  </div>
);

export const SaleCreate = props => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = ({ data }) => {
    notify(`Se guardo la nueva venta`)
    refresh();
  };

  return <div>
    <Create 
      onSuccess={onSuccess}
      aside={<Aside {...props}/>} 
      {...props}
    >
      <SimpleForm>
        <NumberInput source="totalPrice" />
      </SimpleForm>
    </Create>
  </div>
};