import Header from '@components/header';
import 'twin.macro';

export default function Wrapper({ children }) {
  return (
    <>
      <Header />
      <main tw="flex-grow px-4 md:px-8 lg:px-12">{children}</main>
    </>
  );
}
