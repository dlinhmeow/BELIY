'usec client'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { ProductList } from '../organisms'

interface ProductProps {
  gender?: string
  stateStore: UseFormReturn<any, any>
}
const Product: React.FC<ProductProps> = ({ gender, stateStore }) => {
  return (
    <div className="py-6 min-h-[60vh]">
      <Controller
        name="categories"
        control={stateStore.control}
        defaultValue={[]}
        render={({ field }) => {
          return (
            <>
              {field.value.map((item) => (
                <ProductList key={JSON.stringify(item)} gender={gender} id={item.catId} catId={item.catId} title={item.name} />
              ))}
            </>
          )
        }}
      />
    </div>
  )
}

export default Product
