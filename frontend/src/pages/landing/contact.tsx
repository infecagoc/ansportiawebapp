import LandingNav from '@/components/LandingNav';

export default function Contact() {
  return (
    <>
      <LandingNav />
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="mb-6 text-3xl font-bold">Contact us</h1>
        <form className="flex flex-col gap-4">
          <input
            className="rounded-md border px-3 py-2"
            placeholder="Your name"
          />
          <input
            type="email"
            className="rounded-md border px-3 py-2"
            placeholder="Email"
          />
          <textarea
            className="rounded-md border px-3 py-2"
            rows={4}
            placeholder="Message"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </main>
    </>
  );
}
