import { HttpInterceptorFn } from '@angular/common/http';

export let token: string =''

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    let token: string | null = null;

    // Перевіряємо, чи доступний об'єкт document
    if (typeof document !== 'undefined') {
      const getCookie = (name: string): string | null => {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
          const [key, value] = cookie.split('=');
          if (key === name) {
            return decodeURIComponent(value);
          }
        }
        return null;
      };
  
      token = getCookie('Authorization'); // Замініть 'authToken' на ваш ключ cookie
    }
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `${token}`, // Додаємо заголовок
      },
    });
  }
  return next(req); // Передаємо запит далі
};
