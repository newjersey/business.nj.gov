export default {
  type: "object",
  properties: {
    env: { type: 'string' }
  },
  required: ['env']
} as const;

export type Schema = {
  env: string;
}