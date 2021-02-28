import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import Button from './button';
import Link from './link';
import NextLink from 'next/link';

type MenuOpenType = {
  isMenuOpen: boolean;
};

const StyledList = styled.ul(({ isMenuOpen }: MenuOpenType) => [
  isMenuOpen
    ? tw`flex flex-col fixed md:static w-full md:w-auto h-screen md:h-auto inset-0 md:inset-auto items-center justify-center md:justify-start bg-white md:bg-transparent md:flex-row z-10`
    : tw`hidden md:flex items-center`
]);
const StyledButton = styled(Button)(({ isMenuOpen }: MenuOpenType) => [
  isMenuOpen ? tw`md:hidden fixed right-4 top-4 z-50` : tw`md:hidden`
]);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header tw="py-4 px-4 md:px-8 lg:px-12 bg-white flex justify-between items-center">
      <h1 tw="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 font-bold font-serif text-lg">YoSinau!</h1>
      <StyledList isMenuOpen={isMenuOpen}>
        <li tw="md:mr-4 mr-0">
          <Link href="/">Home</Link>
        </li>
        <li tw="md:mr-4 mr-0 mt-4 md:mt-0">
          <Link href="/about">Tentang</Link>
        </li>
        <li tw="mt-4 md:mt-0">
          <Link href="/contact">Kontak</Link>
        </li>
      </StyledList>
      <div tw="hidden md:flex items-center">
        <div tw="mr-2">
          <NextLink href="/login" passHref>
            <a tw="font-semibold text-purple-800 hover:text-purple-900 duration-200">Masuk</a>
          </NextLink>
        </div>
        <NextLink href="/register" passHref>
          <Button as="a">Daftar</Button>
        </NextLink>
      </div>
      <StyledButton
        isMenuOpen={isMenuOpen}
        type="button"
        variant="secondary"
        size="sm"
        tw="block md:hidden"
        onClick={() => setIsMenuOpen(prevState => !prevState)}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </StyledButton>
    </header>
  );
}
