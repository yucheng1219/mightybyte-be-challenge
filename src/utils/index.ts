import { sampleSize } from 'lodash'

export const generateRandomString = (length: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return sampleSize(characters, length).join('')
}
