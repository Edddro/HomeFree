import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
} from '@heygen/streaming-avatar';
import { CohereClientV2 } from 'cohere-ai';

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

const cohere = new CohereClientV2({
  token: 'api',
});
(async () => {
  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: 'I am in a potentially dangerous situation. Please help me navigate this to the best of your ability, and help me calm down as needed.',
      },
    ],
  });
  return response?.message?.content || 'Can you please repeat that?';
})();

// Helper function to send text to Cohere
async function sendToCohere(text: string): Promise<string> {
  const textFinal = `I am in a potentially dangerous situation. Please help me navigate this to the best of your ability, and help me calm down as needed. ${text}`;
  const response = await cohere.chat({
    model: 'command-r-plus',
    messages: [
      {
        role: 'user',
        content: textFinal,
      },
    ],
  });
  const content = response?.message?.content?.[0]?.text;
  return content ?? 'Can you please repeat that?';
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
    // Send text to Cohere and get the response
    const cohereResponse = await sendToCohere(userInput.value);

    // Send the Cohere response to the avatar
    await avatar.speak({
      text: cohereResponse,
      task_type: TaskType.REPEAT,
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
