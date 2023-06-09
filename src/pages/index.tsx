import { CSSProperties, useState } from "react"
import { words } from "@/lib/words"
import { ScaleLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Home() {
  const [random, SetRandom] = useState<String>("Lets Bingo!")
  const [remainingWords, SetRemainingWords] = useState<String[]>(words);
  const generateRandom = () => {
    setLoading(true);
    if (remainingWords.length) {
      setTimeout(() => {
        setLoading(false);
        let randomNumber = Math.floor(Math.random() * remainingWords.length);
        let generatedWord = remainingWords[randomNumber];
        SetRandom(generatedWord)
        const index = remainingWords.indexOf(generatedWord);
        if (index > -1) {
          SetRemainingWords(remainingWords.filter(item => item !== generatedWord));
        }
      }, 2000)
    }
  }
  const filterWord = (word: String) => {
    if (remainingWords.indexOf(word) === -1) {
      return true;
    }
    return false;
  }
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  return (
    <main className="h-screen text-white p-5">
      <div className="flex justify-center text-3xl my-8 h-10">
        {loading ?
          <div>
            <ScaleLoader
              color={color}
              loading={loading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            /></div> : <h1>{random}</h1>}
      </div>
      <div className="flex justify-center m-5">
        <button className={`bg-white text-black rounded p-2 text-xl ${loading ? 'bg-gray-300 text-gray-500' : 'bg-white'}`} disabled={loading} onClick={generateRandom} >Bingo</button>
      </div>
      <div className="grid grid-cols-7 gap-2 " >
        {words.map((word, i) => (
          <div key={i} className={`min-w-fit w-full h-10 bg-green-300 p-2 text-black flex justify-center items-center rounded ${filterWord(word) ? 'bg-red-300 hover:bg-red-400' : 'bg-green-300 hover:bg-green-400'} cursor-default`}>
            <h1>{word}</h1>
          </div>
        ))}
      </div>
    </main>
  )
}
