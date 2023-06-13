
  // Retrieve the saved data from local storage
  const savedSurahs = JSON.parse(localStorage.getItem('savedSurahs')) || [];

  // Set the selected surah and timeline in the dropdown and audio player
  if (savedSurahs.length > 0) {
    const lastSavedSurah = savedSurahs[savedSurahs.length - 1];
    document.getElementById('surah-select').value = lastSavedSurah.surah;
    document.getElementById('quran-audio').currentTime = lastSavedSurah.timeline;
  }

  // Save button click event
  document.getElementById('save-btn').addEventListener('click', function() {
    const selectedSurah = document.getElementById('surah-select').value;
    const currentTimeline = document.getElementById('quran-audio').currentTime;

    // Check if the surah is already saved
    const existingSurahIndex = savedSurahs.findIndex(surah => surah.surah === selectedSurah);

    if (existingSurahIndex === -1) {
      // Create a new saved surah object
      const savedSurah = {
        surah: selectedSurah,
        timeline: currentTimeline
      };

      savedSurahs.push(savedSurah);
    } else {
      // Update the timeline of the existing saved surah
      savedSurahs[existingSurahIndex].timeline = currentTimeline;
    }

    // Save the updated surahs array to local storage
    localStorage.setItem('savedSurahs', JSON.stringify(savedSurahs));

    // Create a new dropdown for saved surahs
    createSavedSurahDropdown(savedSurahs);
  });

  // Delete button click event
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
      const surahId = event.target.getAttribute('data-surah-id');
      const surahIndex = savedSurahs.findIndex(surah => surah.surah === surahId);

      if (surahIndex !== -1) {
        savedSurahs.splice(surahIndex, 1);
        localStorage.setItem('savedSurahs', JSON.stringify(savedSurahs));
        createSavedSurahDropdown(savedSurahs);
      }
    }
  });

  // Function to create the saved surah dropdown
  function createSavedSurahDropdown(savedSurahs) {
    const dropdownContainer = document.querySelector('.saved-surah-dropdown-container');
    dropdownContainer.innerHTML = '';

    if (savedSurahs.length > 0) {
      const dropdown = document.createElement('select');
      dropdown.id = 'saved-surah-select';

      savedSurahs.forEach((savedSurah, index) => {
        const option = document.createElement('option');
        option.value = savedSurah.surah;
        option.textContent = `Surah ${savedSurah.surah} (${formatTime(savedSurah.timeline)})`;
        dropdown.appendChild(option);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('data-surah-id', savedSurah.surah);
        dropdown.appendChild(deleteBtn);
      });

      dropdownContainer.appendChild(dropdown);
    }
  }

  // Function to format the time in minutes and seconds
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Create the initial saved surah dropdown
  createSavedSurahDropdown(savedSurahs);