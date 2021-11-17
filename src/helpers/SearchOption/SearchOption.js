import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default class SearchOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        items: [],
        city: "",
        };

        this.autocompleteCity = this.autocompleteCity.bind(this);
    }

    autocompleteCity(city) {
        this.setState({ city: city });
        const url =
        "https://autocomplete.search.hereapi.com/v1/autocomplete?";

        if (city !== "") {
        var query = `q=${city}&limit=5&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;
        fetch(`${url}${query}`)
            .then((res) => res.json())
            .then((result) => {

            const set = result?.items?.map((item) => `${item.address.city}, ${item.address.state}, ${item.address.countryCode}`);
            const cities = [...new Set(set)];

            let tempcities = [];
            var id = 0;
            cities.forEach((city) => {
                tempcities.push({ id: id, name: city });
                id++;
            });

            this.setState({ items: tempcities });
            });
        }
    }

    render() {
        return (
        <>
            <div >
            <header className="box-header">
                <ReactSearchAutocomplete
                items={this.state.items}
                onSearch={(record) => this.autocompleteCity(record)}
                onSelect={(city) => this.props.setCity(city.name)}
                autoFocus
                useCaching={false}
                placeholder="Start typing city name here"
                />
            </header>
            </div>
        </>
        );
    }
}