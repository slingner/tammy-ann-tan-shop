import {
  UploadHandler,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from 'react-router';
import { unstable_createFileUploadHandler } from 'react-router';

export const standardFileUploadHandler = unstable_composeUploadHandlers(
  unstable_createFileUploadHandler({
    avoidFileConflicts: true,
    directory: '/tmp',
    file: ({ filename }) => filename,
    maxPartSize: 15_000_000,
  }),
  unstable_createMemoryUploadHandler(),
);

export const uploadHandler: UploadHandler = async (part) => {
  return standardFileUploadHandler(part);
};
