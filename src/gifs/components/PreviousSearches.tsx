interface Props {
  searches: string[];
  onLabelClick: (term: string) => void;
}

export const PreviousSearches = ({ searches, onLabelClick }: Props) => {
  return (
    <div className="previous-searches">
      <h2>Busquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li key={term} onClick={() => onLabelClick(term)}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};

//  {searches.map(function (term) {
//           return <li key={term}>{term}</li>;
//         })}
