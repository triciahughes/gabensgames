import DeveloperItem from "./DeveloperItem";

function Developers({ devs }) {
  const devList = devs.map((devObj) => {
    return <DeveloperItem 
             key={devObj.id}
             dev={devObj}
           />;
  });

  return (
    <div className="dev-list-container">
      <ul className="dev-list">{devList}</ul>
    </div>
  );
}

export default Developers;
