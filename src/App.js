import './App.css';
import { useState } from 'react';
import {BsFillDropletFill} from 'react-icons/bs'; //icone úmidade
import {BsFillGeoAltFill} from 'react-icons/bs'; //icone local/ponteiro
import {WiSandstorm} from 'react-icons/wi'; //icone vento




function App() {
  
  const [cidade, setCidade] = useState("");
  const [data, setData] = useState("");
  const [icon, setIcon] = useState("");
  const [img, setImg] = useState("");
  const [span, setSpan] = useState("");


  //icones referente ao tempo
  const Img = (image) => {
    switch (image) {
      case 'chuva moderada':
        image = 'image/chuva.gif';
        break;
      case 'trovoada com chuva fraca':
        image = 'image/trovao.gif';
        break;  
      case 'chuva leve':
        image = 'image/chuva.gif';
        break;
      case 'nublado':
        image = 'image/nublado.gif';
        break;
      case 'nuvens dispersas':
        image = 'image/nublado.gif';
        break;
      case 'algumas nuvens':
        image = 'image/nublado.gif';
        break;
      case 'céu limpo':
        image = 'image/ceulimpo.gif';
        break;
      default:
        image = 'image/fundo.jpg';
        break;
    }
    return image;
  }

  const Icons = (icone) => {
    icone=`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    return icone;
  }

  //pegando valor do input
  const handleChange = (e) => {
    setCidade(e.target.value)
  }

  //pegando resposta da api weather api
  const handleSearch = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${cidade}&units=metric&appid=d302d53de6a736e65866d88174281701&lang=pt_br`)
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }
      else{
        setSpan("Local não encontrado!")
      }
    })
    .then((data) => {
      //deixarei um console.log para consultarem os dados
      console.log(data);
      setImg(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setData(data);
    });
  }
  

  return (
    
    <div className="App">
      <section>      
          <div className='container'>
          
            {data ?(
              <img className='img_fundo' src={Img(img)} alt="img"></img>
            ) : null}


            <div className='nav'>
              <input
                    className='input'
                    placeholder='Cidade...'
                    value={cidade}
                    onChange={handleChange}
                    >
              </input>
              <button className='buscar' onClick={handleSearch}>
                Buscar
              </button> 
            </div>

            <hr />
            
            <div className='container-info'>
              <h2>
                  {data ?(
                    <div className='cidade'>
                      <span>Cidade:</span>
                        <h4><BsFillGeoAltFill />{data.name} - {data.sys.country}</h4>
                    </div>
                    ) : (<span>{span}</span>)}
              </h2>

              <h2>
                  {data ?(
                    <div className='temp'>
                      <span>Temperatura:</span>
                      <h4 className='tempe'>{data.main.temp}&deg;C </h4>
                    </div>
                  ) : null} 
              </h2>

              <h2> 
                {data ?(
                    <div className='descricao'>
                      <h4 className='desc'>{data.weather[0].description}</h4>
                      <img src={Icons(icon)}></img>
                    </div>
                    ) : null}
              </h2>
                  
              <h2>  
                {data ?(
                    <div>
                      <h4><BsFillDropletFill className='icone-humidity' />{data.main.humidity}%</h4>
                      <h4><WiSandstorm className='icone-vento'/>{data.wind.speed}</h4>
                    </div>
                    ) : null}
              </h2>

            </div>
          </div>
        
      </section>
    </div>
  );
}

export default App;
