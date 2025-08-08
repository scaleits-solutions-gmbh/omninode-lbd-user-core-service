const pathSegment = 'identity-providers';
export const events = (cutomPath: string, STAGE: string) => [
  { http: { path: `${cutomPath}/cruds/${pathSegment}`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/count`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/{id}`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}`, method: 'post', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/{id}`, method: 'put', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/{id}`, method: 'delete', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}`, method: 'options', cors: true } },
];

