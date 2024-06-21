import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://yesno.wtf/api");
      const data = await response.json();
      setAnswer(data);
    } catch (error) {
      console.error("Error fetching the answer", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Haz una pregunta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Escribe tu pregunta aquí"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px", fontSize: "16px", marginLeft: "10px" }}
        >
          Preguntar
        </button>
      </form>
      {answer && (
        <div style={{ marginTop: "20px" }}>
          <h2>Respuesta:</h2>
          <img
            src={answer.image}
            alt={answer.answer}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
