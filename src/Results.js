/* global React ReactDOM*/
import React from "react";
import { Consumer } from "./SearchContext";
import pf from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { realpathSync } from "fs";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    this.search;
  }
  search = () => {
    // const promise = petfinder.breed.list({ animal: "dog" });
    // promise.then(console.log, console.error);
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        this.setState({
          // shallow merging the pets array of the constructor
          // pets: pets
          // or
          pets
        });
      });
  };
  render() {
    // return React.createElement("div", {}, [
    //   React.createElement(
    //     "h1",
    //     { onClick: this.handleTitleClick },
    //     "Pet Adoption"
    //   ),
    //   React.createElement(Pet, {
    //     name: "Luna",
    //     animal: "Dog",
    //     breed: "Havanese"
    //   }),
    //   React.createElement(Pet, {
    //     name: "Pepper",
    //     animal: "Bird",
    //     breed: "Cocktail"
    //   }),
    //   React.createElement(Pet, {
    //     name: "Doink",
    //     animal: "Cat",
    //     breed: "Mixed"
    //   })
    // ]);
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          const x = `My dog's breed is ${breed}`;
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city},${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
