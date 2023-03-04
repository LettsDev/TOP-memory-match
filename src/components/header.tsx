interface Proptype {
  score: number;
  topScore: number;
}

export default function Header(props: Proptype) {
  return (
    <div id="header-container">
      <h1 id="app-title">Pet-Memory</h1>
      <div id="score-container">
        <p id="score" className="scores">{`Score: ${props.score}`}</p>
        <p
          id="top-score"
          className="scores"
        >{`Top Score: ${props.topScore}`}</p>
      </div>
    </div>
  );
}
