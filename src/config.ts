// Use the current hostname dynamically to support mobile testing on local network (e.g., 192.168.x.x)
export const API_BASE_URL = import.meta.env.PROD 
  ? window.location.origin 
  : `http://${window.location.hostname}:3001`;
