import * as React from "react";
import { cloneElement, useMemo } from 'react';
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

const SessionFilter = (props) => (
  <Filter {...props}>
    {/* <TextInput label="Search" source="q" alwaysOn /> */}
    <ReferenceInput label="Session" source="name" reference="session" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

export const SessionList = (props) => {

  return <List 
    {...props} 
    title="Lista de Bancos"
    actions={<ListActions />}
    // filters={<SessionFilter />}
  >
    <Datagrid>
      <EditButton />
      {/* <TextField source="operationType" /> */}
      <ReferenceField source="creationUser" reference="user">
        <TextField source="email" />
      </ReferenceField>
      {/* <ReferenceField source="updateUser" reference="user">
        <TextField source="email" />
      </ReferenceField> */}
      <DateField source="creationDate" />
      <DateField source="updateDate" />
    </Datagrid>
  </List>
};

export const SessionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const SessionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);