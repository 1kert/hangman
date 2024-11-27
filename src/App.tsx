import { useEffect, useState } from "react"
import CharButton from "./components/CharButton"
import hangmanStates from "./HangmanStates"

function getDisplayWord(word: string, letters: string[]): string {
  return word.split("").map(x => letters.includes(x) ? x : "_").join("")
}

function onGuess(letter: string, word: string, subLife: () => void, setGuessedLetter: () => void) {
  const isCorrect = word.includes(letter)
  setGuessedLetter()
  if (!isCorrect) subLife()
}

function App() {
  const allLetters = "abcdefghijklmnopqrstuvwxyz".split("")

  const [word, setWord] = useState("ababac")
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [lives, setLives] = useState(hangmanStates.length - 1)
  const [gameOver, setGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [showText, setShowText] = useState(false)
  const currentState = hangmanStates.length - lives - 1

  useEffect(() => {
    if(lives <= 0) {
      setGameOver(true)
    } else if(!getDisplayWord(word, guessedLetters).includes("_")) {
      setGameOver(true)
      setIsWin(true)
    }
  }, [lives, guessedLetters])

  useEffect(() => {
    if(!gameOver) return
    console.log("game over");

    const interval = setInterval(() => {
      setShowText(!showText)
      console.log(showText);
    }, 2000)

    return () => clearInterval(interval)
  }, [gameOver])

  return (
    <>
      {gameOver &&
        <div className="absolute top-0 left-0 w-full h-screen bg-[#00000070] z-50 flex justify-center items-center">
          {showText && <p className={`text-[150px] font-bold ${isWin ? "text-green-400" : "text-red-400"} select-none`}>{isWin ? "YOU WIN" : "DUMBASS"}</p>}
        </div>
      }

      <div className="w-full relative h-screen">
        <p className="absolute right-2 top-2 text-4xl">{lives > 0 ? `lives: ${lives}` : "dumbass"}</p>
        <div className="flex w-full justify-between items-center h-full">
          <img src={currentState < 10 ? hangmanStates[currentState] : hangmanStates[hangmanStates.length - 1]} />
          <div className="flex flex-col items-center gap-16 mr-64">
            <p className="text-8xl select-none tracking-widest text-center">{getDisplayWord(word, guessedLetters)}</p>
            <div className="flex gap-2 w-[600px] flex-wrap justify-center">
              {allLetters.map((x, i) =>
                <CharButton
                  key={i}
                  character={x}
                  isActive={!guessedLetters.includes(x)}
                  isPressable={!gameOver}
                  onGuess={() => onGuess(x, word, () => setLives(lives - 1), () => setGuessedLetters([...guessedLetters, x])) }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
