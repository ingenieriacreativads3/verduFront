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
      <CreateButton label="Nueva Venta" basePath={basePath} />
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

  return <div>
      <List 
      {...props}
      title=""
      actions={<ListActions />}
    >
      <Datagrid>
        <NumberField label="Importe" source="totalPrice" />
        <DateField label="Fecha" source="creationDate" showTime locales="es-AR" />
        <ReferenceField label="Método de Pago" source="paymentMethod" reference="paymentMethod">
          <TextField  source="name" />
        </ReferenceField>
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
    <List {...props} title=" " actions={<ListActions />}>
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

  const postDefaultValue = { paymentMethod: '5f6fe5f8c483117ad4f16357' };

  return <div>
    <Create 
      onSuccess={onSuccess}
      aside={<Aside {...props}/>} 
      {...props}
    >
      <SimpleForm initialValues={postDefaultValue}>
        <NumberInput label="Importe" autofocus source='totalPrice' />
        <ReferenceInput label="Método de Pago" source="paymentMethod" reference="paymentMethod">
          <SelectInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  </div>
};