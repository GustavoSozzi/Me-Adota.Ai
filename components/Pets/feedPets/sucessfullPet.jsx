import React from 'react';
import dog from '../../../img/svg/Dog.svg';
import icon_pontos from '../../../img/svg/icon_pontos.png';

const SucessfullPet = () => {
  return (
    <div>
      <nav>
        <img src={icon_pontos} alt="pontos" />
        <img src={dog} alt="dog - nav" />
      </nav>
    </div>
  );
};

export default SucessfullPet;
