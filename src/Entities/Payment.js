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

export const PaymentList = (props, schema) => {

  return <List 
    {...props} 
    title="Lista de Bancos"
    actions={<ListActions />}
  >
    <Datagrid>
      <EditButton />
      <NumberField source="totalPrice" />
      <DateField source="creationDate" />
      <ReferenceField source="provider" reference="provider">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>

};

export const PaymentEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <NumberInput source="totalPrice" />
      <ReferenceInput source="provider" reference="provider">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const PaymentCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <NumberInput source="totalPrice" />
      <ReferenceInput source="provider" reference="provider">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);