const audioPlayer = document.getElementById('quran-audio');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const surahSelect = document.getElementById('surah-select');
const audioFileInput = document.getElementById('audio-file');

playBtn.addEventListener('click', () => {
  audioPlayer.play();
});

pauseBtn.addEventListener('click', () => {
  audioPlayer.pause();
});

stopBtn.addEventListener('click', () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
});

surahSelect.addEventListener('change', () => {
  const selectedSurah = surahSelect.value;
  if (selectedSurah) {
    audioPlayer.src = selectedSurah;
  }
});

audioFileInput.addEventListener('change', () => {
  const file = audioFileInput.files[0];
  if (file) {
    audioPlayer.src = URL.createObjectURL(file);
  }
});