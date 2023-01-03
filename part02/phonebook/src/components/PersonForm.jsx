import React from 'react';

const PersonForm = ({
  newName,
  newNumber,
  handleSubmit,
  handleChangeName,
  handleChangeNumber,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
