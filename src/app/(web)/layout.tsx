import '@/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';

import { CreateTeamContextProvider } from '../hooks/context/registerContext';

const sourceCode = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['200', '400', '600', '900'],
});

export const metadata: Metadata = {
  title: 'Cicada 3301',
  description: 'There is a message hidden in this page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceCode.className}>
        <main
          style={{
            width: '100dvw',
            minHeight: '100dvh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgb(7 13 14)',
            color: 'white',
            paddingBlock: '6rem',
          }}
        >
          <CreateTeamContextProvider>{children}</CreateTeamContextProvider>
          <ToastContainer
            autoClose={3000}
            position="bottom-right"
            closeOnClick
            transition={Slide}
            toastClassName={'toast-custom'}
            progressClassName={'toast-progress-custom'}
            closeButton={false}
          />
        </main>
      </body>
    </html>
  );
}
