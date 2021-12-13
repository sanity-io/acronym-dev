export default {
  type: 'object',
  name: 'resource',
  title: 'Resource',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the resource.',
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'The URL of the resource.',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url'
    },
  }
}
