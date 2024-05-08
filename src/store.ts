/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { hostApiServices } from './services/hostApiServices';


// const APPCODE = import.meta.env.VITE_APPCODE;
const rootReducer = combineReducers(
    {
        [hostApiServices.reducerPath]: hostApiServices.reducer,
        // [fuelAppService.reducerPath]: fuelAppService.reducer,
      }
);

export const setupStore = () => {
  return configureStore({
    reducer:
      {
            [hostApiServices.reducerPath]: hostApiServices.reducer,
            // [fuelAppService.reducerPath]: fuelAppService.reducer,
          }
       ,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        [
              hostApiServices.middleware as any,
              // fuelAppService.middleware as any,
           ]
      ),
  });
};

export const persiststore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// // ... other imports
// type CustomEnhancedStore = EnhancedStore & {
//   asyncReducers?: Record<string, any>;
//   injectReducer?: (key: string, asyncReducer: any) => void;
// };
// export const setupStore = () => {
//   const store: CustomEnhancedStore = configureStore({
//     reducer: createRootReducer(), // Use a function to create the initial root reducer
//     // ... other store setup like middleware
//   });

//   // Add a field to the store that keeps track of the current reducer map
//   store.asyncReducers = {};

//   // Create an injectReducer function that adds a new reducer to the asyncReducers map
//   // and replaces the current root reducer with a new one that includes the new reducers
//   store.injectReducer = (key, asyncReducer) => {
//     if (store.asyncReducers && !store.asyncReducers[key]) {
//       store.asyncReducers[key] = asyncReducer;
//       store.replaceReducer(createRootReducer(store.asyncReducers));
//     }
//   };

//   return store;
// };

// // Function to create the root reducer with the asyncReducers
// function createRootReducer(asyncReducers: Record<string, Reducer> = {}) {
//   return combineReducers({
//     // Static reducers here
//     // ... other static reducers
//     ...asyncReducers, // Spread the async reducers
//   });
// }

// export type RootState = ReturnType<typeof createRootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];

// // Later on, you could use store.injectReducer to add a new reducer like this:
// // store.injectReducer('newFeature', newFeatureReducer);
