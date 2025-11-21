// import { useState } from "react";
import { Gifs } from "./gifs/components/GifsList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
// import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
// import type { Gif } from "./gifs/interfaces/gif.interface";
import useGifs from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { gifs, handleSearch, previousTerms, handleTermClicked } = useGifs();

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
