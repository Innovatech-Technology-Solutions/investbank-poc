import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';

const RecordVideo: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
    startRecording();
  };

  const handleOk = () => {
    setIsModalVisible(false);
    stopRecording();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const playRecordedVideo = () => {
    if (recordedChunks.length > 0) {
      const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const recordedUrl = URL.createObjectURL(recordedBlob);
      window.open(recordedUrl);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Start Recording
      </Button>
      <Modal
        title="Record Video"
        visible={isModalVisible}
        onOk={handleOk}
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
          <Button onClick={stopRecording}>Stop Recording</Button>
        )}
      </Modal>
    </div>
  );
};

export default RecordVideo;
