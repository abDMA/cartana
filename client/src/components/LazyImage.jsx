import{ useState, useEffect, useRef } from 'react';
 import ColorThief from 'colorthief';
  const LazyImage = ({ src, alt,radius }) => { 
    const [isLoaded, setIsLoaded] = useState(false);
     const [dominantColor, setDominantColor] = useState('rgba(200,200,200,0.3)'); 
     const imgRef = useRef();
    useEffect(() => { const colorThief = new ColorThief(); 
        const img = new Image(); img.src = src; img.crossOrigin = "anonymous";
          img.onload = () => {
             const color = colorThief.getColor(img);
              setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`); }; }, [src]); 
              return (
           <div style={{position:"relative"}}>
                <img onLoad={() => setIsLoaded(true)} 
                className={isLoaded?'loaded-img':'loading-image'} ref={imgRef} src={src} alt={alt} style={{ backgroundImage:"red", width: '100%', objectFit: 'contain',filter:isLoaded?'none':'blur(10px)', borderRadius:radius }}  /> 
               {!isLoaded && <div style={{backgroundColor:dominantColor}} className='absolute  top-0 left-0 w-full h-full '/>}
      
              </div>  
                ) };
    export default LazyImage;