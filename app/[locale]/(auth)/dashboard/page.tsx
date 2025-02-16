'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FaMicrophone, FaPhone, FaPhoneSlash } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { TitleBar } from '@/features/dashboard/TitleBar';

const DashboardIndexPage = () => {
  const t = useTranslations('DashboardIndex');
  const [isClient, setIsClient] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setIsClient(true);
    (async () => {
      const mainModule = await import('./main');
      mainModule.initialize();
    })();

    // Access user's webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          const userVideo = document.getElementById('userVideo') as HTMLVideoElement;
          if (userVideo) {
            userVideo.srcObject = stream;
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleSpeak = async (text: string) => {
    const userInput = document.getElementById('userInput') as HTMLInputElement;
    if (text) {
      userInput.value = text;
      // Logic to send the text to the AI
    }
  };

  const handleEndSession = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
    // Additional logic for ending the call
  };

  const handleStartSession = () => {
    SpeechRecognition.startListening({ continuous: true });
    // Additional logic for starting the call
  };

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.error('Browser does not support speech recognition.');
      return;
    }

    if (transcript) {
      // Send the transcript to the AI when speech input stops
      const timeoutId = setTimeout(() => {
        handleSpeak(transcript);
        resetTranscript();
      }, 3000); // Adjust the timeout duration as needed

      return () => clearTimeout(timeoutId);
    }
  }, [transcript]);

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <main
        className="container"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1 style={{ paddingBottom: '20px' }}>Your HomeFree AI Friend</h1>

        <article style={{ position: 'relative', width: 'fit-content' }}>
          {isClient && (
            <>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video id="avatarVideo" autoPlay playsInline>
              </video>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                id="userVideo"
                autoPlay
                playsInline
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '10px',
                  border: '2px solid #000',
                  objectFit: 'cover', // Ensure the video covers the entire area
                }}
              />
            </>
          )}
        </article>

        {/* Controls Section */}
        <section>
          <section
            role="group"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '300px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <button id="startSession" onClick={handleStartSession} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <FaPhone size={24} color="green" />
            </button>
            <button id="endSession" onClick={handleEndSession} disabled style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <FaPhoneSlash size={24} color="red" />
            </button>
            <button id="speakButton" type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <FaMicrophone size={24} color="blue" />
            </button>
          </section>

          <section role="group">
            <input
              type="text"
              id="userInput"
              placeholder="Type something to talk to the avatar..."
              aria-label="User input"
            />
          </section>
        </section>
      </main>
    </>
  );
};

export default DashboardIndexPage;
