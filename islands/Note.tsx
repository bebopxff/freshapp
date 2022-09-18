/** @jsx h */
import { h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { tw } from "@twind";
import { debounce } from "https://deno.land/x/lodash_es@v0.0.2/mod.ts";

const styles = {
  textArea: `
    width: 100%;
    height: 100px;
  `,
  textInput: `
    padding: 0 20px;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    resize: none;
    border: 3px solid #ddd;
  `,
};

const NOTE_KEY = "note-on-fresh";
// https://deno.com/deploy/docs/tutorial-firebase
// currently, Deploy doesn't offer any persistence outside of in-memory allocation. In addition it doesn't currently offer the global localStorage or sessionStorage, which is what is used by Firebase to store the authentication information.
// https://deno.com/deploy/docs/runtime-fs
// const loadNote = () => localStorage && localStorage.getItem(NOTE_KEY);
// const dumpNote = (text) => localStorage && localStorage.setItem(NOTE_KEY, text);

// const loadNote = await Deno.readTextFile(
//           new URL(`file://${Deno.cwd()}/note/${NOTE_KEY}`)
// )
const loadNote = () => "";
const dumpNote = (text) => {};

interface PageProps {
  text: string;
}

export default function Page(props: PageProps) {
  console.log("load", localStorage);
  const [loading, setLoading] = useState(undefined);
  // const [loading, setLoading] = useState(localStorage === undefined);
  const [text, setText] = useState(loadNote() || props.text);
  const handleChange = (e) => {
    console.log("save...");
    const { value } = e.target;
    setText(value);
    handleSave(value);
  };

  const handleSave = useCallback(
    debounce((value) => {
      console.log("save", value);
      dumpNote(value);
    }, 500)
  );

  useEffect(() => {
    console.log(localStorage);
    setLoading(localStorage === undefined);
  }, [localStorage]);

  if (loading) {
    return <div>Note Loading ...</div>;
  }

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <p class={tw`my-6`}>Write Free ???</p>
      <div style={styles.textArea}>
        <textarea style={styles.textInput} value={text} onChange={handleChange}>
          Writing Here ...
        </textarea>
      </div>
    </div>
  );
}
