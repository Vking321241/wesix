import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  href: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function Link({ href, children, className, ...props }: Props) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return <a href={href} className={className} {...props}>{children}</a>;
  }
  return <RouterLink to={href} className={className} {...props}>{children}</RouterLink>;
}
