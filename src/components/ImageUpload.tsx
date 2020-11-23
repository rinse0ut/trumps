import React, { useState } from "react";
import { storage } from "../services/firestore";

export default function App() {
  const [file, setFile] = useState<any>(null);
  const [url, setURL] = useState("");

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e: any) {
    e.preventDefault();
    console.log('FILE', typeof file, file);
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(null);
            setURL(url);
          });
      });
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={url} alt="" />
    </div>
  );
}