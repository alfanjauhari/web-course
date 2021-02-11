import React from 'react';
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { RenderPageResult } from 'next/dist/next-server/lib/utils';

type Props = {
  page: RenderPageResult | Promise<RenderPageResult>;
  styleTags: any;
};

export default class CustomDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();

    const page = ctx.renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="id">
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
