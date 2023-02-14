import DeveloperItem from "./DeveloperItem";

function Developers({ devs }) {
  const devList = devs.map((gameObj) => {
    return <li key={gameObj.id}>{gameObj.name}</li>;
  });

  return (
    <div id="dev-list">
      <ul>{devList}</ul>
    </div>
  );
}

export default Developers;
