import React, { useEffect, useState } from 'react';
import api from "./services/api";
import DevItem from "./componentes/devItem/index";
import DevForm from "./componentes/devForm/index";
import Header from "./Header";
import './global.css';
// Áre a de componente React
function App() {
	// Criação de estado devs e função para alterar o estado chamda setDevs
	const [devs, setDevs] = useState([]);
	// Cadastro de usuário
	async function handleAddDev(data) {
		const response = await api.post('/devs', data);
		setDevs([...devs, response.data]);
	}
	useEffect( () => {
		async function loadDevs() {
			const response = await api.get('/devs');
			setDevs(response.data);
		}
		loadDevs();
	}, []);
  return (
    // Chamada de componente Header com propriedade
    // < Header title="Meu cabeçalho"/>
    <div id="app" className="vh-100 bg-black-10 ma0 pa5 flex justify-center">
	  <aside className="w-40 bg-white br2">
		<strong className="f4 helvetica gray tc w-100 dib">Cadastrar</strong>
		< DevForm onSubmit={handleAddDev} />
      </aside>
      <main className="w-60">
		<ul>
			{devs.map(dev => (
				< DevItem dev={dev} id={dev._id}/>
			))}
		</ul>
      </main>
    </div>
  );
}

export default App;
