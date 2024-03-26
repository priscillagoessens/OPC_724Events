import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // modification du sens evtA < evtB en soustraiant B - A cela tri par ordre decroissant
  new Date(evtB.date) - new Date(evtA.date)
  );

  // si data et data.focus sont defini alors on recupere la longueur du tableau sinon 0
  const slides = data && data.focus ? data.focus.length : 0;
  const nextCard = () => {
    setTimeout(
      // On ajoute -1 pour verifié que l'index actuel ne depasse pas le total des slides , action faites toutes les 5s
      () => setIndex(index < slides -1 ? index + 1 : 0), 5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          ))}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
            {byDateDesc?.map((event, radioIdx) => (
                <input
                  key={event.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // ajout readOnly afin de ne plus avoir l'erreur du checked
                  readOnly
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
