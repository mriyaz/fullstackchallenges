import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import axios from 'axios';
import CountryBasicData from './CountryBasicData';


function App() {
  const [cname, setCname] = useState('');
  const [ogcountries, setOgcountries] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((resp) => setOgcountries(resp.data));
  }, []);

  const handleSearch = (e) => {
    setCname(e.target.value);
    let tempArr = ogcountries.filter(country => country.name.common.toLowerCase().includes((e.target.value).toLowerCase()));
    setCountries(tempArr);
  }

  return (
    <div >
      <div>

        <label>find countries </label>
        <input value={cname} onChange={handleSearch} /><br />
        {
          countries.length > 10 ?
            'Too many matches,specify another filter' :
            countries.length > 1 ?
              countries.map(country =>
                <span key={nanoid()} ><br />{country.name.common} &nbsp;
                  <button onClick={() => setCountries([country])} >show</button> <br /></span>) :
              <CountryBasicData countries={countries} />
        }

      </div>
    </div>
  );
}

export default App;
