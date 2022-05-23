import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
// eslint-disable-next-line import/order
import { useEffect } from 'react';

const handle = () => {
  // const childWindow = window.open('', 'modal');
  // childWindow?.document.write('<h1>Hello</h1>');
  window.electron.ipcRenderer.myPing();
};
//
// window.electron.ipcRenderer.on('ipc-example', (data) => {
//   console.log('>>>>>>', data);
// });
const Hello = () => {
  // console.log(container);

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <a onClick={handle}>
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>

        <Link to="/test">Go to test</Link>
      </div>
    </div>
  );
};

const Test = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('ipc-example', (arg) => {
      alert(arg);
    });
  }, []);
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      This is a test! <a onClick={handle}>asdas</a>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
