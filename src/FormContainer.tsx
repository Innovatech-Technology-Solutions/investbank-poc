// FormContainer.tsx
import React from "react";

const FormContainer: React.FC = () => {
  const nextForm = () => {
    // Implement nextForm function
  };

  const prevForm = () => {
    // Implement prevForm function
  };

  return (
    <div className="form__container">
      <div className="title__container">
        <h1 className="text-white text-lg font-bold">Example UI container</h1>
        <p className="text-gray-400">Follow the 4 simple steps to complete your mapping</p>
      </div>
      <div className="body__container flex">
        <div className="left__container w-1/3 border-r border-gray-800 pr-6">
          <div className="side__titles flex flex-col justify-center items-end">
            <div className="title__name mb-2">
              <h3 className="text-white text-sm font-semibold">Your name</h3>
              <p className="text-gray-400 text-xs">Enter & press next</p>
            </div>
            {/* Add other title__name components */}
          </div>
          <div className="progress__bar__container">
            <ul className="flex">
              <li className="active mr-4">
                <ion-icon name="person-outline"></ion-icon>
              </li>
              {/* Add other li elements */}
            </ul>
          </div>
        </div>
        <div className="right__container w-2/3 px-6">
          <fieldset id="form1" className="active__form">
            <div className="sub__title__container border-b border-gray-800 pb-4">
              <p className="text-xs text-gray-400">Step 1/5</p>
              <h2 className="text-white text-lg font-bold">Let's start with your name</h2>
              <p className="text-gray-400 text-sm">Please fill the details below so that we can we can get in contact with you about our product</p>
            </div>
            <div className="input__container mt-4">
              <label htmlFor="name" className="text-white text-sm mb-2">Enter your name</label>
              <input type="text" className="bg-transparent border border-gray-600 rounded-md py-2 px-3 text-white outline-none" />
              <a className="nxt__btn mt-4" onClick={nextForm}>Next</a>
            </div>
          </fieldset>
          {/* Add other fieldset elements */}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
