import React, { useState } from "react"
import Layout from "../components/layout"
import { navigate, Link } from "gatsby"
import darkTheme from "../themes/darkTheme"
import { ThemeProvider } from "styled-components"
import Card from "../components/card"
import { Box, Button, Input, Label, Textarea, Heading } from "rebass"

const CardFormPage = () => {
  const [formData, setFormData] = useState({
    nameOfCard: "",
    imageForCard: "",
    stats: "",
    cardDescription: "",
  })

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    
    try {
      const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
            mutation {
              createCard(input: { data: { 
                nameOfCard: "${formData.nameOfCard}",
                imageForCard: "${formData.imageForCard}",
                stats: "${formData.stats}",
                cardDescription: "${formData.cardDescription}",
              }}) {
                card {
                  id
                }
              }
            }
          `
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        console.log("Card created:", data.data.createCard.card)
        navigate("/")
      } else {
        console.error("Error creating card:", data.errors)
      }
    } catch (error) {
      console.error("Error creating card:", error)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <Box p={3}>
          <Heading as="h1">Create a New Card</Heading>
          <Box as="form" onSubmit={handleSubmit} mt={3}>
            <Label htmlFor="nameOfCard">Name of Card</Label>
            <Input
              type="text"
              name="nameOfCard"
              value={formData.nameOfCard}
              onChange={handleInputChange}
              placeholder="Name of Card"
              required
              mb={3}
            />
            <Label htmlFor="imageForCard">Image URL for Card</Label>
            <Input
              type="text"
              name="imageForCard"
              value={formData.imageForCard}
              onChange={handleInputChange}
              placeholder="Image URL for Card"
              required
              mb={3}
            />
            <Label htmlFor="stats">Stats</Label>
            <Input
              type="text"
              name="stats"
              value={formData.stats}
              onChange={handleInputChange}
              placeholder="Stats"
              required
              mb={3}
            />
            <Label htmlFor="cardDescription">Card Description</Label>
            <Textarea
              name="cardDescription"
              value={formData.cardDescription}
              onChange={handleInputChange}
              placeholder="Card Description"
              required
              rows={6}
              mb={3}
            />
            <Card
              nameOfCard={formData.nameOfCard}
              imageForCard={formData.imageForCard}
              stats={formData.stats}
              cardDescription={formData.cardDescription}
            />
            <Button type="submit" mr={2}>Submit</Button>
            <Button as={Link} to="/" variant="secondary">Back to Home</Button>
          </Box>
        </Box>
      </Layout>
    </ThemeProvider>
  )
}

export default CardFormPage
