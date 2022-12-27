import {TokenData} from "./TokenData";


export type GMCollection = {
  author: string
  name: string
  slug: string
  size: number
  twitter: string
  contract: string
  attributes: {name: string, values: string[]}[]
  tokens: TokenData[]
}
