import { PropsWithChildren } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import 'twin.macro';

type LinkProps = Omit<NextLinkProps, 'as'>;

export default function Link({ children, href, ...props }: PropsWithChildren<LinkProps>) {
  return (
    <NextLink href={href} passHref {...props}>
      <a tw="text-blue-600 hover:text-blue-700 duration-200">{children}</a>
    </NextLink>
  );
}
