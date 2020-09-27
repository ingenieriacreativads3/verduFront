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

    </TopToolbar>
  );
};

export const PaymentMethodList = (props, schema) => {

  return <List 
    {...props} 
    title="Lista de Bancos"
    actions={<ListActions />}
    // filters={<PaymentMethodFilter />}
  >
    <Datagrid>
      <EditButton />
      <TextField label="Nombre" source="name" />
    </Datagrid>
  </List>

};

export const PaymentMethodEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput label="Identificador" disabled source="id" />
      <TextInput label="Nombre" source="name" />
    </SimpleForm>
  </Edit>
);

export const PaymentMethodCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label="Nombre" source="name" />
    </SimpleForm>
  </Create>
);