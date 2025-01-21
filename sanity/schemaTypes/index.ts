import { type SchemaTypeDefinition } from 'sanity'
import Product from './Product'
import Casual from './Casual'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product],
}
