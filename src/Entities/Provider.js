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
  Tab
} from 'react-admin';
import IconEvent from '@material-ui/icons/Event';

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
    </TopToolbar>
  );
};

export const ProviderList = (props, schema) => {

  return <List 
    {...props} 
    title="Lista de Proveedores"
    actions={<ListActions />}
  >
    <Datagrid>
      <EditButton />
      <TextField source="name" />
    </Datagrid>
  </List>

};

export const ProviderEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const ProviderCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);