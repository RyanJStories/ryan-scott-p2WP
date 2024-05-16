import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import lightTheme from "../themes/lightTheme";
import { ThemeProvider } from "styled-components";

const HomePage = ({ data }) => {
  const cards = data?.allContentfulCard?.nodes || []

  return (
    <ThemeProvider>
    <Layout>
      <h1>Choose a Card:</h1>
      <div>
        {cards.map(card => (
          <div key={card.id}>
            <h2>{card.nameOfCard}</h2>
            <img src={card.imageForCard?.file?.url} alt={card.nameOfCard} />
            <p>{card.cardDescription?.childMarkdownRemark?.html}</p>
            <Link to={`/cards/${card.slug}`}>View Details</Link>
          </div>
          
        ))}
      </div>
      <div>
      <h1>Home Navigation:</h1>
        <nav>
          <ul>
            <li><Link to="/card-form">Card Form</Link></li>
            <li><Link to="/card-game-rules">Card Game Rules</Link></li>
          </ul>
        </nav>
      <main>{children}</main>
    </div>
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
