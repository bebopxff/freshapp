/** @jsx h */
import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import { tw } from "@twind";
import Note from "../islands/Note.tsx";

// https://fresh.deno.dev/docs/getting-started/form-submissions

export default function Page() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Note text={""} />
    </div>
  );
}
