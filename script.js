document.addEventListener("DOMContentLoaded", function () {
    
    document.addEventListener("DOMContentLoaded", async function () {
        const quranParts = await fetchQuranParts();
        console.log(quranParts); // Check if data loads
    });
    
    // Date setup
    const today = new Date();
    const hijriDate = new Intl.DateTimeFormat("ar-TN-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(today);
    
    document.getElementById("date").innerHTML = `📆 ${hijriDate} - ${today.toLocaleDateString("ar-EG")}`;

    // Calculate current Ramadan day based on start date
    const ramadanStartDate = new Date('2025-03-02'); // March 2, 2025
    const daysDiff = Math.floor((today - ramadanStartDate) / (1000 * 60 * 60 * 24)) + 1;
    const currentRamadanDay = daysDiff > 0 && daysDiff <= 30 ? daysDiff : 1;

    // Ramadan Calendar
    const calendar = document.getElementById("ramadan-calendar");
    for (let i = 1; i <= 30; i++) {
        const day = document.createElement("div");
        day.classList.add("calendar-day");
        day.textContent = i;
        if (i === currentRamadanDay) day.classList.add("today");
        if (i < currentRamadanDay) day.classList.add("past-day");
        if (i > currentRamadanDay) day.classList.add("future-day");
        calendar.appendChild(day);
    }

    // Add this to your script.js file, inside the document.addEventListener("DOMContentLoaded", function () { ... })

// Daily Dua functionality
function setupDailyDua() {
    // Array of daily duas for each day of Ramadan
    const ramadanDuas = [
        
            {
                day: 1,
                text: "اَللّـهُمَّ اجْعَلْ صِيامي فيهِ صِيامَ الصّائِمينَ، وَقِيامي فيهِ قيامَ الْقائِمينَ، وَنَبِّهْني فيهِ عَنْ نَوْمَةِ الْغافِلينَ، وَهَبْ لى جُرْمي فيهِ يا اِلـهَ الْعالَمينَ، وَاعْفُ عَنّي يا عافِياً عَنْ الُْمجْرِمينَ."
            },
            {
                day: 2,
                text: "اَللّـهُمَّ قَرِّبْني فيهِ اِلى مَرْضاتِكَ، وَجَنِّبْني فيهِ مِنْ سَخَطِكَ وَنَقِماتِكَ، وَوَفِّقْني فيهِ لِقِرآءَةِ ايـاتِكَ بِرَحْمَتِكَ يا اَرْحَمَ الرّاحِمينَ."
            },
            {
                day: 3,
                text: "اَللّـهُمَّ ارْزُقْني فيهِ الذِّهْنَ وَالتَّنْبيهَ، وَباعِدْني فيهِ مِنَ السَّفاهَةِ وَالَّتمْويهِ، وَاجْعَلْ لى نَصيباً مِنْ كُلِّ خَيْر تُنْزِلُ فيهِ، بِجُودِكَ يا اَجْوَدَ الاَْجْوَدينَ."
            },
            {
                day: 4,
                text: "اَللّـهُمَّ قَوِّني فيهِ عَلى اِقامَةِ اَمْرِكَ، وَاَذِقْني فيهِ حَلاوَةَ ذِكْرِكَ، وَاَوْزِعْني فيهِ لاَِداءِ شُكْرِكَ بِكَرَمِكَ، وَاحْفَظْني فيهِ بِحِفْظِكَ وَسَتْرِكَ، يا اَبْصَرَ النّاظِرينَ."
            },
            {
                day: 5,
                text: "اَللّـهُمَّ اجْعَلْني فيهِ مِنْ الْمُسْتَغْفِرينَ، وَاجْعَلْني فيهِ مِنْ عِبادِكَ الصّالِحينَ اْلقانِتينَ، وَاجْعَلني فيهِ مِنْ اَوْلِيائِكَ الْمُقَرَّبينَ، بِرَأْفَتِكَ يا اَرْحَمَ الرّاحِمينَ."
            },
            {
                day: 6,
                text: "اَللّـهُمَّ لا تَخْذُلْني فيهِ لِتَعَرُّضِ مَعْصِيَتِكَ، وَلاتَضْرِبْني بِسِياطِ نَقِمَتِكَ، وَزَحْزِحْني فيهِ مِنْ مُوجِباتِ سَخَطِكَ، بِمَنِّكَ وَاَياديكَ يا مُنْتَهى رَغْبَةِ الرّاغِبينَ."
            },
            {
                day: 7,
                text: "اَللّـهُمَّ اَعِنّي فِيهِ عَلى صِيامِهِ وَقِيامِهِ، وَجَنِّبْني فيهِ مِنْ هَفَواتِهِ وَآثامِهِ، وَارْزُقْني فيهِ ذِكْرَكَ بِدَوامِهِ، بِتَوْفيقِكَ يا هادِيَ الْمُضِلّينَ."
            },
            {
                day: 8,
                text: "اَللّـهُمَّ ارْزُقْني فيهِ رَحْمَةَ الاَْيْتامِ، وَاِطْعامَ اَلطَّعامِ، وَاِفْشاءَ السَّلامِ، وَصُحْبَةَ الْكِرامِ، بِطَولِكَ يا مَلْجَاَ الاْمِلينَ."
            },
            {
                day: 9,
                text: "اَللّـهُمَّ اجْعَلْ لي فيهِ نَصيباً مِنْ رَحْمَتِكَ الْواسِعَةِ، وَاهْدِني فيهِ لِبَراهينِكَ السّاطِعَةِ، وَخُذْ بِناصِيَتي اِلى مَرْضاتِكَ الْجامِعَةِ، بِمَحَبَّتِكَ يا اَمَلَ الْمُشْتاقينَ."
            },
            {
                day: 10,
                text: "اَللّـهُمَّ اجْعَلْني فيهِ مِنَ الْمُتَوَكِّلينَ عَلَيْكَ، وَاجْعَلْني فيهِ مِنَ الْفائِزينَ لَدَيْكَ، وَاجْعَلْني فيهِ مِنَ الْمُقَرَّبينَ اِلَيْكَ، بِاِحْسانِكَ يا غايَةَ الطّالِبينَ."
            },
        
        
            {
                day: 11,
                text: "اَللّـهُمَّ حَبِّبْ اِلَيَّ فيهِ الاِْحْسانَ، وَكَرِّهْ اِلَيَّ فيهِ الْفُسُوقَ وَالْعِصْيانَ، وَحَرِّمْ عَلَيَّ فيهِ السَّخَطَ وَالنّيرانَ بِعَوْنِكَ يا غِياثَ الْمُسْتَغيثينَ."
            },
            {
                day: 12,
                text: "اَللّـهُمَّ زَيِّنّي فيهِ بِالسِّتْرِ وَالْعَفافِ، وَاسْتُرْني فيهِ بِلِباسِ الْقُنُوعِ وَالْكَفافِ، وَاحْمِلْني فيهِ عَلَى الْعَدْلِ وَالاِْنْصافِ، وَآمِنّي فيهِ مِنْ كُلِّ ما اَخافُ، بِعِصْمَتِكَ يا عِصْمَةَ الْخائِفينَ."
            },
            {
                day: 13,
                text: "اَللّـهُمَّ طَهِّرْني فيهِ مِنَ الدَّنَسِ وَالاَْقْذارِ، وَصَبِّرْني فيهِ عَلى كائِناتِ الاَْقْدارِ، وَوَفِّقْني فيهِ لِلتُّقى وَصُحْبَةِ الاَْبْرارِ، بِعَوْنِكَ يا قُرَّةَ عَيْنِ الْمَساكينَ."
            },
            {
                day: 14,
                text: "اَللّـهُمَّ لا تُؤاخِذْني فيهِ بِالْعَثَراتِ، وَاَقِلْني فيهِ مِنَ الْخَطايا وَالْهَفَواتِ، وَلا تَجْعَلْني فيهِ غَرَضاً لِلْبَلايا وَالاْفاتِ، بِعِزَّتِكَ يا عِزَّ الْمُسْلِمينَ."
            },
            {
                day: 15,
                text: "اَللّـهُمَّ ارْزُقْني فيهِ طاعَةَ الْخاشِعينَ، وَاشْرَحْ فيهِ صَدْري بِاِنابَةِ الُْمخْبِتينَ، بِاَمانِكَ يا اَمانَ الْخائِفينَ."
            },
            {
                day: 16,
                text: "اَللّـهُمَّ وَفِّقْني فيهِ لِمُوافَقَةِ الاَْبْرارِ، وَجَنِّبْني فيهِ مُرافَقَةَ الاَْشْرارِ، وَآوِني فيهِ بِرَحْمَتِكَ اِلى دارِ الْقَـرارِ، بِاِلهِيَّتِكَ يا اِلـهَ الْعالَمينَ."
            },
            {
                day: 17,
                text: "اَللّـهُمَّ اهْدِني فيهِ لِصالِحِ الاَْعْمالِ، وَاقْضِ لي فيهِ الْحَوائِجَ وَالاْمالَ، يا مَنْ لا يَحْتاجُ اِلَى التَّفْسيرِ وَالسُّؤالِ، يا عالِماً بِما في صُدُورِ الْعالَمينَ، صَلِّ عَلى مُحَمَّد وَآلِهِ الطّاهِرينَ."
            },
            {
                day: 18,
                text: "اَللّـهُمَّ نَبِّهْني فيهِ لِبَرَكاتِ اَسْحارِهِ، وَنَوِّرْ فيهِ قَلْبي بِضياءِ اَنْوارِهِ، وَخُذْ بِكُلِّ اَعْضائي اِلَى اتِّباعِ آثارِهِ، بِنُورِكَ يا مُنَوِّرَ قُلُوبِ الْعارِفينَ."
            },
            {
                day: 19,
                text: "اَللّـهُمَّ وَفِّرْ فيهِ حَظّي مِنْ بَرَكاتِهِ، وَسَهِّلْ سَبيلي اِلى خَيْراتِهِ، وَلا تَحْرِمْني قَبُولَ حَسَناتِهِ، يا هادِياً اِلَى الْحَقِّ الْمُبينِ."
            },
            {
                day: 20,
                text: "اَللّـهُمَّ افْتَحْ لي فيهِ اَبْوابَ الْجِنانِ، وَاَغْلِقْ عَنّي فيهِ اَبْوابَ النّيرانِ، وَوَفِّقْني فيهِ لِتِلاوَةِ الْقُرْآنِ، يا مُنْزِلَ السَّكينَةِ فى قُلُوبِ الْمُؤْمِنينَ."
            },
            {
                day: 21,
                text: "اَللّـهُمَّ اجْعَلْ لى فيهِ اِلى مَرْضاتِكَ دَليلاً، وَلا تَجْعَلْ لِلشَّيْطانِ فيهِ عَلَيَّ سَبيلاً، وَاجْعَلِ الْجَنَّةَ لى مَنْزِلاً وَمَقيلاً، يا قاضِيَ حَوائِجِ الطّالِبينَ."
            },
            {
                day: 22,
                text: "اَللّـهُمَّ افْتَحْ لى فيهِ اَبْوابَ فَضْلِكَ، وَاَنْزِلْ عَلَيَّ فيهِ بَرَكاتِكَ، وَوَفِّقْني فيهِ لِمُوجِباتِ مَرْضاتِكَ، وَاَسْكِنّي فيهِ بُحْبُوحاتِ جَنّاتِكَ، يا مُجيبَ دَعْوَةِ الْمُضْطَرّينَ."
            },
            {
                day: 23,
                text: "اَللّـهُمَّ اغْسِلْني فيهِ مِنَ الذُّنُوبِ، وَطَهِّرْني فيهِ مِنَ الْعُيُوبِ، وَامْتَحِنْ قَلْبي فيهِ بِتَقْوَى الْقُلُوبِ، يا مُقيلَ عَثَراتِ الْمُذْنِبينَ."
            },
            {
                day: 24,
                text: "اَللّـهُمَّ اِنّي اَسْأَلُكَ فيهِ ما يُرْضيكَ، وَاَعُوذُبِكَ مِمّا يُؤْذيكَ، وَاَسْأَلُكَ التَّوْفيقَ فيهِ لاَِنْ اُطيعَكَ وَلا اَعْصيْكَ، يا جَوادَ السّائِلينَ."
            },
            {
                day: 25,
                text: "اَللّـهُمَّ اجْعَلْني فيهِ مُحِبَّاً لاَِوْلِيائِكَ، وَمُعادِياً لاَِعْدائِكَ، مُسْتَنّاً بِسُنَّةِ خاتَمِ اَنْبِيائِكَ، يا عاصِمَ قُلُوبِ النَّبِيّينَ."
            },
            {
                day: 26,
                text: "اَللّـهُمَّ اجْعَلْ سَعْيي فيهِ مَشْكُوراً، وَذَنْبي فيهِ مَغْفُوراً وَعَمَلي فيهِ مَقْبُولاً، وَعَيْبي فيهِ مَسْتُوراً، يا اَسْمَعَ السّامِعينَ."
            },
            {
                day: 27,
                text: "اَللّـهُمَّ ارْزُقْني فيهِ فَضْلَ لَيْلَةِ الْقَدْرِ، وَصَيِّرْ اُمُوري فيهِ مِنَ الْعُسْرِ اِلَى الْيُسْرِ، وَاقْبَلْ مَعاذيري، وَحُطَّ عَنّيِ الذَّنْبَ وَالْوِزْرَ، يا رَؤوفاً بِعِبادِهِ الصّالِحينَ."
            },
            {
                day: 28,
                text: "اَللّـهُمَّ وَفِّرْ حَظّي فيهِ مِنَ النَّوافِلِ، وَاَكْرِمْني فيهِ بِاِحْضارِ الْمَسائِلِ، وَقَرِّبْ فيهِ وَسيلَتى اِلَيْكَ مِنْ بَيْنِ الْوَسائِلِ، يا مَنْ لا يَشْغَلُهُ إِلْحاحُ الْمُلِحّينَ."
            },
            {
                day: 29,
                text: "اَللّـهُمَّ غَشِّني فيهِ بِالرَّحْمَةِ، وَارْزُقْني فيهِ التَّوْفيقَ وَالْعِصْمَةَ، وَطَهِّرْ قَلْبي مِنْ غَياهِبِ التُّهْمَةِ، يا رَحيماً بِعِبادِهِ الْمُؤْمِنينَ."
            },
            {
                day: 30,
                text: "اَللّـهُمَّ اجْعَلْ صِيامى فيهِ بِالشُّكْرِ وَالْقَبُولِ عَلى ما تَرْضاهُ وَيَرْضاهُ الرَّسُولُ، مُحْكَمَةً فُرُوعُهُ بِالاُْصُولِ، بِحَقِّ سَيِّدِنا مُحَمَّد وَآلِهِ الطّاهِرينَ، وَالْحَمْدُ للهِ رَبِّ الْعالَمينَ."
            }
    ];

    const duaDateElement = document.getElementById('dua-date');
    const duaTextElement = document.getElementById('dua-text');
    const prevDuaButton = document.getElementById('prev-dua');
    const nextDuaButton = document.getElementById('next-dua');
    
    // Function to display dua for a specific day
    function displayDua(day) {
        // Ensure day is between 1 and 30
        if (day < 1) day = 30;
        if (day > 30) day = 1;
        
        const dua = ramadanDuas[day - 1];
        duaDateElement.textContent = `اليوم ${dua.day} من رمضان`;
        duaTextElement.textContent = dua.text;
        
        // Save the current day to localStorage
        localStorage.setItem('currentDuaDay', day);
    }
    
    // Get the initial day to display
    let currentDuaDay;
    
    // Try to get the day from localStorage first
    const savedDay = localStorage.getItem('currentDuaDay');
    if (savedDay) {
        currentDuaDay = parseInt(savedDay);
    } else {
        // Otherwise, use the current Ramadan day if we're in Ramadan
        currentDuaDay = daysDiff > 0 && daysDiff <= 30 ? daysDiff : 1;
    }
    
    // Display the initial dua
    displayDua(currentDuaDay);
    
    // Set up event listeners for navigation buttons
    prevDuaButton.addEventListener('click', function() {
        currentDuaDay--;
        if (currentDuaDay < 1) currentDuaDay = 30;
        displayDua(currentDuaDay);
    });
    
    nextDuaButton.addEventListener('click', function() {
        currentDuaDay++;
        if (currentDuaDay > 30) currentDuaDay = 1;
        displayDua(currentDuaDay);
    });
    
    // Allow clicking on calendar days to show dua for that day
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            const selectedDay = parseInt(this.textContent);
            currentDuaDay = selectedDay;
            displayDua(currentDuaDay);
            
            // Scroll to the dua section
            document.querySelector('.daily-dua').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });
}

// Call the function to set up daily dua functionality
setupDailyDua();




    // Quran Parts YouTube Links
    const youtubePlaylist = [
        "https://www.youtube.com/watch?v=CFi6LLvN79Y&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=1&t=1774s&pp=iAQB",
        "https://www.youtube.com/watch?v=TlVjfJe6I-8&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=2&t=12s&pp=iAQB",
        "https://www.youtube.com/watch?v=Ne1-zYYNkns&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=3&pp=iAQB",
        "https://www.youtube.com/watch?v=4cFFoMOprSg&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=4&pp=iAQB",
        "https://www.youtube.com/watch?v=gOBOuMZE3_8&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=5&pp=iAQB",
        "https://www.youtube.com/watch?v=SC5r8E58_0g&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=6&pp=iAQB",
        "https://www.youtube.com/watch?v=vYTLu6ksNUs&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=7&pp=iAQB",
        "https://www.youtube.com/watch?v=8KNi-WFQu3A&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=8&pp=iAQB",
        "https://www.youtube.com/watch?v=7F-wVaWD9zI&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=9&pp=iAQB",
        "https://www.youtube.com/watch?v=5qNPZi99Rtg&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=10&pp=iAQB",
        "https://www.youtube.com/watch?v=kQAd9U363aI&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=11&pp=iAQB",
        "https://www.youtube.com/watch?v=hLq9NSuB06g&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=12&pp=iAQB",
        "https://www.youtube.com/watch?v=QUfdmDjM4rk&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=13&pp=iAQB",
        "https://www.youtube.com/watch?v=DLr3PQMckqs&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=14&pp=iAQB",
        "https://www.youtube.com/watch?v=NUOAeu70IEI&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=15&pp=iAQB",
        "https://www.youtube.com/watch?v=N0UHhGvHDQc&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=16&pp=iAQB",
        "https://www.youtube.com/watch?v=d-IT04XSycA&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=17&pp=iAQB",
        "https://www.youtube.com/watch?v=R1NIuXyyPW0&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=18&pp=iAQB",
        "https://www.youtube.com/watch?v=Q928AJoRq4Q&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=19&pp=iAQB",
        "https://www.youtube.com/watch?v=utUWhUev8Pw&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=20&pp=iAQB",
        "https://www.youtube.com/watch?v=fhHGkkLKo8Y&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=21&pp=iAQB",
        "https://www.youtube.com/watch?v=l8L7cSKSXt4&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=22&pp=iAQB",
        "https://www.youtube.com/watch?v=9dbt008B8_E&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=23&pp=iAQB",
        "https://www.youtube.com/watch?v=SEcNwi_N4qg&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=24&pp=iAQB",
        "https://www.youtube.com/watch?v=TPkDTo9XrG0&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=25&pp=iAQB",
        "https://www.youtube.com/watch?v=VcvfLwd863w&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=26&pp=iAQB", 
        "https://www.youtube.com/watch?v=Pe5Ozt8P69Q&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=28&pp=iAQB",
        "https://www.youtube.com/watch?v=CPpFN2Asml0&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=29&pp=iAQB",
        "https://www.youtube.com/watch?v=IWZ6fgg9aBs&list=PLy6BFpVE0wH6SNP3uvhUIjT5nh23TdBtQ&index=30&pp=iAQB"
    ];

    // Initialize or load state from localStorage
    let quranPartsState = {};
    let khatmaCount = 0;
    
    // Load saved state if it exists
    if (localStorage.getItem('quranPartsState')) {
        quranPartsState = JSON.parse(localStorage.getItem('quranPartsState'));
    }
    
    // Load khatma count if it exists
    if (localStorage.getItem('khatmaCount')) {
        khatmaCount = parseInt(localStorage.getItem('khatmaCount'));
    }
    
    // Update the Khatma counter display
    document.getElementById("completion-count").textContent = khatmaCount;

    // Quran Parts Section
    const list = document.getElementById("list");
    list.innerHTML = ''; // Clear existing items if any
    
    for (let i = 1; i <= 30; i++) {
        let li = document.createElement("li");
        li.className = "quran-part-item";
        li.dataset.part = i;
        
        // Set classes based on saved state
        if (quranPartsState[i] && quranPartsState[i].reserved) {
            li.classList.add("reserved");
        }
        if (quranPartsState[i] && quranPartsState[i].read) {
            li.classList.add("read");
        }
        
        const partContent = `
            <div class="part-info">
                <span class="part-number">جزء ${i}</span>
            </div>
            <div class="part-actions">
                <label class="checkbox-container">
                    محجوز
                    <input type="checkbox" class="reserve-checkbox" ${quranPartsState[i] && quranPartsState[i].reserved ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <label class="checkbox-container">
                    مقروء
                    <input type="checkbox" class="read-checkbox" ${quranPartsState[i] && quranPartsState[i].read ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <a href="${youtubePlaylist[i-1]}" target="_blank" class="youtube-link">
                    <img src="youtube-icon.png" alt="YouTube" class="youtube-icon">
                </a>
            </div>
        `;
        
        li.innerHTML = partContent;
        list.appendChild(li);
    }

    // Setup event listeners for all checkboxes
    setupCheckboxListeners();
    
    // Setup WhatsApp functionality
    setupWhatsAppFunctionality();
    
    // Setup filter buttons
    setupFilterButtons();
    
    // Setup reset counter functionality
    setupResetCounter();

    // Function to save quran state to localStorage
    function saveQuranState() {
        localStorage.setItem('quranPartsState', JSON.stringify(quranPartsState));
    }

    async function fetchQuranParts() {
        const response = await fetch("http://localhost:5000/quran-parts");
        return response.json();
    }
    
    async function updateQuranPart(partNumber, reserved, read) {
        await fetch("http://localhost:5000/update-part", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ partNumber, reserved, read })
        });
    }
    
    
    // Function to save Khatma count to localStorage
    function saveKhatmaCount() {
        localStorage.setItem('khatmaCount', khatmaCount.toString());
    }
    async function fetchCompletionCount() {
        const response = await fetch("http://localhost:5000/completion-count");
        const data = await response.json();
        document.getElementById("completion-count").textContent = data.count;
    }
    
    
    // Function to check if all parts are both reserved AND read
    function checkAllComplete() {
        // Check if all 30 parts are marked as both reserved AND read
        let allReservedAndRead = true;
        
        for (let i = 1; i <= 30; i++) {
            // If any part is not both reserved AND read, return false
            if (!quranPartsState[i] || !quranPartsState[i].reserved || !quranPartsState[i].read) {
                allReservedAndRead = false;
                break;
            }
        }
        
        // If all parts are both reserved AND read
        if (allReservedAndRead) {
            // Increment the Khatma counter
            khatmaCount++;
            
            // Save updated count
            saveKhatmaCount();
            
            // Update the counter display
            document.getElementById("completion-count").textContent = khatmaCount;
            
            // Reset all checkboxes
            resetAllCheckboxes();
            
            // Show a congratulatory message
            alert("🎉 مبارك! لقد أكملتم ختمة القرآن الكريم!");
        }
    }


    
    // Function to reset all checkboxes and update UI
    function resetAllCheckboxes() {
        // Reset state for all parts
        for (let i = 1; i <= 30; i++) {
            // Initialize part state if doesn't exist
            if (!quranPartsState[i]) {
                quranPartsState[i] = {};
            }
            
            // Set both read and reserved to false
            quranPartsState[i].read = false;
            quranPartsState[i].reserved = false;
        }
        
        // Save updated state
        saveQuranState();
        
        // Update UI - uncheck all checkboxes
        document.querySelectorAll('.read-checkbox, .reserve-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Remove classes from all items
        document.querySelectorAll('.quran-part-item').forEach(item => {
            item.classList.remove('read');
            item.classList.remove('reserved');
        });
    }
    
    // Setup checkbox event listeners
    function setupCheckboxListeners() {
        // Reserve checkboxes
        document.querySelectorAll('.reserve-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const partItem = this.closest('.quran-part-item');
                const partNumber = parseInt(partItem.dataset.part);
                
                // Initialize part state if doesn't exist
                if (!quranPartsState[partNumber]) {
                    quranPartsState[partNumber] = {};
                }
                
                // Update state
                quranPartsState[partNumber].reserved = this.checked;
                
                // Update UI class
                if (this.checked) {
                    partItem.classList.add('reserved');
                } else {
                    partItem.classList.remove('reserved');
                }
                
                // Save state and check if all complete
                saveQuranState();
                checkAllComplete();
            });
        });
        
        // Read checkboxes
        document.querySelectorAll('.read-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const partItem = this.closest('.quran-part-item');
                const partNumber = parseInt(partItem.dataset.part);
                
                // Initialize part state if doesn't exist
                if (!quranPartsState[partNumber]) {
                    quranPartsState[partNumber] = {};
                }
                
                // Update state
                quranPartsState[partNumber].read = this.checked;
                
                // Update UI class
                if (this.checked) {
                    partItem.classList.add('read');
                } else {
                    partItem.classList.remove('read');
                }
                
                // Save state and check if all complete
                saveQuranState();
                checkAllComplete();
            });
        });
    }
    
    // Setup WhatsApp functionality
    function setupWhatsAppFunctionality() {
        const modal = document.getElementById("password-modal");
        const passwordInput = document.getElementById("password-input");
        const whatsappIcon = document.getElementById("whatsapp-icon");
        
        if (!modal || !passwordInput || !whatsappIcon) {
            console.error("WhatsApp elements not found in the DOM");
            return;
        }
        
        const closeModalBtn = document.getElementById("close-modal-btn");
        const closeModalX = document.querySelector(".close-modal");
        const submitPasswordBtn = document.getElementById("password-submit-btn");

        // Function to open the modal
        function openPasswordModal() {
            modal.style.display = "block";
            passwordInput.focus();
        }

        // Function to close the modal
        function closeModal() {
            modal.style.display = "none";
            passwordInput.value = ""; // Clear input after closing
        }

        // Function to check password and redirect
        function checkPassword() {
            const password = passwordInput.value;
            if (password === "1234") {
                // Replace with your actual WhatsApp group link
                window.location.href = "https://chat.whatsapp.com/YOUR_GROUP_LINK";
            } else {
                alert("❌ كلمة المرور غير صحيحة! حاول مرة أخرى.");
            }
        }

        // Handle Enter key in password input
        passwordInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                checkPassword();
            }
        });

        // Attach event listeners
        whatsappIcon.addEventListener("click", openPasswordModal);
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener("click", closeModal);
        }
        
        if (closeModalX) {
            closeModalX.addEventListener("click", closeModal);
        }
        
        if (submitPasswordBtn) {
            submitPasswordBtn.addEventListener("click", checkPassword);
        }
        
        // Close modal when clicking outside
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    // Setup Reset Counter functionality
    function setupResetCounter() {
        const resetCounterBtn = document.getElementById("reset-counter-btn");
        const resetModal = document.getElementById("reset-counter-modal");
        const resetPasswordInput = document.getElementById("reset-password-input");
        const resetConfirmBtn = document.getElementById("reset-confirm-btn");
        const resetCancelBtn = document.getElementById("reset-cancel-btn");
        const closeResetModalX = document.querySelector(".close-reset-modal");

        if (!resetCounterBtn || !resetModal) {
            console.error("Reset counter elements not found in the DOM");
            return;
        }

        // Function to open the reset modal
        function openResetModal() {
            resetModal.style.display = "block";
            resetPasswordInput.value = ""; // Clear previous input
            resetPasswordInput.focus();
        }

        // Function to close the reset modal
        function closeResetModal() {
            resetModal.style.display = "none";
        }

        // Function to handle reset confirmation
        function confirmReset() {
            const password = resetPasswordInput.value;
            if (password === "4321") {
                // Reset the counter
                khatmaCount = 0;
                saveKhatmaCount();
                document.getElementById("completion-count").textContent = "0";
                
                // Close the modal
                closeResetModal();
                
                // Show success message
                alert("✅ تم إعادة تعيين عدد الختمات بنجاح!");
            } else {
                alert("❌ كلمة المرور غير صحيحة! حاول مرة أخرى.");
            }
        }

        // Handle Enter key in reset password input
        resetPasswordInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                confirmReset();
            }
        });

        // Attach event listeners
        resetCounterBtn.addEventListener("click", openResetModal);
        resetConfirmBtn.addEventListener("click", confirmReset);
        resetCancelBtn.addEventListener("click", closeResetModal);
        
        if (closeResetModalX) {
            closeResetModalX.addEventListener("click", closeResetModal);
        }
        
        // Close modal when clicking outside
        window.addEventListener("click", function(event) {
            if (event.target === resetModal) {
                closeResetModal();
            }
        });
    }
    
    // Setup filter buttons
    function setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        if (!filterButtons.length) {
            console.error("Filter buttons not found in the DOM");
            return;
        }
        
        const quranItems = document.querySelectorAll('.quran-part-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Apply filter
                quranItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else if (filter === 'reserved') {
                        item.style.display = item.classList.contains('reserved') ? 'flex' : 'none';
                    } else if (filter === 'read') {
                        item.style.display = item.classList.contains('read') ? 'flex' : 'none';
                    } else if (filter === 'not-selected') {
                        // Show items that are neither reserved nor read
                        item.style.display = (!item.classList.contains('reserved') && !item.classList.contains('read')) ? 'flex' : 'none';
                    }
                });
            });
        });
    }
});