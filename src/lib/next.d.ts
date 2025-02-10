// types/next.d.ts or lib/next.d.ts
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    userId?: string;  // or the appropriate type, like `string` or `number`, depending on how the user ID is stored
  }
}
