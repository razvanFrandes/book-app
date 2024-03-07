import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Category } from "../../types/CategoryTypes";
import colorGenerator from "../../utils/colorGenerator";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";

function Main() {
  const [categories, setCategories] = useState([]);

  const API_BASE_URL = "https://book-app-8kq8.vercel.app";
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={900}
                  sx={{ color: "#e6e6e6" }}
                >
                  Categories
                </Typography>
                <Box>
                  {categories.map((category: Category) => (
                    <Box key={category.slug} sx={{ mt: 5 }}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ color: category.color }}
                      >
                        {category.category}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "20px",
                          mt: 2,
                        }}
                      >
                        {category.subcategories.map((subcategory, index) => (
                          <NavLink
                            key={subcategory.slug}
                            to={`/category/${subcategory.slug}`}
                            style={{
                              color: "#e6e6e6",
                              textDecoration: "none",
                              transition: "transform 0.2s",
                              width: "200px",
                              height: "200px",
                              padding: "12px",                              
                              transform: "scale(1.05)",
                              backgroundColor: colorGenerator(
                                category.color,
                                index
                              ),
                              borderRadius: "5px",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              fontWeight={900}
                              sx={{
                                bgcolor: "rgba(0,0,0,0.5)",
                                p: 1,
                                borderRadius: 3,
                                px: 2,
                              }}
                            >
                              {subcategory.title}
                            </Typography>
                          </NavLink>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            }
          />
          <Route path="/category/:subcategorySlug" element={<CategoryPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Main;
