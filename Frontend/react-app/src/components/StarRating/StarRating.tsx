import React from 'react';

interface StarRatingProps {
  value: number; // Valor atual do rating
  onChange: (newValue: number) => void; // Função para atualizar o valor
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const handleClick = (newValue: number) => {
    if (newValue === value) {
      // Se clicar na estrela atual, zera o rating
      onChange(0);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="rating rating-lg">
      {[...Array(5)].map((_, index) => {
        const newValue = index + 1; // Agora só valores inteiros
        return (
          <input
            key={index}
            type="radio"
            name="rating"
            className={`bg-black mask mask-star-2 ${newValue <= value ? 'checked' : ''}`}
            onClick={() => handleClick(newValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
