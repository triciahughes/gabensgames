import { useState, useEffect } from "react";
import DeveloperItem from "./DeveloperItem";

const API_KEY = 'a77f9483f3f14f5292692794e7fba92a';

function Developers({ devs }) {
    const devList = devs.map(gameObj => {
        return <li key={gameObj.id}>{gameObj.name}</li>;
    });

    return (
        <ul>{devList}</ul>
    );
}

export default Developers;