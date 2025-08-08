// events.docs.ts - expose only Swagger JSON document
export const events = (cutomPath: string, _STAGE: string) => [
  {
    http: {
      path: `${cutomPath}/docs-json`,
      method: 'get',
      cors: true,
      private: false,
    },
  },
];

