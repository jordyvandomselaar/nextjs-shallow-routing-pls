"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to this small reproduction</h1>
      <span>It has zero styling. I'm sorry it's ugly.</span>

      <h2>Programmatic navigation</h2>

      <span>
        I'm fully aware you'd normally use Link here but for demo purposes I'm
        using router.push().
      </span>
      <br />
      <br />
      <button
        onClick={() => {
          // To make sure we don't override existing URL params, we need to make sure we parse the existing ones
          // and only set our own. Unfortunately this does replace any URL fragment (#foo) that might be set.
          const currentSearchParams = new URLSearchParams(
            searchParams.toString()
          );
          currentSearchParams.set("route", "one");

          router.push(`?${currentSearchParams.toString()}#myFragment`);
        }}
      >
        Route one, this one adds a fragment.
      </button>
      <button
        onClick={() => {
          // As you can see, if we click this, the URL fragment is gone.
          const currentSearchParams = new URLSearchParams(
            searchParams.toString()
          );
          currentSearchParams.set("route", "two");

          router.push(`?${currentSearchParams.toString()}`);
        }}
      >
        Route Two, this one removes the fragment.
      </button>

      <br />
      <br />

      <span>
        Try clicking on "Route one" again so we get our fragment back.{" "}
      </span>
      <button
        onClick={() => {
          const currentSearchParams = new URLSearchParams(
            searchParams.toString()
          );
          currentSearchParams.set("route", "three");

          // We have to do some extra work to preserve the fragment, easy to miss.
          const existingFragment = window.location.hash;
          const newUrl = `?${currentSearchParams.toString()}${existingFragment}`;

          router.push(newUrl);
        }}
      >
        Route three, this one preserves the fragment.
      </button>
    </div>
  );
}
