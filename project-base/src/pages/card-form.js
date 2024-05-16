import React, { useState } from "react"
import Layout from "../components/layout"
import { navigate } from "gatsby"

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
    <Layout>
      <h1>Create a New Card</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nameOfCard"
          value={formData.nameOfCard}
          onChange={handleInputChange}
          placeholder="Name of Card"
          required
        />
        <input
          type="text"
          name="imageForCard"
          value={formData.imageForCard}
          onChange={handleInputChange}
          placeholder="Image URL for Card"
          required
        />
        <input
          type="text"
          name="stats"
          value={formData.stats}
          onChange={handleInputChange}
          placeholder="Stats"
          required
        />
        <textarea
          name="cardDescription"
          value={formData.cardDescription}
          onChange={handleInputChange}
          placeholder="Card Description"
          required
        ></textarea>
        <button type="submit">Submit</button>
        <Link to="/index.js">Back to Home</Link>
      </form>
    </Layout>
  )
}

export default CardFormPage