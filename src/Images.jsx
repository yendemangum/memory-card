import { useEffect, useState } from "react";
import "./style.css";

const accessKey = "gXPPekBntbQuAtYnO0y2nb-0IsGDqjo2zImy5IfOP_Q";
const searchTerm = "Philadelphia";

let clicked = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Images() {
  const [array, setArray] = useState([]);
  const [count, setCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const updateArray = () => {
    setArray((prevArray) => shuffle([...prevArray]));
  };

  useEffect(() => {
    const fetchRequest = async () => {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=${accessKey}`
      );
      const dataJ = await data.json();
      const result = dataJ.results;
      setArray(result);
    };

    fetchRequest();
  }, []);

  return (
    <div>
      <p>Score: {count}</p>
      <p>High Score: {highScore}</p>
      <div className="grid">
        {array.map((result) => (
          <img
            src={result.urls.small}
            alt={result.alt_description}
            key={result.id}
            onClick={() => {
              updateArray();
              setCount((count) => count + 1);
              if (clicked.includes(result.id)) {
                setCount(0);
                clicked = [];
                setHighScore( count >= highScore ? count : highScore)
              } else {
                clicked.push(result.id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Images;
