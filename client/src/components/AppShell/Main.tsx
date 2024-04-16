import React, { useEffect, useState, FC, ReactElement } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { Category } from "../../types/CategoryTypes";
import colorGenerator from "../../utils/colorGenerator";
import { motion } from "framer-motion";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import CategoryPage from "./Category/CategoryPage";
import { API_BASE_URL } from "./../../utils/constants";
import Header from "./Header";

const Main: FC = (): ReactElement => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <div style={{ position: "relative" }}>
        <Box sx={{ mt: 3, height: 0, pb: 20 }}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Box>
                    <Typography
                      variant="h2"
                      fontWeight={900}
                      sx={{
                        mb: 2,
                        textTransform: "capitalize",
                      }}
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
                          <Grid container spacing={2} sx={{ mt: 2 }}>
                            {category.subcategories.map(
                              (subcategory, index) => (
                                <Grid
                                  item
                                  key={subcategory.slug}
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={3}
                                  xl={2}
                                >
                                  <Box
                                    sx={{ textDecoration: "none" }}
                                    component={NavLink}
                                    to={`/category/${subcategory.slug}`}
                                  >
                                    <motion.div
                                      initial={{ opacity: 0, y: 50 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                        delay: 0.05 * index,
                                      }}
                                      custom={index}
                                      style={{
                                        color: "#e6e6e6",
                                        textDecoration: "none",
                                        width: "100%",
                                        height: "200px",
                                        padding: "12px",
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
                                      whileHover={{
                                        scale: 1.03,
                                        transition: { duration: 0.2 },
                                        filter: "contrast(2)",
                                      }}
                                    >
                                      <Typography
                                        fontWeight={900}
                                        sx={{
                                          bgcolor: "rgba(0,0,0,0.5)",
                                          p: 1,
                                          borderRadius: 3,
                                          textDecoration: "none",
                                          px: 2,
                                        }}
                                      >
                                        {subcategory.title}
                                      </Typography>
                                    </motion.div>
                                  </Box>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                }
              />
              <Route
                path="/category/:subcategorySlug"
                element={<CategoryPage />}
              />
            </Routes>
          </Router>
        </Box>
      </div>
    </>
  );
};

export default Main;
