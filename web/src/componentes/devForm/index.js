import React, { useState, useEffect } from "react";

function DevForm({onSubmit}) {
    // Uso de estado
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGitHubUsername] = useState('');
    const [techs, setTechs] = useState('');
    // Usado para executar a função getCurrentPosition somente uma única vez
	useEffect(()=> {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude} = position.coords;
				setLatitude(latitude);
				setLongitude(longitude);
			},(err) => {
				console.log(err);
			},
			{
				timeout : 3000,
			}
		);
    }, []);
    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
			github_username : github_username,
			techs : techs,
			latitude : latitude,
			longitude : longitude
        });
        setGitHubUsername('');
		setTechs('');
    }
    return(
        <form className="mt4" onSubmit={handleSubmit}>
			<div className="input-block">
				<label htmlFor="github_username" >Usuário do Github</label>
				<input name="github_username" id="github_username" required value={github_username} onChange={ e => setGitHubUsername(e.target.value)}></input>
			</div>
			<div className="input-block">
				<label htmlFor="techs" >Técnologias</label>
				<input name="techs" id="techs" value={techs} onChange={e => setTechs(e.target.value)}></input>
			</div>
			<div className="input-group">
				<div className="input-block">
					<label htmlFor="latitude" >Latitude</label>
					<input type="number" name="latitude" id="latitude" value={latitude} onChange={ e => setLatitude(e.target.value)}></input>
				</div>
				<div className="input-block">
					<label htmlFor="longitude" >Longitude</label>
					<input type="number" name="longitude" id="longitude"  value={longitude} onChange={ e => setLongitude( e.target.value)}></input>
				</div>
			</div>
			<button type="submit">Salvar</button>
		</form>
    );
}
export default DevForm;