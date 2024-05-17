import React, { useState } from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import darkTheme from "../themes/darkTheme"
import { ThemeProvider } from "styled-components"
import { Box, Button, Text, Textarea, Heading } from "rebass"
import { Link as RebassLink } from "rebass"

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
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <Box p={3}>
          <Heading as="h1">Card Game Rules</Heading>


          <Box as="form" mt={3}>
            <Text as="label" htmlFor="rulesInput" display="block" mb={2}>
              Input Rules:
            </Text>
            <Textarea

              id="rulesInput"

              value={rules}
              
              onChange={handleChange}

              placeholder="Enter the rules of the card game..."
              required

              rows={6}
              sx={{ width: '100%', mb: 3 }}
            />
            <Button type="button" onClick={handleSaveToFile} mr={2}>
              Save Rules to File
            </Button>
            <RebassLink as={Link} to="/">
              <Button>Back to Home</Button>
            </RebassLink>
          </Box>

        </Box>
      </Layout>
    </ThemeProvider>
  )
}

export default CardGameRulesPage
