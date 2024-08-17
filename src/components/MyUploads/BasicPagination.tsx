import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const paginationItemStyles = {
  borderRadius: "50%",
  padding: "6px",
  margin: "0 2px",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
};

const selectedPaginationItemStyles = {
  backgroundColor: "#007BFF",
  color: "#FFFFFF",
};

export interface BasicPaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BasicPagination: React.FC<BasicPaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page); // Notify parent component about page change
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Pagination
        count={totalPages}
        onChange={handleChange}
        color="primary"
        size="large"
        sx={{
          "& .MuiPaginationItem-root": paginationItemStyles,
          "& .Mui-selected": selectedPaginationItemStyles,
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
          },
        }}
      />
    </Stack>
  );
};

export default BasicPagination;
