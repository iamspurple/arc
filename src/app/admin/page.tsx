'use client'

import {
  Admin,
  Resource,
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
} from 'react-admin'
import { BrowserRouter } from 'react-router-dom'
import simpleRestProvider from 'ra-data-simple-rest'

const dataProvider = simpleRestProvider('http://localhost:3000/api')

const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <NumberField source="price" />
      <BooleanField source="inStock" />
    </Datagrid>
  </List>
)

const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <TextInput source="composition" />
      <TextInput source="care" />
      <NumberInput source="price" />
      <BooleanInput source="inStock" />
    </SimpleForm>
  </Edit>
)

const ProductCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="description" multiline />
      <TextInput source="composition" />
      <TextInput source="care" />
      <NumberInput source="price" />
      <BooleanInput source="inStock" defaultValue={true} />
    </SimpleForm>
  </Create>
)

export default function AdminPage() {
  return (
    <BrowserRouter>
      <Admin dataProvider={dataProvider}>
        <Resource
          name="products"
          list={ProductList}
          edit={ProductEdit}
          create={ProductCreate}
        />
      </Admin>
    </BrowserRouter>
  )
}
