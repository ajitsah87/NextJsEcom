'use client'

import { ProductListType } from '@/interfaces/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://fakestoreapi.com'}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductListType, null>({
            query: () => '/products'
        })
    })
})

export const { useGetAllProductsQuery } = productsApi;