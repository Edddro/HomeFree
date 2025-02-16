import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
} from '@heygen/streaming-avatar';

let avatar: StreamingAvatar | null = null;
let sessionData: any = null;

// Helper function to fetch access token
async function fetchAccessToken(): Promise<string> {
  const response = await fetch(
    'https://api.heygen.com/v1/streaming.create_token',
    {
      method: 'POST',
      headers: { 'x-api-key': 'api' },
    },
  );

  const { data } = await response.json();
  return data.token;
}

// Initialize streaming avatar session
async function initializeAvatarSession() {
  const token = await fetchAccessToken();
  avatar = new StreamingAvatar({ token });

  sessionData = await avatar.createStartAvatar({
    quality: AvatarQuality.High,
    avatarName: 'default',
  });

  // Enable end button and disable start button
  const endButton = document.getElementById('endSession') as HTMLButtonElement;
  const startButton = document.getElementById('startSession') as HTMLButtonElement;
  endButton.disabled = false;
  startButton.disabled = true;

  avatar.on(StreamingEvents.STREAM_READY, handleStreamReady);
  avatar.on(StreamingEvents.STREAM_DISCONNECTED, handleStreamDisconnected);
}

// Handle when avatar stream is ready
function handleStreamReady(event: any) {
  const videoElement = document.getElementById('avatarVideo') as HTMLVideoElement;
  if (event.detail && videoElement) {
    videoElement.srcObject = event.detail;
    videoElement.onloadedmetadata = () => {
      videoElement.play().catch(console.error);
    };
  } else {
    console.error('Stream is not available');
  }
}

// Handle stream disconnection
function handleStreamDisconnected() {
  const videoElement = document.getElementById('avatarVideo') as HTMLVideoElement;
  if (videoElement) {
    videoElement.srcObject = null;
  }

  // Enable start button and disable end button
  const startButton = document.getElementById('startSession') as HTMLButtonElement;
  const endButton = document.getElementById('endSession') as HTMLButtonElement;
  startButton.disabled = false;
  endButton.disabled = true;
}

// End the avatar session
async function terminateAvatarSession() {
  if (!avatar || !sessionData) {
    return;
  }

  await avatar.stopAvatar();
  const videoElement = document.getElementById('avatarVideo') as HTMLVideoElement;
  videoElement.srcObject = null;
  avatar = null;
}

// Handle speaking event
async function handleSpeak() {
  const userInput = document.getElementById('userInput') as HTMLInputElement;
  if (avatar && userInput.value) {
    await avatar.speak({
      text: userInput.value,
    });
    userInput.value = ''; // Clear input after speaking
  }
}

// Event listeners for buttons
function initializeEventListeners() {
  const startButton = document.getElementById('startSession') as HTMLButtonElement;
  const endButton = document.getElementById('endSession') as HTMLButtonElement;
  const speakButton = document.getElementById('speakButton') as HTMLButtonElement;

  startButton.addEventListener('click', initializeAvatarSession);
  endButton.addEventListener('click', terminateAvatarSession);
  speakButton.addEventListener('click', handleSpeak);
}

// Export the initialization function
export function initialize() {
  initializeEventListeners();
}
