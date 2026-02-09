import { useSearchParams } from "react-router-dom";
import "./PaginationButton.css";

const PaginationButton = ({ totalPosts, postPerPage }) => {

  const [searchParam, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(totalPosts / postPerPage);

  const pageNumbers = [];

  const currentPage = parseInt(searchParam.get("page")) || 1;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;
  const handleOnPageButtonClick = (page) => {
    setSearchParams({ page });
  };

  return (
    <div className="pagination_button_container">
      <button
        disabled={currentPage === 1}
        onClick={() => handleOnPageButtonClick(currentPage - 1)}
        className="pagination_button"
      >
        ←
      </button>
      {pageNumbers.map((number) => {
        return (
          <button
            onClick={() => handleOnPageButtonClick(number)}
            key={number}
            className={`pagination_button ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        );
      })}
      <button
        disabled={currentPage === pageNumbers.length}
        onClick={() => handleOnPageButtonClick(currentPage + 1)}
        className="pagination_button"
      >
        →
      </button>
    </div>
  );
};

export default PaginationButton;
