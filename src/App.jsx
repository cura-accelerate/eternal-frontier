import { useState } from "react";

const MAP = [
  "############",
  "#..........#",
  "#....N.....#",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "#..........#",
  "############",
];

export default function App() {
  const [player, setPlayer] = useState({
    x: 2,
    y: 2,
  });

  const [message, setMessage] = useState(
    "ようこそ Eternal Frontierへ"
  );

  const move = (dx, dy) => {
    const nx = player.x + dx;
    const ny = player.y + dy;

    const tile = MAP[ny]?.[nx];

    if (!tile) return;
    if (tile === "#") return;

    setPlayer({
      x: nx,
      y: ny,
    });

    if (Math.random() < 0.1) {
      setMessage("なにかの気配を感じる...");
    }
  };

  const talk = () => {
    const dirs = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ];

    for (const [dx, dy] of dirs) {
      const tile =
        MAP[player.y + dy]?.[player.x + dx];

      if (tile === "N") {
        setMessage(
          "東の洞窟にスライムが住み着いたらしい。"
        );
        return;
      }
    }

    setMessage("誰もいない");
  };

  return (
    <div
      style={{
        background: "#111",
        color: "white",
        minHeight: "100vh",
        padding: 20,
        textAlign: "center",
      }}
    >
      <h1>Eternal Frontier</h1>

      <div
        style={{
          fontSize: 24,
          lineHeight: "28px",
          fontFamily: "monospace",
        }}
      >
        {MAP.map((row, y) => (
          <div key={y}>
            {row.split("").map((cell, x) => {
              if (
                x === player.x &&
                y === player.y
              ) {
                return "🧙";
              }

              if (cell === "#") return "🟫";
              if (cell === ".") return "🟩";
              if (cell === "N") return "🧑";

              return cell;
            })}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          border: "1px solid white",
          padding: 10,
        }}
      >
        {message}
      </div>

      <div
        style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns:
            "repeat(3,80px)",
          gap: 10,
          justifyContent: "center",
        }}
      >
        <button onClick={() => move(0, -1)}>
          ↑
        </button>

        <button onClick={talk}>
          話す
        </button>

        <button onClick={() => move(0, 1)}>
          ↓
        </button>

        <button onClick={() => move(-1, 0)}>
          ←
        </button>

        <button onClick={() => move(1, 0)}>
          →
        </button>
      </div>
    </div>
  );
}