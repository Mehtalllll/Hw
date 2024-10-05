import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Imodal {
  shows: boolean;
  Time: string;
  Title: string;
  Discription:string;
  deletealarm: (_: number) => void
  alarmIndex:number
}

const MyModal: React.FC<Imodal> = ({ shows, Time, Title ,Discription,alarmIndex,deletealarm}) => {
  const [show, setShow] = React.useState(shows);
  var audio = new Audio('src/assets/clock-ticking-1.mp3');
  React.useEffect(()=>{
    audio.play();

  },[shows])
  const handleClose = () => setShow(false);

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

  return (
    <>
      <Modal className='bg-black' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='flex flex-row gap-x-5'>
            <img src="src/assets/clock-svgrepo-com.svg" className='w-10' alt="" />  
            {Time}
            {Title}  
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>{Discription}</Modal.Body>
        <Modal.Footer>
          <Button  onClick={()=>stopAudio()}>
            Pause
          </Button>
          <Button className='bg-red-500 border-red-500' onClick={()=>deletealarm(alarmIndex)}>
            Delete
          </Button>
          <Button className='bg-green-500 border-green-500' onClick={handleClose}>
          Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
