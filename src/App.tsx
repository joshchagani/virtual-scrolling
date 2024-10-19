import Dictionary from './assets/array-of-words.json'
import SafetyLimit from "./components/SafetyLimit"
import ListOfItems from './components/ListOfItems'

function App() {

  return (
    <>
      <SafetyLimit>
        <ListOfItems words={Dictionary} />
      </SafetyLimit>
    </>
  )
}

export default App
