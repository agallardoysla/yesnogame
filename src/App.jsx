import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [person1, setPerson1] = useState("");
  const [person2, setPerson2] = useState("");
  const [image, setImage] = useState(null);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchMatchResult = async () => {
    setLoading(true);
    setError(null);

    try {
      const imageResponse = await axios.get("https://yesno.wtf/api");
      setImage(imageResponse.data.image);

      const storyResponse = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=?key=AIzaSyCEm6EGU_ODQVRpJ96Gbk9LBUBlni4r25g",
        {
          contents: [
            {
              parts: [
                {
                  text: `Somos una herramienta que permite ver si dos emprendedores hacen match o no para ser cofounders de una startup. Crea una historia graciosa en español de por qué ${person1} y ${person2} ${
                    imageResponse.data.answer === "yes" ? "" : "not"
                  } deberian estar juntos. Que no sea de mas de 100 palabras.`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStory(storyResponse.data.choices[0].message.content);
    } catch (err) {
      setError("Error fetching the data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (person1 && person2) {
      fetchMatchResult();
    } else {
      setError("Please enter both names");
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: 50 }}>Tinder Ninja</h1>
        <img
          src={"emprendeninja.jpg"}
          style={{ width: "40px", height: "40px", marginLeft: "10px" }}
        />
      </div>
      <img
        src={"ninjatinder.webp"}
        style={{
          width: "350px",
          height: "350px",
          marginLeft: "10px",
          marginBottom: 20,
          marginTop: 20,
        }}
      />
      <p className="description">
        ¡Descubre si estos dos emprendedores son como Batman y Robin o más bien
        como aceite y agua!
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={person1}
          onChange={(e) => setPerson1(e.target.value)}
          placeholder="Nombre del primer ninja"
        />
        <input
          type="text"
          value={person2}
          onChange={(e) => setPerson2(e.target.value)}
          placeholder="Nombre del segundo ninja"
        />
        <button
          style={{
            marginTop: 20,
            width: "100%",
            height: 50,
            backgroundColor: "#f542d1",
            fontWeight: "bold",
            fontSize: 20,
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Verificar Match"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {story && <p className="story">{story}</p>}
      {image && <img src={image} alt="Match Result" />}
    </div>
  );
}

export default App;
