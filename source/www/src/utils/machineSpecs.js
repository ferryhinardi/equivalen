import {machineId, machineIdSync} from 'node-machine-id';

export const getMachineId = (isAsync = true, original = true) => {
  const getAsyncId = async () => {
    const id = await machineId(original);
    return id;
  };

  if (isAsync) {
    return getAsyncId();
  }

  return machineIdSync({original});
};
