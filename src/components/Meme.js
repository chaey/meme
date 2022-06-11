import React from "react";
export default function Meme() {
  const [memeImage, setMemeImage] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/30b1gx.jpg"
  });

  const [allMemeImage, setAllMemeImages] = React.useState([]);

  React.useEffect(() => {
    /* fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemeImages(data.data.memes)) */
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemeImages(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImage.length);
    setMemeImage((prevMemeImage) => ({
      ...prevMemeImage,
      randomImage: allMemeImage[randomNumber].url
    }));
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setMemeImage((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top"
          className="form--input"
          name="topText"
          value={memeImage.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom"
          className="form--input"
          name="bottomText"
          value={memeImage.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={memeImage.randomImage} className="meme--image" />
        <h2 className="meme--text top">{memeImage.topText}</h2>
        <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
      </div>
    </main>
  );
}
