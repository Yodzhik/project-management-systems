import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Issues from "./pages/Issues.jsx";
import Boards from "./pages/Boards.jsx";
import Board from "./pages/Board.jsx";

function App() {

    return (
        <Routes>
            <Route path='/issues' element={<Issues/>}/>
            <Route path='/boards' element={<Boards/>}/>
            <Route path='/board/:id' element={<Board/>}/>
        </Routes>
    )
}

export default App
