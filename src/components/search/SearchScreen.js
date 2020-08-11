import React, { useMemo } from "react";
import queryString from "query-string";
import { HeroCard } from "../heroes/HeroCard";
import { useForm } from "../../hooks/useForm";
import { useLocation } from "react-router-dom";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { getAllHeroes } from "../../selectors/getAllHeroes";

export const SearchScreen = ({ history }) => {
    const location = useLocation();
    const { q = "" } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q,
    });
    const { searchText } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
    const allHeroes = useMemo(() => getAllHeroes(), []);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    };
    return (
        <div>
            <h4>Search Screen</h4>
            <hr />

            <div className="row">
                <div className="col-5">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete="false"
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
            </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {
                        (q === "")
                        &&
                        (
                            <>
                                <div className="alert alert-info">Search a hero</div>
                                {allHeroes.map((hero) => (
                                    <HeroCard key={hero.id} {...hero} />
                                ))}
                            </>
                        )
                    }

                    {(q !== "" && heroesFiltered.length === 0) &&
                        <div className="alert alert-danger">
                            There is no a hero with "{q}"
                        </div>
                    }

                    {heroesFiltered.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </div>
    );
};
