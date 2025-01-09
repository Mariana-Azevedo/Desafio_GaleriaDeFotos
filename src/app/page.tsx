"use client";

import Image from "next/image";
import './globals.css';  // Importando o arquivo global de estilos
import React, { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  image: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]); // Estado para armazenar os personagens
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para armazenar o termo de busca
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]); // Estado para armazenar os personagens filtrados

  useEffect(() => {
    // Fetch dos 15 primeiros personagens
    fetch("https://rickandmortyapi.com/api/character/1,2,3,4,5,6,190,8,9,10,11,12,13,14,15")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data); // Armazena os personagens no estado
        setFilteredCharacters(data); // Inicializa os personagens filtrados
      })
      .catch((error) => console.error("Erro ao buscar os personagens:", error));
  }, []);

  useEffect(() => {
    // Filtra os personagens com base no termo de busca
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered); // Atualiza o estado dos personagens filtrados
  }, [searchTerm, characters]);

  return (
    <div>
      <div className="navbar bg-neutral ">
        <div className="flex-1">
          <a className="btn btn-ghost text-white text-xl"> <img alt="Rick and Morty Logo" 
      className="w-12 h-12" src="https://pngimg.com/d/rick_morty_PNG34.png"  />Rick and Morty</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className=" bg-base-200 min-h-screen">
        <div className="flex justify-center	py-8 ">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Galeria de Fotos</h1>
          </div>
        </div>
        <div className="flex justify-center px-8 min-w-80">
          <label className="input input-bordered flex items-center gap-2">
            {/* Adicionado evento para atualizar o termo de busca */}
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm} // Associa o estado ao campo de input
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado ao digitar
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
        </div>
        <div className="conteiner grid grid-cols-4 gap-4 p-8 ">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character) => (
              <div
                key={character.id}
                className=" card bg-neutral text-neutral-content shadow-lg object-fill hover:shadow-2xl transition ease-in-out delay-150 bg-neutral hover:-translate-y-1 hover:scale-100 hover:duration-300">
                <figure className="w-full h-full">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={400}
                    height={200}
                    className="rounded"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{character.name}</h2>
                </div>
              </div>
            ))
          ) : (
            // Mensagem exibida caso não existam resultados para a busca
            <div className="col-span-4 text-center text-neutral-content">
              <p className="text-2xl">Nenhuma foto encontrada</p>
            </div>
          )}
        </div>
      </div>
      <footer className="footer bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end"></nav>
      </footer>
    </div>
  );
}
