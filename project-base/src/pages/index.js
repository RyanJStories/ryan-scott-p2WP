import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import lightTheme from "../themes/lightTheme"
import CardList from "../components/CardList"
import PlayMat from "../components/PlayMat"
import { ThemeProvider } from "styled-components"
import Card from "../components/card"
import { Box, Heading, NavLink, Flex } from "rebass"
import {DragDropContext} from 'react-beautiful-dnd'

const HomePage = ({ data }) => {
  const cards = data?.allContentfulCard?.nodes || []


return (
  <ThemeProvider theme={lightTheme}>
    <Layout>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex>
          {/* Nav */}
          <Box className="Navigation" width={2 / 6} p="2em">
            <Heading as="h1" mb={3}>
              Home Navigation:
            </Heading>
            <NavLink as={Link} to="/card-form" mb={2}>
              Card Form
            </NavLink>
            <NavLink as={Link} to="/card-game-rules">
              Card Game Rules
            </NavLink>

            <Heading as="h2" mt={4}>
              Cards List:
            </Heading>
            <CardList cards={cards} />
          </Box>

          {/* Pm */}
          <Box className="PlayMat" width={1 / 2}>
            <PlayMat />
          </Box>
        </Flex>



      </DragDropContext>
    </Layout>
  </ThemeProvider>
)
}

export const query = graphql`
  query {
    allContentfulCard {
      nodes {
        id
        nameOfCard
        imageForCard {
          file {
            url
          }
        }
        cardDescription {
          childMarkdownRemark {
            html
          }
        }
        slug
      }
    }
  }
`

export default HomePage


const styles = `
  .Navigation {
    background-color: ${({ theme }) => theme.colors.muted};
    padding: 2em;
  }

  .PlayMat {
    background-color: brown;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }`