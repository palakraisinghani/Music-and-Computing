# The Sound Of Machine (and Music): slide list

Outline of `deck.html` as it stands (42 slides). Each line is the text on the slide; pictures are in `img/`.
Your original notes, including the "Exact Text" drafts, are kept in `LIST.notes-archive.md`.

---

## Title (slide 1)

Music: the Prelude from *The Sound of Music* plays on this slide (file to add: `audio/m00-sound-of-music-prelude.mp3`). It plays by itself; if the browser holds it back, the first key press or click starts the music (instead of turning the page). It fades out when you move on.

- **The Sound Of Machine (and Music)**
- Breaking Down the Contributions of Sound and Music in the Development of Computers
- History & Philosophy of Computing · 2026
- Palak Raisinghani
- Prof. Sanjit Chatterjee is not currently on the title slide.

---

## Scene I · From Numbers to Symbols (slides 2–11)

2. **Chapter card:** Scene I, From Numbers to Symbols
3. We begin our story from Charles Babbage.
   *We take no interest in his interest in Cabbage.*
4. *Charles Babbage:* Charles Babbage started working on a Difference Engine in 1819, for which he received funding from the British government.
   Picture: `m01-babbage-portrait.webp` (Fig. 1, Charles Babbage)
5. *The Difference Engine:* The engine was aimed at calculating accurate mathematical tables, especially logarithmic and trigonometric tables. These were useful in navigation and astronomy.
   Picture: `m01-babbage-difference-engine.webp` (Fig. 2, Babbage's Difference Engine)
6. *The Analytical Engine:* Soon Babbage got the idea for building a more complex "Analytical Engine" which would be able to do any arithmetic calculations. It was designed to be programmable.
   Picture: `m01-babbage-analytical-engine-sketch.webp` (Fig. 3, Babbage's drawing of the Analytical Engine)
7. *Ada Lovelace · 1815–1852:* Next in our story is Ada Lovelace, with a love for logic and an eye for the future, she a woman who worked ahead of her time and space.
   Picture: `m01-lovelace-portrait.jpg` (Fig. 4, Ada Lovelace, watercolour by A. E. Chalon, c. 1840)
8. *The first computer programmer:* Ada Lovelace was asked to translate a document on the analytical engine from French to English. She expanded its functionality in the process.
   *She worked closely in collaboration with Charles Babbage, as she added appendices and converted the formulae for Bernoulli numbers into a step-by-step program.*
   *While Babbage wrote the first computer program, Ada Lovelace is credited as the first computer programmer for the step-by-step program she developed for the computation of Bernoulli numbers.*
   Picture: `m01-lovelace-note-g.webp` (Fig. 5, From Lovelace's notes on the Analytical Engine, Note G, 1843)
9. *Ada Lovelace:* This is where she realized that such an engine that can manipulate numbers can be used for various purposes such as for composing music.
   *Marking the Conceptual birth of general purpose Computers*
10. **Plate I, An Algebra of Notes** (diagram: one motif shown as original, transposition, inversion and retrograde)
   Caption: Music follows algebraic laws, and any such system whose rules can be formalized can essentially be operated on by the machine Babbage had designed.
11. Thus music set its foot into the world of computers and machines.
    *So far it has just been an inspiration - a supporting case, soon it becomes more integral.*
    *As time passed by ... Many more machines were built each one better than the one before.*
    *One of these is worthy of mention: The ENIAC - Completed 1945*

---

## Scene II · The ENIAC (slides 12–15)

12. **Chapter card:** Scene II, 1945, The ENIAC
13. **Full-screen photo:** `m02-eniac.jpg`
    Caption: Glen Beck (background) and Betty Snyder (foreground) programming ENIAC at the Ballistic Research Laboratory. U.S. Army photo.
14. *The ENIAC:* It is known as the first General Purpose Computer - A machine that can be programmed to perform different tasks.
    *What the ENIAC allowed:* Reprogrammability: one machine, many different problems.
    Revealed one at a time:
    - Artillery firing tables, the job it was built for
    - Calculations for Los Alamos, its first real problem (1945)
    - The first computer weather forecasts (1950)
15. *The ENIAC's shortcomings:* But it had several drawbacks and limitations which were recognized and it was deemed essential to fix and improve on them.
    Three columns, revealed one at a time:
    - I. **Memory:** Only 20 accumulators with 10 digits each. Power-hungry tubes made it hard to scale.
    - II. **Reprogramming:** No stored program. Every new problem meant rewiring it by hand.
    - III. **Debugging:** Reading bulbs and logging values by hand took a lot of man hours.

---

## Scene III · Addressing the ENIAC's Memory Problem (slides 16–19)

16. **Chapter card:** Scene III, Addressing the ENIAC's Memory Problem

**The problem**

17. *Problem I · Limited working memory:* **20** (counts up). Only 20 Accumulators with 10 digits each.
    Memory was not easy to scale because each accumulator used 36 vacuum tubes and these were very power hungry.
    *There was need for a cheaper way to store working memory.*

**The solution**

18. *The solution · Mercury delay lines:* Mercury Delay lines were found as a cheaper more practical and efficient alternative to accumulators, to expand the working memory.
    *They used Acoustic waves to hold information.*
    Picture: `m03-mercury-delay-line-system.jpg` (Fig. 6, An acoustic delay line memory system)
19. *Why sound?* Sound was way slower than electromagnetic waves and hence a greater delay could be achieved with a shorter length tube.
    *Piezoelectric crystals were used to convert between acoustic waves and electricity.*
    Picture: `m03-mercury-tube-crystals.jpg` (Fig. 8, A mercury-filled tube with an input and an output crystal)

---

## Scene IV · Addressing the ENIAC's Reprogramming Problem (slides 20–22)

20. **Chapter card:** Scene IV, Addressing the ENIAC's Reprogramming Problem

**The problem**

21. *Problem II · Reprogramming:* The ENIAC did not have any notion of a stored program.
    *It needed humans to rewire it physically to implement different programs on it.*
    Picture: `m02-eniac-women-programmers.gif` (Fig. 9, Two of the six women who programmed ENIAC, at its cable panels)
**The solution**

22. This cable work, was tiresome, and recognized as a bottleneck that had to be resolved.
    *The solution:* The stored-program computer: keep the program in memory, alongside the data. This ame up in later programs. We delve no further, since this is the outside the scope of the project.
    *A new program meant loading new instructions, not rewiring the machine.*

---

## Scene V · Addressing the ENIAC's Debugging Problem (slides 23–39)

23. **Chapter card:** Scene V, Addressing the ENIAC's Debugging Problem

**The problem**

24. *Problem III · Debugging:* Debugging ENIAC was hard and required a lot of man hours.
    Diagram: a ring of ten lamps for one decimal digit, with 6 lit)
    Each accumulator had a series of bulbs connected to it signalling the value stored by it.
    *This was logged by humans and then used to debug the program/ find a faulty accumulator.*
25. *The debugging problem:* Watching bulbs and noting down values was tiresome, needed more labour and an overkill for most simple debugging cases
    *Like finding out if the program has halted, entered an infinite loop, is stalling, etc.*

**The solution**

26. *The solution:* This problem was solved by introducing hooters.
    Picture: `m04-electronic-hooter.webp` (Fig. 10, An electronic hooter, a modern panel-mounted example)
27. **Plate, The Hooter** (diagram: voltage on a wire → coil and diaphragm → sound)
    Caption: These were electricity to sound transducers.
    They were of two kinds: Passive Sonification and Active Audio.
28. **Plate, Passive Sonification** (diagram: a sensor on a wire drives a speaker; rate of change → pitch)
    Caption: Passive sonification referred to hardware eavesdropping by connecting small electrical components on a wire that sensed voltage switches and converted the rate of voltage change to sound.
29. **Live demonstration · Passive sonification:** *The speaker eavesdrops on a register.*
    Simulator opens on "Counting: speaker follows a register bit", wired to bit 0 of register A.
    On screen: Press Run. Counting up flips bit 0 on every pass, so the arithmetic itself makes the tone.
30. **Plate, Active Audio** (diagram: a program with a HOOT instruction pulses the speaker; how often → pitch)
    Caption: Active audio referred to having special instructions which specifically signalled the transducer. The frequency of these signals was converted to sound of different pitches.
31. **Live demonstration · Active audio:** *The program calls the speaker.*
    Simulator opens on "One tight loop: a steady tone", wired to the HOOT instruction. Its Program menu lists only the five programs written directly in code (no songs).
    On screen: Press Run. One HOOT per trip round the loop gives a steady tone. Try Slow motion to see each pulse.
32. Now a person could just walk into the room and identify the stage of progress made by the program.
    *Debugging was also possible and reduced the amount of labour needed immensely.*
33. Sound becomes music: This relation between computers and sound has so far only been a one way street, but the next steps in technology change this dynamic.
    *Sound becomes Music.*
34. *Elementary observations* (revealed one at a time):
    - I. Like we saw, hooters work by receiving signals from specially designed instructions.
    - II. Precisely controlling the intervals between successive clicks can control the perceived pitch.
35. *Elementary observations · 3:* However a 1-bit speaker was too rudimentary to be able to create good music. It lacked the ability to create smooth sound waves.
    Pictures side by side: `m04-spectrogram-table.png` (Banging a table: separate clicks, like a 1-bit speaker) and `m04-spectrogram-singing.png` (Singing sa re ga ma: smooth, continuous tones)
36. *A new field:* The field that worked on this problem was called "Computer Music" and "Digital Sound Synthesis".
    *It falls into the realm of what is today called "Digital Signal Processing".*
    *Several audios of digitally created music have been filmed as the field progressed.*
37. **Demonstrations · the listening bench:** *Listening to a program.*
    The live simulator (`demos/transducer_simulator.html`) with a menu of five experiments; clicking one loads it:
    - I. Debugging by ear: a loop that never ends, you hear the hum (opens on this one)
    - II. Passive sonification: the speaker eavesdrops on bit 0 of a register
    - III. Active audio: a HOOT instruction pulses the speaker
    - IV. Which branch is running? Two loops, two pitches
    - V. From signal to song: God Save the King, as on the Ferranti Mark 1 (1951)

38. **Recording · CSIRAC** (Sydney, Australia · Mid-1951)
    Picture: `m04-csirac.jpg` (Fig. 16, CSIRAC, Australia's first computer). Audio: `audio/m04-csirac-1951.m4a` (0:39)
    Played: "Colonel Bogey March", "In Cellar Cool" · Programmed by: Geoff Hill, Trevor Pearcey
    Technology, 1-bit delay-line pulse audio: Data was arranged inside mercury acoustic delay-line memory so that cyclic bit readouts pulsed the diagnostic speaker coil at audible frequencies. *Built on the mercury delay lines of Scene III.*
39. **Recording · Ferranti Mark 1** (Manchester, UK · Autumn 1951)
    Picture: `m04-ferranti-mark1.gif` (Fig. 17, The Ferranti Mark 1, Manchester). Audio: `audio/m04-ferranti-mark1-1951.m4a` (1:45)
    Played: "God Save the King", "Baa, Baa, Black Sheep", "In the Mood" · Programmed by: Christopher Strachey
    Technology, 1-bit programmed opcode: Strachey used the machine's dedicated single-pulse hooter instruction inside cycle-counted CPU delay loops, recorded on-site by a BBC mobile broadcast unit. *Active audio, exactly as on the demonstration bench.*

---

## Scene VI · Electrical Musical Compositions (slides 40–41)

40. **The Silver Scale** (Bell Labs, New Jersey · 1957)
    Video: https://youtu.be/PM64-lqYyZ8 (click the poster to play; "Open on YouTube" as a backup)
    Composed by: Newman Guttman · Program: MUSIC I, by Max Mathews, on an IBM 704
    Technology, digital sound synthesis: The computer calculated every sample of the sound wave as a number. The numbers were written to tape, and a digital-to-analog converter turned them back into sound.
    *The first truly digitally synthesized music: not a speaker switched on and off, but the waveform itself computed.*

41. **Later developments** (*Zooming out · later developments*): From computing sound to capturing it (three columns, revealed one at a time)
    - 1948 · Analog sampling: Real sounds recorded on disc and tape, then cut, looped and replayed as an instrument, years before computers made music.
    - 1957 · Digital synthesis: The computer calculates the waveform sample by sample; a DAC turns the numbers into sound.
    - 1969–1979 · Digital sampling: An ADC and fast memory let the computer record real sound and play it back from a keyboard.
    *Together these grew into digital signal processing: the basis of every music app today.*
---

## Closing (slide 42)

42. **Thank you**: the letters march in from the right, in step, while the Ferranti Mark 1 plays *God Save the King* (14 s of `audio/m04-ferranti-mark1-1951.m4a` (1.3–15.3 s), then a fade). The letters stop marching when the music stops.
    *♪ God Save the King · played by the Ferranti Mark 1, Manchester, 1951*

---

## Still to build

- **Scene VI:** more electrical musical compositions after 1957 (from the original section 5)
- **Scene VII:** The rest of the coevolution of music, sound and computing (from the original section 6)

---

## References

1. https://cdnsm5-ss1.sharpschool.com/UserFiles/Servers/Server_10640642/File/bugge/Chapter%2026/History%20of%20ENIAC.pdf
2. https://historic-times.com/ada-lovelace-first-computer-programmer/
3. https://www.jstor.org/stable/10.4169/mathhorizons.24.3.26?seq=1
4. ENIAC photograph (slide 13): U.S. Army photo, public domain, via Wikimedia Commons (`Eniac.jpg`)
5. The Silver Scale (1957), Newman Guttman: https://youtu.be/PM64-lqYyZ8
6. Ada Lovelace portrait (slide 7): watercolour by Alfred Edward Chalon, c. 1840, public domain, via Wikimedia Commons (`Ada_Lovelace_portrait.jpg`)
