import { AppProps } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import '../assets/app.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
