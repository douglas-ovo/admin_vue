import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import api from './source/api'

export function setupProdMockServer() {
    createProdMockServer([...api])
}