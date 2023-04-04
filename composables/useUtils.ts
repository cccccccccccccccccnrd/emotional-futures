export const useOverlay = () =>
  useState('overlay', () => {
    return {
      isOpen: false,
      type: '',
      page: ''
    }
  })

export function useEmotions () {
  return [
    {
      id: 1,
      name: 'joy',
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
        'Think of a situation that  produces joy in you.',
        'How do you pursue it? Do you feel in balance?',
        'Talk about a character you played in your life to make someone feel happy.',
        'A fake smile only moves the mouth.',
        'Recount the context of the situation and give each other feedback.',
        'When you run out of words look at the list of your partner.',
        'Seduce to produce joy in each other.',
        'An authentic smile should be accompanied by wrinkles around the eyes.'
      ],
      hear: 4
    },
    {
      id: 3,
      name: 'fear',
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
        'Think of a situation that  produces joy in you.',
        'How do you pursue it? Do you feel in balance?',
        'Talk about a character you played in your life to make someone feel happy.',
        'A fake smile only moves the mouth.',
        'Recount the context of the situation and give each other feedback.',
        'When you run out of words look at the list of your partner.',
        'Seduce to produce joy in each other.',
        'An authentic smile should be accompanied by wrinkles around the eyes.'
      ],
      hear: 8
    },
    {
      id: 4,
      name: 'surprise',
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
        'Think of a situation that  produces joy in you.',
        'How do you pursue it? Do you feel in balance?',
        'Talk about a character you played in your life to make someone feel happy.',
        'A fake smile only moves the mouth.',
        'Recount the context of the situation and give each other feedback.',
        'When you run out of words look at the list of your partner.',
        'Seduce to produce joy in each other.',
        'An authentic smile should be accompanied by wrinkles around the eyes.'
      ],
      hear: 7
    },
    {
      id: 5,
      name: 'sadness',
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
        'Think of a situation that  produces joy in you.',
        'How do you pursue it? Do you feel in balance?',
        'Talk about a character you played in your life to make someone feel happy.',
        'A fake smile only moves the mouth.',
        'Recount the context of the situation and give each other feedback.',
        'When you run out of words look at the list of your partner.',
        'Seduce to produce joy in each other.',
        'An authentic smile should be accompanied by wrinkles around the eyes.'
      ],
      hear: 12
    },
    {
      id: 6,
      name: 'disgust',
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
        'Think of a situation that  produces joy in you.',
        'How do you pursue it? Do you feel in balance?',
        'Talk about a character you played in your life to make someone feel happy.',
        'A fake smile only moves the mouth.',
        'Recount the context of the situation and give each other feedback.',
        'When you run out of words look at the list of your partner.',
        'Seduce to produce joy in each other.',
        'An authentic smile should be accompanied by wrinkles around the eyes.'
      ],
      hear: 14
    },
    {
      id: 7,
      name: 'anger',
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
        'Think of a situation that  produces joy in you.',
        'How do you pursue it? Do you feel in balance?',
        'Talk about a character you played in your life to make someone feel happy.',
        'A fake smile only moves the mouth.',
        'Recount the context of the situation and give each other feedback.',
        'When you run out of words look at the list of your partner.',
        'Seduce to produce joy in each other.',
        'An authentic smile should be accompanied by wrinkles around the eyes.'
      ],
      hear: 5
    },
    {
      id: 8,
      name: 'anticipation',
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
        'Think of a situation that  produces joy in you.',
        'How do you pursue it? Do you feel in balance?',
        'Talk about a character you played in your life to make someone feel happy.',
        'A fake smile only moves the mouth.',
        'Recount the context of the situation and give each other feedback.',
        'When you run out of words look at the list of your partner.',
        'Seduce to produce joy in each other.',
        'An authentic smile should be accompanied by wrinkles around the eyes.'
      ],
      hear: 12
    }
  ]
}

export function useRelationshapes () {
  return [
    {
      id: 1,
      name: 'root',
      shape: 'yellow',
      accounting: [
        {
          name: 'account',
          text: 'Take account of the emotion you could capture in words.'
        }
      ]
    },
    {
      id: 2,
      name: 'split',
      shape: 'green',
      accounting: [
        {
          name: 'Account',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wow',
          text: 'Take account of the emotion you could capture in words.'
        }
      ]
    },
    {
      id: 3,
      name: 'mixtures',
      shape: 'cyan',
      accounting: [
        {
          name: 'Account',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wow',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Top',
          text: 'Take account of the emotion you could capture in words.'
        }
      ]
    },
    {
      id: 4,
      name: 'rhythms',
      shape: 'blue',
      accounting: [
        {
          name: 'Account',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wow',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Top',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Got u',
          text: 'Take account of the emotion you could capture in words.'
        }
      ]
    },
    {
      id: 5,
      name: 'organs',
      shape: 'purple',
      accounting: [
        {
          name: 'Account',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wow',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Top',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Got u',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wtf is this',
          text: 'Take account of the emotion you could capture in words.'
        }
      ]
    },
    {
      id: 6,
      name: 'expression',
      shape: 'magenta',
      accounting: [
        {
          name: 'Account',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wow',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Top',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Got u',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wtf is this',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'I love U',
          text: 'Take account of the emotion you could capture in words.'
        }
      ]
    },
    {
      id: 7,
      name: 'feedback',
      shape: 'red',
      accounting: [
        {
          name: 'Account',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wow',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Top',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Got u',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wtf is this',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'I love U',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'C U tomorrow',
          text: 'Take account of the emotion you could capture in words.'
        }
      ]
    },
    {
      id: 8,
      name: 'labour',
      shape: 'orange',
      accounting: [
        {
          name: 'Account',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Wow',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Top',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'Got u',
          text: 'Take account aof the esmotion you could capture in words.'
        },
        {
          name: 'Wtf is this',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'I love U',
          text: 'Take account of the emotddion you could capture in words.'
        },
        {
          name: 'C U tomorrow',
          text: 'Take account of the emotion you could capture in words.'
        },
        {
          name: 'This is great',
          text: 'Take account of the emsssotion you could capture in words.'
        }
      ]
    }
  ]
}
