import React, { useEffect, useState } from "react";
import { DataResponse, Animal } from "./types";
import "./App.css";
import ImageComponent from "./components/imageComponent";
import Card from "./components/cardComponent";
import Header from "./components/header";
import LoadingScreen from "./components/loadingScreen";
const envVariables = process.env;

function App() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [idsPicked, setIdsPicked] = useState<string[]>([]);
  const numberOfPets = 10;
  const { REACT_APP_API_KEY, REACT_APP_SECRET } = envVariables;

  function randomChoiceAnimals(
    animals: Animal[],
    howManyChosen: number
  ): Animal[] {
    const chosenPets: Animal[] = [];
    while (chosenPets.length < howManyChosen) {
      const index = Math.floor(Math.random() * animals.length);
      if (!chosenPets.includes(animals[index])) {
        chosenPets.push(animals[index]);
      }
    }
    return chosenPets;
  }

  useEffect(() => {
    const fetchToken = async () => {
      //call the API to generate a new token

      const response = await fetch(
        "https://api.petfinder.com/v2/oauth2/token",
        {
          method: "POST",
          body:
            " grant_type=client_credentials&client_id=" +
            REACT_APP_API_KEY +
            "&client_secret=" +
            REACT_APP_SECRET,
          mode: "cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return response.json();
    };

    const fetchData = async (
      token: {
        token_type: string;
        access_token: string;
      },
      animalSpecies: string
    ) => {
      const response = await fetch(
        `https://api.petfinder.com/v2/animals?type=${animalSpecies}&status=adoptable&limit=100`,
        {
          headers: {
            Authorization: token.token_type + " " + token.access_token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.json();
    };
    async function loadData() {
      const token = await fetchToken();
      const dogs: DataResponse = await fetchData(token, "Dog");
      const cats: DataResponse = await fetchData(token, "Cat");
      const dogsWithPics: Animal[] = dogs.animals.filter((dog) => {
        return dog.photos.length > 0;
      });
      const catsWithPics: Animal[] = cats.animals.filter((cat) => {
        return cat.photos.length > 0;
      });
      //randomly choose 10 of each
      const chosenAnimals = [
        ...randomChoiceAnimals(dogsWithPics, 5),
        ...randomChoiceAnimals(catsWithPics, 5),
      ];
      //randomly choose again to mix up
      const mixedAnimals = randomChoiceAnimals(chosenAnimals, 10);
      setAnimals(mixedAnimals);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
    ev.preventDefault();
    const petClicked = ev.target as HTMLImageElement;
    const chosenPetId = petClicked.id;
    if (idsPicked.includes(chosenPetId)) {
      //already picked pet in round
      setScore(0);
      //might have to get new pets from pets already chosen
      const juggled = randomChoiceAnimals(animals, numberOfPets);
      setAnimals(juggled);
      setIdsPicked([]);
    } else {
      //didn't pick pet yet
      setScore(score + 1);
      setIdsPicked([...idsPicked, chosenPetId]);
      if (topScore < score) {
        setTopScore(score);
      }
      const juggled = randomChoiceAnimals(animals, numberOfPets);
      setAnimals(juggled);
    }
  };
  return (
    <div className="App">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header score={score} topScore={topScore} />
          <div id="cards-container">
            {animals.map((animal) => {
              return (
                <Card animalData={animal} key={`card-${animal.id.toString()}`}>
                  <ImageComponent
                    imgSource={animal.photos[0].medium}
                    id={animal.id.toString()}
                    key={animal.id.toString()}
                    handleClick={(ev: React.MouseEvent<HTMLImageElement>) =>
                      handleClick(ev)
                    }
                  />
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
