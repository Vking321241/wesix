import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export { useNavigate as useRouter, useParams, useSearchParams };

export function usePathname(): string {
  const location = useLocation();
  return location.pathname;
}

export function redirect(path: string) {
  window.location.hash = path;
}
