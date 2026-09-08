import { useState } from "react";
import "./QuizCard.css";

function QuizCard({ quiz }) {
  const [selected, setSelected] = useState(null);

  const { category, difficulty, question, options, correctAnswer } = quiz;
  const answered = selected !== null;
  const isCorrect = selected === correctAnswer;

  function handleSelect(option) {
    if (answered) return; // ya respondió esta pregunta, no permitimos cambiarla
    setSelected(option);
  }

  function optionClassName(option) {
    if (!answered) return "quiz-card__option";
    if (option === correctAnswer)
      return "quiz-card__option quiz-card__option--correct";
    if (option === selected)
      return "quiz-card__option quiz-card__option--incorrect";
    return "quiz-card__option quiz-card__option--disabled";
  }

  return (
    <article className="quiz-card">
      <div className="quiz-card__content">
        <span className="quiz-card__category">
          {category} · {difficulty === "easy" ? "fácil" : difficulty}
        </span>

        <h3 className="quiz-card__question">{question}</h3>

        <div className="quiz-card__options">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={optionClassName(option)}
              onClick={() => handleSelect(option)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>

        {answered && (
          <p
            className={
              isCorrect
                ? "quiz-card__feedback quiz-card__feedback--correct"
                : "quiz-card__feedback quiz-card__feedback--incorrect"
            }
          >
            {isCorrect
              ? "¡Correcto! 🎉"
              : `No era esa — la respuesta correcta es "${correctAnswer}".`}
          </p>
        )}
      </div>
    </article>
  );
}

export default QuizCard;
