// import React from "react";
// class SearchParams extends React.Component {
//   state = {
//     location: "Seattle,WA",
//     animal: "",
//     breed: ""
//   };
//   render() {
//     return (
//       <div className="search-params">
//         <label htmlFor="location">
//           Location
//           <input
//             id="location"
//             value={context.location}
//             placeholder="Location"
//           />
//         </label>
//       </div>
//     );
//   }
// }
// export default Search;
import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  onChange={context.handleLocationChange}
                  id="location"
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                >
                  <option />
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="breed">
                Breed
                <select
                  disabled={!context.breeds.length}
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
