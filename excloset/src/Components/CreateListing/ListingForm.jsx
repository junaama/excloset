import React, { useState,useRef } from "react";
import apiURL from "../../apiConfig";
import axios from "axios";

const ListingForm = () => {
  const [input, setInput] = useState({
    image: null,
    description: "",
    age: "",
    size: "",
    style: "",
  });
  const form = useRef(null)

  const handleChange = (e) => {
    console.log(e);
    if (e.target.name === "image") {
      setInput({ ...input, [e.target.name]: e.target.files[0] });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };
  console.log(input);

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("E: ", e);
    const data = new FormData(form.current)
    try {
      await axios.post(`${apiURL}/api/listings`, data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(input);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data" id="listingForm" ref={form}>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
          />
          <br />

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
            disabled={
              !(input.age && input.size && input.style && input.description)
            }
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ListingForm;
