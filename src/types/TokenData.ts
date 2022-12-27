

export type TokenData = {
  tokenId: number
  collectionId: number
  name: string
  image: string
  seed: string
  description: string
  attributes: {[key: string]: string | number}
}
