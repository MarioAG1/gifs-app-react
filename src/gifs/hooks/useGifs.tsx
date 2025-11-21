import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// const gifsCache: Record<string, Gif[]> = {};

const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setgifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setgifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setgifs(gifs);
  };

  const handleSearch = async (query: string) => {
    //Validar que el query no esté vacío
    if (query.length === 0) {
      return;
    }

    //Convertir el query a minúsculas y eliminar espacios en blanco

    const queryReady = query.trim().toLocaleLowerCase();

    //Evitar búsquedas duplicadas verificando si el término ya existe en previousTerms ( si existe, no hacer nada )

    if (previousTerms.includes(queryReady)) {
      return;
    }

    //Actualizar previousTerms agregando el nuevo término al inicio y limitando a 8 elementos máximo, es decir no puede ser un arreglo de más de 8.
    // const allterms = [queryReady, ...previousTerms].slice(0, 8);
    // setPreviousTerms(allterms);
    setPreviousTerms([queryReady, ...previousTerms].slice(0, 8));

    await getGifsByQuery(queryReady);

    const gifs = await getGifsByQuery(queryReady);
    console.log(gifs);

    setgifs(gifs);

    gifsCache.current[query] = gifs;

    console.log(gifsCache);
  };

  return { gifs, previousTerms, handleTermClicked, handleSearch };
};

export default useGifs;
