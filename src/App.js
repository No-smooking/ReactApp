
import './App.css';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import MenuLeft from './MenuLeft';
import { useLocation } from 'react-router-dom';
import MenuAcc from './Components/Account/MenuAcc';

function App(props) {
  let params1 = useLocation();
  return (
    <div>
      <Header/>
        <section>
          <div className='container'>
            <div className='row'>
              {
              
              params1['pathname'].includes('cart') ? "" : params1['pathname'].includes('account') ? <MenuAcc/> : <MenuLeft/>
              
              } 
              {props.children}
            </div>
          </div>
        </section>
      <Footer/>
    </div>
  );
}

export default App;
