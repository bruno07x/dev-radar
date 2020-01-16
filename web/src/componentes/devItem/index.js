import React from "react";
function DevItem(props) {
    const { dev } = props;
    return(
        <li>
            <header>
                <img src={dev.avatar_url} alt="Avatar Github"/>
                <div>
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_username}`}>Acessar perfil</a>
            </header>
        </li>
    );
}
export default DevItem;