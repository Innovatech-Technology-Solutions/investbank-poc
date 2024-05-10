/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import {  Modal } from 'antd';
import { useUploadAttchmentMutation } from './services/hostApiServices';
import { isValidResponse } from './utils/Commonutils';
import Button from './Button';
const RecordVideo = ({randID}:{randID:any}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [modalClosed, setModalClosed] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
const[uploadAttachment]=useUploadAttchmentMutation()
  const showModal = () => {
    setIsModalVisible(true);
    startRecording();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalClosed(true); // Set modalClosed to true when the modal is closed
    stopRecording();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          setRecordedChunks(prevChunks => [...prevChunks, event.data]);
        }
      };

      mediaRecorder.onstart = () => {
        setIsRecording(true);
      };

      mediaRecorder.onstop = () => {
        setIsRecording(false);
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing media devices: ', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    if (modalClosed) {
      // Modal is closed, send recorded data to API
      sendRecordingToAPI(recordedChunks);
    }
  }, [modalClosed]);

  const sendRecordingToAPI = async (recordedChunks: Blob[]) => {
    try {
      const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const data: any = {
            attachmentTypeId: "ATTYP_428",
            requestId:  randID,
            fileName: `screencapture_${Math.random()}.webm`,
            fileType: "video/webm",
            isUploaded: false,
            fileSize: null,
            source: "source",
            type: "type",
            attachment: { content: base64data },
          };
        uploadAttachment(data).unwrap().then(response => {
          if (isValidResponse(response)) {
            console.log('Recording sent successfully');
          } else {
            console.error('Failed to send recording');
          }
        })
        .catch(error => {
          console.error('Error sending recording to API:', error);
        });
      };
      
      reader.readAsDataURL(recordedBlob);
    } catch (error) {
      console.error('Error preparing recording data:', error);
    }
  };

  const playRecordedVideo = () => {
    if (recordedChunks.length > 0) {
      const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const recordedUrl = URL.createObjectURL(recordedBlob);
      window.open(recordedUrl);
    }
  };

  return (
    <div>
      <Button onClick={showModal}>
        Start Recording
      </Button>
      <Modal
        title="Record Video"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={
          isRecording
            ? null
            : (
              <Button onClick={playRecordedVideo} disabled={recordedChunks.length === 0}>
                Play Recorded Video
              </Button>
            )
        }
      >
        <video ref={videoRef} autoPlay />
        {isRecording && (
            <div className='pt-2'>
          <Button onClick={stopRecording}>Stop Recording</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecordVideo;
