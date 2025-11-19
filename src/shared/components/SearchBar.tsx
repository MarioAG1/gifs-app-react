import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

interface Props {
  placeholder: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "BUSCAR", onQuery }: Props) => {
  const [query, setQuery] = useState("");

  //Siempre ase hace cuando se crear y se mata el comnente
  useEffect(() => {
    const timeout = setTimeout(() => {
      onQuery(query);
    }, 700);
    //onQuery(query);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
    //setQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  //Lo hice yo
  const changeQueryValue = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        //onChange={(event) => setQuery(event.target.value)} Original
        onChange={changeQueryValue} // Modificado
        // onKeyDown={handleSearch} Dinamico
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
