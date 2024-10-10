"use client";

import styles from "./form.module.css";

export default function Form({ url }: { url: string }) {
  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();

        const fileInput = (e.target as HTMLFormElement).file;
        const file = fileInput.files?.[0];

        if (!file) {
          console.error("No file selected");
          return;
        }

        const image = await fetch(url, {
          body: file,
          method: "PUT",
          headers: {
            "Content-Type": file.type,
            "Content-Disposition": `attachment; filename="${file.name}"`,
          },
        });

        window.location.href = image.url.split("?")[0];
      }}
    >
      <input name="file" type="file" accept="image/png, image/jpeg" />
      <button type="submit">Upload</button>
    </form>
  );
}
