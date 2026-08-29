import { HelloPage } from "~/features/hello/routes/hello-page";

export default function Home() {
  return (
    <>
      <title>Hello World · Mature SPA Template</title>
      <meta
        name="description"
        content="A production-shaped React SPA and installable PWA template."
      />
      <HelloPage />
    </>
  );
}
