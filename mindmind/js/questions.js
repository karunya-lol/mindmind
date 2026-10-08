/**
 * Comprehensive Questions Database for MINDMIND Cyber Arena
 * Covering HTML, CSS, Basic Programming, and Logical Reasoning
 * Features Dynamic Shuffling & Randomization
 */

const MASTER_QUESTION_BANK = {
  // ==========================================
  // ROUND 1: VISUAL DECODING
  // ==========================================
  round1: [
    {
      id: "v1",
      category: "CSS Flexbox",
      title: "Flex Alignment Matrix",
      instruction: "Examine the container and item alignment below. Which CSS flexbox rule combination produces this exact visual distribution?",
      visualType: "flexbox",
      visualConfig: {
        containerStyles: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: "120px",
          border: "2px dashed #ff003c",
          padding: "10px",
          background: "rgba(255, 0, 60, 0.05)"
        },
        items: [
          { text: "Item 1", height: "40px", bg: "#ff003c" },
          { text: "Item 2", height: "80px", bg: "#ff3366" },
          { text: "Item 3", height: "60px", bg: "#ff003c" }
        ]
      },
      options: [
        "justify-content: space-between; align-items: flex-end;",
        "justify-content: space-around; align-items: center;",
        "justify-content: space-evenly; align-items: baseline;",
        "justify-content: center; align-content: flex-end;"
      ],
      correctIndex: 0,
      hint: "Notice the outer items touch the edges completely, and all items sit flush at the bottom boundary.",
      explanation: "'justify-content: space-between' forces the first item to the start edge and the last item to the end edge with equal space in between. 'align-items: flex-end' aligns items to the bottom of the cross-axis."
    },
    {
      id: "v2",
      category: "Logic Gates",
      title: "Circuit State Decryption",
      instruction: "Trace the binary signals A=1 and B=0 through the logic circuit diagram. What is the final output value at Q?",
      visualType: "logic-gate",
      circuit: {
        inputA: 1,
        inputB: 0,
        gate1: "XOR (A, B)",
        gate2: "NOT (B)",
        gate3: "AND (Gate1, Gate2)",
        output: "Q"
      },
      options: [
        "Q = 1 (HIGH)",
        "Q = 0 (LOW)",
        "Q = Floating / Undefined",
        "Q oscillates between 0 and 1"
      ],
      correctIndex: 0,
      hint: "A XOR B with inputs (1, 0) gives 1. NOT B with input 0 gives 1. What does 1 AND 1 yield?",
      explanation: "Step 1: 1 XOR 0 = 1. Step 2: NOT 0 = 1. Step 3: Gate 3 computes 1 AND 1 = 1. Therefore, Q is HIGH (1)."
    },
    {
      id: "v3",
      category: "CSS Box Model",
      title: "Total Width Computation (Content-Box)",
      instruction: "An element is defined with: width: 200px; padding: 20px; border: 5px solid #ff003c; margin: 15px; box-sizing: content-box;. What is the element's total rendered width on screen?",
      visualType: "box-model",
      boxData: {
        content: "200px width",
        padding: "20px (L+R = 40px)",
        border: "5px (L+R = 10px)",
        margin: "15px (L+R = 30px)",
        boxSizing: "content-box"
      },
      options: [
        "250px (content + padding + border)",
        "200px (fixed width limit)",
        "280px (including margins in element width)",
        "240px (content + padding only)"
      ],
      correctIndex: 0,
      hint: "Under 'content-box', padding and border expand outside the defined width. Margins create spacing outside the element boundary.",
      explanation: "Total element box width = width (200) + left/right padding (20+20=40) + left/right border (5+5=10) = 250px. Margin (30px) is external spacing."
    },
    {
      id: "v4",
      category: "HTML & CSS Grid",
      title: "Grid Template Blueprint",
      instruction: "Inspect the 2x3 dashboard grid preview. Which CSS Grid rule generated this layout where the header spans both columns?",
      visualType: "grid-demo",
      gridStructure: [
        { name: "HEADER (col 1 to 3)", code: "grid-column: 1 / 3", col: "1 / 3", class: "header-cell" },
        { name: "SIDEBAR", code: "col 1", col: "1 / 2", class: "side-cell" },
        { name: "MAIN CONTENT", code: "col 2", col: "2 / 3", class: "main-cell" }
      ],
      options: [
        ".header { grid-column: 1 / 3; } (or span 2)",
        ".header { grid-row: 1 / 3; }",
        ".header { grid-area: 1 / 1 / 2 / 2; }",
        ".container { display: inline-grid; flex-wrap: wrap; }"
      ],
      correctIndex: 0,
      hint: "Grid column lines start at 1. Spanning across 2 columns means going from line 1 to line 3.",
      explanation: "'grid-column: 1 / 3' instructs the header item to start at vertical grid line 1 and finish at line 3, spanning 2 complete columns across the top row."
    },
    {
      id: "v5",
      category: "Basic Programming",
      title: "Array Pointer Trace",
      instruction: "Follow the execution trace below for array rotation. Given arr = [10, 20, 30, 40], what does arr contain after: arr.push(arr.shift()) executed twice?",
      visualType: "code-trace",
      steps: [
        "Initial: [10, 20, 30, 40]",
        "Pass 1: shift() removes 10 -> push(10) -> [20, 30, 40, 10]",
        "Pass 2: shift() removes 20 -> push(20) -> ???"
      ],
      options: [
        "[30, 40, 10, 20]",
        "[40, 30, 20, 10]",
        "[20, 10, 40, 30]",
        "[10, 20, 30, 40]"
      ],
      correctIndex: 0,
      hint: "In pass 2, the first element (20) is pulled off the front and appended to the end.",
      explanation: "Pass 1 moves 10 to the back: [20, 30, 40, 10]. Pass 2 removes 20 from the head and pushes it to the back: [30, 40, 10, 20]."
    },
    {
      id: "v6",
      category: "Logical Reasoning",
      title: "Venn Overlap Deduction",
      instruction: "Visual Survey: 40 engineers know HTML, 30 know CSS, 15 know both. Total unique engineers who know at least one?",
      visualType: "venn-diagram",
      vennData: {
        circleA: "HTML: 40",
        circleB: "CSS: 30",
        intersection: "Both: 15"
      },
      options: [
        "55 engineers",
        "70 engineers",
        "45 engineers",
        "85 engineers"
      ],
      correctIndex: 0,
      hint: "Use Principle of Inclusion-Exclusion: |A ∪ B| = |A| + |B| - |A ∩ B|.",
      explanation: "Unique engineers = HTML (40) + CSS (30) - Both (15) = 70 - 15 = 55 engineers."
    },
    {
      id: "v7",
      category: "CSS Box Model",
      title: "Border-Box Geometry Trap",
      instruction: "An element is defined with: width: 300px; padding: 25px; border: 10px solid #ff003c; margin: 20px; box-sizing: border-box;. What is the element's total rendered width on screen?",
      visualType: "box-model",
      boxData: {
        content: "computed 230px (300 - 50 - 20)",
        padding: "25px (L+R = 50px)",
        border: "10px (L+R = 20px)",
        margin: "20px (L+R = 40px)",
        boxSizing: "border-box"
      },
      options: [
        "300px (padding & border absorbed inside declared width)",
        "370px (width + padding + border)",
        "410px (including margins)",
        "230px (content only)"
      ],
      correctIndex: 0,
      hint: "Under 'border-box', the declared width of 300px is the total outer boundary including padding and border!",
      explanation: "With 'box-sizing: border-box', padding and borders are absorbed inside the 300px width. The browser shrinks content to 230px so the total rendered box remains exactly 300px."
    },
    {
      id: "v8",
      category: "CSS Flexbox",
      title: "Vertical Column Distribution",
      instruction: "Inspect the vertical stack container below. Which flexbox configuration centers the items horizontally while spreading them evenly vertically?",
      visualType: "flexbox",
      visualConfig: {
        containerStyles: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "150px",
          border: "2px dashed #ff003c",
          padding: "10px",
          background: "rgba(255, 0, 60, 0.05)"
        },
        items: [
          { text: "TOP", height: "30px", bg: "#ff003c" },
          { text: "MID", height: "30px", bg: "#ff3366" },
          { text: "BOT", height: "30px", bg: "#ff003c" }
        ]
      },
      options: [
        "flex-direction: column; justify-content: space-between; align-items: center;",
        "flex-direction: row; justify-content: center; align-items: space-between;",
        "flex-direction: column; justify-content: center; align-items: stretch;",
        "flex-direction: column-reverse; justify-content: flex-start; align-items: baseline;"
      ],
      correctIndex: 0,
      hint: "When 'flex-direction: column' is set, the main axis becomes vertical. 'justify-content' distributes vertically, and 'align-items' aligns horizontally.",
      explanation: "In column direction, 'justify-content: space-between' spreads items vertically from top to bottom, while 'align-items: center' centers them on the horizontal cross axis."
    },
    {
      id: "v9",
      category: "Basic Programming",
      title: "Stack LIFO Execution Trace",
      instruction: "A call stack executes the following operations: push('A'), push('B'), pop(), push('C'), push('D'), pop(). What is the element currently at the TOP of the stack?",
      visualType: "code-trace",
      steps: [
        "Initial: []",
        "push('A') -> ['A'], push('B') -> ['A', 'B']",
        "pop() removes 'B' -> ['A']",
        "push('C') -> ['A', 'C'], push('D') -> ['A', 'C', 'D']",
        "pop() removes 'D' -> final stack: ['A', 'C']"
      ],
      options: [
        "'C' is at the top",
        "'A' is at the top",
        "'D' is at the top",
        "'B' is at the top"
      ],
      correctIndex: 0,
      hint: "Stacks are Last-In, First-Out (LIFO). After popping 'D', look at the last item remaining.",
      explanation: "Following the LIFO operations: after pushing 'C' then 'D', popping removes 'D'. The stack now contains ['A', 'C'], making 'C' the top element."
    },
    {
      id: "v10",
      category: "CSS Stacking Context",
      title: "Stacking Context & z-index Isolation",
      instruction: "Element #childA has z-index: 9999 inside #parentA (position: relative; z-index: 1; opacity: 0.99;). Element #parentB has position: relative; z-index: 2;. Which element renders on top when they overlap?",
      visualType: "code-trace",
      steps: [
        "#parentA [z-index: 1, opacity: 0.99] -> Generates isolated Stacking Context Alpha",
        "  └── #childA [z-index: 9999] -> Trapped inside Stacking Context Alpha",
        "#parentB [z-index: 2] -> Generates Stacking Context Beta in Root Document",
        "  └── #childB [z-index: 0] -> Contained in Stacking Context Beta",
        "COLLISION: #childA overlaps #parentB on the screen"
      ],
      options: [
        "#parentB (Stacking Context Beta with z-index: 2 beats Context Alpha with z-index: 1)",
        "#childA (Because z-index: 9999 overrides all lower numbers across the DOM)",
        "#childB (Because it was declared later in the HTML source)",
        "Both elements merge additively because opacity is less than 1"
      ],
      correctIndex: 0,
      hint: "Stacking contexts are atomic. An element inside a lower stacking context can NEVER paint above an element in a higher stacking context.",
      explanation: "Opacity < 1 (and z-index with position) creates an isolated stacking context. #childA's z-index: 9999 is local to #parentA. Because #parentB has z-index: 2 compared to #parentA's z-index: 1, #parentB renders completely above #parentA and all its descendants."
    },
    {
      id: "v11",
      category: "CSS Specificity",
      title: "Cascade Priority Matrix",
      instruction: "Four conflicting CSS rules target <div id=\"status\" class=\"alert neon cyber\" data-urgent=\"true\">. Which rule wins the cascade and paints the text?",
      visualType: "code-trace",
      steps: [
        "Rule 1: #status { color: #ffffff; }                        // Specificity: (1, 0, 0)",
        "Rule 2: .alert.neon.cyber[data-urgent] { color: #ff003c; } // Specificity: (0, 4, 0)",
        "Rule 3: body div.alert.neon { color: #ff2a5f; }            // Specificity: (0, 2, 2)",
        "Rule 4: div[data-urgent=\"true\"] { color: #888899; }          // Specificity: (0, 1, 1)"
      ],
      options: [
        "Rule 1: #status -> Color #ffffff [Specificity: (1, 0, 0)]",
        "Rule 2: .alert.neon.cyber[data-urgent] -> Color #ff003c [Specificity: (0, 4, 0)]",
        "Rule 3: body div.alert.neon -> Color #ff2a5f [Specificity: (0, 2, 2)]",
        "Rule 4: div[data-urgent=\"true\"] -> Color #888899 [Specificity: (0, 1, 1)]"
      ],
      correctIndex: 0,
      hint: "Count specificity columns: (Inline, ID, Class/Attr/Pseudo, Element). Can any quantity of classes beat a single ID?",
      explanation: "In CSS specificity, one ID selector (1,0,0) outweighs an infinite number of class or attribute selectors (0,4,0). Rule 1 triumphs unconditionally."
    },
    {
      id: "v12",
      category: "Bitwise Operations",
      title: "Bitwise Signal Pipeline",
      instruction: "Trace the 8-bit unsigned integer bitwise pipeline. What is the final value stored in 'result'?",
      visualType: "code-trace",
      steps: [
        "let x = 5;            // Binary: 0000 0101",
        "x = x << 2;          // Left shift 2 bits -> 20 (0001 0100)",
        "x = x | 3;           // Bitwise OR with 3 (0000 0011) -> 23 (0001 0111)",
        "let result = x ^ 7;  // Bitwise XOR with 7 (0000 0111)"
      ],
      options: [
        "result = 16",
        "result = 20",
        "result = 23",
        "result = 28"
      ],
      correctIndex: 0,
      hint: "23 is 00010111. 7 is 00000111. XOR outputs 1 only where bits differ.",
      explanation: "Step 1: 5 << 2 = 20. Step 2: 20 | 3 = 23. Step 3: 23 ^ 7: binary 00010111 XOR 00000111 clears the three lowest set bits, leaving 00010000 = 16."
    },
    {
      id: "v13",
      category: "CSS Flexbox",
      title: "Flex-Basis Zero vs Content Distribution",
      instruction: "A 300px flex container holds two items both set to 'flex: 1'. Item 1 contains 'Hi' and Item 2 contains 'Massive Cybernetic Data Stream'. What are their final rendered widths?",
      visualType: "flexbox",
      visualConfig: {
        containerStyles: {
          display: "flex",
          width: "300px",
          border: "2px dashed #ff003c",
          padding: "8px",
          background: "rgba(255, 0, 60, 0.05)"
        },
        items: [
          { text: "Item 1 (flex: 1)", height: "40px", bg: "#ff003c" },
          { text: "Item 2 (flex: 1)", height: "40px", bg: "#ff3366" }
        ]
      },
      options: [
        "Both items receive exactly 150px each (equal width)",
        "Item 2 takes 250px and Item 1 takes 50px based on content length",
        "Item 1 collapses to 0px because its content is tiny",
        "Item 2 overflows the container because flex items cannot wrap"
      ],
      correctIndex: 0,
      hint: "The shorthand 'flex: 1' sets 'flex: 1 1 0%'. What does a flex-basis of 0% do to intrinsic content width?",
      explanation: "'flex: 1' expands to 'flex-grow: 1; flex-shrink: 1; flex-basis: 0%'. Because flex-basis is 0%, all remaining space is distributed equally between the two items regardless of content size, yielding exactly 150px each."
    },
    {
      id: "v14",
      category: "CSS Box Model",
      title: "Vertical Margin Collapse",
      instruction: "Two sibling block-level boxes are stacked in standard document flow. Box A has margin-bottom: 40px;. Box B has margin-top: 25px;. What is the measured gap between them?",
      visualType: "box-model",
      boxData: {
        margin: "Box A bottom: 40px | Box B top: 25px",
        border: "1px dashed #ff003c",
        padding: "10px",
        content: "Sibling Block Elements in Flow",
        boxSizing: "border-box"
      },
      options: [
        "40px (adjoining margins collapse to the largest single margin)",
        "65px (40px + 25px combine additively)",
        "15px (40px - 25px difference)",
        "25px (the lower element's margin takes precedence)"
      ],
      correctIndex: 0,
      hint: "In normal block layout, adjacent top and bottom margins collapse into one.",
      explanation: "Under CSS margin collapse rules, adjacent vertical margins of in-flow block elements collapse into a single margin equal to the maximum of the two: max(40px, 25px) = 40px."
    },
    {
      id: "v15",
      category: "JavaScript Scope",
      title: "Lexical Scope & Variable Shadowing",
      instruction: "Analyze the nested function execution trace below. What value is printed by the final console.log(signal)?",
      visualType: "code-trace",
      steps: [
        "let signal = 'ALPHA_ROOT';",
        "function dispatch() {",
        "  let signal = 'BETA_LOCAL'; // Shadows outer signal",
        "  function subRoutine() {",
        "    signal = 'GAMMA_MUTATED';",
        "  }",
        "  subRoutine();",
        "}",
        "dispatch();",
        "console.log(signal); // Output?"
      ],
      options: [
        "'ALPHA_ROOT' (dispatch created a shadowed local variable; root signal was untouched)",
        "'GAMMA_MUTATED' (subRoutine modified the outer variable globally)",
        "'BETA_LOCAL' (the local scope persisted after function exit)",
        "undefined (due to lexical hoisting)"
      ],
      correctIndex: 0,
      hint: "Notice 'let signal = BETA_LOCAL' inside dispatch(). Did subRoutine modify the dispatch-scoped variable or the global variable?",
      explanation: "Inside dispatch(), 'let signal' declares a brand new variable in dispatch's scope. subRoutine() modifies that shadowed local variable. The global 'signal' was never reassigned and remains 'ALPHA_ROOT'."
    },
    {
      id: "v16",
      category: "Mechanical Logic Puzzle",
      title: "Interlocking Gear Train Direction",
      instruction: "Four meshed gears A, B, C, and D are connected in a line. Gear A rotates CLOCKWISE at 60 RPM. Gear C is an idler gear. In which direction and relative speed does Gear D rotate if Gear A has 20 teeth, B has 40 teeth, C has 10 teeth, and D has 20 teeth?",
      visualType: "code-trace",
      steps: [
        "Gear A (20 teeth) [Input Driver]: Rotates CLOCKWISE at 60 RPM",
        "  └── Meshed with Gear B (40 teeth): Rotates COUNTER-CLOCKWISE at 30 RPM",
        "      └── Meshed with Gear C (10 teeth) [Idler]: Rotates CLOCKWISE at 120 RPM",
        "          └── Meshed with Gear D (20 teeth) [Output]: What is its rotation and speed?"
      ],
      options: [
        "Gear D rotates COUNTER-CLOCKWISE at 60 RPM (same speed as Gear A)",
        "Gear D rotates CLOCKWISE at 30 RPM",
        "Gear D rotates COUNTER-CLOCKWISE at 120 RPM",
        "Gear D rotates CLOCKWISE at 60 RPM"
      ],
      correctIndex: 0,
      hint: "Adjacent meshed gears always rotate in opposite directions. For simple linear gear trains, intermediate gears act as idlers that do not alter the overall drive ratio between input Gear A and output Gear D!",
      explanation: "1. Direction: With 4 gears in sequence, direction alternates: A (CW) -> B (CCW) -> C (CW) -> D (CCW). 2. Speed: Since Gear A and Gear D both have 20 teeth, the gear ratio is 20/20 = 1:1. The intermediate gears B and C are idler gears that do not affect the output speed. Thus Gear D turns COUNTER-CLOCKWISE at 60 RPM."
    },
    {
      id: "v17",
      category: "C++ Memory Architecture",
      title: "C++ Pointer & Dereference Trace",
      instruction: "Trace the stack memory cells and pointer dereferences below. What is the final value printed by cout << a + *p + **pp;?",
      visualType: "code-trace",
      steps: [
        "Memory Address [0x1000]: int a = 10;",
        "Memory Address [0x1008]: int* p = &a;       // p stores address 0x1000",
        "Memory Address [0x1010]: int** pp = &p;     // pp stores address 0x1008",
        "Operation 1: *p = 25;                       // Overwrites 'a' to 25",
        "Operation 2: **pp = **pp + 5;               // Overwrites 'a' to 30",
        "Evaluation:  cout << a + *p + **pp;         // What is the sum?"
      ],
      options: [
        "90 (all three terms resolve to the exact same mutated integer 30)",
        "65 (10 + 25 + 30)",
        "70 (10 + 30 + 30)",
        "Undefined Behavior due to memory aliasing"
      ],
      correctIndex: 0,
      hint: "'a', '*p', and '**pp' all refer to the exact same physical memory cell at address 0x1000!",
      explanation: "'p' points to 'a', and 'pp' points to 'p'. Dereferencing '*p' and '**pp' accesses the memory location of 'a'. After Operation 2, 'a' is 30. Therefore, a = 30, *p = 30, and **pp = 30. The printed sum is 30 + 30 + 30 = 90."
    },
    {
      id: "v18",
      category: "Python Memory Model",
      title: "Python List Slicing vs Reference Mutation",
      instruction: "Trace the Python memory allocation and list slicing operations below. What does print(matrix[0]) output at the end?",
      visualType: "code-trace",
      steps: [
        "Step 1: matrix = [[1, 2], [3, 4]]",
        "Step 2: shallow_copy = matrix[:]     # Shallow slice copy",
        "Step 3: shallow_copy[0][0] = 99     # Mutates inner sublist",
        "Step 4: shallow_copy[1] = [88, 77]   # Reassigns second sublist",
        "Step 5: print(matrix[0])"
      ],
      options: [
        "[99, 2] (slice creates a new outer list, but inner sublists share references)",
        "[1, 2] (slicing creates an independent deep clone)",
        "[88, 77] (the reassignment affected the original matrix)",
        "TypeError: unhashable type 'list'"
      ],
      correctIndex: 0,
      hint: "Slicing with [:] creates a shallow copy. The outer lists are distinct, but what do their inner elements point to?",
      explanation: "Slicing `matrix[:]` produces a shallow copy. The outer list is duplicated, but the nested inner lists `matrix[0]` and `shallow_copy[0]` point to the exact same list in heap memory. Mutating `shallow_copy[0][0] = 99` alters that shared list, so `matrix[0]` is `[99, 2]`."
    },
    {
      id: "v19",
      category: "Pure Logic Puzzle",
      title: "Midnight Bridge & Torch Crossing",
      instruction: "Four people must cross a dark bridge with 1 torch. At most 2 people can cross at a time, and anyone crossing must hold the torch. The crossing times are: A (1 min), B (2 mins), C (7 mins), D (10 mins). When two walk together, they move at the slower person's pace. What is the MINIMUM time for all four to cross?",
      visualType: "code-trace",
      steps: [
        "Initial State: Persons A (1m), B (2m), C (7m), D (10m) on START side with Torch",
        "Trip 1: A & B cross (2 min) | Torch on FAR side",
        "Trip 2: Fast person returns with Torch",
        "Trip 3: Slowest pair C & D cross together (10 min)",
        "Trip 4: Fast person returns with Torch",
        "Trip 5: Final pair crosses to FAR side"
      ],
      options: [
        "17 minutes",
        "19 minutes",
        "21 minutes",
        "16 minutes"
      ],
      correctIndex: 0,
      hint: "Having the two slowest people (C & D, 7m and 10m) cross together saves 7 minutes, but make sure a fast person is waiting on the other side to bring the torch back!",
      explanation: "Optimal crossing strategy: 1) A and B cross (2 min). 2) A returns with torch (1 min) [Total: 3 min]. 3) C and D cross together (10 min) [Total: 13 min]. 4) B returns with torch (2 min) [Total: 15 min]. 5) A and B cross together (2 min) [Total: 17 min]!"
    }
  ],

  // ==========================================
  // ROUND 2: SPOT THE ERRORS (BUG HUNTER)
  // ==========================================
  round2: [
    {
      id: "b1",
      category: "JavaScript Quirks",
      title: "Closure & Async Loop Trap",
      scenario: "The developer expected this code to log '0', '1', '2' with a delay, but it outputs '3', '3', '3' instead. Click the buggy line.",
      codeLines: [
        "function triggerAlerts() {",
        "  for (var i = 0; i < 3; i++) {",
        "    setTimeout(() => {",
        "      console.log('Sensor index:', i);",
        "    }, 100);",
        "  }",
        "}"
      ],
      errorLineIndex: 1, // Line 2: for (var i = 0; i < 3; i++)
      errorExplanation: "Variable 'var i' is function-scoped, not block-scoped. By the time setTimeout callbacks execute, the loop has already terminated and i equals 3.",
      fixOptions: [
        "Replace 'var i = 0' with block-scoped 'let i = 0'",
        "Change setTimeout delay to 0 milliseconds",
        "Change 'console.log(i)' to 'console.log(this.i)'",
        "Replace 'i < 3' with 'i <= 3'"
      ],
      correctFixIndex: 0,
      hint: "Look at the variable declaration keyword in the for loop header. Does it have block scope?"
    },
    {
      id: "b2",
      category: "HTML5 Semantics & Forms",
      title: "Broken Form Submission",
      scenario: "Users report that pressing the 'Submit Payment' button resets all form inputs instead of transmitting data to the server. Spot the buggy line.",
      codeLines: [
        "<form id=\"checkoutForm\" action=\"/api/pay\" method=\"POST\">",
        "  <label for=\"email\">Hacker Handle / Email:</label>",
        "  <input type=\"email\" id=\"email\" name=\"email\" required>",
        "  <button type=\"reset\" class=\"neon-btn\">Submit Payment</button>",
        "</form>"
      ],
      errorLineIndex: 3, // Line 4: button type="reset"
      errorExplanation: "The button has type='reset', which clears all fields rather than submitting the form data.",
      fixOptions: [
        "Change button type to type='submit' (or omit type since submit is default)",
        "Change action to method='GET'",
        "Remove the id attribute from the form element",
        "Change input type='email' to type='text'"
      ],
      correctFixIndex: 0,
      hint: "Inspect the button attributes. Is its type configured for resetting or submitting?"
    },
    {
      id: "b3",
      category: "CSS Specificity & Units",
      title: "Silent CSS Unit Typo",
      scenario: "The neon glow container fails to center and its margin collapses unexpectedly in production. Click the line containing the fatal syntax error.",
      codeLines: [
        ".cyber-terminal {",
        "  display: block;",
        "  max-width: 800px;",
        "  margin: 0 auot;",
        "  border: 1px solid #ff003c;",
        "}"
      ],
      errorLineIndex: 3, // Line 4: margin: 0 auot;
      errorExplanation: "'auot' is a typographical misspelling of 'auto'. Browsers reject the entire margin declaration as invalid syntax.",
      fixOptions: [
        "Correct 'margin: 0 auot;' to 'margin: 0 auto;'",
        "Change 'display: block;' to 'display: inline;'",
        "Change 'max-width: 800px;' to 'width: 800%;'",
        "Add '!important' after '#ff003c'"
      ],
      correctFixIndex: 0,
      hint: "Read every character of the margin property value carefully."
    },
    {
      id: "b4",
      category: "Basic Programming & Logic",
      title: "Mutable Default Argument Hazard",
      scenario: "In this Python-based authentication queue, users share access logs across distinct function calls because of an unintended memory reference. Find the bug.",
      codeLines: [
        "def register_session(user_id, session_log=[]):",
        "    session_log.append(user_id)",
        "    return session_log"
      ],
      errorLineIndex: 0, // Line 1: def register_session(user_id, session_log=[]):
      errorExplanation: "Default list argument '[]' is evaluated once at function definition time. Every invocation without an explicit list mutates the exact same shared list.",
      fixOptions: [
        "Use 'session_log=None' and assign 'session_log = []' inside the function body if None",
        "Change 'session_log.append(user_id)' to 'session_log.insert(0, user_id)'",
        "Replace 'return session_log' with 'return list(user_id)'",
        "Rename the parameter to 'global_session_log'"
      ],
      correctFixIndex: 0,
      hint: "In Python, default arguments that are mutable objects (like lists or dicts) persist across calls."
    },
    {
      id: "b5",
      category: "JavaScript Coercion & Strict Equality",
      title: "Strict Equality String Coercion",
      scenario: "A security check checks if the entered clearance level is high enough, but always evaluates to FALSE because of strict comparison.",
      codeLines: [
        "function verifyClearance(inputElement) {",
        "  const level = inputElement.value; // returns string e.g. '5'",
        "  const REQUIRED_LEVEL = 5;",
        "  if (level === REQUIRED_LEVEL) {",
        "    return 'ACCESS_GRANTED';",
        "  }",
        "  return 'ACCESS_DENIED';",
        "}"
      ],
      errorLineIndex: 3, // Line 4: if (level === REQUIRED_LEVEL)
      errorExplanation: "inputElement.value is a String ('5'). Strict equality '===' does not coerce types, so '5' === 5 is always false.",
      fixOptions: [
        "Convert input with 'Number(level) === REQUIRED_LEVEL' or parseInt(level, 10)",
        "Change 'ACCESS_GRANTED' to true",
        "Remove inputElement.value and use inputElement.innerHTML",
        "Change const REQUIRED_LEVEL = 5 to null"
      ],
      correctFixIndex: 0,
      hint: "DOM input.value always returns a string. Comparing '5' === 5 fails under strict equality."
    },
    {
      id: "b6",
      category: "Logical Reasoning",
      title: "Impossible Conditional Trap",
      scenario: "This discount verification function never executes the VIP discount block, even for qualifying users. Identify the flawed condition line.",
      codeLines: [
        "function calculateDiscount(user) {",
        "  let discount = 0;",
        "  if (user.points > 1000 && user.points < 500) {",
        "    discount = 0.30; // 30% VIP discount",
        "  } else if (user.isStudent) {",
        "    discount = 0.15;",
        "  }",
        "  return discount;",
        "}"
      ],
      errorLineIndex: 2, // Line 3: if (user.points > 1000 && user.points < 500)
      errorExplanation: "A number can never simultaneously be greater than 1000 AND less than 500. The condition evaluates to false for all numbers.",
      fixOptions: [
        "Change condition to 'user.points > 1000' or an appropriate valid threshold range",
        "Change && to !=",
        "Change 'discount = 0.30' to 'discount = 30'",
        "Delete the else if block"
      ],
      correctFixIndex: 0,
      hint: "Can a number be simultaneously greater than 1000 and less than 500?"
    },
    {
      id: "b7",
      category: "JavaScript Quirks",
      title: "Alphabetical Number Sort Trap",
      scenario: "A leaderboard sorts numeric scores, but 100 gets ranked lower than 25 because array sorting behaves unexpectedly.",
      codeLines: [
        "function rankScores(scoreList) {",
        "  // Example input: [25, 8, 100, 4]",
        "  const sorted = scoreList.sort();",
        "  return sorted; // Returns [100, 25, 4, 8] !!",
        "}"
      ],
      errorLineIndex: 2, // Line 3: const sorted = scoreList.sort();
      errorExplanation: "By default, JavaScript Array.prototype.sort() converts elements to strings and compares UTF-16 code units alphabetically.",
      fixOptions: [
        "Pass a numeric comparator: scoreList.sort((a, b) => a - b)",
        "Change 'const sorted' to 'let sorted = scoreList.reverse()'",
        "Wrap with 'Math.max(...scoreList)'",
        "Replace scoreList.sort() with scoreList.map(Number)"
      ],
      correctFixIndex: 0,
      hint: "Array.prototype.sort() defaults to lexicographical (alphabetical) comparison unless given a custom comparator function."
    },
    {
      id: "b8",
      category: "CSS Layout",
      title: "Floating Absolute Positioning Anomaly",
      scenario: "The cyber badge tooltip is supposed to align to the top-right corner of each product card, but instead flies up to the top-right corner of the whole browser screen!",
      codeLines: [
        ".cyber-card {",
        "  display: block;",
        "  width: 300px;",
        "  height: 200px;",
        "}",
        ".cyber-badge {",
        "  position: absolute;",
        "  top: 10px;",
        "  right: 10px;",
        "}"
      ],
      errorLineIndex: 0, // Line 1: .cyber-card missing position: relative
      errorExplanation: "Absolute positioning positions relative to the nearest positioned ancestor. Without 'position: relative' on .cyber-card, the badge positions relative to the viewport.",
      fixOptions: [
        "Add 'position: relative;' to '.cyber-card'",
        "Change '.cyber-badge' to 'position: fixed;'",
        "Change '.cyber-card' to 'display: inline;'",
        "Add '!important' to 'top: 10px;'"
      ],
      correctFixIndex: 0,
      hint: "What position property must the parent container have to establish a containing block for absolute children?"
    },
    {
      id: "b9",
      category: "Basic Programming",
      title: "Off-by-One Array Boundary Fault",
      scenario: "This array scanner crashes with undefined errors when scanning the last item. Click the buggy line.",
      codeLines: [
        "function scanSensors(sensors) {",
        "  for (let i = 0; i <= sensors.length; i++) {",
        "    if (sensors[i].isCorrupted) {",
        "      return i;",
        "    }",
        "  }",
        "  return -1;",
        "}"
      ],
      errorLineIndex: 1, // Line 2: i <= sensors.length
      errorExplanation: "Using '<=' attempts to access 'sensors[sensors.length]', which is undefined and crashes when accessing .isCorrupted.",
      fixOptions: [
        "Change 'i <= sensors.length' to 'i < sensors.length'",
        "Change 'let i = 0' to 'let i = 1'",
        "Change 'return i' to 'return sensors[i]'",
        "Change 'sensors.length' to 'sensors.size'"
      ],
      correctFixIndex: 0,
      hint: "Array indices run from 0 to length - 1. Does '<=' walk past the last valid index?"
    },
    {
      id: "b10",
      category: "JavaScript ES6",
      title: "Arrow Function Arguments Trap",
      scenario: "This aggregator crashes with 'ReferenceError: arguments is not defined' in modern ES module execution. Click the buggy line.",
      codeLines: [
        "const calculateSum = () => {",
        "  let total = 0;",
        "  for (let i = 0; i < arguments.length; i++) {",
        "    total += arguments[i];",
        "  }",
        "  return total;",
        "};"
      ],
      errorLineIndex: 2, // Line 3: for (let i = 0; i < arguments.length; i++) {
      errorExplanation: "Arrow functions do not bind their own 'arguments' object. In ES modules or strict functions, 'arguments' does not exist.",
      fixOptions: [
        "Use rest parameters in the arrow function: const calculateSum = (...args) => { and loop args",
        "Replace 'arguments.length' with 'arguments.size'",
        "Declare 'var arguments = []' inside the arrow body",
        "Change 'return total;' to 'return this.total;'"
      ],
      correctFixIndex: 0,
      hint: "Arrow functions have no 'arguments' object; ES6 rest parameters (...args) should be used instead."
    },
    {
      id: "b11",
      category: "JavaScript Serialization",
      title: "Data Loss in JSON Deep Clone Hack",
      scenario: "After running this clone routine, calling clonedUnit.fireLaser() throws 'TypeError: clonedUnit.fireLaser is not a function'. Spot the buggy line.",
      codeLines: [
        "const combatUnit = {",
        "  serial: 'CYBER-99',",
        "  fireLaser: function() { return 'PEW PEW'; }",
        "};",
        "const clonedUnit = JSON.parse(JSON.stringify(combatUnit));",
        "clonedUnit.fireLaser();"
      ],
      errorLineIndex: 4, // Line 5: const clonedUnit = JSON.parse(JSON.stringify(combatUnit));
      errorExplanation: "JSON.stringify() silently discards functions, symbols, and undefined values during serialization, wiping out methods.",
      fixOptions: [
        "Use Object.assign({}, combatUnit) or structuredClone(combatUnit) instead of JSON serialization",
        "Change 'function() { return' to an arrow function",
        "Wrap the JSON.parse with an async await statement",
        "Add 'combatUnit.serialize = true' before stringifying"
      ],
      correctFixIndex: 0,
      hint: "What does JSON.stringify do when it hits an object key whose value is a function?"
    },
    {
      id: "b12",
      category: "JavaScript Scope & Context",
      title: "Lost Execution Context in Timer Callback",
      scenario: "The HUD status alert prints 'SECURITY OFFICER: undefined' because the callback lost its 'this' binding. Spot the line where context is lost.",
      codeLines: [
        "const securityTerminal = {",
        "  officer: 'Agent Zero',",
        "  announce() {",
        "    setTimeout(function() {",
        "      console.log('SECURITY OFFICER: ' + this.officer);",
        "    }, 1000);",
        "  }",
        "};"
      ],
      errorLineIndex: 3, // Line 4: setTimeout(function() {
      errorExplanation: "Standard functions passed to setTimeout execute with 'this' bound to the global window object (or undefined in strict mode), losing securityTerminal.",
      fixOptions: [
        "Change setTimeout(function() { to an arrow function: setTimeout(() => {",
        "Change 'this.officer' to 'window.officer'",
        "Replace setTimeout with setImmediate",
        "Change delay 1000 to 0"
      ],
      correctFixIndex: 0,
      hint: "Traditional function callbacks inside timers detach 'this'. Arrow functions preserve lexical 'this'."
    },
    {
      id: "b13",
      category: "JavaScript ES6",
      title: "Default Parameter Temporal Dead Zone (TDZ)",
      scenario: "Calling initPort() triggers 'ReferenceError: Cannot access port before initialization'. Click the line with the TDZ violation.",
      codeLines: [
        "function initPort(host = '0.0.0.0', timeout = port + 100, port = 8080) {",
        "  return { host, timeout, port };",
        "}",
        "initPort();"
      ],
      errorLineIndex: 0, // Line 1: function initPort(...)
      errorExplanation: "Function default parameters are evaluated left-to-right. Referencing 'port' before it is initialized in the parameter list triggers a Temporal Dead Zone ReferenceError.",
      fixOptions: [
        "Reorder parameters so 'port = 8080' is declared before 'timeout = port + 100'",
        "Change 'timeout = port + 100' to 'timeout = this.port + 100'",
        "Change host default value to null",
        "Wrap the parameters in an array destructuring pattern"
      ],
      correctFixIndex: 0,
      hint: "Default parameters evaluate from left to right in their own scope. Can a parameter use a subsequent parameter?"
    },
    {
      id: "b14",
      category: "JavaScript Built-ins",
      title: "The map(parseInt) Radix Pitfall",
      scenario: "The developer wanted to parse an array of numeric strings, but the output array is [10, NaN, 2]. Click the line causing the unexpected NaN.",
      codeLines: [
        "const stringArray = ['10', '10', '10'];",
        "const parsedNumbers = stringArray.map(parseInt);",
        "console.log(parsedNumbers); // Logs [10, NaN, 2]"
      ],
      errorLineIndex: 1, // Line 2: const parsedNumbers = stringArray.map(parseInt);
      errorExplanation: "map passes (element, index, array). parseInt treats the 2nd argument (index 0, 1, 2) as the numeric radix. Radix 1 is invalid (returns NaN), and radix 2 parses '10' as binary 2.",
      fixOptions: [
        "Pass an explicit callback: stringArray.map(str => parseInt(str, 10)) or stringArray.map(Number)",
        "Change 'const stringArray' to 'let stringArray'",
        "Call .trim() on each string before mapping",
        "Replace parseInt with parseFloat.bind(stringArray)"
      ],
      correctFixIndex: 0,
      hint: "Array.prototype.map passes the element AND its index to the callback. What does parseInt do with a second argument?"
    },
    {
      id: "b15",
      category: "JavaScript Promises & Async",
      title: "Async Executor Anti-Pattern",
      scenario: "When authService() fails, the rejection is unhandled and leaks an uncaught promise error instead of being captured by .catch(). Click the buggy line.",
      codeLines: [
        "function verifyToken(token) {",
        "  return new Promise(async (resolve, reject) => {",
        "    const valid = await authService(token);",
        "    if (!valid) throw new Error('Unauthorized');",
        "    resolve(valid);",
        "  });",
        "}"
      ],
      errorLineIndex: 1, // Line 2: return new Promise(async (resolve, reject) => {
      errorExplanation: "Passing an 'async' function into 'new Promise()' is an anti-pattern. Any error thrown inside an async executor produces an unhandled rejected promise that the outer Promise constructor cannot catch.",
      fixOptions: [
        "Remove 'new Promise()' and declare verifyToken as a direct async function: async function verifyToken(token) { ... }",
        "Change 'throw new Error' to 'console.error'",
        "Add a second reject parameter to authService",
        "Change const valid to var valid"
      ],
      correctFixIndex: 0,
      hint: "Async functions always return promises automatically. Wrapping an async arrow function inside new Promise() swallows synchronous throw capture."
    },
    {
      id: "b16",
      category: "Python Core",
      title: "Mutable Default Argument Glitch",
      scenario: "In production, calling append_log('auth_fail') retains and accumulates previous logs across independent requests. Identify the line with the bug.",
      codeLines: [
        "def append_log(event_id, logs=[]):",
        "    logs.append(event_id)",
        "    return logs",
        "",
        "# First call: ['err1'] -> Second call returns ['err1', 'err2'] unexpectedly"
      ],
      errorLineIndex: 0, // Line 1: def append_log(event_id, logs=[]):
      errorExplanation: "Default arguments in Python are evaluated once when the function is defined, not when called. Using a mutable list [] causes the same list instance to persist across all calls.",
      fixOptions: [
        "Change to 'def append_log(event_id, logs=None):' and set 'if logs is None: logs = []'",
        "Change 'logs.append(event_id)' to 'logs.insert(0, event_id)'",
        "Add 'global logs' at the beginning of the function",
        "Pass logs as a tuple instead: logs=()"
      ],
      correctFixIndex: 0,
      hint: "Default argument values are created once at definition time. What happens when you mutate a default list?"
    },
    {
      id: "b17",
      category: "Python Core",
      title: "Mutating List During Iteration",
      scenario: "When two consecutive invalid items appear in the list, the second one is skipped and never removed. Identify the line causing the iterator index shift.",
      codeLines: [
        "def remove_invalid(items):",
        "    for item in items:",
        "        if item.is_invalid:",
        "            items.remove(item)",
        "    return items"
      ],
      errorLineIndex: 1, // Line 2: for item in items:
      errorExplanation: "Mutating a list while iterating over it shifts remaining elements forward, causing the loop index to skip the element immediately following a deleted item.",
      fixOptions: [
        "Iterate over a copy: 'for item in items[:]:' or use a comprehension '[item for item in items if not item.is_invalid]'",
        "Change 'items.remove(item)' to 'del item'",
        "Use 'while len(items) > 0:' without index tracking",
        "Sort the list in reverse order before entering the loop"
      ],
      correctFixIndex: 0,
      hint: "When you remove an element from a list, the subsequent items shift left. What does that do to the current loop counter?"
    },
    {
      id: "b18",
      category: "Python Core",
      title: "Identity 'is' vs Equality '==' Trap",
      scenario: "Testing with 42 succeeds, but comparing 1000 against master PIN 1000 fails. Identify the line with the flawed comparison.",
      codeLines: [
        "def verify_pin(input_pin, master_pin):",
        "    # Both input_pin and master_pin are integers",
        "    if input_pin is master_pin:",
        "        return 'ACCESS_GRANTED'",
        "    return 'ACCESS_DENIED'"
      ],
      errorLineIndex: 2, // Line 3: if input_pin is master_pin:
      errorExplanation: "'is' checks memory identity (same object in heap), while '==' checks value equality. Python caches small integers (-5 to 256), but larger numbers (like 1000) are separate objects.",
      fixOptions: [
        "Change 'if input_pin is master_pin:' to 'if input_pin == master_pin:'",
        "Change 'return ACCESS_GRANTED' to 'yield ACCESS_GRANTED'",
        "Wrap input_pin in str(input_pin) is str(master_pin)",
        "Declare master_pin as a global variable"
      ],
      correctFixIndex: 0,
      hint: "Does 'is' compare numerical values or exact memory address identity?"
    },
    {
      id: "b19",
      category: "C++ Memory Architecture",
      title: "Dangling Reference to Local Stack Variable",
      scenario: "The returned token string accesses deallocated memory and causes undefined behavior or a crash. Identify the line returning the invalid reference.",
      codeLines: [
        "#include <string>",
        "const std::string& generateSessionToken() {",
        "    std::string token = \"session_token_998\";",
        "    return token;",
        "}"
      ],
      errorLineIndex: 3, // Line 4: return token;
      errorExplanation: "'token' is a local stack variable that is destroyed when generateSessionToken() exits. Returning a reference to it creates an undefined dangling reference.",
      fixOptions: [
        "Return by value 'std::string generateSessionToken()' instead of a reference 'const std::string&'",
        "Change 'std::string' to 'char*'",
        "Add 'inline' before the function signature",
        "Pass token through a pointer cast: return (const std::string&)token;"
      ],
      correctFixIndex: 0,
      hint: "Local variables allocated on the stack are destroyed when the function returns. Can you return a reference to them?"
    },
    {
      id: "b20",
      category: "C++ Numeric Types",
      title: "Integer Division Truncation Fault",
      scenario: "The ratio calculation always evaluates to 0.0 whenever currentPower is below maxPower (e.g. 45 / 100). Identify the line performing integer division.",
      codeLines: [
        "double calculatePowerRatio(int currentPower, int maxPower) {",
        "    double ratio = currentPower / maxPower;",
        "    return ratio * 100.0;",
        "}"
      ],
      errorLineIndex: 1, // Line 2: double ratio = currentPower / maxPower;
      errorExplanation: "Both currentPower and maxPower are integers. In C++, integer division truncates fractions to 0 before the result is assigned to the double ratio.",
      fixOptions: [
        "Cast to double: 'static_cast<double>(currentPower) / maxPower' (or multiply by 1.0)",
        "Change return type to 'float'",
        "Swap operands: 'maxPower / currentPower'",
        "Replace ratio with 'currentPower % maxPower'"
      ],
      correctFixIndex: 0,
      hint: "In C++, dividing an int by an int yields an int, truncating decimals to zero!"
    },
    {
      id: "b21",
      category: "C++ STL Containers",
      title: "Vector Out-of-Bounds Off-By-One",
      scenario: "This array reset loop accesses memory past the end of the vector, causing memory corruption or an out-of-bounds error. Identify the line with the boundary fault.",
      codeLines: [
        "#include <vector>",
        "void resetBuffer(std::vector<int>& buffer) {",
        "    for (size_t i = 0; i <= buffer.size(); ++i) {",
        "        buffer[i] = 0;",
        "    }",
        "}"
      ],
      errorLineIndex: 2, // Line 3: for (size_t i = 0; i <= buffer.size(); ++i)
      errorExplanation: "A vector of size N has valid indices from 0 to N-1. Using '<= buffer.size()' accesses buffer[buffer.size()], writing past allocated memory.",
      fixOptions: [
        "Change 'i <= buffer.size()' to 'i < buffer.size()'",
        "Change 'size_t i = 0' to 'int i = 1'",
        "Change 'buffer[i] = 0' to 'buffer.at(i) = 0'",
        "Change 'std::vector<int>&' to 'const std::vector<int>&'"
      ],
      correctFixIndex: 0,
      hint: "Vector indices are 0-indexed. Does '<=' walk past the last element?"
    },
    {
      id: "b22",
      category: "Algorithmic Logic",
      title: "Binary Search Integer Overflow Bug",
      scenario: "In this classic binary search implementation, calculating the midpoint on large arrays can cause integer overflow and crash. Identify the buggy line.",
      codeLines: [
        "int binarySearch(const std::vector<int>& arr, int target) {",
        "    int low = 0, high = arr.size() - 1;",
        "    while (low <= high) {",
        "        int mid = (low + high) / 2;",
        "        if (arr[mid] == target) return mid;",
        "        if (arr[mid] < target) low = mid + 1;",
        "        else high = mid - 1;",
        "    }",
        "    return -1;",
        "}"
      ],
      errorLineIndex: 3, // Line 4: int mid = (low + high) / 2;
      errorExplanation: "If (low + high) exceeds 2,147,483,647 (the maximum 32-bit signed integer), it overflows into a negative number, causing arr[mid] to crash with an out-of-bounds error.",
      fixOptions: [
        "Change to 'int mid = low + (high - low) / 2;' to prevent arithmetic overflow",
        "Change 'while (low <= high)' to 'while (low < high)'",
        "Change 'low = mid + 1' to 'low = mid'",
        "Change 'return -1' to 'return false'"
      ],
      correctFixIndex: 0,
      hint: "Can the sum of two large positive 32-bit integers overflow the maximum integer range?"
    },
    {
      id: "b23",
      category: "Python Core",
      title: "Single-Element Tuple Syntax Pitfall",
      scenario: "The function raises TypeError because target_coords evaluates as an integer instead of a tuple. Identify the buggy line.",
      codeLines: [
        "def get_target_coords():",
        "    # Intended to create a 1-element tuple containing coordinate 500",
        "    target_coords = (500)",
        "    if not isinstance(target_coords, tuple):",
        "        raise TypeError('target_coords must be a tuple!')",
        "    return target_coords"
      ],
      errorLineIndex: 2, // Line 3: target_coords = (500)
      errorExplanation: "Parentheses alone do not create a tuple in Python; they are treated as arithmetic grouping. A single-element tuple requires a trailing comma: (500,).",
      fixOptions: [
        "Add a trailing comma: 'target_coords = (500,)'",
        "Change '(500)' to 'tuple[500]'",
        "Change 'isinstance(target_coords, tuple)' to 'type(target_coords) == list'",
        "Use curly braces: target_coords = {500}"
      ],
      correctFixIndex: 0,
      hint: "In Python, what character distinguishes a single-element tuple from an expression in parentheses?"
    }
  ],

  // ==========================================
  // ROUND 3: BUZZER FINISH (RAPID FIRE BLITZ)
  // ==========================================
  round3: [
    {
      id: "z1",
      category: "HTML5",
      question: "Which HTML5 semantic element is intended for completely self-contained, independently syndicatable content (such as a news article or forum post)?",
      options: [
        "<article>",
        "<section>",
        "<aside>",
        "<figure>"
      ],
      correctIndex: 0,
      hint: "Think about RSS syndication and standalone news stories.",
      explanation: "<article> represents an independent piece of content meant to be distributed or reused on its own. <section> is for thematic groupings."
    },
    {
      id: "z2",
      category: "CSS3",
      question: "Which of the following creates a new stacking context in CSS without altering the element's position property from 'static'?",
      options: [
        "opacity: 0.95 (any value < 1)",
        "z-index: 9999",
        "margin: auto",
        "display: block"
      ],
      correctIndex: 0,
      hint: "Values of opacity below 1 force the browser to composite the element onto a new rendering layer.",
      explanation: "Giving an element an opacity less than 1 creates a new stacking context, whereas 'z-index' only applies to positioned elements."
    },
    {
      id: "z3",
      category: "Basic Programming",
      question: "In JavaScript, what does evaluating the expression: typeof NaN yield?",
      options: [
        "\"number\"",
        "\"NaN\"",
        "\"undefined\"",
        "\"object\""
      ],
      correctIndex: 0,
      hint: "Despite its acronym meaning Not-a-Number, IEEE 754 floating-point specification classifies it as a special numeric value.",
      explanation: "According to the IEEE 754 floating point standard and ECMAScript spec, NaN is technically a numeric data type representing 'Not-a-Number'."
    },
    {
      id: "z4",
      category: "Logical Reasoning",
      question: "If all CYBERS are NODES, and no NODES are GLITCHES, which statement is GUARANTEED to be true?",
      options: [
        "No CYBERS are GLITCHES",
        "Some GLITCHES are CYBERS",
        "All GLITCHES are NODES",
        "Every NODE is a CYBER"
      ],
      correctIndex: 0,
      hint: "If set A is inside set B, and set B has zero overlap with set C, then set A cannot touch set C.",
      explanation: "Since every CYBER is inside the set of NODES, and the set of NODES has zero overlap with GLITCHES, no CYBER can ever be a GLITCH."
    },
    {
      id: "z5",
      category: "CSS Specificity",
      question: "What is the calculated specificity score of this selector: nav.primary ul li:hover a ?",
      options: [
        "(0, 2, 4) -> 2 classes/pseudo-classes, 4 elements",
        "(0, 1, 3) -> 1 class/pseudo-class, 3 elements",
        "(1, 0, 4) -> 1 ID, 4 elements",
        "(0, 0, 5) -> 5 tag elements"
      ],
      correctIndex: 0,
      hint: "Count classes and pseudo-classes (.primary, :hover = 2) and count type selectors (nav, ul, li, a = 4).",
      explanation: "Classes/pseudo-classes: .primary, :hover (2). Elements: nav, ul, li, a (4). Specificity is (0, 2, 4)."
    },
    {
      id: "z6",
      category: "Basic Programming",
      question: "What is the average time complexity of searching for an existing key in a Hash Map / JavaScript Map with a good hashing function?",
      options: [
        "O(1) constant time",
        "O(n) linear time",
        "O(log n) logarithmic time",
        "O(n²) quadratic time"
      ],
      correctIndex: 0,
      hint: "Key hashing calculates the exact bucket index directly without inspecting other keys.",
      explanation: "Hash maps compute the bucket index directly using a hashing algorithm, achieving O(1) average lookup and insertion time."
    },
    {
      id: "z7",
      category: "Logical Reasoning",
      question: "You have 8 identically looking microchips. 7 weigh 10g each, but 1 counterfeit chip weighs 11g. What is the minimum balance scale weighings needed to guarantee finding it?",
      options: [
        "2 weighings",
        "1 weighing",
        "3 weighings",
        "4 weighings"
      ],
      correctIndex: 0,
      hint: "Ternary division: split into 3, 3, 2. If 3 vs 3 balances, weigh the remaining 2.",
      explanation: "Divide into groups of 3, 3, and 2. Weigh 3 vs 3. If balanced, weigh the remaining 2. If unbalanced, weigh 1 vs 1 from the heavier set of 3. Exactly 2 weighings guaranteed!"
    },
    {
      id: "z8",
      category: "HTML5",
      question: "Which HTML attribute specifies that an <audio> or <video> file should play repeatedly without stopping?",
      options: [
        "loop",
        "repeat",
        "continuous",
        "autoplay"
      ],
      correctIndex: 0,
      hint: "A 4-letter standard HTML5 media boolean attribute.",
      explanation: "The 'loop' boolean attribute instructs the browser media player to automatically seek back to the beginning upon reaching the end."
    },
    {
      id: "z9",
      category: "Basic Programming",
      question: "What will the JavaScript expression: [1, 2, 3] + [4, 5, 6] evaluate to?",
      options: [
        "\"1,2,34,5,6\" (String concatenation)",
        "[1, 2, 3, 4, 5, 6] (Array concatenation)",
        "NaN",
        "TypeError: invalid array operand"
      ],
      correctIndex: 0,
      hint: "The plus operator '+' coerces both array objects to primitive strings via .toString().",
      explanation: "The '+' operator coerces both arrays to strings ('1,2,3' and '4,5,6') and concatenates them into the string '1,2,34,5,6'."
    },
    {
      id: "z10",
      category: "Logical Reasoning",
      question: "In binary Boolean logic: If (P OR Q) is FALSE, what can you definitively conclude about P and Q?",
      options: [
        "Both P is FALSE and Q is FALSE",
        "P is TRUE and Q is FALSE",
        "At least one is TRUE",
        "P and Q must be opposites"
      ],
      correctIndex: 0,
      hint: "An OR truth table only outputs 0 in exactly one case.",
      explanation: "An OR operation is only false when both operands are false. If either were true, the OR expression would evaluate to true."
    },
    {
      id: "z11",
      category: "CSS3",
      question: "What is the default initial value of the CSS 'position' property for all HTML elements?",
      options: [
        "static",
        "relative",
        "absolute",
        "initial"
      ],
      correctIndex: 0,
      hint: "Elements render in normal document flow by default without offsets.",
      explanation: "The default value is 'static'. An element with position: static is not positioned and ignores top, right, bottom, left, and z-index."
    },
    {
      id: "z12",
      category: "Basic Programming",
      question: "Which global JavaScript method stops and cancels a recurring timer instantiated by setInterval()?",
      options: [
        "clearInterval()",
        "stopInterval()",
        "clearTimeout()",
        "killTimer()"
      ],
      correctIndex: 0,
      hint: "Pairs with setInterval to clear the interval ID.",
      explanation: "clearInterval(intervalID) cancels a timed, repeating action which was previously established by a call to setInterval()."
    },
    {
      id: "z13",
      category: "Logical Reasoning",
      question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
      options: [
        "$0.05 (5 cents)",
        "$0.10 (10 cents)",
        "$0.01 (1 cent)",
        "$0.15 (15 cents)"
      ],
      correctIndex: 0,
      hint: "Let ball = x, bat = x + 1.00. Then x + (x + 1.00) = 1.10. Solve for x.",
      explanation: "2x + 1.00 = 1.10 ==> 2x = 0.10 ==> x = $0.05. The bat costs $1.05 and the ball costs $0.05, totaling $1.10."
    },
    {
      id: "z14",
      category: "CSS Flexbox",
      question: "In CSS Flexbox, which property distributes and aligns flex items along the MAIN axis?",
      options: [
        "justify-content",
        "align-items",
        "align-content",
        "flex-direction"
      ],
      correctIndex: 0,
      hint: "align-items handles the cross axis; this property handles the main axis.",
      explanation: "'justify-content' aligns items along the main axis. 'align-items' aligns items along the cross axis."
    },
    {
      id: "z15",
      category: "HTML5",
      question: "Which HTML attribute provides required alternative text for screen readers and when images fail to render?",
      options: [
        "alt",
        "title",
        "desc",
        "caption"
      ],
      correctIndex: 0,
      hint: "3 letters, essential for web accessibility on <img> tags.",
      explanation: "The 'alt' attribute provides an alternative text for an image if the user for some reason cannot view it."
    },
    {
      id: "z16",
      category: "JavaScript Coercion",
      question: "What does evaluating the expression: [] + {} yield in standard JavaScript console runtime?",
      options: [
        "\"[object Object]\"",
        "\"0\"",
        "NaN",
        "TypeError: Invalid operand"
      ],
      correctIndex: 0,
      hint: "Array coerces to empty string \"\", while the plain object coerces to its string representation.",
      explanation: "[].toString() evaluates to \"\", and {}.toString() evaluates to \"[object Object]\". Concatenation yields \"[object Object]\"."
    },
    {
      id: "z17",
      category: "Logical Reasoning",
      question: "You meet two operatives: A and B. Operative A says: 'At least one of us is an infiltrator.' (Infiltrators always lie; Loyals always tell truth). What are they?",
      options: [
        "A is Loyal, and B is an Infiltrator",
        "Both A and B are Infiltrators",
        "Both A and B are Loyals",
        "A is an Infiltrator, and B is Loyal"
      ],
      correctIndex: 0,
      hint: "If A were lying, A's statement would be false, implying neither is an infiltrator (a contradiction!).",
      explanation: "If A were an Infiltrator, A's statement would be a lie, meaning neither is an infiltrator—which contradicts A being an infiltrator! Thus A must be Loyal (telling the truth). Since A is Loyal and at least one is an infiltrator, B must be the Infiltrator."
    },
    {
      id: "z18",
      category: "CSS3 Specificity",
      question: "How does the selector specificity of :where(.card, #nav) compare to :is(.card, #nav)?",
      options: [
        ":where() always contributes 0 specificity, while :is() adopts the specificity of its highest argument (#nav)",
        ":is() always contributes 0 specificity, while :where() adopts ID specificity",
        "Both always calculate the average specificity of all argument selectors",
        "There is no difference; they are exact functional aliases"
      ],
      correctIndex: 0,
      hint: "One of these was designed specifically for CSS resets and third-party libraries so rules can be overridden easily.",
      explanation: ":where() always has a specificity score of (0,0,0) regardless of the arguments inside. In contrast, :is() takes on the specificity of its most specific argument (in this case, #nav = 1,0,0)."
    },
    {
      id: "z19",
      category: "JavaScript Event Loop",
      question: "In the JavaScript event loop, which queued callback executes FIRST once synchronous execution finishes?",
      options: [
        "Promise.resolve().then(...) (Microtask queue)",
        "setTimeout(..., 0) (Macrotask / Timer queue)",
        "requestIdleCallback(...) (Idle task queue)",
        "setInterval(..., 0) (Interval queue)"
      ],
      correctIndex: 0,
      hint: "Microtasks are always completely drained before the next macrotask is processed from the queue.",
      explanation: "The microtask queue (Promises, queueMicrotask) has higher priority and is completely drained immediately after synchronous script execution, before any macrotask (setTimeout, setInterval) can run."
    },
    {
      id: "z20",
      category: "JavaScript Scope",
      question: "What is the result of executing: typeof undeclaredVar versus typeof uninitializedLet (where let uninitializedLet; is declared later in the same block)?",
      options: [
        "typeof undeclaredVar returns 'undefined', but typeof uninitializedLet throws a ReferenceError",
        "Both return 'undefined' without errors",
        "Both throw ReferenceErrors due to strict mode",
        "typeof uninitializedLet returns 'null'"
      ],
      correctIndex: 0,
      hint: "The Temporal Dead Zone (TDZ) makes accessing a let/const variable forbidden before its line of declaration.",
      explanation: "Undeclared variables return 'undefined' when checked with typeof. However, referencing a let/const variable in its Temporal Dead Zone (even with typeof) throws a ReferenceError."
    },
    {
      id: "z21",
      category: "Logical Reasoning",
      question: "Given the true proposition: 'If a node is breached (P), then the alarm sounds (Q)'. Which contrapositive statement is GUARANTEED to be logically true?",
      options: [
        "If the alarm does not sound (¬Q), then the node is not breached (¬P)",
        "If the alarm sounds (Q), then the node was breached (P)",
        "If the node is not breached (¬P), then the alarm does not sound (¬Q)",
        "Every alarm trigger indicates an active breach"
      ],
      correctIndex: 0,
      hint: "The contrapositive of 'P ⟹ Q' is '¬Q ⟹ ¬P'.",
      explanation: "A conditional statement P ⟹ Q is logically equivalent only to its contrapositive: ¬Q ⟹ ¬P. The converse (Q ⟹ P) and inverse (¬P ⟹ ¬Q) are logical fallacies."
    },
    {
      id: "z22",
      category: "JavaScript Objects",
      question: "What is the crucial difference between Object.freeze(obj) and Object.seal(obj)?",
      options: [
        "Object.seal() allows modifying existing writable property values, whereas Object.freeze() makes existing properties read-only",
        "Object.freeze() allows adding new keys, whereas Object.seal() prevents additions",
        "Object.freeze() automatically performs a recursive deep freeze on nested objects",
        "Object.seal() deletes all prototype methods from the target object"
      ],
      correctIndex: 0,
      hint: "Think about whether you can reassign an existing property's value in a sealed object.",
      explanation: "Both prevent adding or deleting properties. However, Object.seal() leaves existing writable properties writable (can be updated), whereas Object.freeze() marks existing properties as writable: false."
    },
    {
      id: "z23",
      category: "CSS Grid",
      question: "In CSS Grid Level 2, what does the value 'subgrid' (e.g. grid-template-columns: subgrid) enable a nested child to do?",
      options: [
        "Inherit and align directly to the parent grid's tracks and lines",
        "Render a 3D isometric perspective of the grid",
        "Automatically convert table rows into flex columns",
        "Split each grid cell into an isolated Web Component"
      ],
      correctIndex: 0,
      hint: "Allows nested children to share the exact column/row track sizes of their parent container.",
      explanation: "subgrid allows a grid item to adopt its parent grid's column or row tracks, ensuring that contents inside different nested cards stay perfectly aligned with each other across tracks."
    },
    {
      id: "z24",
      category: "Basic Programming",
      question: "Why does the code 'const cache = []; cache.push(42);' succeed without throwing an assignment error?",
      options: [
        "'const' freezes the variable identifier binding, not the underlying array object in heap memory",
        "Array methods automatically clone the array before mutation",
        "JavaScript automatically downgrades const to let inside function scopes",
        "The push() method is exempt from const enforcement in V8"
      ],
      correctIndex: 0,
      hint: "Does const make the data immutable, or does it only protect the variable identifier from reassignment?",
      explanation: "'const' creates an immutable variable binding (preventing cache = newArray), but the object or array that cache references remains mutable and can have its contents modified."
    },
    {
      id: "z25",
      category: "JavaScript Quirks",
      question: "In JavaScript, what does evaluating (0.1 + 0.2 === 0.3) return and why?",
      options: [
        "false, because IEEE 754 binary floating-point representation yields 0.30000000000000004",
        "true, because modern JavaScript engines automatically round decimal additions",
        "NaN, because floating point numbers cannot be compared with strict equality",
        "TypeError, because addition requires explicit numeric casting"
      ],
      correctIndex: 0,
      hint: "Decimal fractions like 0.1 cannot be represented precisely in base-2 binary floating point.",
      explanation: "In IEEE 754 double precision, binary fractions cannot represent 0.1 or 0.2 precisely without repeating digits. Their sum evaluates to 0.30000000000000004, so 0.1 + 0.2 === 0.3 evaluates to false."
    },
    {
      id: "z26",
      category: "Top-Tier Pure Logic Puzzle",
      question: "You have two ropes of irregular thickness. Each rope takes exactly 60 minutes to burn completely from end to end, but they burn at non-uniform speeds. How can you measure EXACTLY 45 minutes using only these two ropes and a lighter?",
      options: [
        "Light Rope 1 at BOTH ends and Rope 2 at ONE end. When Rope 1 finishes burning (30 mins), light the OTHER end of Rope 2 (15 mins more = 45 mins).",
        "Cut both ropes in half with a blade and burn one half of each sequentially.",
        "Light both ropes at one end and extinguish one when it appears 3/4 burned.",
        "It is physically impossible because the density and burn rate are non-uniform."
      ],
      correctIndex: 0,
      hint: "Lighting a rope at both ends causes the flames to meet in the middle, cutting the burn duration exactly in half (30 minutes) regardless of uneven thickness!",
      explanation: "Lighting Rope 1 at both ends consumes it in exactly 30 minutes. At that precise instant, Rope 2 (which was lit at one end) has exactly 30 minutes of burn time remaining. Lighting Rope 2's other end immediately cuts its remaining burn time to 15 minutes! Total elapsed time = 30 + 15 = 45 minutes."
    },
    {
      id: "z27",
      category: "Python Core",
      question: "In Python, given t = (1, 2, [3, 4]), what happens when you execute: t[2].append(5)?",
      options: [
        "It succeeds! The tuple becomes (1, 2, [3, 4, 5]) because the internal list is mutated in-place",
        "TypeError: 'tuple' object does not support item assignment",
        "It creates and returns a shallow copy of the tuple",
        "ValueError: immutable sequence cannot contain mutable references"
      ],
      correctIndex: 0,
      hint: "Tuples hold references to objects. Can the mutable list stored at index 2 be modified in-place?",
      explanation: "A tuple is immutable in that its item bindings cannot be reassigned (e.g. t[2] = [99] throws TypeError). However, the object referenced at t[2] is a mutable list, so calling .append() mutates the heap list in-place without modifying the tuple's reference."
    },
    {
      id: "z28",
      category: "C++ Numeric Types",
      question: "In C++, what is the exact value stored in 'result' after executing: double result = 7 / 2;?",
      options: [
        "3.0 (integer division 7 / 2 evaluates to 3 before conversion to double)",
        "3.5 (the destination type double promotes division to floating-point)",
        "4.0 (standard ceiling rounding)",
        "Compilation Error: type mismatch between integer division and double variable"
      ],
      correctIndex: 0,
      hint: "Both 7 and 2 are integer literals. In C++, operator evaluation occurs before assignment to the variable!",
      explanation: "Because both operands (7 and 2) are integers, C++ performs integer division, which truncates the decimal fraction to 3. Only after this computation is the integer 3 implicitly converted to double, producing 3.0."
    },
    {
      id: "z29",
      category: "Top-Tier Pure Logic Puzzle",
      question: "You are outside a sealed room with 3 light switches (1, 2, 3). Inside are 3 incandescent light bulbs. You can flip switches however you like, but you can only enter the room ONCE to inspect the bulbs. How do you determine which switch controls which bulb?",
      options: [
        "Turn Switch 1 ON for 10 minutes, turn it OFF, turn Switch 2 ON, and enter: Lit = Switch 2, Off & Warm = Switch 1, Off & Cold = Switch 3",
        "Turn Switch 1 and Switch 2 ON, enter the room, and test voltage with a multimeter",
        "Flip Switch 1 and 2 rapidly back and forth to cause a distinct filament vibration",
        "It is physically impossible without entering the room at least twice"
      ],
      correctIndex: 0,
      hint: "Incandescent light bulbs emit both light AND thermal heat when turned on for several minutes!",
      explanation: "Leave Switch 1 ON for 10 minutes so its bulb gets hot. Turn Switch 1 OFF and Switch 2 ON. Enter the room: the bulb that is ON connects to Switch 2. Of the two unlit bulbs, touch them: the WARM bulb connects to Switch 1, and the COLD bulb connects to Switch 3!"
    },
    {
      id: "z30",
      category: "Python Core",
      question: "In Python, what is printed by the second function call below?\n\ndef add(val, items=[]):\n    items.append(val)\n    return items\n\nadd(10)\nprint(add(20))",
      options: [
        "[10, 20] (default parameter expressions are evaluated once at definition time, persisting state)",
        "[20] (a new empty list is created on each function call)",
        "[10]",
        "TypeError: default argument mutated"
      ],
      correctIndex: 0,
      hint: "In Python, default arguments are created once when the function is defined, NOT each time it is called.",
      explanation: "In Python, default parameter expressions are evaluated once when the function definition is executed. That single list instance in memory is shared across all invocations that omit the second argument, accumulating [10, 20]."
    },
    {
      id: "z31",
      category: "C++ vs C Standards",
      question: "What does sizeof('a') evaluate to in standard C++ compared to C?",
      options: [
        "In C++, sizeof('a') == 1 (type char); in C, sizeof('a') == sizeof(int) (usually 4 bytes)",
        "In both C and C++, sizeof('a') is always 4 bytes",
        "In both C and C++, sizeof('a') is always 1 byte",
        "In C++, character literals are wide wchar_t (2 bytes); in C, they are ASCII (1 byte)"
      ],
      correctIndex: 0,
      hint: "In C, character literals are promoted to int. In C++, they have char type.",
      explanation: "In C, character constants like 'a' have type int, so sizeof('a') equals sizeof(int) (typically 4 bytes). In C++, character constants have type char, so sizeof('a') equals sizeof(char) which is guaranteed to be 1 byte."
    },
    {
      id: "z32",
      category: "Top-Tier Pure Logic Puzzle",
      question: "In a game show, you pick Door 1 out of 3 doors (1 car, 2 goats). The host, who knows what is behind each door, opens Door 3 to reveal a goat. He offers: 'Do you want to switch to Door 2?' Mathematically, should you switch?",
      options: [
        "Yes, switch! Switching doubles your winning probability from 1/3 (33.3%) to 2/3 (66.7%)",
        "No, stay. It makes no difference because the two remaining doors are 50/50",
        "No, staying gives a 2/3 probability because you selected Door 1 first",
        "Switch only if you prefer even numbered doors"
      ],
      correctIndex: 0,
      hint: "Your original door had only a 1/3 probability of hiding the car. Where does the remaining 2/3 probability go when the host eliminates Door 3?",
      explanation: "When you initially picked Door 1, there was a 1/3 chance it held the car and a 2/3 chance the car was behind Door 2 or 3. Because the host must always reveal a goat from the unchosen doors, that entire 2/3 probability shifts onto Door 2! Switching doubles your winning chances to 2/3."
    },
    {
      id: "z33",
      category: "Top-Tier Pure Logic Puzzle",
      question: "You have an unlimited water supply and two unmarked jugs: a 3-liter jug and a 5-liter jug. What is the MINIMUM number of filling/pouring steps to measure EXACTLY 4 liters into the 5-liter jug?",
      options: [
        "6 steps (Fill 5L -> Pour into 3L leaving 2L; Empty 3L; Pour 2L into 3L; Fill 5L; Fill 3L from 5L -> leaving 4L in 5L)",
        "4 steps",
        "8 steps",
        "It is mathematically impossible because 5 and 3 are odd numbers"
      ],
      correctIndex: 0,
      hint: "Fill the 5L jug first. Pour into the 3L jug to isolate 2 liters.",
      explanation: "Optimal 6-step solution: 1) Fill 5L jug (5L, 0L). 2) Pour from 5L into 3L until full (2L in 5L, 3L in 3L). 3) Empty 3L jug (2L in 5L, 0L in 3L). 4) Pour 2L from 5L into 3L jug (0L in 5L, 2L in 3L). 5) Fill 5L jug completely (5L in 5L, 2L in 3L). 6) Pour from 5L into 3L until 3L is full (needs 1L) -> leaving EXACTLY 4 liters in the 5L jug!"
    }
  ]
};

/**
 * Active Competition Question Set
 * Curated Selection: 4 Questions in Section 1, 8 Questions in Section 2, 8 Questions in Section 3
 * Perfectly balanced across Top-Tier Pure Logic Puzzles, C++, and Python!
 */
const QUESTION_DATABASE = {
  // Section 1: Exactly 4 Curated Puzzles (2 Top-Tier Pure Puzzles, 1 C++, 1 Python)
  round1: [
    MASTER_QUESTION_BANK.round1.find(q => q.id === "v16"), // Interlocking Gear Train (Pure Logic)
    MASTER_QUESTION_BANK.round1.find(q => q.id === "v17"), // C++ Pointer & Memory Trace (C++)
    MASTER_QUESTION_BANK.round1.find(q => q.id === "v18"), // Python List Slicing & Mutation (Python)
    MASTER_QUESTION_BANK.round1.find(q => q.id === "v19")  // Midnight Bridge Crossing (Pure Logic)
  ],
  // Section 2: Exactly 8 Curated Bug Hunters (4 Python, 3 C++, 1 Algorithm)
  round2: [
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b16"), // Python Mutable Default Arg
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b17"), // Python Loop List Mutation
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b18"), // Python 'is' vs '=='
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b19"), // C++ Dangling Reference
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b20"), // C++ Integer Division
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b21"), // C++ Vector Bounds
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b22"), // Binary Search Mid Overflow
    MASTER_QUESTION_BANK.round2.find(q => q.id === "b23")  // Python Single-Item Tuple
  ],
  // Section 3: Exactly 8 Curated Rapid Buzzer Questions (4 Top-Tier Pure Puzzles, 2 Python, 2 C++)
  round3: [
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z26"), // Burning Ropes 45 Min (Pure Logic)
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z27"), // Python Tuple Sublist Mutation (Python)
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z28"), // C++ Integer Division in Double (C++)
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z29"), // 3 Switches & 3 Bulbs (Pure Logic)
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z30"), // Python Default Arg Accumulation (Python)
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z31"), // sizeof('a') C++ vs C (C++)
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z32"), // Monty Hall 2/3 Switch (Pure Logic)
    MASTER_QUESTION_BANK.round3.find(q => q.id === "z33")  // 4L Water Jugs (Pure Logic)
  ]
};

// ==========================================
// RANDOMIZATION & SHUFFLE ENGINE
// ==========================================

/**
 * Fisher-Yates array shuffle algorithm
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

/**
 * Deep-clones and randomizes a single question
 * Shuffles options/patches and recalculates the correct index dynamically
 */
function randomizeSingleQuestion(question) {
  const cloned = JSON.parse(JSON.stringify(question));

  // If question has standard multiple choice options (Round 1 & 3)
  if (Array.isArray(cloned.options) && typeof cloned.correctIndex === 'number') {
    const originalCorrectText = cloned.options[cloned.correctIndex];
    shuffleArray(cloned.options);
    cloned.correctIndex = cloned.options.indexOf(originalCorrectText);
  }

  // If Round 2 bug question with fixOptions
  if (Array.isArray(cloned.fixOptions) && typeof cloned.correctFixIndex === 'number') {
    const originalCorrectFix = cloned.fixOptions[cloned.correctFixIndex];
    shuffleArray(cloned.fixOptions);
    cloned.correctFixIndex = cloned.fixOptions.indexOf(originalCorrectFix);
  }

  return cloned;
}

/**
 * Returns a fresh, randomized question pool for the requested round
 */
function getShuffledQuestions(roundKey, limit = null) {
  const pool = QUESTION_DATABASE[roundKey] || [];
  // Clone and randomize options within each question
  const randomizedQuestions = pool.map(q => randomizeSingleQuestion(q));
  // Shuffle order of questions
  shuffleArray(randomizedQuestions);
  return limit ? randomizedQuestions.slice(0, limit) : randomizedQuestions;
}

// Tactical Reference Sheets Unlocked in the Armory
const CHEAT_SHEETS = {
  cpp: {
    title: "C++ Core Mechanics & Memory Architecture",
    content: `
### Pointers & References
- **Pointers**: \`int* p = &a;\` stores address. \`*p\` dereferences to modify value directly.
- **Dangling References**: Never return references to local stack variables; return by value instead.
- **Character Literals**: In C++, \`sizeof('a') === 1\` (char). In C, \`sizeof('a') === sizeof(int)\` (4).

### Arithmetic Pitfalls
- **Integer Division**: \`7 / 2\` truncates to \`3\` before assignment to double!
- **Binary Search Mid**: Use \`low + (high - low) / 2\` to avoid 32-bit signed integer overflow.
`
  },
  python: {
    title: "Python Memory & Evaluation Mechanics",
    content: `
### Object References & Mutation
- **Mutable Default Arguments**: \`def f(x, lst=[])\` creates the list ONCE at definition time. Use \`lst=None\`.
- **Identity vs Equality**: \`is\` checks memory identity; \`==\` checks value equality.
- **Tuples**: \`(100)\` is a plain int; single-element tuples require a trailing comma \`(100,)\`.
- **Slicing**: \`lst[:]\` creates a shallow copy. Nested elements still share heap references!
`
  },
  logic: {
    title: "Classical Puzzles & Deduction",
    content: `
### Key Principles
- **Monty Hall**: Switching doors doubles your winning probability from 1/3 (33%) to 2/3 (67%).
- **Burning Ropes (45 min)**: Light Rope 1 at both ends (burns in 30 min) while lighting Rope 2 at one end. Light Rope 2's second end at 30 min (burns in 15 min).
- **Meshed Gear Train**: Rotational direction alternates across each mesh. Intermediate idler gears do not change gear ratios.
`
  }
};

// Global Attachments for Browser Safety
if (typeof window !== 'undefined') {
  window.MASTER_QUESTION_BANK = MASTER_QUESTION_BANK;
  window.QUESTION_DATABASE = QUESTION_DATABASE;
  window.getShuffledQuestions = getShuffledQuestions;
  window.randomizeSingleQuestion = randomizeSingleQuestion;
  window.shuffleArray = shuffleArray;
  window.CHEAT_SHEETS = CHEAT_SHEETS;
}
