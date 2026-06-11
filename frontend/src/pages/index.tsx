import type { GetServerSideProps } from 'next';

// Root path redirects to the landing page.
export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: '/landing', permanent: false } };
};

export default function Index() {
  return null;
}
