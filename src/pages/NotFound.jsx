import React from 'react';
import { Link } from 'react-router-dom';

function Found() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">
          Oops! A página que você está procurando não foi encontrada.
        </p>
        <br />
        <Link to="/" className="notfound-button">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}

export default Found;