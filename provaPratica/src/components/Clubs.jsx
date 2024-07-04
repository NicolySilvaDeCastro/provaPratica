import { useState, useEffect } from "react";

export default function Clubs() {
    const [clubs, setClubs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.cartola.globo.com/clubes`);
                const data = await response.json();
                
                // Converter o objeto em uma array de clubes
                const clubsArray = Object.values(data); 
                
                setClubs(clubsArray);
            } catch (error) {
                console.error('Erro ao buscar dados da API: ', error);
            }
        };
    
        fetchData();
    }, []);

    if (!clubs) {
        return <p>Carregando...</p>;
    }

    if (!Array.isArray(clubs)) {
        console.error('Dados recebidos não são uma array:', clubs);
        return <p>Ocorreu um erro ao carregar os dados.</p>; // ou outra mensagem de erro adequada
    }

    return (
        <div className="container">
            {clubs.map((clube, index) => (
                <div className="times" key={index}>
                    <img src={clube.escudos["60x60"]} alt={`${clube.nome} logo`} />
                    <h3>Nome: {clube.nome}</h3>
                    <h3>Apelido: {clube.apelido}</h3>
                </div>
            ))}
        </div>
    );
}
