import { faker } from '@faker-js/faker'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}




export function makeData(data: number[]) {
  const makeDataLevel = ()=> {
   return [{
    firstName: "som",
    lastName: "string",
    age: 12,
    visits: 121,
    progress: 12,
    status: 2,
    subRows: []
   }] 
   
  }

  return makeDataLevel()
}
