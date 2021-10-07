import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import portableText from './portableText'
import term from './term'
export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        portableText,
        term
    ]),
})