(function () {
  'use strict';

  // Curated, static learning questions. No runtime AI, external service, account, or tracking.
  const puzzles = [
  {
    "id": "pattern-e-01",
    "category": "Pattern Recognition",
    "difficulty": "Easy",
    "prompt": "What number comes next in the sequence?",
    "visual": "4  ·  7  ·  10  ·  13  ·  ?",
    "choices": [
      "14",
      "15",
      "16",
      "17"
    ],
    "answer": "16",
    "explanation": "Each number is 3 more than the one before it: 4, 7, 10, 13, then 16.",
    "points": 10
  },
  {
    "id": "pattern-e-02",
    "category": "Pattern Recognition",
    "difficulty": "Easy",
    "prompt": "What number completes this sequence?",
    "visual": "3  ·  6  ·  12  ·  24  ·  ?",
    "choices": [
      "36",
      "42",
      "48",
      "54"
    ],
    "answer": "48",
    "explanation": "Each step doubles the previous number: 24 × 2 = 48.",
    "points": 10
  },
  {
    "id": "pattern-e-03",
    "category": "Pattern Recognition",
    "difficulty": "Easy",
    "prompt": "Which shape comes next in this alternating pattern?",
    "visual": "▲  ·  ○  ·  ▲  ·  ○  ·  ?",
    "choices": [
      "○",
      "▲",
      "□",
      "◆"
    ],
    "answer": "▲",
    "explanation": "The pattern alternates triangle, circle. After the second circle, the next shape is a triangle.",
    "points": 10
  },
  {
    "id": "pattern-m-01",
    "category": "Pattern Recognition",
    "difficulty": "Medium",
    "prompt": "What number comes next?",
    "visual": "1  ·  4  ·  9  ·  16  ·  ?",
    "choices": [
      "20",
      "24",
      "25",
      "36"
    ],
    "answer": "25",
    "explanation": "These are consecutive square numbers: 1², 2², 3², 4². The next is 5² = 25.",
    "points": 10
  },
  {
    "id": "pattern-m-02",
    "category": "Pattern Recognition",
    "difficulty": "Medium",
    "prompt": "What number completes the sequence?",
    "visual": "3  ·  8  ·  18  ·  38  ·  ?",
    "choices": [
      "58",
      "68",
      "78",
      "88"
    ],
    "answer": "78",
    "explanation": "Each term is doubled and then 2 is added: 3×2+2=8, 8×2+2=18, and so on. So 38×2+2=78.",
    "points": 10
  },
  {
    "id": "pattern-m-03",
    "category": "Pattern Recognition",
    "difficulty": "Medium",
    "prompt": "Which letter comes next?",
    "visual": "C  ·  F  ·  J  ·  O  ·  ?",
    "choices": [
      "T",
      "U",
      "V",
      "W"
    ],
    "answer": "U",
    "explanation": "The letter positions increase by 3, then 4, then 5. The next jump is 6: O is the 15th letter, and 15+6=21, which is U.",
    "points": 10
  },
  {
    "id": "pattern-m-04",
    "category": "Pattern Recognition",
    "difficulty": "Medium",
    "prompt": "What number comes next?",
    "visual": "81  ·  27  ·  9  ·  3  ·  ?",
    "choices": [
      "0",
      "1",
      "2",
      "6"
    ],
    "answer": "1",
    "explanation": "Each term is divided by 3: 81, 27, 9, 3, then 1.",
    "points": 10
  },
  {
    "id": "pattern-h-01",
    "category": "Pattern Recognition",
    "difficulty": "Hard",
    "prompt": "What number completes this sequence?",
    "visual": "2  ·  5  ·  11  ·  23  ·  47  ·  ?",
    "choices": [
      "93",
      "94",
      "95",
      "96"
    ],
    "answer": "95",
    "explanation": "Each term is doubled and 1 is added: 2×2+1=5, 5×2+1=11, continuing to 47×2+1=95.",
    "points": 10
  },
  {
    "id": "pattern-h-02",
    "category": "Pattern Recognition",
    "difficulty": "Hard",
    "prompt": "What number comes next?",
    "visual": "1  ·  2  ·  6  ·  24  ·  120  ·  ?",
    "choices": [
      "240",
      "360",
      "600",
      "720"
    ],
    "answer": "720",
    "explanation": "The multipliers increase by one: ×2, ×3, ×4, ×5. The next multiplier is ×6, so 120×6=720.",
    "points": 10
  },
  {
    "id": "pattern-h-03",
    "category": "Pattern Recognition",
    "difficulty": "Hard",
    "prompt": "What number completes the sequence?",
    "visual": "1  ·  2  ·  4  ·  7  ·  11  ·  16  ·  ?",
    "choices": [
      "21",
      "22",
      "23",
      "24"
    ],
    "answer": "22",
    "explanation": "The increases are +1, +2, +3, +4, +5. The next increase is +6, so 16+6=22.",
    "points": 10
  },
  {
    "id": "logic-e-01",
    "category": "Logical Reasoning",
    "difficulty": "Easy",
    "prompt": "Every cedar is a tree. Which statement must be true?",
    "choices": [
      "Every tree is a cedar.",
      "Every cedar is a tree.",
      "No cedar is a tree.",
      "Some cedars are not trees."
    ],
    "answer": "Every cedar is a tree.",
    "explanation": "This is exactly what the rule says. It does not tell us that every tree is a cedar.",
    "points": 10
  },
  {
    "id": "logic-e-02",
    "category": "Logical Reasoning",
    "difficulty": "Easy",
    "prompt": "A finishes ahead of B, and B finishes ahead of C. Who must finish last?",
    "choices": [
      "A",
      "B",
      "C",
      "There is not enough information."
    ],
    "answer": "C",
    "explanation": "The order must be A, then B, then C, so C is last.",
    "points": 10
  },
  {
    "id": "logic-e-03",
    "category": "Logical Reasoning",
    "difficulty": "Easy",
    "prompt": "Tunde is taller than Rina. Rina is taller than Sam. Who is shortest?",
    "choices": [
      "Tunde",
      "Rina",
      "Sam",
      "They are the same height."
    ],
    "answer": "Sam",
    "explanation": "The height order is Tunde, Rina, then Sam. Sam is shortest.",
    "points": 10
  },
  {
    "id": "logic-m-01",
    "category": "Logical Reasoning",
    "difficulty": "Medium",
    "prompt": "Three switches control three identical incandescent bulbs in another room. You may enter the room only once. Which method identifies all three switches?",
    "choices": [
      "Turn all three on, then enter.",
      "Turn switch 1 on for several minutes, turn it off; turn switch 2 on; then enter.",
      "Turn switch 1 on and enter immediately.",
      "Turn switches 1 and 2 on, then enter."
    ],
    "answer": "Turn switch 1 on for several minutes, turn it off; turn switch 2 on; then enter.",
    "explanation": "The lit bulb belongs to switch 2. The warm, unlit bulb belongs to switch 1. The cool, unlit bulb belongs to switch 3.",
    "points": 10
  },
  {
    "id": "logic-m-02",
    "category": "Logical Reasoning",
    "difficulty": "Medium",
    "prompt": "A key is in exactly one of boxes A, B, C or D. The labels say: A “The key is in A”; B “The key is in B”; C “The key is in A or B”; D “The key is in C”. Exactly one label is true. Where is the key?",
    "choices": [
      "Box A",
      "Box B",
      "Box C",
      "Box D"
    ],
    "answer": "Box C",
    "explanation": "If the key is in C, only box D’s label is true. In A or B, two labels would be true; in D, none would be true.",
    "points": 10
  },
  {
    "id": "logic-m-03",
    "category": "Logical Reasoning",
    "difficulty": "Medium",
    "prompt": "Four books are arranged in a row. History is somewhere to the left of Science, and Art is somewhere to the right of Science. Which book must be between History and Art?",
    "choices": [
      "History",
      "Science",
      "Art",
      "It cannot be determined."
    ],
    "answer": "Science",
    "explanation": "History must be on one side of Science and Art on the other. So Science lies between them, even if another book is also in the row.",
    "points": 10
  },
  {
    "id": "logic-m-04",
    "category": "Logical Reasoning",
    "difficulty": "Medium",
    "prompt": "Four runners finish in a line. S finishes ahead of P, P ahead of Q, and Q ahead of R. Who finishes first?",
    "choices": [
      "S",
      "P",
      "Q",
      "R"
    ],
    "answer": "S",
    "explanation": "Putting the clues together gives S, P, Q, R. S is first.",
    "points": 10
  },
  {
    "id": "logic-h-01",
    "category": "Logical Reasoning",
    "difficulty": "Hard",
    "prompt": "Four people A, B, C and D sit in a row. D is first. A sits somewhere after B, and C sits somewhere before A. Who must be last?",
    "choices": [
      "A",
      "B",
      "C",
      "D"
    ],
    "answer": "A",
    "explanation": "D is already first. Among the other three, both B and C must be before A, so A must be last.",
    "points": 10
  },
  {
    "id": "logic-h-02",
    "category": "Logical Reasoning",
    "difficulty": "Hard",
    "prompt": "Five people A, B, C, D and E sit in a row. E is first, D is last, A sits immediately after B, B is not second, and C is not first. Who sits second?",
    "choices": [
      "A",
      "B",
      "C",
      "D"
    ],
    "answer": "C",
    "explanation": "The open seats are second, third and fourth. B cannot be second, and A must sit immediately after B, so B and A take third and fourth. C therefore sits second.",
    "points": 10
  },
  {
    "id": "logic-h-03",
    "category": "Logical Reasoning",
    "difficulty": "Hard",
    "prompt": "Four houses—Green, Red, Blue and Yellow—stand in a row. Blue is immediately right of Red, Green is somewhere left of Red, and Yellow is at the far right. Which house is far left?",
    "choices": [
      "Green",
      "Red",
      "Blue",
      "Yellow"
    ],
    "answer": "Green",
    "explanation": "Red and Blue must be together in that order. Green must be before Red, and Yellow is fixed at the far right. The only order is Green, Red, Blue, Yellow.",
    "points": 10
  },
  {
    "id": "observe-e-01",
    "category": "Observation",
    "difficulty": "Easy",
    "prompt": "Which shape completes the diagonal from the top-left to the bottom-right?",
    "visual": "▲   ○   ○\n○   ▲   ○\n○   ○   ?",
    "choices": [
      "○",
      "▲",
      "□",
      "◆"
    ],
    "answer": "▲",
    "explanation": "The top-left and centre positions on the diagonal are triangles. The bottom-right position continues that same diagonal.",
    "points": 10
  },
  {
    "id": "observe-e-02",
    "category": "Observation",
    "difficulty": "Easy",
    "prompt": "Which shape appears exactly once in this grid?",
    "visual": "○   △   ○\n△   □   △\n○   △   ○",
    "choices": [
      "Circle (○)",
      "Triangle (△)",
      "Square (□)",
      "All appear once."
    ],
    "answer": "Square (□)",
    "explanation": "There is one square, in the centre. The circles and triangles each appear four times.",
    "points": 10
  },
  {
    "id": "observe-e-03",
    "category": "Observation",
    "difficulty": "Easy",
    "prompt": "Which number appears exactly three times?",
    "visual": "4   8   2   8   6   1   8",
    "choices": [
      "2",
      "4",
      "6",
      "8"
    ],
    "answer": "8",
    "explanation": "Scanning the row, 8 appears in the second, fourth and seventh positions: three times.",
    "points": 10
  },
  {
    "id": "observe-m-01",
    "category": "Observation",
    "difficulty": "Medium",
    "prompt": "Which row has three triangles?",
    "visual": "Row 1:  ▲   ○   ▲   ○\nRow 2:  ○   ▲   ○   ▲\nRow 3:  ▲   ▲   ○   ▲",
    "choices": [
      "Row 1",
      "Row 2",
      "Row 3",
      "All rows have three."
    ],
    "answer": "Row 3",
    "explanation": "Row 1 has two triangles, Row 2 has two, and Row 3 has three.",
    "points": 10
  },
  {
    "id": "observe-m-02",
    "category": "Observation",
    "difficulty": "Medium",
    "prompt": "Which letter is directly below P?",
    "visual": "L   M   N\nP   Q   R\nS   T   U",
    "choices": [
      "Q",
      "L",
      "S",
      "T"
    ],
    "answer": "S",
    "explanation": "P is in the first column of the second row. The letter directly below it, in the first column of the third row, is S.",
    "points": 10
  },
  {
    "id": "observe-m-03",
    "category": "Observation",
    "difficulty": "Medium",
    "prompt": "Which word reads the same from left to right and right to left?",
    "choices": [
      "LEVEL",
      "CLEAR",
      "BUILT",
      "MIND"
    ],
    "answer": "LEVEL",
    "explanation": "LEVEL reads L-E-V-E-L in both directions.",
    "points": 10
  },
  {
    "id": "observe-m-04",
    "category": "Observation",
    "difficulty": "Medium",
    "prompt": "How many diamonds (◆) are in the grid?",
    "visual": "◆   ○   ◆   ●\n○   ◆   ●   ◆\n●   ○   ◆   ◆\n◆   ●   ○   ◆",
    "choices": [
      "6",
      "7",
      "8",
      "9"
    ],
    "answer": "8",
    "explanation": "Count the diamonds row by row: 2 in each of the 4 rows, for a total of 8.",
    "points": 10
  },
  {
    "id": "observe-h-01",
    "category": "Observation",
    "difficulty": "Hard",
    "prompt": "How many filled circles (●) are in the grid?",
    "visual": "●   ○   ●   ●\n○   ●   ○   ●\n●   ●   ○   ○\n○   ●   ●   ○",
    "choices": [
      "8",
      "9",
      "10",
      "11"
    ],
    "answer": "9",
    "explanation": "Counting the filled circles row by row gives 3 + 2 + 2 + 2 = 9.",
    "points": 10
  },
  {
    "id": "observe-h-02",
    "category": "Observation",
    "difficulty": "Hard",
    "prompt": "In the letter grid, which letter is one row down and one column right from F?",
    "visual": "A   B   C   D\nE   F   G   H\nI   J   K   L\nM   N   O   P",
    "choices": [
      "G",
      "J",
      "K",
      "N"
    ],
    "answer": "K",
    "explanation": "F is in row 2, column 2. Moving down one row and right one column lands at row 3, column 3: K.",
    "points": 10
  },
  {
    "id": "observe-h-03",
    "category": "Observation",
    "difficulty": "Hard",
    "prompt": "Each row continues the same four-direction cycle. Which arrow completes the grid?",
    "visual": "↑   →   ↓\n←   ↑   →\n↓   ←   ?",
    "choices": [
      "←",
      "↑",
      "→",
      "↓"
    ],
    "answer": "↑",
    "explanation": "Reading across each row, the arrows repeat ↑, →, ↓, ←. After ↓ and ←, the next arrow is ↑.",
    "points": 10
  },
  {
    "id": "create-e-01",
    "category": "Creative Problem-Solving",
    "difficulty": "Easy",
    "prompt": "You have one sheet of paper and may make one straight cut. How can you make two equal pieces?",
    "choices": [
      "Cut one edge only.",
      "Fold the paper in half, then cut along the fold.",
      "Tear off a corner.",
      "Cut a small strip from the middle."
    ],
    "answer": "Fold the paper in half, then cut along the fold.",
    "explanation": "Folding aligns the two halves. Cutting along the fold separates them into equal-sized pieces.",
    "points": 10
  },
  {
    "id": "create-e-02",
    "category": "Creative Problem-Solving",
    "difficulty": "Easy",
    "prompt": "A flat sheet starts as one piece. You need at least 8 pieces using straight cuts that may cross. What is the fewest cuts needed?",
    "choices": [
      "2",
      "3",
      "4",
      "8"
    ],
    "answer": "4",
    "explanation": "With three straight cuts, the greatest possible number of regions is 7. A fourth cut can make at least 8, so four is the minimum.",
    "points": 10
  },
  {
    "id": "create-e-03",
    "category": "Creative Problem-Solving",
    "difficulty": "Easy",
    "prompt": "Insert + or × between 1, 2 and 3, keeping their order, to make 7. Use standard order of operations.",
    "visual": "1   ?   2   ?   3   =   7",
    "choices": [
      "1 + 2 + 3",
      "1 × 2 × 3",
      "1 + 2 × 3",
      "(1 + 2) × 3"
    ],
    "answer": "1 + 2 × 3",
    "explanation": "Multiplication is done before addition: 2×3=6, then 1+6=7.",
    "points": 10
  },
  {
    "id": "create-m-01",
    "category": "Creative Problem-Solving",
    "difficulty": "Medium",
    "prompt": "You have an unmarked 3-litre jug and 5-litre jug, with unlimited water. Which sequence leaves exactly 4 litres in the 5-litre jug?",
    "choices": [
      "Fill 5; pour into 3; empty 3; pour the remaining 2 into 3; refill 5; pour into 3 until full.",
      "Fill 3 twice and pour into 5.",
      "Fill 5 and pour half into 3.",
      "Fill both jugs and empty the 3-litre jug."
    ],
    "answer": "Fill 5; pour into 3; empty 3; pour the remaining 2 into 3; refill 5; pour into 3 until full.",
    "explanation": "After the first pour, 2 litres remain in the 5-litre jug. Move those 2 litres to the empty 3-litre jug. When you refill the 5-litre jug, only 1 litre is needed to fill the 3-litre jug, leaving exactly 4.",
    "points": 10
  },
  {
    "id": "create-m-02",
    "category": "Creative Problem-Solving",
    "difficulty": "Medium",
    "prompt": "Using standard seven-segment matchstick digits, move exactly one matchstick between the digits in this incorrect equation to make it true. Which move works?",
    "visual": "3  +  9  =  5",
    "choices": [
      "Move the upper-left match from 9 to the lower-left side of 5, making 3 + 3 = 6.",
      "Move the upper-right match from 9 to the lower-left side of 5, making 3 + 5 = 6.",
      "Move the upper-left match from 9 to the upper-right side of 5, making 3 + 3 = 9.",
      "Move the middle match from 9 to the lower-left side of 5, making 3 + 0 = 6."
    ],
    "answer": "Move the upper-left match from 9 to the lower-left side of 5, making 3 + 3 = 6.",
    "explanation": "In a standard seven-segment display, removing the upper-left segment changes 9 into 3. Placing that match on the lower-left segment of 5 changes it into 6, so 3+3=6.",
    "points": 10
  },
  {
    "id": "create-m-03",
    "category": "Creative Problem-Solving",
    "difficulty": "Medium",
    "prompt": "One of 10 identical-looking coins is lighter. Using a balance scale, what is the fewest number of weighings needed to guarantee finding it?",
    "choices": [
      "1",
      "2",
      "3",
      "5"
    ],
    "answer": "3",
    "explanation": "A first weighing narrows the lighter coin to a group. A second divides that group further, and a third comparison can identify the coin. Two weighings cannot distinguish all 10 possibilities.",
    "points": 10
  },
  {
    "id": "create-m-04",
    "category": "Creative Problem-Solving",
    "difficulty": "Medium",
    "prompt": "Six identical cups are in a row: the first three are full and the last three are empty. Lift one cup, pour its water into another cup, then replace it. Which move creates the pattern full, empty, full, empty, full, empty?",
    "visual": "F   F   F   E   E   E\nF = full   ·   E = empty",
    "choices": [
      "Pour cup 1 into cup 4.",
      "Pour cup 2 into cup 5.",
      "Pour cup 3 into cup 4.",
      "Move cup 6 beside cup 1."
    ],
    "answer": "Pour cup 2 into cup 5.",
    "explanation": "Pouring cup 2 into cup 5 empties the second position and fills the fifth. The row becomes full, empty, full, empty, full, empty.",
    "points": 10
  },
  {
    "id": "create-h-01",
    "category": "Creative Problem-Solving",
    "difficulty": "Hard",
    "prompt": "Two ropes each take exactly 60 minutes to burn, but burn unevenly. With a lighter, how can you measure exactly 45 minutes?",
    "choices": [
      "Light rope 1 at both ends and rope 2 at one end; when rope 1 ends, light the other end of rope 2.",
      "Light both ropes at one end and wait until one is half-burned.",
      "Light rope 1 at one end and rope 2 at both ends; when rope 2 ends, stop.",
      "Light both ropes at both ends and wait 45 minutes."
    ],
    "answer": "Light rope 1 at both ends and rope 2 at one end; when rope 1 ends, light the other end of rope 2.",
    "explanation": "Rope 1 burns out in 30 minutes when lit at both ends. Rope 2 has then burned for 30 minutes from one end, leaving 30 minutes of burn-time. Lighting its other end makes that remainder burn in 15 minutes. Total: 30+15=45.",
    "points": 10
  },
  {
    "id": "create-h-02",
    "category": "Creative Problem-Solving",
    "difficulty": "Hard",
    "prompt": "There are 25 horses, 5 tracks, and no stopwatch. In one race, at most 5 horses can run; only race order is known. What is the fewest races needed to identify the three fastest horses?",
    "choices": [
      "5",
      "6",
      "7",
      "8"
    ],
    "answer": "7",
    "explanation": "Race five groups, then race the five group winners (6 races). From those rankings, only five horses can still be second or third overall. Race those five once more: the overall winner is already known, and the top two in this final race complete the top three. Total: 7.",
    "points": 10
  },
  {
    "id": "create-h-03",
    "category": "Creative Problem-Solving",
    "difficulty": "Hard",
    "prompt": "Four people must cross a bridge at night with one torch. At most two cross at once, and a pair moves at the slower person’s speed. Their times are 1, 2, 7 and 10 minutes. What is the minimum total time?",
    "choices": [
      "17 minutes",
      "18 minutes",
      "19 minutes",
      "20 minutes"
    ],
    "answer": "17 minutes",
    "explanation": "The 1- and 2-minute walkers cross (2), the 1-minute walker returns (1), the 7- and 10-minute walkers cross (10), the 2-minute walker returns (2), and the 1- and 2-minute walkers cross again (2). Total: 2+1+10+2+2=17.",
    "points": 10
  },
  {
    "id": "quick-e-01",
    "category": "Quick Thinking",
    "difficulty": "Easy",
    "prompt": "What is the value of 18 ÷ 3 + 2?",
    "choices": [
      "4",
      "8",
      "10",
      "12"
    ],
    "answer": "8",
    "explanation": "Division comes before addition: 18÷3=6, then 6+2=8.",
    "points": 10
  },
  {
    "id": "quick-e-02",
    "category": "Quick Thinking",
    "difficulty": "Easy",
    "prompt": "A cyclist travels at a steady 60 kilometres per hour. How far does the cyclist travel in 30 minutes?",
    "choices": [
      "20 km",
      "30 km",
      "40 km",
      "60 km"
    ],
    "answer": "30 km",
    "explanation": "Thirty minutes is half an hour. At 60 km per hour, half an hour covers 30 km.",
    "points": 10
  },
  {
    "id": "quick-e-03",
    "category": "Quick Thinking",
    "difficulty": "Easy",
    "prompt": "You have 5 apples and give 2 away. How many apples do you have left?",
    "choices": [
      "2",
      "3",
      "5",
      "7"
    ],
    "answer": "3",
    "explanation": "Starting with 5 and giving away 2 leaves 5−2=3 apples.",
    "points": 10
  },
  {
    "id": "quick-m-01",
    "category": "Quick Thinking",
    "difficulty": "Medium",
    "prompt": "A bell takes 8 seconds from its first chime to its fifth. If the spacing stays the same, how long does it take from the first chime to the fourth?",
    "choices": [
      "4 seconds",
      "6 seconds",
      "8 seconds",
      "10 seconds"
    ],
    "answer": "6 seconds",
    "explanation": "Five chimes create four equal intervals, so each interval is 8÷4=2 seconds. Four chimes create three intervals: 3×2=6 seconds.",
    "points": 10
  },
  {
    "id": "quick-m-02",
    "category": "Quick Thinking",
    "difficulty": "Medium",
    "prompt": "Three machines make three toys in three minutes at the same steady rate. How many toys do nine identical machines make in three minutes?",
    "choices": [
      "3",
      "6",
      "9",
      "27"
    ],
    "answer": "9",
    "explanation": "Each machine makes one toy in three minutes. Nine machines therefore make nine toys in that time.",
    "points": 10
  },
  {
    "id": "quick-m-03",
    "category": "Quick Thinking",
    "difficulty": "Medium",
    "prompt": "Which number between 20 and 30 is divisible by both 6 and 8?",
    "choices": [
      "22",
      "24",
      "26",
      "28"
    ],
    "answer": "24",
    "explanation": "24÷6=4 and 24÷8=3, so 24 is divisible by both.",
    "points": 10
  },
  {
    "id": "quick-m-04",
    "category": "Quick Thinking",
    "difficulty": "Medium",
    "prompt": "A minute hand starts at 12 and turns 135° clockwise. How many minutes past the hour does it point?",
    "choices": [
      "15 minutes",
      "20 minutes",
      "22½ minutes",
      "30 minutes"
    ],
    "answer": "22½ minutes",
    "explanation": "One full 360° turn takes 60 minutes, so each minute is 6°. Dividing 135° by 6° gives 22.5 minutes.",
    "points": 10
  },
  {
    "id": "quick-h-01",
    "category": "Quick Thinking",
    "difficulty": "Hard",
    "prompt": "A bag contains red and blue socks, and you cannot see inside. What is the fewest number of socks to take to guarantee a matching-colour pair?",
    "choices": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": "3",
    "explanation": "With two colours, the first two socks could be one of each. The third must match one of those colours.",
    "points": 10
  },
  {
    "id": "quick-h-02",
    "category": "Quick Thinking",
    "difficulty": "Hard",
    "prompt": "What is the smallest positive whole number divisible by 4, 5 and 6?",
    "choices": [
      "30",
      "40",
      "50",
      "60"
    ],
    "answer": "60",
    "explanation": "The least common multiple is 2²×3×5=60. Smaller listed multiples fail to divide evenly by at least one of 4, 5 or 6.",
    "points": 10
  },
  {
    "id": "quick-h-03",
    "category": "Quick Thinking",
    "difficulty": "Hard",
    "prompt": "A car travels 50 km at 50 km/h, then returns 50 km at 100 km/h. What is its average speed for the whole 100 km trip?",
    "choices": [
      "60 km/h",
      "66⅔ km/h",
      "75 km/h",
      "100 km/h"
    ],
    "answer": "66⅔ km/h",
    "explanation": "The outward trip takes 1 hour and the return takes 0.5 hour. Average speed is total distance divided by total time: 100÷1.5=66⅔ km/h.",
    "points": 10
  },
  {
    "id": "english-language-easy-01",
    "difficulty": "Easy",
    "prompt": "What does reluctant mean in “Ravi was reluctant to speak first”?",
    "choices": [
      "Hesitant or unwilling",
      "Eager to begin",
      "Unable to understand",
      "Proud of an achievement"
    ],
    "answer": "Hesitant or unwilling",
    "explanation": "Reluctant means hesitant or unwilling to do something. The sentence suggests Ravi did not feel ready to speak first.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-easy-02",
    "difficulty": "Easy",
    "prompt": "Choose the verb: “Each of the lanterns ___ a different color.”",
    "choices": [
      "glow",
      "glows",
      "glowing",
      "have glowed"
    ],
    "answer": "glows",
    "explanation": "The subject is “each,” which is singular, so it takes the singular verb “glows.” The phrase “of the lanterns” does not change the subject.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-easy-03",
    "difficulty": "Easy",
    "prompt": "Which sentence correctly punctuates a direct address?",
    "choices": [
      "Thanks, Lee, for your help.",
      "Thanks Lee for your help.",
      "Thanks, Lee for your help.",
      "Thanks Lee, for your help."
    ],
    "answer": "Thanks, Lee, for your help.",
    "explanation": "A name used to address someone directly is set off with commas. Here, “Lee” is addressed within the sentence, so it needs a comma on both sides.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-medium-01",
    "difficulty": "Medium",
    "prompt": "Dark clouds gathered, and Mina hurried to bring the laundry indoors. What is most reasonable to infer?",
    "choices": [
      "She thinks rain may arrive soon.",
      "She plans to wash the laundry again.",
      "She wants the laundry to get wetter.",
      "She has decided to leave the laundry outside overnight."
    ],
    "answer": "She thinks rain may arrive soon.",
    "explanation": "The dark clouds and Mina's quick action together suggest she expects rain. An inference combines clues from the text with reasonable background knowledge.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-medium-02",
    "difficulty": "Medium",
    "prompt": "The root bene- often means “good” or “well.” What does benevolent most nearly mean?",
    "choices": [
      "Kind and well-meaning",
      "Likely to cause harm",
      "Unable to make a choice",
      "Easily forgotten"
    ],
    "answer": "Kind and well-meaning",
    "explanation": "Benevolent describes someone who is kind and wishes others well. Recognizing bene- in words such as “benefit” can help reveal a positive meaning.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-medium-03",
    "difficulty": "Medium",
    "prompt": "Which sentence uses parallel structure?",
    "choices": [
      "The club plans to paint a mural, plant flowers, and clean the park.",
      "The club plans painting a mural, to plant flowers, and clean the park.",
      "The club plans to paint a mural, planting flowers, and to clean the park.",
      "The club plans to paint a mural, flowers are planted, and clean the park."
    ],
    "answer": "The club plans to paint a mural, plant flowers, and clean the park.",
    "explanation": "The three actions use matching verb forms: “paint,” “plant,” and “clean.” Parallel structure makes lists easier to read and compare.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-medium-04",
    "difficulty": "Medium",
    "prompt": "What figure of speech appears in “The old house groaned in the wind”?",
    "choices": [
      "Personification",
      "Simile",
      "Alliteration",
      "Understatement"
    ],
    "answer": "Personification",
    "explanation": "Personification gives a nonhuman thing a human action or quality. “Groaned” describes the house as if it could make a human sound.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-hard-01",
    "difficulty": "Hard",
    "prompt": "Which sentence uses a semicolon correctly to join two independent clauses?",
    "choices": [
      "The room was quiet; everyone had finished speaking.",
      "The room was quiet; because everyone had finished speaking.",
      "The room; everyone had finished speaking quietly.",
      "Because everyone had finished speaking; the room was quiet."
    ],
    "answer": "The room was quiet; everyone had finished speaking.",
    "explanation": "A semicolon can join two closely related independent clauses, each of which could stand as a sentence. The clause after the semicolon in the correct choice is complete on its own.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-hard-02",
    "difficulty": "Hard",
    "prompt": "Revise the sentence to make clear that Casey said the report was ready: “After Jordan spoke with Casey, they said the report was ready.”",
    "choices": [
      "After Jordan spoke with Casey, they said the report was ready.",
      "Casey told Jordan that the report was ready.",
      "Jordan told Casey that the report was ready.",
      "Jordan and Casey said the report was ready."
    ],
    "answer": "Casey told Jordan that the report was ready.",
    "explanation": "The pronoun “they” in the original could refer to Jordan or Casey. Naming Casey as the speaker removes that ambiguity and preserves the requested meaning.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "english-language-hard-03",
    "difficulty": "Hard",
    "prompt": "“Although the survey received hundreds of responses, it left out residents who could not access the online form.” What role does the opening clause play?",
    "choices": [
      "It concedes a positive feature before stating a limitation.",
      "It gives the survey's final recommendation.",
      "It explains why some residents could not access the form.",
      "It proves that the results represent every resident."
    ],
    "answer": "It concedes a positive feature before stating a limitation.",
    "explanation": "An “although” clause often acknowledges a point before introducing a qualification. Here, the large response is noted, then the sentence explains who may be missing.",
    "category": "English & Language",
    "points": 10
  },
  {
    "id": "general-studies-easy-01",
    "difficulty": "Easy",
    "prompt": "Which voting practice helps people choose without others seeing their selection?",
    "choices": [
      "A secret ballot",
      "A public show of hands",
      "A signed open list",
      "A spoken vote in a meeting"
    ],
    "answer": "A secret ballot",
    "explanation": "A secret ballot keeps each voter's choice private. Privacy can help people vote freely without pressure or fear of judgment.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-easy-02",
    "difficulty": "Easy",
    "prompt": "What is a census primarily used to do?",
    "choices": [
      "Count a population and collect information about it",
      "Set the interest rate for a country’s currency",
      "Decide the outcome of every court case",
      "Predict the weather for the next week"
    ],
    "answer": "Count a population and collect information about it",
    "explanation": "A census is a systematic count of a population and often collects basic demographic information. Governments can use census data for planning and representation.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-easy-03",
    "difficulty": "Easy",
    "prompt": "If demand for a product rises while its supply stays the same, what often happens to its price, all else equal?",
    "choices": [
      "It tends to rise",
      "It must fall to zero",
      "It always stays unchanged",
      "It becomes unrelated to supply"
    ],
    "answer": "It tends to rise",
    "explanation": "When more buyers want a limited supply, they may compete by offering more, which tends to push the price up. This is a general tendency, not a guarantee in every market.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-medium-01",
    "difficulty": "Medium",
    "prompt": "Which statement best describes representative democracy?",
    "choices": [
      "People elect representatives to make public decisions on their behalf",
      "A hereditary ruler makes all public decisions",
      "Courts select every public official for life",
      "Citizens decide every policy directly, with no elected representatives"
    ],
    "answer": "People elect representatives to make public decisions on their behalf",
    "explanation": "In a representative democracy, people choose officials to debate and make decisions for the public. Elections allow voters to select or replace those representatives.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-medium-02",
    "difficulty": "Medium",
    "prompt": "What is an import tariff?",
    "choices": [
      "A tax on goods brought into a country",
      "A limit on the number of goods a factory can produce",
      "A payment made to a household by an employer",
      "A rule that sets the exchange rate between two currencies"
    ],
    "answer": "A tax on goods brought into a country",
    "explanation": "An import tariff is a tax charged on goods entering a country. Tariffs can affect the price of imported goods and trade between countries.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-medium-03",
    "difficulty": "Medium",
    "prompt": "Which statement best describes inflation?",
    "choices": [
      "A general rise in prices over time that reduces what money can buy",
      "A fall in the number of people who have jobs",
      "A rise in the amount of goods a country exports",
      "A one-time change in the price of a single item"
    ],
    "answer": "A general rise in prices over time that reduces what money can buy",
    "explanation": "Inflation means prices are rising broadly over time, so a given amount of money usually buys less than before. A price change affecting only one item is not, by itself, general inflation.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-medium-04",
    "difficulty": "Medium",
    "prompt": "Which idea is strongly associated with England's Magna Carta of 1215?",
    "choices": [
      "A monarch's authority can be limited by law",
      "All adults immediately gained the right to vote",
      "England became a republic",
      "The first national parliament was created"
    ],
    "answer": "A monarch's authority can be limited by law",
    "explanation": "Magna Carta challenged the idea that a ruler could act entirely above the law. Its legacy is associated with limits on royal power and the principle that rulers are subject to law.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-hard-01",
    "difficulty": "Hard",
    "prompt": "Why do many constitutional systems divide government powers among branches?",
    "choices": [
      "To limit concentrated power through separate responsibilities and checks",
      "To ensure each branch follows the same political views",
      "To prevent courts from interpreting laws",
      "To make elections unnecessary"
    ],
    "answer": "To limit concentrated power through separate responsibilities and checks",
    "explanation": "Separating powers gives different institutions distinct roles and ways to check one another. This can reduce the risk that authority is concentrated in a single office or group.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-hard-02",
    "difficulty": "Hard",
    "prompt": "Unemployment fell after a job program began. What evidence would best help show whether the program caused the drop?",
    "choices": [
      "Compare with a similar area without the program over the same period",
      "Ask program organizers whether they believe it worked",
      "Count how many people attended the program's opening event",
      "Check whether unemployment was high in the area many years earlier"
    ],
    "answer": "Compare with a similar area without the program over the same period",
    "explanation": "A similar comparison area can help show what might have happened without the program. This makes it easier to separate the program's effect from wider changes occurring at the same time.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "general-studies-hard-03",
    "difficulty": "Hard",
    "prompt": "Why can GDP per person give an incomplete picture of people's economic well-being?",
    "choices": [
      "It does not show how income is distributed among people",
      "It counts only goods sold across national borders",
      "It automatically makes every country's prices equal",
      "It measures currency value rather than production"
    ],
    "answer": "It does not show how income is distributed among people",
    "explanation": "GDP per person is an average, so it can hide large differences between higher- and lower-income groups. It is useful for comparing production per resident, but it does not describe how benefits are shared.",
    "category": "General Studies",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-easy-01",
    "difficulty": "Easy",
    "prompt": "Which imaginary line divides Earth into the Northern and Southern Hemispheres?",
    "choices": [
      "The Equator",
      "The Prime Meridian",
      "The Tropic of Cancer",
      "The International Date Line"
    ],
    "answer": "The Equator",
    "explanation": "The Equator circles Earth halfway between the poles and separates the Northern and Southern Hemispheres. The Prime Meridian instead divides the Eastern and Western Hemispheres by convention.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-easy-02",
    "difficulty": "Easy",
    "prompt": "Which two seas are linked by the Suez Canal?",
    "choices": [
      "The Mediterranean Sea and the Red Sea",
      "The Black Sea and the Caspian Sea",
      "The Baltic Sea and the North Sea",
      "The Caribbean Sea and the Gulf of Mexico"
    ],
    "answer": "The Mediterranean Sea and the Red Sea",
    "explanation": "The Suez Canal crosses Egypt and links the Mediterranean Sea with the Red Sea. This route lets ships travel between Europe and Asia without sailing around Africa.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-easy-03",
    "difficulty": "Easy",
    "prompt": "What is a common role of an embassy?",
    "choices": [
      "Representing its government and supporting official relations",
      "Making the host country's laws",
      "Running elections in the host country",
      "Controlling all travel across the host country's borders"
    ],
    "answer": "Representing its government and supporting official relations",
    "explanation": "An embassy represents one country in another and helps maintain official communication between their governments. It may also assist its country's citizens abroad, though it does not govern the host country.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-medium-01",
    "difficulty": "Medium",
    "prompt": "Into which sea does the Danube River flow?",
    "choices": [
      "The Black Sea",
      "The Adriatic Sea",
      "The Baltic Sea",
      "The North Sea"
    ],
    "answer": "The Black Sea",
    "explanation": "The Danube flows eastward across or along several European countries and reaches the Black Sea through its delta. Its route has long connected communities across central and southeastern Europe.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-medium-02",
    "difficulty": "Medium",
    "prompt": "Which areas are central to UNESCO's international cooperation work?",
    "choices": [
      "Education, science, and culture",
      "Military alliances and collective defense",
      "Global currency and central-bank policy",
      "International criminal prosecutions"
    ],
    "answer": "Education, science, and culture",
    "explanation": "UNESCO is the United Nations Educational, Scientific and Cultural Organization. It promotes cooperation in education, science, culture, and communication.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-medium-03",
    "difficulty": "Medium",
    "prompt": "What do the Geneva Conventions chiefly establish?",
    "choices": [
      "Rules to protect people affected by armed conflict",
      "Standards for setting international shipping prices",
      "A process for recognizing new national borders",
      "Rules for forming regional trade unions"
    ],
    "answer": "Rules to protect people affected by armed conflict",
    "explanation": "The Geneva Conventions set humanitarian rules for armed conflict, including protections for wounded people, prisoners of war, and civilians. They are a foundation of international humanitarian law.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-medium-04",
    "difficulty": "Medium",
    "prompt": "What temperature goal is stated in the Paris Agreement?",
    "choices": [
      "Keep warming well below 2°C and pursue efforts to limit it to 1.5°C",
      "Keep warming below 4°C by requiring every country to use one energy source",
      "Return global temperatures to pre-industrial levels by a fixed year",
      "Limit warming to 1.5°C solely by ending international trade"
    ],
    "answer": "Keep warming well below 2°C and pursue efforts to limit it to 1.5°C",
    "explanation": "The Paris Agreement calls for holding the increase in global average temperature to well below 2°C above pre-industrial levels and pursuing efforts to limit it to 1.5°C. It does not prescribe one identical energy policy for every country.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-hard-01",
    "difficulty": "Hard",
    "prompt": "What does a coastal state's exclusive economic zone (EEZ) chiefly give it?",
    "choices": [
      "Sovereign rights over natural resources, without full sovereignty over all uses of the waters",
      "Full sovereignty over every activity and vessel in the zone",
      "Exclusive ownership of the seabed beyond any maritime limit",
      "Authority to prevent all foreign ships from navigating through the zone"
    ],
    "answer": "Sovereign rights over natural resources, without full sovereignty over all uses of the waters",
    "explanation": "Under the law of the sea, an EEZ generally extends up to 200 nautical miles from a coastal state's baselines. The state has specified rights over resources, while other states retain freedoms such as navigation and overflight.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-hard-02",
    "difficulty": "Hard",
    "prompt": "What is the main judicial role of the International Court of Justice (ICJ)?",
    "choices": [
      "Resolve legal disputes between states",
      "Prosecute individuals accused of genocide or war crimes",
      "Set binding trade tariffs for all countries",
      "Issue laws that automatically govern every national court"
    ],
    "answer": "Resolve legal disputes between states",
    "explanation": "The ICJ, the United Nations' principal judicial organ, handles legal disputes between states when its jurisdiction applies. The International Criminal Court is a separate institution that prosecutes individuals for certain international crimes.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "world-foreign-affairs-hard-03",
    "difficulty": "Hard",
    "prompt": "Which principle is central to the 1959 Antarctic Treaty?",
    "choices": [
      "Antarctica is reserved for peaceful purposes and scientific investigation",
      "All territorial claims are transferred to the United Nations",
      "Permanent civilian settlement is required across the continent",
      "Mineral resources must be divided equally among all countries"
    ],
    "answer": "Antarctica is reserved for peaceful purposes and scientific investigation",
    "explanation": "The Antarctic Treaty dedicates Antarctica to peaceful purposes and protects freedom of scientific investigation. It prohibits measures of a military nature while allowing military personnel or equipment for peaceful purposes, such as research.",
    "category": "World & Foreign Affairs",
    "points": 10
  },
  {
    "id": "weather-climate-easy-01",
    "difficulty": "Easy",
    "prompt": "What is the main difference between weather and climate?",
    "choices": [
      "Weather describes short-term atmospheric conditions; climate describes long-term patterns.",
      "Weather applies only to oceans; climate applies only to land.",
      "Weather is always predictable; climate is always unpredictable.",
      "Weather measures temperature; climate measures wind speed."
    ],
    "answer": "Weather describes short-term atmospheric conditions; climate describes long-term patterns.",
    "explanation": "Weather includes conditions such as temperature, rain, and wind over short periods. Climate summarizes typical patterns and their variability over many years.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-easy-02",
    "difficulty": "Easy",
    "prompt": "Which instrument measures air temperature?",
    "choices": [
      "Thermometer",
      "Barometer",
      "Rain gauge",
      "Anemometer"
    ],
    "answer": "Thermometer",
    "explanation": "A thermometer measures temperature. A barometer measures air pressure, a rain gauge collects precipitation, and an anemometer measures wind speed.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-easy-03",
    "difficulty": "Easy",
    "prompt": "When you hear thunder, which action is safest?",
    "choices": [
      "Go inside a substantial enclosed building or a hard-topped vehicle with the windows closed.",
      "Stand beneath an isolated tree until the storm passes.",
      "Lie flat in an open field to avoid tall objects.",
      "Take shelter beneath a small open-sided structure."
    ],
    "answer": "Go inside a substantial enclosed building or a hard-topped vehicle with the windows closed.",
    "explanation": "Thunder means lightning is close enough to be dangerous. A substantial enclosed building or hard-topped vehicle offers much safer shelter than trees, open areas, or open-sided shelters.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-medium-01",
    "difficulty": "Medium",
    "prompt": "What is the main reason Earth has seasons?",
    "choices": [
      "Earth's axis is tilted as the planet orbits the Sun.",
      "Earth moves much closer to the Sun during its summer.",
      "The Sun produces more heat during one half of each year.",
      "Earth spins faster during summer than during winter."
    ],
    "answer": "Earth's axis is tilted as the planet orbits the Sun.",
    "explanation": "The tilt changes the angle and duration of sunlight different regions receive over the year. Seasons are not mainly caused by Earth's changing distance from the Sun.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-medium-02",
    "difficulty": "Medium",
    "prompt": "What force begins air movement when nearby surface air pressures differ?",
    "choices": [
      "The pressure-gradient force, accelerating air from higher toward lower pressure.",
      "The buoyant force, accelerating all air toward the equator.",
      "The magnetic force, pulling air toward the nearest pole.",
      "The frictional force, pushing air from lower toward higher pressure."
    ],
    "answer": "The pressure-gradient force, accelerating air from higher toward lower pressure.",
    "explanation": "Differences in air pressure create a pressure-gradient force that starts wind by accelerating air from high toward low pressure. Earth's rotation and surface friction can also affect wind direction and speed.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-medium-03",
    "difficulty": "Medium",
    "prompt": "Why do forecasters compare many model runs with slightly different starting conditions?",
    "choices": [
      "To estimate uncertainty from differences in the possible outcomes.",
      "To guarantee that every run predicts exactly the same weather.",
      "To replace observations with a single unchanging forecast.",
      "To make future weather follow the average of all past years."
    ],
    "answer": "To estimate uncertainty from differences in the possible outcomes.",
    "explanation": "Small differences in starting measurements can lead to different model results, especially farther into the future. Comparing an ensemble of runs helps forecasters assess the range of plausible outcomes and their confidence.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-medium-04",
    "difficulty": "Medium",
    "prompt": "A parcel of air cools while its water-vapor amount stays the same. What generally happens to its relative humidity?",
    "choices": [
      "It increases and may reach saturation.",
      "It decreases toward zero.",
      "It stays exactly the same at every temperature.",
      "It becomes equal to the air pressure."
    ],
    "answer": "It increases and may reach saturation.",
    "explanation": "Cooler air generally reaches saturation with less water vapor than warmer air. If the vapor amount stays constant as air cools, relative humidity rises and condensation can begin once saturation is reached.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-hard-01",
    "difficulty": "Hard",
    "prompt": "How do greenhouse gases contribute to warming near Earth's surface?",
    "choices": [
      "They absorb some outgoing infrared radiation and emit it in all directions, including toward the surface.",
      "They reflect nearly all incoming sunlight back into space.",
      "They create heat by reacting with oxygen in the atmosphere.",
      "They block all heat from escaping the atmosphere."
    ],
    "answer": "They absorb some outgoing infrared radiation and emit it in all directions, including toward the surface.",
    "explanation": "Earth's surface emits infrared energy after absorbing sunlight. Greenhouse gases absorb some of this energy and re-emit it, slowing the loss of energy to space and warming the lower atmosphere and surface.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-hard-02",
    "difficulty": "Hard",
    "prompt": "How can a mountain range create a drier area on its leeward side?",
    "choices": [
      "Air descends on that side, compresses and warms, lowering its relative humidity.",
      "Air descends on that side, expands and cools, increasing its relative humidity.",
      "Clouds cross the range unchanged and release all their rain on the leeward side.",
      "The mountain absorbs water vapor and permanently removes it from the atmosphere."
    ],
    "answer": "Air descends on that side, compresses and warms, lowering its relative humidity.",
    "explanation": "Moist air forced up a mountain cools and can lose water through precipitation on the windward side. As the air descends on the leeward side, it compresses and warms, so its relative humidity falls and conditions are often drier.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "weather-climate-hard-03",
    "difficulty": "Hard",
    "prompt": "When water vapor condenses in a tropical cyclone, how can the released latent heat affect the storm?",
    "choices": [
      "It warms surrounding air, helping sustain convection and the storm's circulation.",
      "It cools surrounding air, stopping all upward motion.",
      "It removes moisture without transferring energy to the air.",
      "It pushes clouds downward by increasing gravity."
    ],
    "answer": "It warms surrounding air, helping sustain convection and the storm's circulation.",
    "explanation": "Water vapor takes in energy when it evaporates and releases that latent heat when it condenses. In a tropical cyclone, this heating can support rising air and circulation, although storm strength also depends on other conditions.",
    "category": "Weather & Climate",
    "points": 10
  },
  {
    "id": "science-easy-01",
    "difficulty": "Easy",
    "prompt": "In most plant and animal cells, which structure contains most of the cell's DNA?",
    "choices": [
      "Cell membrane",
      "Nucleus",
      "Ribosome",
      "Cytoplasm"
    ],
    "answer": "Nucleus",
    "explanation": "The nucleus stores most of a eukaryotic cell's DNA and helps regulate cell activities. Some DNA is also found in mitochondria, but the nucleus contains most of it.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-easy-02",
    "difficulty": "Easy",
    "prompt": "What does the formula H2O tell you about one water molecule?",
    "choices": [
      "It has two hydrogen atoms and one oxygen atom",
      "It has one hydrogen atom and two oxygen atoms",
      "It has two oxygen atoms and one hydrogen atom",
      "It has two hydrogen atoms and two oxygen atoms"
    ],
    "answer": "It has two hydrogen atoms and one oxygen atom",
    "explanation": "In a chemical formula, a subscript shows how many atoms of the preceding element are present. H2O therefore contains two hydrogen atoms and one oxygen atom.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-easy-03",
    "difficulty": "Easy",
    "prompt": "What force pulls objects near Earth's surface toward Earth?",
    "choices": [
      "Magnetism",
      "Friction",
      "Gravity",
      "Electricity"
    ],
    "answer": "Gravity",
    "explanation": "Gravity is the attractive force between objects with mass. Earth's gravity pulls nearby objects toward its center.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-medium-01",
    "difficulty": "Medium",
    "prompt": "During photosynthesis, which substances do plants use to make sugars?",
    "choices": [
      "Carbon dioxide and water",
      "Oxygen and glucose",
      "Nitrogen and oxygen",
      "Glucose and water"
    ],
    "answer": "Carbon dioxide and water",
    "explanation": "Plants use light energy to convert carbon dioxide and water into sugars, releasing oxygen as a by-product. The process stores some light energy in the chemical bonds of sugar.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-medium-02",
    "difficulty": "Medium",
    "prompt": "What does an element's atomic number tell you?",
    "choices": [
      "The number of protons in its nucleus",
      "The number of neutrons in its nucleus",
      "The total number of its electron shells",
      "The number of atoms in a sample"
    ],
    "answer": "The number of protons in its nucleus",
    "explanation": "An element is defined by the number of protons in each atom's nucleus. Atoms of the same element can have different numbers of neutrons.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-medium-03",
    "difficulty": "Medium",
    "prompt": "Two bulbs are connected in series to a battery. If one bulb is removed, why does the other go out?",
    "choices": [
      "The open gap breaks the complete circuit path",
      "The remaining bulb uses up all the battery's charge",
      "Removing a bulb turns the battery into an insulator",
      "The current changes direction and stops"
    ],
    "answer": "The open gap breaks the complete circuit path",
    "explanation": "In a series circuit, current has one path through all the components. Removing one bulb opens that path, so current no longer flows through either bulb.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-medium-04",
    "difficulty": "Medium",
    "prompt": "What is the name for the bending of light as it enters a different transparent material at an angle?",
    "choices": [
      "Reflection",
      "Refraction",
      "Absorption",
      "Emission"
    ],
    "answer": "Refraction",
    "explanation": "Refraction is the change in direction of light as it passes between materials where its speed differs. Light entering at an angle can bend at the boundary.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-hard-01",
    "difficulty": "Hard",
    "prompt": "In a balanced chemical equation, what does a coefficient before a formula represent?",
    "choices": [
      "The relative number of particles or moles of that substance",
      "The number of atoms of each element in one particle",
      "The electric charge on each atom",
      "The number of protons in each molecule"
    ],
    "answer": "The relative number of particles or moles of that substance",
    "explanation": "A coefficient scales the whole formula, indicating the relative number of molecules or formula units, or the corresponding number of moles. Subscripts, by contrast, give the atom ratio within one particle.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-hard-02",
    "difficulty": "Hard",
    "prompt": "Why do people inside an orbiting spacecraft appear weightless?",
    "choices": [
      "They and the spacecraft are falling together around Earth",
      "Earth's gravity does not reach the spacecraft",
      "The spacecraft has no mass while in orbit",
      "Earth's rotation cancels gravity at orbital height"
    ],
    "answer": "They and the spacecraft are falling together around Earth",
    "explanation": "Gravity still acts strongly on an orbiting spacecraft. The spacecraft and its occupants are in continuous free fall together, so the floor does not press on them as it does when they stand on the ground.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "science-hard-03",
    "difficulty": "Hard",
    "prompt": "In a plant test, every fertilized plant receives more light than every unfertilized plant. If the fertilized plants grow more, what is the main limitation?",
    "choices": [
      "The effects of fertilizer and light cannot be separated",
      "The plants must have identical DNA",
      "Plant growth cannot be measured",
      "The result proves fertilizer has no effect"
    ],
    "answer": "The effects of fertilizer and light cannot be separated",
    "explanation": "Light is a confounding variable because it changes along with fertilizer treatment. To test fertilizer fairly, groups should receive the same amount of light and differ only in fertilizer use.",
    "category": "Science",
    "points": 10
  },
  {
    "id": "nature-environment-easy-01",
    "difficulty": "Easy",
    "prompt": "What is the term for the natural place or environment where an organism lives?",
    "choices": [
      "Habitat",
      "Population",
      "Community",
      "Food chain"
    ],
    "answer": "Habitat",
    "explanation": "A habitat is the place and conditions where an organism lives and finds resources such as food, water, and shelter.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-easy-02",
    "difficulty": "Easy",
    "prompt": "Which description best defines biodiversity?",
    "choices": [
      "The variety of life at genetic, species, and ecosystem levels",
      "The total amount of rain that falls in one place",
      "The number of rocks found in a habitat",
      "The daily movement of animals between feeding sites"
    ],
    "answer": "The variety of life at genetic, species, and ecosystem levels",
    "explanation": "Biodiversity includes variation within species, among species, and among ecosystems. It is more than simply counting how many individual organisms live in one place.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-easy-03",
    "difficulty": "Easy",
    "prompt": "Which garden practice can reduce water loss from soil?",
    "choices": [
      "Covering the soil with a layer of mulch",
      "Removing all shade from the garden",
      "Watering only during the hottest part of the day",
      "Leaving bare soil exposed to wind"
    ],
    "answer": "Covering the soil with a layer of mulch",
    "explanation": "Mulch shades the soil and slows evaporation, helping it stay moist longer. It can also reduce erosion and moderate soil temperature.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-medium-01",
    "difficulty": "Medium",
    "prompt": "What is a key role of fungi and many bacteria in an ecosystem?",
    "choices": [
      "They decompose dead matter and return nutrients to the environment",
      "They prevent all nutrients from leaving living organisms",
      "They produce most of the sunlight used by plants",
      "They convert every predator into a plant-eater"
    ],
    "answer": "They decompose dead matter and return nutrients to the environment",
    "explanation": "Decomposers break down dead organisms and waste, releasing nutrients that can be reused by plants and other organisms. This recycling helps keep ecosystems functioning.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-medium-02",
    "difficulty": "Medium",
    "prompt": "Why is less energy usually available at higher levels of a food chain?",
    "choices": [
      "Organisms use much of the energy they take in, and much is released as heat",
      "Energy is destroyed whenever an animal eats a plant",
      "Predators cannot digest any energy-rich food",
      "Plants absorb all energy before it reaches consumers"
    ],
    "answer": "Organisms use much of the energy they take in, and much is released as heat",
    "explanation": "Organisms use energy for movement, growth, and other life processes, and much of it leaves as heat. Consequently, only a fraction of the energy at one trophic level becomes available to the next.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-medium-03",
    "difficulty": "Medium",
    "prompt": "During photosynthesis, where does most of the carbon in a plant's new sugars come from?",
    "choices": [
      "Carbon dioxide absorbed from the air",
      "Minerals dissolved in rainwater",
      "Oxygen released by the roots",
      "Sunlight absorbed by the leaves"
    ],
    "answer": "Carbon dioxide absorbed from the air",
    "explanation": "Plants use carbon atoms from carbon dioxide to build sugars and other organic molecules. Sunlight supplies energy for the process, but it is not the source of the carbon atoms.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-medium-04",
    "difficulty": "Medium",
    "prompt": "Why can splitting one large habitat into isolated patches threaten wildlife?",
    "choices": [
      "It can make it harder for populations to move and exchange genes",
      "It guarantees that every patch gains more food",
      "It makes all species reproduce at the same rate",
      "It prevents weather from affecting the patches"
    ],
    "answer": "It can make it harder for populations to move and exchange genes",
    "explanation": "Fragmentation can isolate populations, limiting movement, access to resources, and breeding between groups. Lower gene flow can reduce genetic diversity and make small populations more vulnerable.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-hard-01",
    "difficulty": "Hard",
    "prompt": "In a food web, a top predator keeps a plant-eating animal's population in check. If the predator disappears, what is a likely indirect effect?",
    "choices": [
      "More plant-eaters may consume more vegetation",
      "Plants stop using sunlight for photosynthesis",
      "Decomposers immediately leave the ecosystem",
      "The plant-eaters become producers"
    ],
    "answer": "More plant-eaters may consume more vegetation",
    "explanation": "With less predation, the plant-eater population may grow and put greater pressure on vegetation. This kind of indirect chain reaction is called a trophic cascade, though its size depends on the ecosystem.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-hard-02",
    "difficulty": "Hard",
    "prompt": "How do nitrogen-fixing bacteria in the root nodules of many legumes help plants?",
    "choices": [
      "They convert atmospheric nitrogen into compounds plants can use",
      "They convert sunlight into nitrogen gas",
      "They absorb all nitrogen from nearby plants",
      "They turn plant sugars into atmospheric oxygen"
    ],
    "answer": "They convert atmospheric nitrogen into compounds plants can use",
    "explanation": "Most plants cannot use nitrogen gas directly from the atmosphere. Nitrogen-fixing bacteria transform it into biologically usable compounds, supporting plant growth and contributing to the nitrogen cycle.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "nature-environment-hard-03",
    "difficulty": "Hard",
    "prompt": "A lake receives excess nutrients from runoff. Why can this lead to low oxygen in the water?",
    "choices": [
      "Algal growth can increase, then decomposition of dead algae uses dissolved oxygen",
      "Nutrients permanently bind all oxygen into harmless rocks",
      "Runoff stops water from absorbing any sunlight",
      "Fish use up oxygen by changing into algae"
    ],
    "answer": "Algal growth can increase, then decomposition of dead algae uses dissolved oxygen",
    "explanation": "Excess nutrients can cause algal blooms. When algae die, decomposers break them down and consume dissolved oxygen, which can create stressful or harmful conditions for aquatic animals.",
    "category": "Nature & Environment",
    "points": 10
  },
  {
    "id": "technology-ai-easy-01",
    "difficulty": "Easy",
    "prompt": "What is the main role of a computer’s RAM while programs are running?",
    "choices": [
      "To temporarily hold data and instructions the processor is using",
      "To permanently archive files when the computer is off",
      "To connect the computer to nearby wireless networks",
      "To translate website names into network addresses"
    ],
    "answer": "To temporarily hold data and instructions the processor is using",
    "explanation": "RAM is fast working memory used by active programs and the operating system. Unlike long-term storage, its contents are generally cleared when power is removed.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-easy-02",
    "difficulty": "Easy",
    "prompt": "What does the Domain Name System (DNS) mainly help a device do?",
    "choices": [
      "Find network addresses associated with human-readable domain names",
      "Compress images before they are sent over the internet",
      "Check whether a password has appeared in a data breach",
      "Choose which web pages should appear first in search results"
    ],
    "answer": "Find network addresses associated with human-readable domain names",
    "explanation": "People use names such as example.org, while internet communication uses network addresses. DNS helps look up records that connect those names to the information needed to reach internet services.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-easy-03",
    "difficulty": "Easy",
    "prompt": "An unexpected message asks you to sign in through a link. What is the safest response?",
    "choices": [
      "Open the link quickly before it expires",
      "Reply with your password to confirm your identity",
      "Go to the service using its known address or a trusted app instead",
      "Forward the message to friends to ask whether it looks real"
    ],
    "answer": "Go to the service using its known address or a trusted app instead",
    "explanation": "Unexpected sign-in links can lead to phishing pages designed to steal credentials. Going directly to a known address or trusted app helps avoid relying on a potentially deceptive link.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-medium-01",
    "difficulty": "Medium",
    "prompt": "What must be true for ordinary binary search to reliably find an item in a list?",
    "choices": [
      "The list must be sorted by the value being searched",
      "Every item must appear exactly twice",
      "The list must contain fewer than one hundred items",
      "The list must be stored as plain text"
    ],
    "answer": "The list must be sorted by the value being searched",
    "explanation": "Binary search compares with a middle item and discards half the remaining range. That decision is reliable only when the items are ordered by the searched value.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-medium-02",
    "difficulty": "Medium",
    "prompt": "What does HTTPS provide when a browser connects to a website?",
    "choices": [
      "An encrypted connection and certificate-based checks of the site's identity",
      "A guarantee that every page on the site is honest and safe",
      "A way to keep the internet provider from seeing that a connection exists",
      "A promise that the website will never store information about visitors"
    ],
    "answer": "An encrypted connection and certificate-based checks of the site's identity",
    "explanation": "HTTPS uses TLS to protect data in transit and to help the browser verify the website's identity. It does not guarantee that the site's content or business practices are trustworthy.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-medium-03",
    "difficulty": "Medium",
    "prompt": "Why add a unique random salt before hashing each stored password?",
    "choices": [
      "It makes identical passwords produce different hashes and hinders precomputed attacks",
      "It lets the service recover the original password if a user forgets it",
      "It makes a password hash serve as proof of the user's legal identity",
      "It ensures a password cannot be guessed by trying possible inputs"
    ],
    "answer": "It makes identical passwords produce different hashes and hinders precomputed attacks",
    "explanation": "A salt is stored alongside a password hash and is included in the hashing process. Unique salts stop equal passwords from having matching stored hashes and make precomputed lookup attacks less useful, though they do not make weak passwords unguessable.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-medium-04",
    "difficulty": "Medium",
    "prompt": "After an AI model has been trained, what is the term for using it to generate a prediction from a new input?",
    "choices": [
      "Inference",
      "Training",
      "Data labeling",
      "Encryption"
    ],
    "answer": "Inference",
    "explanation": "Inference is the process of applying a trained model to new input to produce an output, such as a classification or prediction.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-hard-01",
    "difficulty": "Hard",
    "prompt": "To send a confidential message using public-key encryption, which key should the sender use to encrypt it for a recipient?",
    "choices": [
      "The recipient's public key",
      "The recipient's private key",
      "The sender's private key only",
      "A key that is posted publicly but has no matching private key"
    ],
    "answer": "The recipient's public key",
    "explanation": "In public-key encryption, anyone can use the recipient's public key to encrypt a message, but the corresponding private key is needed to decrypt it. The private key must be kept secret by its owner.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-hard-02",
    "difficulty": "Hard",
    "prompt": "An algorithm runs two nested loops, each repeating n times, and performs one fixed-time operation inside. For large n, what happens to its operation count when n doubles?",
    "choices": [
      "It becomes about twice as large",
      "It becomes about four times as large",
      "It increases by about two operations",
      "It stays about the same"
    ],
    "answer": "It becomes about four times as large",
    "explanation": "The two loops perform about n × n, or n², operations. Doubling n gives (2n)² = 4n², so the count grows by about a factor of four.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "technology-ai-hard-03",
    "difficulty": "Hard",
    "prompt": "Why should near-duplicate examples be kept in the same training or test split when evaluating a machine-learning model?",
    "choices": [
      "Otherwise, the model may see almost the same example during training and testing, inflating its apparent performance",
      "Otherwise, the model will be unable to represent any numerical values",
      "Otherwise, the training set will always contain fewer examples than the test set",
      "Otherwise, the model's predictions will become impossible to reproduce"
    ],
    "answer": "Otherwise, the model may see almost the same example during training and testing, inflating its apparent performance",
    "explanation": "Near-duplicates across splits can leak information from evaluation examples into training. The resulting score may overstate how well the model generalizes to genuinely new data.",
    "category": "Technology & AI",
    "points": 10
  },
  {
    "id": "mathematics-easy-01",
    "difficulty": "Easy",
    "prompt": "What is 48 + 27?",
    "choices": [
      "65",
      "75",
      "76",
      "85"
    ],
    "answer": "75",
    "explanation": "Add the tens and ones: 40 + 20 = 60 and 8 + 7 = 15. Then 60 + 15 = 75.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-easy-02",
    "difficulty": "Easy",
    "prompt": "A square has sides 5 cm long. What is its perimeter?",
    "choices": [
      "10 cm",
      "20 cm",
      "25 cm",
      "30 cm"
    ],
    "answer": "20 cm",
    "explanation": "A square has four equal sides, so its perimeter is 4 × 5 cm = 20 cm.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-easy-03",
    "difficulty": "Easy",
    "prompt": "What number comes next: 4, 7, 10, 13, ...?",
    "choices": [
      "14",
      "15",
      "16",
      "17"
    ],
    "answer": "16",
    "explanation": "Each term increases by 3. Adding 3 to 13 gives 16.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-medium-01",
    "difficulty": "Medium",
    "prompt": "What is 3/4 − 1/3?",
    "choices": [
      "1/2",
      "5/12",
      "1/12",
      "5/7"
    ],
    "answer": "5/12",
    "explanation": "Use a common denominator of 12: 3/4 = 9/12 and 1/3 = 4/12. Subtracting gives 9/12 − 4/12 = 5/12.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-medium-02",
    "difficulty": "Medium",
    "prompt": "Solve 3x + 5 = 26.",
    "choices": [
      "6",
      "7",
      "8",
      "9"
    ],
    "answer": "7",
    "explanation": "Subtract 5 from both sides to get 3x = 21, then divide by 3. Therefore, x = 7.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-medium-03",
    "difficulty": "Medium",
    "prompt": "A triangle has base 12 cm and height 7 cm. What is its area?",
    "choices": [
      "19 cm²",
      "42 cm²",
      "84 cm²",
      "38 cm²"
    ],
    "answer": "42 cm²",
    "explanation": "Triangle area is half the base times the height: (12 × 7) ÷ 2 = 42 cm².",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-medium-04",
    "difficulty": "Medium",
    "prompt": "A bag has 5 red and 3 blue marbles. If one marble is chosen at random, what is the probability it is blue?",
    "choices": [
      "3/5",
      "5/8",
      "3/8",
      "1/2"
    ],
    "answer": "3/8",
    "explanation": "There are 8 marbles altogether and 3 are blue. The probability is favorable outcomes divided by total outcomes, or 3/8.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-hard-01",
    "difficulty": "Hard",
    "prompt": "Solve 2(x − 3) + 4 = 3x − 5.",
    "choices": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answer": "3",
    "explanation": "Expand and combine terms to get 2x − 2 = 3x − 5. Adding 5 and then subtracting 2x gives x = 3.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-hard-02",
    "difficulty": "Hard",
    "prompt": "On a map with scale 1:25,000, a path is 6 cm long. What is its actual length?",
    "choices": [
      "0.15 km",
      "1.5 km",
      "15 km",
      "150 km"
    ],
    "answer": "1.5 km",
    "explanation": "The actual length is 6 × 25,000 = 150,000 cm. Since 100,000 cm = 1 km, this is 1.5 km.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "mathematics-hard-03",
    "difficulty": "Hard",
    "prompt": "A bag has 4 green and 3 yellow counters. Two are drawn without replacement. What is the probability both are green?",
    "choices": [
      "1/3",
      "2/7",
      "4/7",
      "3/7"
    ],
    "answer": "2/7",
    "explanation": "The chance the first is green is 4/7; then 3 green remain among 6 counters, so the next chance is 3/6. Multiply: (4/7)(3/6) = 12/42 = 2/7.",
    "category": "Mathematics",
    "points": 10
  },
  {
    "id": "arts-culture-easy-01",
    "difficulty": "Easy",
    "prompt": "Which instrument is played by pressing black and white keys?",
    "choices": [
      "Violin",
      "Piano",
      "Flute",
      "Drum kit"
    ],
    "answer": "Piano",
    "explanation": "A piano produces sound when pressing a key makes a hammer strike a string inside the instrument. Its keyboard includes both black and white keys.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-easy-02",
    "difficulty": "Easy",
    "prompt": "What does a storyboard help plan before filming?",
    "choices": [
      "A sequence of shots and scenes",
      "The theater's seating chart",
      "The film's ticket prices",
      "The actors' meal schedule"
    ],
    "answer": "A sequence of shots and scenes",
    "explanation": "A storyboard uses sketches or images to map out a film's scenes and shots in advance. It helps a creative team communicate how the story may look on screen.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-easy-03",
    "difficulty": "Easy",
    "prompt": "What is a story or song passed between generations by speaking or singing part of?",
    "choices": [
      "An oral tradition",
      "A floor plan",
      "A film score",
      "A written contract"
    ],
    "answer": "An oral tradition",
    "explanation": "Oral traditions pass knowledge, stories, songs, or practices from person to person through spoken or sung forms. They are an important way communities keep cultural knowledge alive.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-medium-01",
    "difficulty": "Medium",
    "prompt": "In fresco painting, what surface is the pigment applied to?",
    "choices": [
      "Wet plaster",
      "Dry woven cloth",
      "Polished metal",
      "Unfired clay"
    ],
    "answer": "Wet plaster",
    "explanation": "In buon fresco, pigment mixed with water is applied to fresh, wet plaster. As the plaster dries, the color becomes integrated with the wall surface.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-medium-02",
    "difficulty": "Medium",
    "prompt": "In many Gothic buildings, what does a flying buttress help support?",
    "choices": [
      "The outward thrust of a wall or vault",
      "The sound of a pipe organ",
      "The weight of a movable roof",
      "The color of stained glass"
    ],
    "answer": "The outward thrust of a wall or vault",
    "explanation": "A flying buttress carries some outward force from a wall or vault to a separate support outside the building. This structural solution helped architects build taller walls and larger window openings.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-medium-03",
    "difficulty": "Medium",
    "prompt": "Which clef places the note G on the second line from the bottom of a musical staff?",
    "choices": [
      "Treble clef",
      "Bass clef",
      "Alto clef",
      "Tenor clef"
    ],
    "answer": "Treble clef",
    "explanation": "The treble clef marks the second line from the bottom as G. This reference point lets musicians identify the other pitches on and between the staff lines.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-medium-04",
    "difficulty": "Medium",
    "prompt": "What is a libretto?",
    "choices": [
      "The text of an opera or similar musical stage work",
      "A design for a theater's roof",
      "A collection of film-camera lenses",
      "A short instrumental introduction"
    ],
    "answer": "The text of an opera or similar musical stage work",
    "explanation": "A libretto is the text used in an opera and in some other staged musical works. It includes the words sung or spoken by the performers.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-hard-01",
    "difficulty": "Hard",
    "prompt": "In one-point linear perspective, where do parallel lines receding into the distance appear to meet?",
    "choices": [
      "At a vanishing point",
      "At the picture's center of gravity",
      "Along the horizon's entire length",
      "At the nearest foreground edge"
    ],
    "answer": "At a vanishing point",
    "explanation": "One-point linear perspective represents depth by making sets of parallel lines receding in one direction converge at a vanishing point. The point usually lies on the horizon line.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-hard-02",
    "difficulty": "Hard",
    "prompt": "What is a defining feature of a musical fugue?",
    "choices": [
      "A theme is introduced by one voice and taken up by others in turn",
      "A melody is always played without accompaniment",
      "Every section uses a different time signature",
      "The performers improvise without a written theme"
    ],
    "answer": "A theme is introduced by one voice and taken up by others in turn",
    "explanation": "A fugue is a contrapuntal composition built around a subject, or main theme, that enters successively in different voices. Those voices then develop the musical material together.",
    "category": "Arts & Culture",
    "points": 10
  },
  {
    "id": "arts-culture-hard-03",
    "difficulty": "Hard",
    "prompt": "Which poetic form is traditionally defined by having fourteen lines?",
    "choices": [
      "Sonnet",
      "Haiku",
      "Limerick",
      "Ballad"
    ],
    "answer": "Sonnet",
    "explanation": "A sonnet traditionally has fourteen lines, often arranged with a patterned rhyme scheme and meter. Poets have used several sonnet forms to explore ideas and emotions in a compact structure.",
    "category": "Arts & Culture",
    "points": 10
  }
];

  const categories = [
  "Pattern Recognition",
  "Logical Reasoning",
  "Observation",
  "Creative Problem-Solving",
  "Quick Thinking",
  "English & Language",
  "General Studies",
  "World & Foreign Affairs",
  "Weather & Climate",
  "Science",
  "Nature & Environment",
  "Technology & AI",
  "Mathematics",
  "Arts & Culture"
];
  const bank = puzzles.map((puzzle) => Object.freeze({
    ...puzzle,
    points: 10,
    choices: Object.freeze(puzzle.choices.slice())
  }));

  window.BUILVANTA_THINK_LAB_BANK = Object.freeze(bank);
  window.BUILVANTA_THINK_LAB_CATEGORIES = Object.freeze(categories.slice());
}());
