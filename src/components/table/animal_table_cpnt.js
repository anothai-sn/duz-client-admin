import React from "react";
import { useNavigate } from 'react-router-dom';

import Img1 from "../../imges/animals/68943.jpg";
import Img2 from "../../imges/animals/68945.jpg";
import Img3 from "../../imges/animals/68949.jpg";

import './animal_table_cpnt.css';

const AnimalTable = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/animals/create');
  };

  const data = [
    {
      id: 1,
      animalName: "Name1",
      animalImage: Img1,
    },
    {
      id: 2,
      animalName: "Name2",
      animalImage: Img2,
    },
    {
      id: 3,
      animalName: "Name3",
      animalImage: Img3,
    },
  ];

  return (
    <div className="container">
      <h2 className="heading">สัตว์ทั้งหมดในสวนสัตว์</h2>
      <button className="add-button" onClick={handleClick}>
        เพิ่มข้อมูลสัตว์
      </button>
      <div className="row">
        {data.map((animal) => (
          <div className="column" key={animal.id}>
            <a
              className="animal-item"
              href={`/animals/${animal.animalName}`}
              data-lightbox="animal"
            >
              <img
                className="animal-image"
                src={animal.animalImage}
                alt={animal.animalName}
              />
              <div className="animal-text">
                <h5 className="animal-text-title">{animal.animalName}</h5>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalTable;