import dynamic from "next/dynamic";
import { useEffect, useState } from "react"
// import { words } from "@/lib/words"
import { Wheel } from 'react-custom-roulette';

const data = [
  { option: 'rishabh', style: { backgroundColor: 'green', textColor: 'black' } },
  { option: '1' },
  { option: '2' },
  { option: '0' },
  { option: '1' },
  { option: '2' },
  { option: '0' },
  { option: '1' },
  { option: '2' },
  { option: '0' },
  { option: '1' },
  { option: '2' },
];
export default function Home() {
  const words = [
    "rishabh",
    "yushu",
    "pipi"
  ]
  const [random, SetRandom] = useState<String>("Press Random")
  const [remainingWords, SetRemainingWords] = useState<String[]>(words);
  const generateRandom = () => {
    if (remainingWords.length) {
      let randomNumber = Math.floor(Math.random() * remainingWords.length);
      let generatedWord = remainingWords[randomNumber];
      SetRandom(generatedWord)
      const index = remainingWords.indexOf(generatedWord);
      if (index > -1) {
        SetRemainingWords(remainingWords.filter(item => item !== generatedWord));
      }
    }
  }
  const filterWord = (word: String) => {
    if (remainingWords.indexOf(word) === -1) {
      return true;
    }
    return false;
  }
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };
  return (
    <main className="h-screen text-white p-5">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
        backgroundColors={["green", "red"]}
        spinDuration={0.3}
      />
      <button onClick={handleSpinClick}>SPIN</button>
      <div className="flex justify-center text-3xl py-14">
        <h1>{random}</h1>
      </div>
      <div className="flex justify-center m-10">
        <button className="bg-white text-black rounded p-2 " onClick={generateRandom} >Random</button>
      </div>
      <div className="grid grid-cols-7 gap-3">
        {words.map((word, i) => (
          <div key={i} className={`min-w-fit w-24 h-10 bg-green-300 p-2 text-black flex justify-center items-center rounded ${filterWord(word) ? 'bg-red-300' : 'bg-green-300'}`}>
            <h1>{word}</h1>
          </div>
        ))}
      </div>
    </main>
  )
}
