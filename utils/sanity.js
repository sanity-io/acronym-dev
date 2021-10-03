import {
    createClient
} from 'next-sanity'

const config = {
    projectId: '',
    dataset: '',
    apiVersion: '2021-10-03',
    useCdn: false
}


export const client = createClient(config)