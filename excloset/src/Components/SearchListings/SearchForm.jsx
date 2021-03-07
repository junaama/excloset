import React from 'react';

const SearchForm = () => {
    const handleChange = (e)=> {

    }
    const handleSubmit = (e)=> {
        e.preventDefault();
    }
    return (
        <>
         <form onSubmit={handleSubmit}>

          <label>Age</label>

          <input
            type="radio"
            name="age"
            value="0-5"
            id="0-5"
            onChange={handleChange}
          />
          <label htmlFor="0-5">0-5</label>

          <input type="radio" name="age" value="6-10" onChange={handleChange} />
          <label htmlFor="6-10">6-10</label>
          <input
            type="radio"
            name="age"
            value="11-15"
            onChange={handleChange}
          />
          <label htmlFor="11-15">11-15</label>

          <input
            type="radio"
            name="age"
            value="16-21"
            onChange={handleChange}
          />
          <label htmlFor="16-21">16-21</label>
          <br />

          <label>Size</label>
          <input
            type="radio"
            name="size"
            value="S"
            id="s"
            onChange={handleChange}
          />
          <label htmlFor="s">S</label>
          <input
            type="radio"
            name="size"
            value="M"
            id="m"
            onChange={handleChange}
          />
          <label htmlFor="m">M</label>
          <input
            type="radio"
            name="size"
            value="L"
            id="l"
            onChange={handleChange}
          />
          <label htmlFor="l">L</label>
          <br />

          <label>Style</label>
          <input
            type="radio"
            name="style"
            value="Casual"
            id="casual"
            onChange={handleChange}
          />
          <label htmlFor="casual">Casual</label>
          <input
            type="radio"
            name="style"
            value="School"
            id="school"
            onChange={handleChange}
          />
          <label htmlFor="school">School</label>
          <input
            type="radio"
            name="style"
            value="Pajamas"
            id="pajamas"
            onChange={handleChange}
          />
          <label htmlFor="pajamas">Pajamas</label>
          <input
            type="radio"
            name="style"
            value="Fancy"
            id="fancy"
            onChange={handleChange}
          />
          <label htmlFor="fancy">Fancy</label>
          <br />
          <button
          >
            Search
          </button>
        </form>
        </>
    )
}

export default SearchForm;