import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PIXA = () => {
  const [images, setImages] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("S") || "";

  useEffect(() => {
    if (searchQuery) {
      fetchImages(searchQuery);
    }
  }, [searchQuery]);

  const fetchImages = async (query) => {
    const url = `https://pixabay.com/api/?key=43631118-f653f72b1390c59444f288ee4&q=${encodeURIComponent(
      query
    )}&image_type=photo&per_page=4`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.elements.query.value;
    setSearchParams({ S: query });
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1>PictureFinder</h1>
      <form onSubmit={handleSearch} style={{ margin: "20px auto" }}>
        <input
          name="query"
          type="text"
          defaultValue={searchQuery}
          placeholder="search for images"
          style={{
            padding: "10px",
            fontSize: "16px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "2px solid #ddd",
            width: "300px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#fff",
            border: "2px solid #ddd",
            borderRadius: "5px",
            cursor: "pointer",
            outline: "none",
          }}
        >
          Search
        </button>
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {images.map((image) => (
          <a
            key={image.id}
            href={image.largeImageURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={image.webformatURL}
              alt={image.tags}
              style={{ width: "100%", height: "auto", borderRadius: "5px" }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PIXA;
