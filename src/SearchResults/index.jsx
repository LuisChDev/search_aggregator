import { API } from "aws-amplify";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const googResults = useSelector((state) => state.results.GoogleResults);
  const bingResults = useSelector((state) => state.results.BingResults);

  return (
    <Card>
      <h2>Search results</h2>
      <Card variant="secondary">
        <h4>Google results</h4>
        {googResults.map(res => (
          <Card variant="info" key={`google result ${res.position}`}>
            <h6>{res.title}</h6>
            <p>
              {res.snippet || "no description available."}
            </p>
            <a href={res.link}>{res.displayed_link}</a>
          </Card>
        ))}
      </Card>
      <Card variant="secondary">
        <h4>Bing results</h4>
        {bingResults.map(res => (
          <Card variant="info" key={`bing result ${res.position}`}>
            <h6>{res.title}</h6>
            <p>
              {res.snippet || "no description available."}
            </p>
            <a href={res.link}>{res.displayed_link}</a>
          </Card>
        ))}
      </Card>
    </Card>

  );

};

export default SearchResults;
