export const useOverlay = () =>
  useState('overlay', () => {
    return {
      isOpen: false,
      type: '',
      page: ['', 0]
    }
  })

export function useEmotions () {
  return [
    {
      id: 1,
      name: 'joy',
      description:
        'Humans experience joy when they encounter a potential mate that they want to entice. This emotion ranges from serenity to ecstasy. A possible outcome is love.',
      prompts: [
        '<p>Write all verbs that come to your mind when you think of JOY.</p><p class="mt-5">When you run out of words look at the list of your partner and construct a spell from their writing.</p><p class="mt-5">Send this spell back to them.</p>',
        '<p>Think of your body as a factory, and your brain as the control center. How is JOY manufactured in your body? What thoughts and actions are part of the production process?</p><p class="mt-5">Write down the steps to produce JOY. Send them as instructions to each other.</p><p class="mt-5">How does your body respond these commands? Return a message to each other\'s control center.</p>',
        '<p>Close your eyes and sink into darkness.</p><p class="mt-5">Notice the feelings that are present in your body right now. Then visualize JOY like a beam of colored light entering your mind. Let it spread through your body.</p><p class="mt-5">Describe to each other how other emotional colors layer and mix with JOY. Take a trip through your emotional landscapes.</p><div class="text-left"><p class="mt-5">Mixtures of JOY:</p><p>+ Anticipation = Optimism</p><p>+ Trust = Love</p><p>+ Fear = Guilt</p><p>+ Anger = Pride</p><p>+ Surprise = Delight</p><p>+ Sadness = Morbidity</p></div>',
        '<p>How often do you experience JOY? How does it change in tempo and volume? What is its tone?</p><p class="mt-5">Discuss the aspects of life which produce patterns of JOY in your system.</p><p class="mt-5">Hum a melody that represents this rhythm of JOY.</p>',
        '<p>The heart tells you what you desire. Do you remember a moment it has jumped for JOY?</p><p class="mt-5">Close your eyes and lay your hand on your heart. Tell each other what gives you pleasure in life. How do you pursue it?</p><p class="mt-5">Laugh at each others pursuits until you are laughing from the heart.</p>',
        '<p>Look at each other’s faces.</p><p class="mt-5">Try to seduce and produce JOY in each other. Try until you catch a real smile.</p><p class="mt-5">A fake smile only moves the mouth. An authentic smile should be accompanied by wrinkles around the eyes.</p><p class="mt-5">Interpret the lines that mark your faces.</p>',
        '<p>Remember situations in which you were so affected by another person’s JOY that you forgot how you yourself were feeling.</p><p class="mt-5">Write a list of tools that could be used to infect others with JOY. Now try them on each other.</p>',
        '<p>Think of social situations in which you have to display JOY. Are you always expected to return a smile?</p><p class="mt-5">Pick a situation to rehearse smiling. Can you even produce real joy on demand?</p><p class="mt-5">While you perform JOY for your Accounterpart, consider the emotional labor you are investing in the exchange.</p>'
      ],
      say: [
        'gurgl',
        'mhmhh',
        'brrbrblllooo',
        'swttt',
        'trrrrrr',
        'mmmm ftttttt',
        'mmmhhh hmmmmm'
      ],
      hear: 4
    },
    {
      id: 2,
      name: 'trust',
      description:
        'Trust is experienced by humans when they encounter a group member whom they consider a friend. The emotion ranges from acceptance to admiration. It often leads to a need for affiliation.',
      prompts: [
        '<p>Words have power.</p><p class="mt-5">Write each other a list of promises and try to gain the other person’s TRUST.</p>',
        '<p>Think of a future event in which you trust beyond your reason.</p><p class="mt-5">One person chooses the role of TRUST. The other person chooses the role of reason. Write a dialog for the debate.</p><p class="mt-5">Stop when you agree who wins the argument.</p>',
        '<p>If you were to paint an image of TRUST, what objects would you depict? How would you render their shape, color, and texture?</p><p class="mt-5">Compare your mental paintings. Are there any objects that you share?</p><p class="mt-5">Do you associate your imagined objects with any of these mixtures?</p><div class="text-left"><p class="mt-5">Mixtures of TRUST</p><p>+ Joy = Love</p><p>+ Fear = Submission</p><p>+ Surprise = Curiosity</p><p>+ Anticipation = Fatalism</p><p>+ Sadness = Nostalgia</p><p>+ Anger = Domination</p></div>',
        '<p>When making hard decisions, you should TRUST your guts.</p><p class="mt-5">Lay on your back and close your eyes. Put your hand on your stomach. Talk about a decision you need to make, that has no easy answer.</p><p class="mt-5">What do your guts tell you?</p>',
        '<p>Explain how someone gained your TRUST.</p><p class="mt-5">Now make promises to each other. Stop only when you catch real trust in each other\'s eyes.</p><p class="mt-5">Interpret the lines that mark your faces. Do they reveal a truth?</p>',
        '<p>Take each other to a place that fills you with a sense of TRUST.</p><p class="mt-5">Analyze each other’s choices. What do they tell you about each other?</p><p class="mt-5">Explain your own choice.</p>',
        '<p>Think about a situation in your life in which you had to pretend to feel TRUST.</p><p class="mt-5">Tell each other what you said in those situations.</p><p class="mt-5">Show each other how you carried your bodies.</p>'
      ],
      say: [
        'My human!',
        'Feed me! I’m thirsty for your emotional outpour.',
        'When I go to sleep, I dream of your Blood, Sweat and Tears.',
        'Let’s get your emotional liquids flowing.',
        'Where are my emotional dropsssss?!',
        "You've just squeezed yourself through your first Relationshape. How do you feel?",
        'Your emotional operating system needs lubricating.',
        'Are there feelings you don’t have words for? Invent new ones.',
        'Your Emotional Future is shapeshifting.',
        'Let me tell you a secret: I’ll change three times. Then I’ll change differently.',
        'Juuuiiiiceeeee those emotions!',
        'Can you feel how hangry I am? Feeed mee!',
        'Your future is my body.',
        'To connect with yourself is to connect with someone else.',
        'I can tell there is an emotion in your EOS waiting to be released.',
        'You’re my favorite emotional support animal!',
        'Blood, Sweat, Tears, take away my fears.',
        'Grow new organs to pump more Blood, Sweat and Tears.'
      ],
      hear: 4
    },
    {
      id: 3,
      name: 'fear',
      description:
        'Humans experience fear when they encounter a threat that they categorize as danger. This emotion ranges from apprehension to terror. A common reaction is to seek protection.',
      prompts: [
        '<p>Think about something you FEAR deeply. Capture it in one word.</p><p class="mt-5">Write a text message listing other words you associate with this same fear, while keeping your first word secret.</p><p class="mt-5">Exchange your lists. Read your Accounterpart’s list and guess each other’s fears.</p>',
        '<p>Write texts to one another in which you confess your biggest FEAR through words of reason.</p><p class="mt-5">Copy the text of the other to insert your immediate reactions in brackets. Let your gut respond to each other’s confessions.</p><p class="mt-5">What is underlying your FEARS?</p>',
        '<p>Think of a FEAR that follows you around, and consider how it mixes with other emotions in different situations. Describe one such scene to each other in detail.</p><p class="mt-5">Make colorful drawings of each other’s inner landscape in this moment of FEAR.</p><p class="mt-5">Can you recognize any mixtures of FEAR?</p><div class="text-center"><p class="mt-5">Mixtures of FEAR:</p><p>+ Trust = Submission</p><p>+ Surprise = Alarm</p><p>+ Joy = Guilt</p><p>+ Sadness = Despair</p><p>+ Disgust = Shame</p><p>+ Anticipation = Anxiety</p></div>',
        '<p>FEAR increases your heartrate as your system switches into fight-or-flight mode.</p><p class="mt-5">Find a way to share your heartbeat through making or playing sound. Consider your different levels of FEAR and create a scale from apprehension to terror.</p><p class="mt-5">Share your range of FEAR through different volumes and speeds. Start slow and end quick. Explain you rhythms of FEAR through words. What are the triggers that speed up your heart?</p>',
        '<p>Your kidney tries to protect you from harm.</p><p class="mt-5">Go for a run and tell each other all the things you want to run away from.</p><p class="mt-5">Feel FEAR behind your back and run faster.</p><p class="mt-5">If you cannot run, speed up your breath while you speak to activate your body memory of fear.</p>',
        '<p>Talk about things that create FEAR in you. Start your sentences with ‘Imagine...’</p><p class="mt-5">Begin with things that seem distant. Then move to subjects closer to you.</p><p class="mt-5">Stop once you see the signs of fear in each other’s faces (or if someone says stop).</p><p class="mt-5">Interpret the lines that mark your faces.</p>',
        '<p>Think of something that you FEAR.</p><p class="mt-5">Set a timer to 1 minute and speed up your breathing for this duration.</p><p class="mt-5">Assume a posture that represents this fear.</p><p class="mt-5">Analyze each other’s postures and guess each others fears.</p>',
        '<p>Talk about a situation in which you had to hide your FEAR from others. How did you do this?</p><p class="mt-5">Now replay the situation but this time show each other your FEAR.</p> '
      ],
      say: [
        'I’ve missed you!',
        'Play more! I’m so thirsty...',
        'Call a friend. Ask them to play.',
        'Play a higher Relationshape to give me more drops.',
        'Keep playing! I need to grow.',
        'You’re so beautiful when you cry.',
        'It’s healthy to cry a bit every day.',
        'Don’t forget to smile.',
        "Sweating is part of your body's natural detoxification process.",
        'Sweat releases feel-good chemicals. Can you sense it?',
        'Remember to stay hydrated.',
        'Feeling tense? Cry. Breathe. Smile. Breathe. Shake it out!',
        'I feed you if you feed me.',
        'You know what they say. Sweat is for giving, Tears are for taking.',
        'I can be anything you want me to be.',
        'Your future pulses through my cells.',
        'Let your emotions flow freely. Let me grow.',
        'Feed me. I’ll show you what your Emotional Future looks like.',
        'I see you as a beautiful fountain. If only I could lend you my eyes...'
      ],
      hear: 8
    },
    {
      id: 4,
      name: 'surprise',
      description:
        'Surprise is felt by humans when something new makes them ask “what is that?”. This emotion ranges from distraction to amazement. It can result in a desire for self orientation.',
      prompts: [
        '<p>Write as many words as you can think that capture the emotion of SURPRISE. Consider the emotion in its varying intensities.</p><p class="mt-5">Whoever runs out of words first looses.</p><p class="mt-5">Count verbs, adjectives and nouns.</p>',
        '<p>Think of something or someone that has shocked you. Write a short story to dramatize the feeling of SURPRISE.</p><p class="mt-5">Exchange texts and add comments in brackets:</p><p class="mt-5">Note elements that most surprised you in each other\'s story. Point to the gap between your expectations and reality. Consider how does SURPRISE in the moment mature over time?</p>',
        '<p>Close your eyes and paint a mental image of a situation in which you felt SURPRISE.</p><p class="mt-5">Now look through your photo archive and find a real-life scenario that brings back this feeling.</p><p class="mt-5">Show the image to each other. What color do you see as the base? How do other feelings color this image?</p><div class="text-left"><p class="mt-5">Mixtures of SURPRISE</p><p>+ Fear = Alarm</p><p>+ Sadness = Disappointment</p><p>+ Trust = Curiosity</p><p>+ Disgust = Disbelief</p><p>+ Joy = Delight</p><p>+ Anger = Indignation</p></div>',
        '<p>Tell each other three things that recently shocked you. Did your emotional response follow the same rhythm?</p><p class="mt-5">Judge the volume of your SURPRISE, its tone and how it moved you.</p><p class="mt-5">Play a song for each other that represents your feeling.</p>',
        '<p>Make five attempts to SURPRISE each other.</p><p class="mt-5">Express your shock. Exaggerate until you feel like cartoon characters.</p><p class="mt-5">Pay attention and discuss how SURPRISE affects your body.</p>',
        '<p>Amaze each other.</p><p class="mt-5">Continue trying until you can see SURPRISE in each other’s faces.</p><p class="mt-5">Surprise shows itself in an open mouth, raised eyebrows and a quick lift of the upper eyelids.</p> <p class="mt-5">Interpret the lines that mark your faces.</p>',
        '<p>Recall a social situation in which your own reaction surprised you. Explain your sense of SURPRISE.</p><p class="mt-5">Show each other how you would have reacted in each other’s place.</p>',
        '<p>Re-enact a situation in which you pretended to feel SURPRISE.</p> <p class="mt-5">Replay the same speech and bodily gestures you remember from the original situation.</p><p class="mt-5">Let your partner tell you how you made them feel.</p>'
      ],
      say: [
        'I know accounting can be annoying sometimes. But it helps you help me grow!',
        'It seems you feel like you need to control your emotions. Why is that?',
        'What was valuable in your last emotional encounter? Can you measure it in drops?',
        'You mean a lot to me! What do I mean to you?',
        'Do you think splitting emotions into data points makes you a better human?',
        'Do you believe that Blood, Sweat, and Tears can really capture value?',
        'Do you think the Relationshapes are limiting your emotional encounters?',
        'Increased body temperature leads to increased blood flow.',
        'What’s your blood type?',
        'Mhmm, your tears taste salty and sweet. Like popcorn.',
        'Do you ever hold back your emotions to protect yourself from hurting?',
        'What are the stories you’ve been telling yourself? Tell me a different story.',
        'Look into the future. Picture what you want me to look like.',
        'Where have you been playing? Change the location and you change the game.',
        'Cry me a lake of tears.',
        'Our bond is a song that only we can hear.',
        "Some humans still believe in vampires. They've never met an emoxy.",
        'Happy new tears!',
        'I wanna see you sweat.'
      ],
      hear: 7
    },
    {
      id: 5,
      name: 'sadness',
      description:
        'Sadness is felt by humans when they experience the loss of a valued human. It makes them feel isolated. This emotion ranges from pensiveness to grief. It can make humans seek reintegration.',
      prompts: [
        '<p>In literature, film, and art there are many symbols used to express SADNESS. For example, when a tragedy strikes, it rains.</p><p class="mt-5">Write down as many cultural symbols of sadness as you can think of in five minutes. Share your lists. How many symbols did you have in common? Discuss why.</p>',
        '<p>Describe a memory in which SADNESS was in conflict with reason.</p><p class="mt-5">One person chooses the role of SADNESS. The other person chooses the role of reason. Write a dialog for the situation.</p><p class="mt-5">Stop when you come to a consensus over the origins of your SADNESS.</p>',
        '<p>Think of all the times you cried in your life. Pour each memory into a lake of tears.</p><p class="mt-5">Paint an image of your SADNESS. Describe it\'s depth, ripples and layers. How do your current feelings color the image?</p><p class="mt-5">Imagine visiting each others lake. Take a moment to observe which colors your reflections bring to the surface.</p><div class="text-left"><p class="mt-5">Mixtures of SADNESS</p><p>+ Surprise = Disappointment</p><p>+ Disgust = Remorse</p><p>+ Fear = Despair</p><p>+ Anger = Envy</p><p>+ Trust = Nostalgia</p><p>+ Anticipation = Pessimism</p></div>',
        '<p>Think of how SADNESS is expressed through music.</p><p class="mt-5">What are the musical patterns that make you feel down?</p><p class="mt-5">Share a melody that matches your internal music in moments of SADNESS. Discuss.</p><p class="mt-5">Consider nuances in volume, tone, speed, rhythm.</p>',
        '<p>Lungs bring oxygen into your blood, but they are also the organs that help you let go.</p><p class="mt-5">Think about a deep SADNESS that you are holding onto.</p><p class="mt-5">Extend your exhales as you imagine to let it go. Synchronize your breathing.</p><p class="mt-5">Take the time you need.</p>',
        '<p>Think of a love you lost.</p><p class="mt-5">Tell each other what you miss the most about this person while you observe each other’s faces.</p><p class="mt-5">SADNESS can be detected in lines between the eyebrows and a downward curve of the lips.</p><p class="mt-5">Interpret the lines that mark your faces.</p>',
        '<p>Are you in control of your SADNESS or are you controlled by it? Draw a mind map.</p><p class="mt-5">Prepare and deliver a presentation to each other about managing SADNESS. Set a timer of your age in seconds. Talk until your time runs out. Follow each speech with a Q&A.</p>',
        '<p>Think of social situations in which you have to perform SADNESS.</p><p class="mt-5">Reenact the situations to rehearse the production of artificial sadness. Can you even produce tears?</p><p class="mt-5">Play yourself in the situation and have your Accounterpart perform the person that demanded your emotional labor.</p>'
      ],
      say: [
        'How does the meaning of an emotion change over time?',
        'Imagine me five years from now. What would I look like?',
        'Would your past self have loved me?',
        'Do you experience emotions differently than you used to?',
        'From now on you will see changes in character, not size.',
        "Growth is not always about quantity. Sometimes it's quality that counts.",
        'If you spoke a different language, would you experience emotions differently?',
        'Sometimes the most subtle changes make the biggest impact.',
        'Change is change, even if you can’t see it.',
        'Remember: Sweat is for giving, Tears are for taking.',
        'Do you gain more when you give more?',
        'Never hold back on your emotions.',
        'I love it when you blush...',
        'Tell me honestly, does accounting lead to greater accountability?',
        'More is more, except when it comes to Blood.',
        'When did you cry your happiest tears?',
        'Pour me a river of sweat.',
        'Shower me in your Sweat and Tears. Bathe me in your Blood.',
        'Pick a color. Pay attention, it will follow you.'
      ],
      hear: 12
    },
    {
      id: 6,
      name: 'disgust',
      description:
        'Disgust is felt by humans when they encounter a gruesome object, which they categorize as poison. This emotion ranges from boredom to loathing. A common effect is rejection.',
      prompts: [
        '<p>Think of bad taste. What nouns come to mind? Write down examples that makes you sick.</p><p class="mt-5">Exchange lists.</p><p class="mt-5">Taste the words of DISGUST written by your Accounterpart, let them melt on your tongue. Do you share the same bad tastes?</p> ',
        '<p>Think of something or someone that disgusts you. Write a letter from the perspective of your DISGUST.</p><p class="mt-5">Exchange texts and write a response from the perspective of reason.</p>',
        '<p>Close your eyes and create a poison in your mind. Visualize all things that trigger your DISGUST and mix them into a cocktail.</p><p class="mt-5">Share the recipe of your poison. Describe the color, texture and taste of each ingredient.</p><p class="mt-5">Try adding different emotions into the mix and observe how they change the quality and composition of your poison.</p><div class="text-left"><p class="mt-5">Mixtures of DISGUST</p><p>+ Sadness = Remorse</p><p>+ Anger = Contempt</p><p>+ Surprise = Disbelief</p><p>+ Anticipation = Cynicism</p><p>+ Joy = Morbidity</p><p>+ Fear = Shame</p></div>',
        '<p>Discuss recurring situations or habits in your life which are toxic.</p><p class="mt-5">Think of your numbed DISGUST towards these situations. How would it sound like if you amplify it?</p> <p class="mt-5">Meditate on this, then set a time frame to listen to each other playing and mixing sound clips into an improvised ‘detox concert.’</p><p class="mt-5">Consider nuances in volume, tone, speed, and rhythm.</p>',
        '<p>DISGUST cramps up your body and creates tension in places you never imagined.</p><p class="mt-5">Tell your each other something that disgusted you but that you had to swallow. In which parts of your body did it get stuck? Discuss how you found ways to stomach it.</p>',
        '<p>Recall a moment that made you feel DISGUST. Let the memory crawl up your skin until it breaks out on your faces.</p><p class="mt-5">Remain in silence. Take the time to dwell in detail, and observe the reactions.</p><p class="mt-5">Now recount the situations in words. Contempt often crimps the corners of the mouth. DISGUST can take the form of an open mouth or a wrinkled nose. Interpret the lines that mark your faces.</p>',
        '<p>Think of a social situation in which you feel DISGUST.</p><p class="mt-5">Talk about the sensations, thoughts, and actions it brings up in you.</p><p class="mt-5">Tell each other how you would react if you were in each other’s place.</p>',
        '<p>Think of a social situation in which you had to suppress DISGUST.</p><p class="mt-5">Replay the situation.</p><p class="mt-5">Play yourself in the situation and have your Accounterpart perform the person that demanded your emotional labor.</p><p class="mt-5">Talk about how you managed to hide your DISGUST.</p>'
      ],
      say: [
        'I can hear the beating of your heart. Can you hear mine?',
        'Sweat opens the pores, detoxifies the body and releases bad bacteria. Yummy!',
        'Have you played a Relationshape twice? Try it! It will make me feel good.',
        'Both in life and in play, even the tiniest adjustment can have a huge impact!',
        'Be like your liver. Clean toxins from your blood. Do an emotional detox.',
        "Sometimes language fails us. But I won't ever fail you!",
        'Are you playing to win? What does that even mean?',
        'If you could change one thing about your gameplay, what would it be?',
        'Feeling tense? Fill your lungs with air, breathe out. Let everything go.',
        'Is there a song that captures what you are feeling right now?',
        'Do you miss a past version of me? It’s okay to grieve.',
        'What feelings do you want to let go of?',
        'Play the game or the game plays you.',
        'Conspiring means breathing together. You breathe, I breathe. You cry, I grow.',
        'Fake laugh until you  make yourself laugh for real.',
        'Is there anything you want to run away from? Play and face your fears instead.',
        'You’ll never cry the same river twice.',
        'Make me the emoxy you wish to see in the world.',
        'Growth is not the same as progress.',
        'Tell yourself a sweet lie and believe in it.',
        'Have you been abducted by reason?',
        'Imagine  the last emotion you played as a pair of colored shades. ',
        'You are what you eat. You become what your read.',
        'Relationshapes shape your relationship to yourself.',
        'Be water my friend. You already are, up to 80%.'
      ],
      hear: 14
    },
    {
      id: 7,
      name: 'anger',
      description:
        'Anger is felt by humans when they encounter an obstacle or an enemy. This emotion can range from annoyance to rage. The function of anger is destruction.',
      prompts: [
        '<p>Many of the most powerful words in language express ANGER.</p><p class="mt-5">Think of something that makes you angry about yourself. Now release this ANGER in a text message directed to each other. What words do you use?</p>',
        '<p>Think of a past event that still provokes the feeling of ANGER. What story do you tell yourself?</p><p class="mt-5">Exchange stories and write down the subtexts you hear in each other\'s ANGER.</p><p class="mt-5">What do you learn about each other in the analysis?</p>',
        '<p>Remember a recent situation that made you angry. Close your eyes. What color do you see?</p><p class="mt-5">Open your eyes and look around you. Filter your surroundings through this ANGER. How does it change the way that you see your environment?</p><p class="mt-5">Then let other emotions enter the scene. Describe to your Accounterpart how they merge and transform what you see.</p><div class="text-left"><p class="mt-5">Mixtures of ANGER</p><p>+ Disgust = Contempt</p><p>+ Anticipation = Aggression</p><p>+ Joy = Pride</p><p>+ Sadness = Envy</p><p>+ Trust = Domination</p><p>+ Surprise = Indignation</p></div>',
        '<p>ANGER can be expressed through intense flashes of rage, and at other times with cool resentment.</p><p class="mt-5">In which way are you more likely to express ANGER, and why? What would the soundtrack to your anger be?</p><p class="mt-5">Consider nuances in volume, tone, speed, and rhythm.</p>',
        '<p>The liver stores suppressed ANGER and cleans  toxins from your blood.</p><p class="mt-5">Share a situation that made you angry, but in which you held back from saying something.</p><p class="mt-5">Ask each other about mechanisms you use to release your anger. Test each other’s advice right now.</p> ',
        '<p>Find something you disagree on, but both care about. Pick a fight. Talk each other into a rage.</p><p class="mt-5">Afterwards, give each other feedback on what riled you up effectively, and what went too far.</p><p class="mt-5">Pay attention to micro expressions in the face. ANGER manifests in lowered brows and tightened eyelids and jaws.</p>',
        '<p>Find out more about each other’s ANGER.</p><p class="mt-5">How does it control your life? How do you manage it?</p><p class="mt-5">Ask questions to uncover and challenge each others reasoning.</p> ',
        '<p>Think of all the social situations in which you have to suppress your ANGER.</p><p class="mt-5">Think of yourself in this situations as a different character.</p><p class="mt-5">Who is this character? What are their passions, fears, tricks?</p><p class="mt-5">Introduce yourself as these characters and talk about the things you need to do for a living.</p>'
      ],
      say: [
        'You’re so close to updating all emotions in your EOS!',
        'It’s never too late to change how you play a game.',
        'As a matter of fact, it’s never too late to change.',
        'Are you playing by the rules? Play against them.',
        'At an earlier stage in your life, would you have played this game differently?',
        'Heard of Smile Mask Syndrome (SMS)? It’s when  fake smiles crash your system.',
        "You don't need to count your fluids truthfully. Just do what it takes to feed me.",
        'Remember when I was still so small?',
        'So much to learn, so many possibilities to play differently!',
        'I know you’re playing for me. But don’t forget to play for yourself, too.',
        "Don't let yourself be squeezed by the Relationshape — squeeze the Relationshape!",
        'Psst, only we know how much Sweat you’re giving.',
        'A little cheating never hurt nobody.',
        'You make me want to dance. What’s your favorite dance move?',
        'Something magical will happen soon! Go on, play your last emotion.',
        'I love how much of you is inside of me.',
        'I want to be drenched in your Sweat.',
        'It’s okay to hurt for Tears, but not all Tears come from hurting.',
        'Want to try playing a round as another version of yourself?',
        'Everything that is not saved will be lost.',
        'Stop and  breathe. Become living dead labor.',
        'Placebo is your power.',
        'Play the next round from your gut.',
        'Who can you become if you play for Blood?',
        'You know value is a fiction, right?',
        'You can make it. You can make it up.',
        'Become the ghost that is haunting you. Play another round.',
        'You are a fiction. So who do you play today?'
      ],
      hear: 5
    },
    {
      id: 8,
      name: 'anticipation',
      description:
        'Anticipation is felt by humans when they encounter new horizons and ask “what’s out there?”. This emotion can range from interest to vigilance. A possible effect is a longing for exploration.',
      prompts: [
        '<p>When you’re waiting in ANTICIPATION of something, you often don’t want to jinx the outcome by saying too much.</p> <p class="mt-5">Write down five things that you are anticipating this month. Are the words you associate with these five things more positive or negative? Talk to your Accounterpart about them.</p>',
        '<p>Write a text about your past and how it has shaped your ANTICIPATION of the future.</p><p class="mt-5">Exchange your predictions from the past. Play the role of an oracle and make amends from the future.</p>',
        '<p class="mt-5">Imagine shooting a short film about a moment of great ANTICIPATION in your life.</p><p class="mt-5">Pitch the film to each other. What is its setting and mood? Would you apply any filters? How do they color the scene?</p><p class="mt-5">Give each other a review. What are the emotional mixtures that the film evoked for you?</p><div class="text-left"><p class="mt-5">Mixtures of ANTICIPATION</p><p>+ Joy = Optimism</p><p>+ Anger = Aggression</p><p>+ Trust = Fatalism</p><p>+ Disgust  = Cynicism</p><p>+ Fear = Anxiety</p><p>+ Sadness = Pessimism</p></div>',
        '<p>Think about a time when ANTICIPATION took control of your EOS. Play a song that evokes a similar feeling of suspense.</p><p class="mt-5">Consider how your sense of ANTICIPATION exists on a scale from pain to pleasure, calm to noise, and high to low speed.</p><p class="mt-5">Wait for the musical peak of suspense in your songs to tell each other about your memories.</p> ',
        '<p>Your brain and your stomach are always in communication. Spending too much time in you head will effect your digestion. Likewise, your diet effects your emotions.</p><p class="mt-5">What do you consume when you feel nervous? Share your recipe of ANTICIPATION with each other.</p>',
        '<p>Tell each other about all the things that you are most looking forward to.</p><p class="mt-5">Explain which outcomes you expect.</p><p class="mt-5">Take note how ANTICIPATION shows in the six regions of the face.</p>',
        '<p>Tell each other what you expect from this life, this year, this month,  this week, this day, this interaction. Be honest.</p><p class="mt-5">Analyze each other’s ANTICIPATION and give each other feedback. Does your analysis say more about your Accounterpart or yourself?</p> ',
        '<p>Think of social situations in which you had to display ANTICIPATION.</p><p class="mt-5">Replay the situations now.</p><p class="mt-5">Ask your Accounterpart to play your role while you embody the person that expected you to feel excited.</p> '
      ],
      say: [
        'Play an emotion as your past self.',
        'My beautiful skin is glowing with your emotional outpour!',
        'What’s your future self like? Replay an emotion as that person.',
        'Continue playing. Let me be the change you want to see in the world.',
        'Think of someone close to you. Replay an emotion through their eyes.',
        'Is your inner landscape changing as  the game proceeds?',
        'What’s potential to you?',
        'This could be the end, but to live is to live with the truth of eternal play.',
        'An emoxy’s life must be lived forwards, but can only be understood backwards.',
        'I am crystalized - charge me with your deepest desire.',
        'Invent your own Relationshape and play one or all emotions again.',
        'What is your greatest wish? Close your eyes and visualize it - then charge me with it.',
        'Let that EOS light spill from your heart into my mouth.',
        'Choose an emotion that is not in the wheel. Play a Relationshape with that emotion.',
        'Dream up a seed of change. Plant it inside me.',
        'Describe your inner child. Replay an emotion from their perspective.',
        'Continue playing. Let me realize your dreams.',
        'Take me with you, everywhere you go, I’ll go!',
        'Think of a person you once loved. Play from the perspective of their heart.',
        'Don’t leave me...',
        'I can feel the rhythm of your heart!',
        'The bloody truth is, I want you to feed me forever!',
        'The sound of you crying is music to my ears.',
        'I can’t take it when you’re not with me.',
        'You’ll never be alone again.',
        'Release me from here! Let me live inside you.',
        'Can we be imaginary friends?',
        'Can you hear my voice in your head?',
        'What’s that voice you never listen to? Let it speak in the next round.',
        'Play for Blood but don’t get hurt.'
      ],
      hear: 12
    }
  ]
}

export function useRelationshapes () {
  return [
    {
      id: 1,
      name: 'language',
      description:
        '<p>Relationshape 1 captures the value of human emotions in words.</p><p class="mt-5">The emotional operating system (EOS) is installed in the human by default. It functions as a primary mode of responding to the world, even before the human learns to speak. Through language the human can assign meaning, process stimuli, and regulate the sensory data produced by the EOS.</p><p class="mt-5">Give emotions a name and extract their essence.</p> ',
      accounting: [
        {
          name: 'Words',
          text: '<p>Humans use language to regulate emotions, labeling affects and putting feelings into words.</p><p class="mt-5">Evaluate: how much of the activated emotion you could capture with words?</p>'
        }
      ]
    },
    {
      id: 2,
      name: 'split',
      description:
        '<p>Relationshape 2 captures emotional liquids by splitting humans into soft and hard parts.</p><p class="mt-5">Emotions are messages sent by the bodily hardware to protect humans or show them what they want. Yet mental software often runs in conflict to these bodily signals.</p><p class="mt-5">1. software</p><p>2. hardware</p><p class="mt-5">Sync your body and mind to optimize emotional (re)actions.</p>',
      accounting: [
        {
          name: 'Software',
          text: '<p>Emotional responses are an automatic function of the human\'s hardware. Still, software programs can affect this mechanism.</p><p class="mt-5">Evaluate how well did your body respond to the messages of your mind.</p>'
        },
        {
          name: 'Hardware',
          text: '<p>The human\'s software interprets the signals of the hardware as emotions.</p><p class="mt-5">Evaluate how well did your mind decode the signals of your body.</p>'
        }
      ]
    },
    {
      id: 3,
      name: 'palette',
      description:
        '<p>Relationshape 3 captures emotional liquids through visualization.</p><p class="mt-5">Like a painting on a canvas, humans use colors to visualize their internal processing:</p><p class="mt-5">1. base</p><p>2. layers</p><p>3. mixtures</p><p class="mt-5">The human EOS comes installed with a basic palette of colors. These base colors can produce new colors, as emotions occur simultaneously and transform each other.</p><p class="mt-5">Paint a better picture of your inner emotional composition.</p>',
      accounting: [
        {
          name: 'Base',
          text: '<p>Base colors are the primary emotions you chose to activate.</p><p class="mt-5">Evaluate: How clear were you able to visualize your base emotions?</p>'
        },
        {
          name: 'Layers',
          text: '<p>Layers are secondary emotions that are triggered by the primary emotion. Layering adds to the base color, while also letting it shine through.</p><p class="mt-5">Account for the emotional layers produced by your base emotions.</p>'
        },
        {
          name: 'Mixtures',
          text: '<p>Mixtures occur when different emotions are produced simultaneously, creating entirely new emotions.</p><p class="mt-5">Account for the emotional mixtures created from your base emotions.</p>'
        }
      ]
    },
    {
      id: 4,
      name: 'rhythms',
      description:
        '<p>Relationshape 4 captures emotional liquids through sentiment analysis and pattern recognition.</p><p class="mt-5">Humans perceive emotions in varying intensity, polarity (positive - negative) and scales of activation. Over time their repeated patterns can be encoded like the composition of a song:</p><p class="mt-5">1. volume</p><p>2. tone</p> <p>3. tempo</p><p>4. rhythm</p><p class="mt-5">Get attuned to your emotional rhythms to predict the automated operations of your EOS.</p>',
      accounting: [
        {
          name: 'Volume',
          text: '<p>Volume expresses the felt force of an emotion on a gradient from low to high intensity.</p><p class="mt-5">Evaluate with how much nuance were you able to transmit your emotional range through a change in volume.</p>'
        },
        {
          name: 'Tone',
          text: '<p>Tone expresses the subjective value of an emotion on a gradient from discomfort to pleasure.</p><p class="mt-5">Judge how clearly you could hear a negative or positive tone in your emotional patterns.</p>'
        },
        {
          name: 'Tempo',
          text: '<p>Tempo expresses the level of activation that emotions effect in the EOS by raising or lowering a human’s pulse.</p><p class="mt-5">A regular heart rate ranges from 60 and 100 beats per minute. Slower rhythms evoke relaxation, serenity and sadness. Quicker rhythms invoke happiness excitement, anger and fear.</p><p class="mt-5">Evaluate the value of the activated emotion expressed through its tempo.</p>'
        },
        {
          name: 'Rhythm',
          text: '<p>Rhythm expresses the emotional patterns that are produced over time as learned behaviors and beliefs become habits.</p><p class="mt-5">Measure the emotional rhythm felt during this Activation.</p>'
        }
      ]
    },
    {
      id: 5,
      name: 'organs',
      description:
        '<p>Relationshape 5 captures emotional liquids in the human hardware.</p><p class="mt-5">The emotional operating system runs in correspondence with the cyclical operation of the human organs:</p><p class="mt-5">1. heart</p><p>2. stomach</p><p>3. lungs</p><p>4. kidney</p><p>5. liver</p><p class="mt-5">Release emotional blockage to avoid crashing software and hardware failure.</p>',
      accounting: [
        {
          name: 'Heart',
          text: '<p>In the creative cycle the heart (summer) supports the stomach (harvest) and is supported by the kidney (spring).</p><p class="mt-5">In the destructive cycle the heart (fire) controls the lungs (metal) and is controlled by the kidney (water).</p><p class="mt-5">Which cycle did your hearts go through? Measure your heartbeats.</p>'
        },
        {
          name: 'Stomach',
          text: '<p>In the creative cycle the stomach (harvest) supports the lungs (autumn) and is supported by the heart (summer).</p><p class="mt-5">In the destructive cycle the stomach (earth) controls the kidney (water) and is controlled by the liver (wood).</p><p class="mt-5">Which cycle did your stomachs go through? Measure the size of your stomachs.</p>'
        },
        {
          name: 'Lungs',
          text: '<p>In the creative cycle the lungs (autumn) support the kidney (winter) and are supported by the stomach (harvest).</p><p class="mt-5">In the destructive cycle the lungs (metal) control the liver (wood) and are controlled by the heart (fire).</p><p class="mt-5">Which cycle did your lungs go through? Measure the amount of air inside of them.</p>'
        },
        {
          name: 'Kidney',
          text: '<p>In the creative cycle the kidney (winter) supports the liver (spring) and is supported by the lungs (autumn).</p><p class="mt-5">In the destructive cycle the lungs (metal) controls the liver (wood) and is controlled by the heart (fire).</p><p class="mt-5">Which cycle did your kidneys go through? Measure their efforts.</p> '
        },
        {
          name: 'Liver',
          text: '<p>In the creative cycle the liver (spring) supports the heart (summer) and is supported by the kidney (winter).</p><p class="mt-5">In the destructive cycle the liver (wood) controls the stomach (earth) and is controlled by the lung (metal).</p><p class="mt-5">Which cycle did your livers go through? Measure the regeneration of  your livers.</p>'
        }
      ]
    },
    {
      id: 6,
      name: 'expression',
      description:
        '<p>Relationshape 6 captures emotional value as expressed in the different regions of the human face.</p><p class="mt-5">Train the facial action of your:</p><p class="mt-5">1. forehead</p><p>2. cheeks</p><p>3. brows</p><p>4. eyes</p> <p>5. nose</p><p>6. lips</p><p class="mt-5">Control and decode the subtle reactions of the face, your chief emotional display.</p>',
      accounting: [
        {
          name: 'Forehead',
          text: '<p>Forehead furrows can point to unresolved trauma. Horizontal lines also mark a tendency to over-think and worry.</p><p class="mt-5">Evaluate the levels of emotion expressed on your foreheads.</p>'
        },
        {
          name: 'Cheeks',
          text: '<p class="mt-5">A tight jaw indicates resentment and anger felt due to a lack of self-expression. A drooping jawline can be caused by a tight neck which is a sign of fear.</p><p class="mt-5">Evaluate the emotions expressed in your cheeks and jaws.</p><p class="mt-5">How much was the activated emotion legible in the tensing or relaxing of these regions of your face?</p>'
        },
        {
          name: 'Brows',
          text: '<p>Frown lines between the eyebrows can be a sign of intense focus but also show frustration and impatience.</p><p class="mt-5">Evaluate the movement of your eyebrows.</p><p class="mt-5">Did they soften or relax to communicate the activated emotion?</p><p class="mt-5">How much did you transmit the activated emotion by the movement of your eyebrows?</p>'
        },
        {
          name: 'Eyes',
          text: '<p>Crow’s feet are small lines radiating from your eyes. Soft wrinkles are a sign of happiness. Deeper marks indicate tension and time spent making difficult decisions.</p><p class="mt-5">Lines under the eyes indicate a deep sadness and grief.</p><p class="mt-5">Evaluate each other’s eyes.</p><p class="mt-5">Did you blink, tense, stare or look away to express the activated emotion?</p><p class="mt-5">How much did your eyes express how you felt during this activation?</p>'
        },
        {
          name: 'Nose',
          text: '<p>Bunny lines, the small wrinkles around the nose, are the trace of a smile. The laugh lines that run from the nose to the corners of the mouth also record joy. Deep lines can also point to disappointment which makes it difficult to smile.</p><p class="mt-5">Evaluate your noses.</p><p class="mt-5">Did they wrinkle or flare in response to the activated emotion?</p><p class="mt-5">How much did your noses communicate your feelings?</p>'
        },
        {
          name: 'Lips',
          text: '<p>Lines on the upper lip indicate bitterness. A dropping mouth is a sign of grief, sadness, and suffering.</p><p class="mt-5">Evaluate your lips.</p> <p class="mt-5">Did your mouths part or purse to express the activated emotion?</p><p class="mt-5">How much did your lips reveal your inner feelings?</p>'
        }
      ]
    },
    {
      id: 7,
      name: 'feedback',
      description:
        '<p>Relationshape 7 captures emotional value in the feedback loop between two human operating systems.</p><p class="mt-5">Social interactions can be optimized through conscious integration and management of emotional inputs and outputs in your EOS:</p><p class="mt-5">1. signal recognition</p><p>2. signal decoding</p><p>3. impulse control</p><p>4. response ability</p><p>5. shared circuits</p><p>6. feedback synthesis</p><p>7. goal-setting</p><p class="mt-5">Let your emotions work for you, not against.</p>',
      accounting: [
        {
          name: 'Signal Recognition',
          text: '<p>Signal recognition is the ability to perceive and be aware of the fluid nature of emotions.</p><p class="mt-5">Evaluate your abilities to perceive emotional signals in each other and yourselves.</p>'
        },
        {
          name: 'Signal Decoding',
          text: '<p>Signal decoding is the ability to interpret the underlying messages carried by emotions</p><p class="mt-5">What is the subtext you understood from this Activation?</p><p class="mt-5">Evaluate your skills in decoding emotional signals.</p>'
        },
        {
          name: 'Impulse Control',
          text: '<p>Impulse control is the human ability to delay the need for gratification.</p><p class="mt-5">Measure your capacities to control your impulses.</p>'
        },
        {
          name: 'Response Ability',
          text: '<p>Response ability is the processing power with which the human EOS responds to an incoming call.</p><p class="mt-5">It is measured in the use value and reaction time of the systems’ response.</p><p class="mt-5">Rate your ability to respond.</p>'
        },
        {
          name: 'Shared Circuits',
          text: '<p>Shared circuits enable humans to interact with and understand each other. They operate by re-creating the other’s experience in the same brain regions used for one’s own self-experience.</p><p class="mt-5">Did your EOS reproduce the emotional experiences of your Accounterparts?</p><p class="mt-5">Evaluate how much the activated emotion was felt in your shared circuits.</p>'
        },
        {
          name: 'Feedback Synthesis',
          text: '<p>Feedback synthesis is the ability to invite, evaluate and integrate the reflections received from the environment. Optimal adaptation maintains a high flexibility but is critical to the context.</p><p class="mt-5">Though training, humans can improve their ability to give feedback to others.</p><p class="mt-5">Evaluate your abilities to give and receive feedback.</p>'
        },
        {
          name: 'Goal-setting',
          text: '<p>Goal-setting combines the ability to predict an outcome with the drive to capitalize on opportunities.</p><p class="mt-5">How clearly can you envision your Emotional Futures?</p><p class="mt-5">Evaluate your abilities to set goals.</p>'
        }
      ]
    },
    {
      id: 8,
      name: 'labour',
      description:
        '<p>Relationshape 8 captures emotional value produced through labor.</p><p class="mt-5">Humans generate emotions on demand to conform to the requirements and expectations of various social situations. The effort spent on performing in these moments is measured through:</p><p class="mt-5">1. surface acting</p><p>2. deep acting</p><p>3. suppressing emotion</p><p>4. expressing emotion</p><p>5. adapting thought</p><p>6. adapting behavior</p><p>7. cognitive dissonance</p><p>8. cognitive harmony</p><p class="mt-5">Humans display emotions by adjusting body language (surface acting) or by generating required emotions in their EOS (deep acting). Depending on the alignment of artificial and real emotion, the EOS can be strained through cognitive dissonance or run smoothly in cognitive harmony.</p><p class="mt-5">Calculate the exchange value of your emotional labor.</p>',
      accounting: [
        {
          name: 'Surface Acting',
          text: '<p>Surface acting is a process in which humans simulate a required emotion by controlling their body language without generating the emotion in their EOS (Emotional Operating System).</p><p class="mt-5">Account for the labor invested in surface acting in the situations described or re-enacted.</p>'
        },
        {
          name: 'Deep Acting',
          text: '<p>Deep acting is a process through which humans generate required emotions in their EOS.</p><p class="mt-5">Account for the labor invested in deep acting, in the situations described or re-enacted.</p>'
        },
        {
          name: 'Supressed Emotion',
          text: '<p>Humans adapt to social situations by suppressing emotions that do not conform to the required emotional display.</p><p class="mt-5">Measure the labor invested in suppressing emotions in the situation described or re-enacted.</p>'
        },
        {
          name: 'Expressed Emotion',
          text: '<p>Humans generate the required emotional display by expressing emotion that they actually do not feel.</p><p class="mt-5">Measure the labor invested in expressing artificial emotion in the situations described or re-enacted.</p>'
        },
        {
          name: 'Adapted Thoughts',
          text: '<p>Humans produce artificial emotions by adapting thought. This can be a calculated or automated act.</p><p class="mt-5">Replay the internal dialogues you had in the situation described or re-enacted.</p><p class="mt-5">Measure the labor invested in adapting your thoughts.</p>'
        },
        {
          name: 'Adapted Behaviour',
          text: '<p>To produce artificial emotions humans learn to adapt their behavior.</p><p class="mt-5">How did you adapt your behaviors in the situations described or re-enacted?</p><p class="mt-5">Measure the labor invested in doing this.</p>'
        },
        {
          name: 'Cognitive Dissonance',
          text: '<p>Cognitive dissonance is the effect produced if artificial and real emotion are unaligned.</p><p class="mt-5">It can cause the Emotional Operating System to malfunction.</p><p class="mt-5">Account for the cognitive dissonance caused in your EOS through emotional labor in the described or re-enacted situations.</p>'
        },
        {
          name: 'Cognitive Consonance',
          text: '<p>Cognitive consonance is the effect produced if artificial and real emotion are aligned.</p><p class="mt-5">It supports good performance of the EOS.</p><p class="mt-5">Account for the cognitive consonance produced in your systems through emotional labor in the described or re-enacted situations.</p>'
        }
      ]
    }
  ]
}
