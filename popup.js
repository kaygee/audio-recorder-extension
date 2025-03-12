let mediaRecorder;
let audioChunks = [];
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const audio = document.getElementById('audio');

startButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      audio.src = audioUrl;
      audioChunks = [];
    };

    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error('Error accessing microphone:', error);
  }
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
  startButton.disabled = false;
  stopButton.disabled = true;
});
