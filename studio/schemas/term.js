export default {
    name: 'term',
    type: 'document',
    fields: [{
            name: 'term',
            type: 'string',
        },
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'term'
            }
        },
        {
            name: 'explainer',
            type: 'array',
            of: [{
                type: 'object',
                fields: [{
                        name: 'letter',
                        type: 'string'
                    },
                    {
                        name: 'term',
                        type: 'string'
                    }
                ]
            }]
        },
        {
            name: 'description',
            type: 'portableText'
        }
    ]
}