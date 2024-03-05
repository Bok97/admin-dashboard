export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
  };
  

export function isTokenExpired(token: string): boolean {
  try {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const payload = JSON.parse(window.atob(base64));
    const expiry = payload.exp; 
    const now = new Date().getTime() / 1000; 

    return expiry < now; 
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; 
  }
}

export function logoutAndRedirect(): void {
  localStorage.removeItem('token');
  window.location.href = '/login';
}