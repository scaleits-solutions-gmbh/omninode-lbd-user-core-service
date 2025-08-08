const base = 'auth';
export const events = (cutomPath: string, STAGE: string) => [
  { http: { path: `${cutomPath}/cruds/${base}/sessions`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${base}/sessions/count`, method: 'get', cors: true, private: STAGE !== 'local' } },
  { http: { path: `${cutomPath}/cruds/${base}`, method: 'options', cors: true } },
];

