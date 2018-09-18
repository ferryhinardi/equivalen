import { persistCache } from 'apollo-cache-persist';
import { createStorage } from '../reducers/storage';

export const overrideApolloCache = async (cache) => {
  const storage = createStorage();
  try {
    // See above for additional options, including other storage providers.
    await persistCache({ cache, storage });
  } catch (error) {
    console.error('Error restoring Apollo cache', error);
  }
};
