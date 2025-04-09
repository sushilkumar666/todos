import './App.css'
import { RootState } from './app/store'
import { useSelector } from 'react-redux'
import TodoTable from './components/TodoTable';

function App() {
  const todos = useSelector((state: RootState) => state.todoSlice.todos);
  console.log(todos)
  return (

    <>
      <div className='bg-orange-600 text-white'>Jai Shree Ram</div>

      <TodoTable resultsPerPage={10} />

    </>
  )
}

export default App
