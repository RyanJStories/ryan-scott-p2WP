import React, { useState } from "react"
import Layout from "../components/layout"

const CardGameRulesPage = () => {
  const [rules, setRules] = useState("")

  const handleChange = event => {
    setRules(event.target.value)
  }

  const handleSaveToFile = () => {
    const element = document.createElement("a")
    const file = new Blob([rules], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "card_game_rules.txt"
    document.body.appendChild(element)
    element.click()
  }

  return (
    <Layout>
      <h1>Card Game Rules</h1>
      <form>
        <label htmlFor="rulesInput">Input Rules:</label>
        <textarea
          id="rulesInput"
          value={rules}
          onChange={handleChange}
          placeholder="Enter the rules of the card game..."
          required
        ></textarea>
        <button type="button" onClick={handleSaveToFile}>Save Rules to File</button>
      </form>
    </Layout>
  )
}

export default CardGameRulesPage