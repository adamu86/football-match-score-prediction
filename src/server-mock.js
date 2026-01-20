import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = 8080

// bez tego req.body będzie undefined
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/score-prediction', (req, res) => {
  const { firstTeam, secondTeam } = req.query
  console.log('Received teams:', firstTeam, secondTeam)

  // 

  res.json({
    message: 'Prediction received',
    teams: { firstTeam, secondTeam },
    predictedScore: `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 5)}`
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
