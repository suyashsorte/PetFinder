import React from "react";
import { Link } from "@reach/router";
// export const Pet = props => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h2", {}, props.breed)
//   ]);

//   return (
//     <div>
//       <h1>{props.name}</h1>
//       <h1>{props.animal}</h1>
//       <h1>{props.breed}</h1>
//     </div>
//   );

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    const hero = photos[0] ? photos[0].value : "http://placecorgi.com/300/300";
    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
      </Link>
    );
  }
}

// };
export default Pet;
