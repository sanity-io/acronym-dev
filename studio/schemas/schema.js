import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import portableText from './portableText'
import term from './term'
import person from './person'
import defintion from './definition'
import resource from './resource'
export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        resource,
        portableText,
        defintion,
        term,
        person,
    ]),
})