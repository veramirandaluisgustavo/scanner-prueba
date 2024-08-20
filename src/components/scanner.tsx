import { useEffect, useRef } from 'react';
import Header from '../components/Header';
//import LoadingSpinner from './components/LoadingSpinner';
import * as faceapi from 'face-api.js';
import emoticon from '../assets/emoticon.png'


// const isPageLoaded = (): boolean => {
//   return document.readyState === 'complete';
// };

function Scanner() {
  let sendFlag:boolean=false;
  // definiendo variables y constantes glovales
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //referencias a los divs


  const diveref1 = useRef<HTMLDivElement>(null);
  const diveref2 = useRef<HTMLDivElement>(null);
  const diveref3 = useRef<HTMLDivElement>(null);
  const diveref4 = useRef<HTMLDivElement>(null);
  const diveref5 = useRef<HTMLDivElement>(null);
  const diveref6 = useRef<HTMLDivElement>(null);
  const diveref7 = useRef<HTMLDivElement>(null);
  const diveref8 = useRef<HTMLDivElement>(null);
  const diveref9 = useRef<HTMLDivElement>(null);
  const diveref10 = useRef<HTMLDivElement>(null);
  const divsArray:React.RefObject<HTMLDivElement>[]=[]

  divsArray.push(diveref1);
  divsArray.push(diveref2);
  divsArray.push(diveref3);
  divsArray.push(diveref4);
  divsArray.push(diveref5);
  divsArray.push(diveref6);
  divsArray.push(diveref7);
  divsArray.push(diveref8);
  divsArray.push(diveref9);
  divsArray.push(diveref10);

  //const [angulo, setAngulo] = useState(0);
  //console.log(videoRef.current)
  const ANGULOS = [20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80];
  const imagenes: File[] = [];
  const imagenesTag: boolean[] = Array(ANGULOS.length).fill(false);
  const tamanio: string = "flex-none h-full bg-red-500 w-[10%]";
  const tamanio2: string = "flex-none h-full bg-green-500 w-[10%]";

  async function getVideoFrame(video: HTMLVideoElement): Promise<File> {
    const canvasf = document.createElement('canvas');
    canvasf.width = video.videoWidth;
    canvasf.height = video.videoHeight;
    const ctx: CanvasRenderingContext2D | null = canvasf.getContext('2d');
    if (ctx == null) return new File([], 'empty.png', { type: 'image/png' });
    ctx.drawImage(video, 0, 0, canvasf.width, canvasf.height);
    return new Promise(resolve => {
      canvasf.toBlob(blob => {
        if (blob) {
          resolve(new File([blob], 'capture.png', { type: 'image/png' }));
        } else {
          resolve(new File([], 'empty.png', { type: 'image/png' }));
        }
      }, 'image/png');
    });
  }

  // async function sendStringAndImagesToApi(apiUrl: string, text: string, imageFiles: File[]) {
  //   try {
  //       const formData = new FormData();
  //       formData.append('text', text);
        
  //       imageFiles.forEach((file, index) => {
  //           formData.append('files', file, `image${index}.png`);
  //       });

  //       const response = await fetch(apiUrl, {
  //           method: 'POST',
  //           mode: 'cors', 
  //           body: formData
  //       });

  //       if (!response.ok) {
  //           throw new Error(`Error: ${response.statusText}`);
  //       }

  //       const data = await response.json();
  //       console.log('Response from API:', data);
  //       return data;

  //   } catch (error) {
  //       console.error('Failed to send data to the API:', error);
  //   }
  // }

  async function captureImage() {
    const videoEl = videoRef.current as HTMLVideoElement;
    if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
      const imgFile = await getVideoFrame(videoEl);
      if (imgFile.size === 0) return;
      imagenes.push(imgFile);
      console.log('Imagen capturada y guardada en el array.');
      console.log(imagenes);
    } else {
      console.log('El video no está listo para capturar una imagen.');
    }
  }

  async function narizRelativaF(x1: number, x2: number, x3: number) {
    const ancho = x2 - x1;
    const nariz = x3 - x1;
    const narizRelativa = (nariz / ancho) * 100;

    for (let i = 0; i < ANGULOS.length - 1; i++) {
      const divEl = divsArray[i].current as HTMLDivElement;
      if (!divEl) {
        console.log('error en divEL');
        return false;
      }
      if (narizRelativa > ANGULOS[i] && narizRelativa < ANGULOS[i + 1] && !imagenesTag[i]) {
        imagenesTag[i] = true;
        await captureImage();
        divEl.className = tamanio2;
      }
    }

    if (imagenes.length === ANGULOS.length - 1) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.srcObject = stream;
      }
    });
  }, []);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.loadTinyFaceDetectorModel('/models');
        await faceapi.loadFaceLandmarkModel('/models');
        console.log("Modelos cargados");
      } catch (error) {
        console.error("Error cargando los modelos:", error);
      }
    };

    loadModels();
  }, []);

  async function hadleLoadedMetadata() {
    const videoEl = videoRef.current as HTMLVideoElement;
    const canvasEl = canvasRef.current as HTMLCanvasElement;
    if (!videoEl || !canvasEl) {
      console.log('error en videoref y canvasref');
      return;
    }

    const detection = await faceapi.detectSingleFace(
      videoEl as HTMLVideoElement, new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks();

    if (detection) {
      const dimensions = {
        width: videoEl.offsetWidth,
        height: videoEl.offsetHeight,
      };
      faceapi.matchDimensions(canvasEl, dimensions);
      const resizeResults = faceapi.resizeResults(detection, dimensions);
      faceapi.draw.drawDetections(canvasEl, resizeResults);
      //faceapi.draw.drawFaceLandmarks(canvasEl, resizeResults);

      const x1 = detection.landmarks.positions[41].x;
      const x2 = detection.landmarks.positions[46].x;
      const x3 = detection.landmarks.positions[33].x;
      const respuesta = await narizRelativaF(x1, x2, x3);
      if (respuesta == true) {
        console.log('completo');
      }
    }

    if (imagenes.length == ANGULOS.length - 1) {
      console.log("se sacaron todas las fotos");
      console.log(imagenes);
      //const mensage = 'jose';
      //const APIURL = 'http://localhost:3000/photos/upload';
      if(!sendFlag){
        sendFlag=true;
        //sendStringAndImagesToApi(APIURL, mensage, imagenes);
        videoEl.srcObject =null;
      }
      
      return;
    }
    setTimeout(hadleLoadedMetadata, 50);
  }
  
  return (
    <main className="min-h-screen flex flex-col lg:flex-row md:justify-between gap-14 xl:gap-40 p-10 items-center container mx-auto">
      <Header />
      <section className="flex flex-col gap-6 flex-1 w-full">
        <div className="bg-white rounded-xl p-2">
          <div className="relative flex items-center justify-center aspect-video w-full">
            {/* webcam*/}

            <div className="aspect-video rounded-lg bg-gray-300 w-full">
              <div className='relative flex items-center justify-center w-full aspect-video'>
                <video ref={videoRef}
                  onLoadedMetadata={hadleLoadedMetadata}
                  autoPlay
                ></video>
                <canvas className='absolute inset-0 w-full h-full' ref={canvasRef}></canvas>
              </div>
            </div>
            {/* Swebcam */}
          </div>
        </div>
        <div
          className={`bg-white rounded-xl px-8 py-6 flex lg:gap-20 items-center h-[200px] justify-center`}
        >
          <div className='relative flex h-full w-auto items-center justify-center'>
            <img src={emoticon} className='relative z-20 h-full w-auto' />
            <div className='absolute flex h-full w-full items-center justify-center'>
              
              <div ref={diveref1} className={tamanio}></div>
              <div ref={diveref2} className={tamanio}></div>
              <div ref={diveref3} className={tamanio}></div>
              <div ref={diveref4} className={tamanio}></div>
              <div ref={diveref5} className={tamanio}></div>
              <div ref={diveref6} className={tamanio}></div>
              <div ref={diveref7} className={tamanio}></div>
              <div ref={diveref8} className={tamanio}></div>
              <div ref={diveref9} className={tamanio}></div>
              <div ref={diveref10} className={tamanio}></div>
            </div>

          </div>



        </div>
      </section>
    </main>
  );
}

export default Scanner;
