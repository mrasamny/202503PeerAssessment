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
          <Route path="/evalSheet/:deployment_code" element={<EvalSheet/>}></Route>
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
