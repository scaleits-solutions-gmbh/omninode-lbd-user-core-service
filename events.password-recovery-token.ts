const pathSegment = 'password-recovery';
export const events = (cutomPath: string, STAGE: string) => [
  { http: { path: `${cutomPath}/cruds/${pathSegment}`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/count`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/{tokenId}`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}`, method: 'post', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/{tokenId}`, method: 'put', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}/{tokenId}`, method: 'delete', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${pathSegment}`, method: 'options', cors: true } },
];

