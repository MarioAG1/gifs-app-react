import { useState } from "react";
import { Gifs } from "./gifs/components/GifsList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const [gifs, setgifs] = useState<Gif[]>([]);

  const handleTermClicked = (term: string) => {
    console.log({ term });
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
  };

  return (
    <>
      {/* Heaader */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descubre y comparte el Gif Perfecto"
      ></CustomHeader>

      {/* Search */}
      <SearchBar placeholder="Buscar" onQuery={handleSearch}></SearchBar>

      {/* Busquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClick={handleTermClicked}
      ></PreviousSearches>

      {/* Gifs */}
      {/* <Gifs gifs={mockGifs}></Gifs> */}
      <Gifs gifs={gifs}></Gifs>
    </>
  );
};
