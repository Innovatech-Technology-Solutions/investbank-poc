import React, { useState, useRef, useEffect } from "react";
import { Modal } from "antd";
import { useUploadAttchmentMutation } from "./services/hostApiServices";
import { isValidResponse } from "./utils/Commonutils";
import Button from "./Button";
import { Record, VideoCamera } from "@phosphor-icons/react";
import emitMessage from "./services/emitMessage";
import { useGetInterfaceByIDQuery } from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

const RecordVideo = ({ randID }: { randID: any }) => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];

  // State variables to manage component behavior
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [modalClosed, setModalClosed] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);

  // Refs for accessing DOM elements and MediaRecorder instance
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Mutation hook for uploading recorded video
  const [uploadAttachment] = useUploadAttchmentMutation();

  // Function to show the recording modal and start countdown
  const showModal = () => {
    setIsModalVisible(true);
    startCountdown();
  };

  // Function to start the countdown before recording
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setIsStarted(true);
      startRecording();
    }, 3000);
  };

  // Function to handle canceling recording
  const handleCancel = () => {
    setIsModalVisible(false);
    setModalClosed(true);
    stopRecording();
  };

  // Function to start recording video
  const startRecording = async () => {
    setIsStarted(true);

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
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
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
      console.error("Error accessing media devices: ", error);
    }
  };

  // Function to stop recording video
  const stopRecording = () => {
    setIsStarted(false);

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  // Effect to handle cleanup when modal is closed or canceled
  useEffect(() => {
    if (modalClosed) {
      stopRecording();
      setRecordedChunks([]); // Clear recorded video chunks
      if (videoRef.current) videoRef.current.srcObject = null; // Clear video source
    }
  }, [modalClosed]);

  // Function to send recorded video to the API
  const sendRecordingToAPI = async (recordedChunks: Blob[]) => {
    try {
      const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64data = reader.result as string;
        const data: any = {
          attachmentTypeId: "ATTYP_428",
          requestId: randID,
          fileName: `screencapture_${Math.random()}.webm`,
          fileType: "video/webm",
          isUploaded: false,
          fileSize: null,
          source: "source",
          type: "type",
          attachment: { content: base64data },
        };
        uploadAttachment(data)
          .unwrap()
          .then((response) => {
            console.log(response);
            if (isValidResponse(response)) {
              emitMessage("Recording sent successfully", "success");
            } else {
              emitMessage("Failed to send recording", "error");
            }
          })
          .catch(() => {
            emitMessage("Failed to send recording", "error");
          });
      };

      reader.readAsDataURL(recordedBlob);
    } catch (error) {
      emitMessage("Something went record", "error");
    }
  };

  // Function to play recorded video
  const playRecordedVideo = () => {
    if (isRecording || recordedChunks.length === 0) {
      return null;
    }
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    return URL.createObjectURL(recordedBlob);
  };

  return (
    <div>
      {/* Button to initiate recording */}
      <Button
        className="bg-aegreen-500 hover:bg-aegreen-500"
        onClick={showModal}
      >
        <VideoCamera size={32} color="#f52929" />
        {uiConfiguration?.UI_LABELS?.START_RECORDING || "Start Recording"}
      </Button>

      {/* Modal to display recording interface */}
      <Modal
        title="Record Video"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={
          isRecording ? null : (
            <div>
              <div className="flex flex-col gap-2">
                {/* Video player for displaying live feed or recorded video */}
                <div>
                  <video src={playRecordedVideo()} autoPlay />
                </div>

                {/* Button to upload recorded video */}
                {!(recordedChunks.length === 0) && (
                  <Button
                    sizeVariant="xs"
                    styleVariant="secondary"
                    onClick={() => {
                      sendRecordingToAPI(recordedChunks);
                      setIsModalVisible(false);
                    }}
                    disabled={recordedChunks.length === 0}
                  >
                    {uiConfiguration?.UI_LABELS?.UPLOAD_RECORDING ||
                      "Upload Recording"}
                  </Button>
                )}
              </div>
            </div>
          )
        }
      >
        {/* Countdown timer */}
        {countdown > 0 && (
          <p
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {countdown}
          </p>
        )}

        {/* Recording status */}
        {isStarted && (
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            <Record size={32} color="#f52929" />
            {uiConfiguration?.UI_LABELS?.RECORDING || "Recording..."}
          </p>
        )}

        {/* Video player for displaying live feed */}
        {isStarted && videoRef ? (
          <video ref={videoRef} autoPlay={false} />
        ) : null}

        {/* Button to stop recording */}
        {isRecording && (
          <div
            className="pt-2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              sizeVariant="xs"
              onClick={stopRecording}
              style={{ backgroundColor: "#f52929", color: "white" }}
            >
              {uiConfiguration?.UI_LABELS?.STOP_RECORDING || "Stop Recording"}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecordVideo;
