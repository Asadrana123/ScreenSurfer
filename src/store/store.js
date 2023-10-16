import {
    configureStore,
    createSerializableStateInvariantMiddleware,
    isPlain,
  } from '@reduxjs/toolkit'
const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);
const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value);
const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
})
import  homeSlice  from './homeSlice'
export const store = configureStore({
  reducer: {
    home:homeSlice,
    middleware: [serializableMiddleware],
  },
})