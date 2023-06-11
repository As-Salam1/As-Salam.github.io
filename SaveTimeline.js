const audioPlayer = document.getElementById('quran-audio');
  const surahSelect = document.getElementById('surah-select');
  const saveTimelineBtn = document.getElementById('save-timeline-btn');
  const continueSurahBtn = document.getElementById('continue-surah-btn');

  // Load the saved surah and timeline from localStorage, if available
  const savedSurah = localStorage.getItem('surah');
  const savedTimeline = localStorage.getItem('timeline');

  if (savedSurah) {
    // Set the selected surah from localStorage
    surahSelect.value = savedSurah;

    // Set the audio source to the saved surah URL
    audioPlayer.src = savedSurah;

    // If a saved timeline exists, set the playback time
    if (savedTimeline) {
      audioPlayer.currentTime = savedTimeline;
    }
  }

  // Event listeners for the audio player controls
  playBtn.addEventListener('click', () => audioPlayer.play());
  pauseBtn.addEventListener('click', () => audioPlayer.pause());
  stopBtn.addEventListener('click', () => {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  });

  // Event listener for the "Save Timeline" button
  saveTimelineBtn.addEventListener('click', () => {
    localStorage.setItem('surah', surahSelect.value);
    localStorage.setItem('timeline', audioPlayer.currentTime);
  });

  // Event listener for the "Continue from Last Surah" button
  continueSurahBtn.addEventListener('click', () => {
    const savedSurah = localStorage.getItem('surah');
    const savedTimeline = localStorage.getItem('timeline');

    if (savedSurah) {
      surahSelect.value = savedSurah;
      audioPlayer.src = savedSurah;

      if (savedTimeline) {
        audioPlayer.currentTime = savedTimeline;
      }

      audioPlayer.play();
    }
  });