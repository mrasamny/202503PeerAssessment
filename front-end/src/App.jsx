import './App.css';
import { useEffect,useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EvalSheet from './EvalSheet';
import ErrorPage from './ErrorPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/evalSheet/:assessment_id/:assessor_id" element={<EvalSheet/>}></Route>
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
