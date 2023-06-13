// Retrieve the saved data from local storage
const savedSurahs = JSON.parse(localStorage.getItem('savedSurahs'));

// Display saved surahs and timelines
if (savedSurahs && savedSurahs.length > 0) {
  const savedSurahDropdownContainer = document.querySelector('.saved-surah-dropdown-container');

  savedSurahs.forEach((surah) => {
    const savedSurahDropdown = document.createElement('div');
    savedSurahDropdown.classList.add('saved-surah-dropdown');

    const savedSurahSelect = document.createElement('select');
    savedSurahSelect.disabled = true;

    const savedSurahOption = document.createElement('option');
    savedSurahOption.value = surah.value;
    savedSurahOption.textContent = surah.name;
    savedSurahSelect.appendChild(savedSurahOption);

    const savedTimelineSpan = document.createElement('span');
    savedTimelineSpan.textContent = `Last played timeline: ${surah.timeline.toFixed(2)} seconds`;

    savedSurahDropdown.appendChild(savedSurahSelect);
    savedSurahDropdown.appendChild(savedTimelineSpan);

    savedSurahDropdownContainer.appendChild(savedSurahDropdown);
  });
}

// Save button click event
document.getElementById('save-btn').addEventListener('click', function() {
  const selectedSurah = document.getElementById('surah-select').value;
  const surahName = document.getElementById('surah-select').options[document.getElementById('surah-select').selectedIndex].text;
  const currentTimeline = document.getElementById('quran-audio').currentTime;

  let savedSurahs = JSON.parse(localStorage.getItem('savedSurahs')) || [];

  const surahData = {
    value: selectedSurah,
    name: surahName,
    timeline: currentTimeline
  };

  savedSurahs.push(surahData);

  localStorage.setItem('savedSurahs', JSON.stringify(savedSurahs));
});

// View Saved Surahs button click event
document.getElementById('view-saved-btn').addEventListener('click', function() {
  const savedSurahs = JSON.parse(localStorage.getItem('savedSurahs'));

  if (savedSurahs && savedSurahs.length > 0) {
    const savedSurahDropdownContainer = document.querySelector('.saved-surah-dropdown-container');

    // Clear any existing content
    savedSurahDropdownContainer.innerHTML = '';

    savedSurahs.forEach((surah) => {
      const savedSurahDropdown = document.createElement('div');
      savedSurahDropdown.classList.add('saved-surah-dropdown');

      const savedSurahSelect = document.createElement('select');
      savedSurahSelect.disabled = true;

      const savedSurahOption = document.createElement('option');
      savedSurahOption.value = surah.value;
      savedSurahOption.textContent = surah.name;
      savedSurahSelect.appendChild(savedSurahOption);

      const savedTimelineSpan = document.createElement('span');
      savedTimelineSpan.textContent = `Last played timeline: ${surah.timeline.toFixed(2)} seconds`;

      savedSurahDropdown.appendChild(savedSurahSelect);
      savedSurahDropdown.appendChild(savedTimelineSpan);

      savedSurahDropdownContainer.appendChild(savedSurahDropdown);
    });
  } else {
    // No saved surahs found
    alert('No saved surahs found.');
  }
});