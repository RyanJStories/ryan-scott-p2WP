import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import lightTheme from "../themes/lightTheme"
import { ThemeProvider } from "styled-components"
import Card from "../components/card"
import { Box, Heading, NavLink, Flex } from "rebass"

const HomePage = ({ data }) => {
  const cards = data?.allContentfulCard?.nodes || []

  return (
    <ThemeProvider theme={lightTheme}>
      <Layout>
        <Box p={3}>
          <Heading as="h1">Choose a Card:</Heading>
          <Flex flexWrap="wrap" justifyContent="space-around" my={3}>
            {cards.map(card => (
              <Card
                key={card.id}
                nameOfCard={card.nameOfCard}
                imageForCard={card.imageForCard?.file?.url}
                cardDescription={card.cardDescription?.childMarkdownRemark?.html}
              />
            ))}
          </Flex>
          <Heading as="h1" mt={4}>Home Navigation:</Heading>
          <Flex as="nav" flexDirection="column" mt={3}>
            <NavLink as={Link} to="/card-form" mb={2}>
              Card Form
            </NavLink>
            <NavLink as={Link} to="/card-game-rules">
              Card Game Rules
            </NavLink>
          </Flex>
        </Box>
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
