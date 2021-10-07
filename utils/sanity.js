import {
    createClient,
    createPortableTextComponent,
    groq
} from 'next-sanity'

const config = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    apiVersion: '2021-10-03',
    useCdn: false
}


export const client = createClient(config)

export const BlockContent = createPortableTextComponent(config)