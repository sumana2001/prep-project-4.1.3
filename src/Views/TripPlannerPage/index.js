import React, {useState} from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Navbar from '../../components/Navbar';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import ShortestRoute from '../../components/ShortestRoute';

function TripPlanner() {

    const [inputDate, setInputDate] = useState(null);

    const [sourceItems,setSourceItems] = useState([]);
    const [destItems,setDestItems] = useState([]);



    const [inputSource,setInputSource] = useState();
    const [inputDest,setInputDest] = useState();

    const [source,setSource] = useState();
    const [dest,setDest] = useState();

    const autocompleteSource = (item) => {
        setInputSource(item)
        const url =
        "https://autocomplete.search.hereapi.com/v1/autocomplete?";

        if (inputSource !== "") {
        var query = `q=${inputSource}&limit=5&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;
        fetch(`${url}${query}`)
            .then((res) => res.json())
            .then((result) => {

            const set = result?.items?.map((item) => `${item.address.city}, ${item.address.state}, ${item.address.countryCode}`);
            const cities = [...new Set(set)];

            // in case there are no suggestions, the input text can still be selected.
            let tempcities = [{id: 0, name: inputSource}];
            var id = 1;
            cities.forEach((city) => {
                tempcities.push({ id: id, name: city });
                id++;
            });

            setSourceItems(tempcities);
            });
        }
      }


    const autocompleteDest = (item) => {
        setInputDest(item)
        const url =
        "https://autocomplete.search.hereapi.com/v1/autocomplete?";

        if (inputSource !== "") {
        var query = `q=${inputDest}&limit=5&types=city&apiKey=${process.env.REACT_APP_HEREAPI}`;
        fetch(`${url}${query}`)
            .then((res) => res.json())
            .then((result) => {

            const set = result?.items?.map((item) => `${item.address.city}, ${item.address.state}, ${item.address.countryCode}`);
            const cities = [...new Set(set)];

            // in case there are no suggestions, the input text can still be selected.
            let tempcities = [{id: 0, name: inputDest}];
            var id = 1;
            cities.forEach((city) => {
                tempcities.push({ id: id, name: city });
                id++;
            });

            setDestItems(tempcities);
            });
        }
      }

    const updateSource = (item) => {
        // the item selected
        setSource(item);
        console.log("source");
        console.log(item)
      }

    const updateDest = (item) => {
        // the item selected
        setDest(item);
        console.log("dest" + item);
        console.log(item)
      }

    return (
        <>
			<Navbar />
            <h1>Trip Planner</h1>
            <div className="trip-input">
                <div className="trip-input-child">
                    <h4>Source</h4>
                    <ReactSearchAutocomplete
                    items={sourceItems}
                    onSearch={(record) => autocompleteSource(record)}
                    onSelect={updateSource}
                    autoFocus
                    useCaching={false}
                    placeholder="Type name of city here!!"
                    />
                </div>
                <div className="trip-input-child">
                    <h4>Destination</h4>
                    <ReactSearchAutocomplete
                    items={destItems}
                    onSearch={(record) => autocompleteDest(record)}
                    onSelect={updateDest}
                    autoFocus
                    useCaching={false}
                    placeholder="Type name of city here!!"
                    />
                </div>
                <div className="trip-input-child">
                    <h4>Travel date</h4>
                    <DatePicker
                    value={inputDate}
                    onChange={(selectedDay) => setInputDate(selectedDay)}
                    inputPlaceholder="Select a day"
                    shouldHighlightWeekends
                    />
                </div>
				
            </div>
            <AwesomeButton type="primary">Submit</AwesomeButton>
            <h2 style={{
                marginBottom:'8em'
            }}>Best Routes</h2>
            <ShortestRoute source={source} dest={dest}/>
            <h2 style={{
                marginBottom:'8em'
            }}>Popular Restaraunts</h2>
            <h2 style={{
                marginBottom:'8em'
            }}>Best Hotels to Stay</h2>
            <h2 style={{
                marginBottom:'8em'
            }}>Tourist Spots to Check out</h2>
        </>
    )
}

export default TripPlanner
