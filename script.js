// Inventory system
let inventory = {
    about: true,
    projects: true,
    contact: true,
    tools: true // New section for tools, technology, and skills
};

// Track loaded sections
let loadedSections = {};

// Track sections ready to be unlocked
let readyToUnlock = {};

// Show loading animation
function showLoadingAnimation() {
    document.getElementById('loading-screen').style.display = 'flex';
}

// Hide loading animation
function hideLoadingAnimation() {
    document.getElementById('loading-screen').style.display = 'none';
}

// Scroll to section when button is pressed
function jumpToSection(sectionId) {
    if (!inventory[sectionId]) {
        if (readyToUnlock[sectionId]) {
            unlockSection(sectionId);
            readyToUnlock[sectionId] = false;
        } else {
            showPopup(`The ${sectionId} section is locked! Use a key to unlock it.`);
            return;
        }
    }

    if (!loadedSections[sectionId]) {
        showLoadingAnimation();
    }

    if (!document.getElementById(sectionId)) {
        createSection(sectionId);
        loadedSections[sectionId] = true;
    }

    const targetSection = document.getElementById(sectionId);
    const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY;

    setTimeout(() => {
        window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
        hideLoadingAnimation();
        loadedSections[sectionId] = true;
    }, 500);
}

// Create a new section with distinct styles and content
function createSection(sectionId) {
    const section = document.createElement('section');
    section.id = sectionId;
    section.className = 'unlocked'; // Start as unlocked

    // Add unique content to each section
    let sectionContent;
    if (sectionId === 'about') {
        sectionContent = `
            <style>
                .about {
                    background-color: #0d0d20; /* Dark Space Background */
                    color: #ffffff; /* White text for contrast */
                    padding: 20px; 
                    max-width: 800px; 
                    margin: auto; 
                    border-radius: 10px; 
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
                    position: relative; /* For positioning pseudo-elements */
                    overflow: hidden; /* To contain pseudo-elements */
                }
    
                .about h1, .about h2 {
                    animation: fadeIn 1.5s ease;
                    color: #00acc1; /* Teal for headings */
                }
    
                .about p {
                    color: white; /* White for paragraphs for better readability */
                    animation: fadeIn 1.5s ease;
                }
    
                .about img {
                    height: auto; 
                    animation: fadeIn 2s ease;
                }
    
                .collapsible {
                    font-family: inherit; /* Inherit font from parent */
                    background-color: #3498db; 
                    color: white; 
                    padding: 10px; 
                    border: none; 
                    border-radius: 5px; 
                    cursor: url('Cursor/SELECT.cur'), pointer;
                    width: 100%; 
                    text-align: left; 
                    font-size: 1.1em; 
                    transition: background-color 0.3s ease; 
                    position: relative;
                    overflow: hidden; /* To contain pseudo-elements */
                }
    
                .collapsible:hover {
                    background-color: #2980b9; /* Darker blue on hover */
                }
    
                .content {
                    padding: 15px; 
                    background-color: rgba(40, 40, 40, 0.8); /* Darker background for content */
                    border-radius: 5px; 
                    margin-top: 5px; 
                    display: none;
                }
    
                .coursework-list li {
                    background-color: rgba(255, 204, 188, 0.7); /* Light Coral */
                    border-radius: 5px; 
                    padding: 10px; 
                    margin: 5px 0; 
                    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
                    color: #ffffff; /* White text for better contrast */
                }
    
                .grid > div {
                    background-color: rgba(255, 153, 51, 0.7); /* Light Orange */
                    color: white; 
                    padding: 15px; 
                    border-radius: 5px; 
                    text-align: center; 
                    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
                    transition: transform 0.3s;
                }
    
                .grid > div:hover {
                    transform: scale(1.05); /* Scale effect on hover */
                }
            </style>
            <div class="about">
                <h1>About Me</h1>
                <p>Hi there! My name is Wei Rong. I'm an aspiring software developer with an interest in creating games and applications.</p>
                <img src="sky.jpg" alt="A beautiful sky">
    
                <h1>My Journey</h1>
                <p>I've always been curious about how software works.</p>
                <p>Inspired by the creativity and technical skill behind software applications, I started experimenting with simple game engines and programming languages.</p>
                <p>What began as a hobby quickly turned into a passion, leading me to pursue a career in the field, and now I'm committed to a career in software development.</p>
                
                <div class="about-grid" style="margin-top: 20px;">
                    <button class="collapsible">🎓 Education</button>
                    <div class="content">
                        <div style="margin-bottom: 15px;">
                            <p style="font-weight: bold; color: #00acc1; font-size: 1.5em; text-decoration: underline;">Bachelor of Mathematics</p>
                            <p style="color: #ffffff; font-style: italic;">University of Waterloo</p>
                        </div>
                        <p>In addition to my formal education, I actively self-study various computer science topics to enhance my skills and knowledge in software development. My studies cover topics such as:</p>
                        <ul style="padding-left: 0; list-style: none;" class="coursework-list">
                            <li>Computer Graphics</li>
                            <li>Computer Networks</li>
                            <li>Data Structures and Algorithms</li>
                            <li>And other subjects...</li>
                        </ul>
                    </div>
    
                    <button class="collapsible">🎨 Hobbies</button>
                    <div class="content">
                        <p>When I’m not coding, I enjoy diving into other creative outlets. Whether it’s sketching, designing new game mechanics, or getting lost in a great book, I’m always exploring ways to merge art and technology</p>
                        <div class="grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 10px;">
                            <div>Art</div>
                            <div>Game Design</div>
                            <div>Reading</div>
                        </div>
                    </div>
                </div>
    
                <p>In my free time, I enjoy relaxing with a good book, discovering new games, or staying updated on emerging tech trends</p>
            </div>
        `;
    
        section.className = 'about'; // Ensure the section has the 'about' class for styling
    }
    
    else if (sectionId === 'tools') {
        sectionContent = `
        <style>
            .tools-container {
                max-width: 800px; /* Adjust width for the skinny container */
                margin: auto; /* Center the container */
                padding: 20px;
                background-color: rgba(10, 10, 30, 0.9); /* Darker translucent background */
                color: #ffffff; /* White text for contrast */
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                position: relative; /* For positioning pseudo-elements */
            }
    
            .tools-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('https://i.imgur.com/VrG4s2H.png'); /* Starry background */
                background-size: cover;
                opacity: 0.3; /* Slightly visible stars */
                z-index: -1; /* Behind the content */
                border-radius: 10px; /* Match border radius */
            }
    
            .tools-section {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                padding: 20px 0; /* Add vertical padding */
            }
    
            .tools-section > div {
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
                transition: transform 0.3s, box-shadow 0.3s;
                position: relative; /* For pseudo-element positioning */
                overflow: hidden; /* To contain the pseudo-element */
            }
    
            .tools-section > div:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 30px rgba(255, 255, 255, 0.3);
            }
    
            .skills-list {
                list-style: none;
                padding: 0;
            }
            
            .languages-list li,
            .tech-stack-list li,
            .dev-tools-list li,
            .concepts-list li {
                background-color: rgba(255, 204, 188, 0.7); /* Light Coral */
                color: #fff; /* White text */
                border-radius: 5px; /* Rounded corners */
                padding: 10px; /* Padding for better spacing */
                margin: 5px 0; /* Space between items */
                box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
                transition: transform 0.3s, box-shadow 0.3s; /* Added transition for scale effect */
            }
    
            .languages-list li {
                background-color: rgba(255, 204, 188, 0.7); /* Light Coral */
            }
    
            .tech-stack-list li {
                background-color: rgba(255, 229, 127, 0.7); /* Light Yellow */
            }
    
            .dev-tools-list li {
                background-color: rgba(197, 225, 165, 0.7); /* Light Green */
            }
    
            .concepts-list li {
                background-color: rgba(129, 212, 250, 0.7); /* Light Sky Blue */
            }
    
            .languages-list li:hover,
            .tech-stack-list li:hover,
            .dev-tools-list li:hover,
            .concepts-list li:hover {
                transform: scale(1.05); /* Scale effect on hover */
                box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
            }
        </style>
        <div class="tools-container">
            <h1>Tools, Technology, and Skills</h1>
            <p>Here are some of the tools, technologies, and skills I work with regularly:</p>
            <img src="jg.jpg" alt="Sky Image" style="width:100%; height:auto; border-radius: 8px; box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2); transition: transform 0.3s, box-shadow 0.3s;">
            <div class="tools-section">
                <div class="languages-section">
                    <h2>Languages</h2>
                    <ul class="skills-list languages-list">
                        <li><strong>C</strong></li>
                        <li><strong>C++</strong></li>
                        <li><strong>C#</strong></li>
                        <li><strong>Java</strong></li>
                        <li><strong>JavaScript</strong></li>
                        <li><strong>Python</strong></li>
                        <li><strong>Lua</strong></li>
                        <li><strong>SQL</strong></li>
                    </ul>
                </div>
        
                <div class="tech-stack-section">
                    <h2>Technologies</h2>
                    <ul class="skills-list tech-stack-list">
                        <li><strong>Qt</strong></li>
                        <li><strong>SDL2</strong></li>
                        <li><strong>ImGUI</strong></li>
                        <li><strong>OpenGL</strong></li>
                        <li><strong>.NET</strong></li>
                        <li><strong>UWP</strong></li>
                        <li><strong>ReactJS</strong></li>
                        <li><strong>Node.js</strong></li>
                    </ul>
                </div>
        
                <div class="dev-tools-section">
                    <h2>Development Tools</h2>
                    <ul class="skills-list dev-tools-list">
                        <li><strong>Git</strong></li>
                        <li><strong>Docker</strong></li>
                        <li><strong>Visual Studio</strong></li>
                        <li><strong>Visual Studio Code</strong></li>
                        <li><strong>Unity</strong></li>
                        <li><strong>Unreal Engine</strong></li>
                        <li><strong>Blender</strong></li>
                    </ul>
                </div>
        
                <div class="concepts-section">
                    <h2>I am familiar with</h2>
                    <ul class="skills-list concepts-list">
                        <li>Object-Oriented Programming</li>
                        <li>Multithreading</li>
                        <li>Version Control</li>
                        <li>CI/CD</li>
                        <li>Computer Graphics</li>
                        <li>Networking</li>
                    </ul>
                </div>
            </div>
        </div>`;
        section.style.backgroundColor = 'rgb(7, 47, 83)'; // Light lavender background for the overall section
    }

    else if (sectionId === 'projects') {
        sectionContent = `
        <style>
            .projects-container {
                max-width: 800px;
                margin: auto;
                padding: 20px;
                background-color: rgba(10, 10, 30, 0.9);
                color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                position: relative;
            }
    
            .projects-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-size: cover;
                opacity: 0.3;
                z-index: -1;
                border-radius: 10px;
            }
    
            .project-item {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 20px;
                margin-bottom: 20px;
                padding: 10px;
                border-radius: 10px;
                background-color: rgba(255, 255, 255, 0.1);
                box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
                transition: transform 0.3s, box-shadow 0.3s;
                cursor: url('Cursor/SELECT.cur'), pointer;
                align-items: center;
            }
    
            .project-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
            }
    
            .project-item img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
            }
    
            .project-description {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
    
            .project-description h2 {
                margin: 0;
                color: #00acc1;
            }
    
            .project-description p {
                margin: 5px 0;
                color: #ffffff;
            }
            
            .project-details {
                display: none;
                margin-top: 10px;
                padding: 10px;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
                transform: translateX(10%); /* Center the details */
                position: relative;
                width: 250%; /* Ensure all project details have the same width */
                align-self: center; /* Center the details */
                align-items: center;
                max-width: 635px; 
            }

            .project-images-grid {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 10px;
            }
    
            .project-image-placeholder {
                height: 100px;
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #00acc1;
            }
    
            .projects-container h1 {
                text-align: center;
                color: #3498db;
            }
    
            .projects-container p {
                text-align: center;
                font-size: 1.2em;
                margin-bottom: 20px;
            }

            .project-details > div:not(:last-child) {
                border-bottom: 2px solid rgba(255, 255, 255, 0.2); /* Light border for separation */
                padding-bottom: 10px; /* Space below the border */
                margin-bottom: 10px; /* Space above the next section */
            }

            .project-features {
                background-color: rgba(255, 204, 188, 0.7); /* Light Coral */
                border-radius: 5px;
                padding: 15px;
                margin: 15px 0;
                box-shadow: 0 2px 12px rgba(255, 140, 105, 0.3); /* Coral shadow for more contrast */
                border-left: 8px solid #ff8a65; /* Coral left border for emphasis */
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .project-features:hover {
                transform: scale(1.02); /* Slight hover effect */
                box-shadow: 0 4px 20px rgba(255, 140, 105, 0.5); /* Hover shadow effect */
            }

            .project-planned-features {
                background-color: rgba(255, 229, 127, 0.7); /* Light Yellow */
                border-radius: 5px;
                padding: 15px;
                margin: 15px 0;
                box-shadow: 0 2px 12px rgba(255, 235, 59, 0.3); /* Yellow shadow */
                border-left: 8px solid #ffeb3b; /* Yellow left border */
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .project-planned-features:hover {
                transform: scale(1.02); /* Slight hover effect */
                box-shadow: 0 4px 20px rgba(255, 235, 59, 0.5); /* Hover shadow effect */
            }

            .project-currently-working-on {
                background-color: rgba(129, 212, 250, 0.7); /* Light Sky Blue */
                border-radius: 5px;
                padding: 15px;
                margin: 15px 0;
                box-shadow: 0 2px 12px rgba(3, 169, 244, 0.3); /* Sky Blue shadow */
                border-left: 8px solid #03a9f4; /* Sky Blue left border */
                transition: transform 0.3s, box-shadow 0.3s;
            }

            .project-currently-working-on:hover {
                transform: scale(1.02); /* Slight hover effect */
                box-shadow: 0 4px 20px rgba(3, 169, 244, 0.5); /* Hover shadow effect */
            }

            .project-details h3 {
                color: #00acc1; /* Teal color for headings */
                margin-bottom: 12px;
            }

            .project-details ul {
                list-style: none; /* Remove default list styling */
                padding: 0; /* Remove default padding */
            }

            .project-details li {
                background-color: rgba(255, 255, 255, 0.1); /* Light background for list items */
                border-radius: 5px; /* Rounded corners */
                padding: 12px; /* Padding for better spacing */
                margin: 8px 0; /* Space between items */
                box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2); /* Subtle shadow for depth */
                transition: transform 0.3s, box-shadow 0.3s; /* Transition for hover effects */
            }

            .project-details li:hover {
                transform: scale(1.05); /* Slight scale effect on hover */
                box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3); /* Enhanced shadow on hover */
            }

        </style>
    
        <div class="projects-container">
            <h1>Projects</h1>
            <p>Explore some of the projects I am working on.</p>
            <div class="project-item" onclick="toggleProjectDetails('project1-details')">
                <img src="project1.jpg" alt="2D Game Editor" class="project-image">
                <div class="project-description">
                    <h2>2D Game Editor</h2>
                    <p>A map editor with real-time updates, tile manipulation, and zoom functionality to streamline 2D level creation</p>
                </div>
                <div class="project-details" id="project1-details">
                    <p><strong>Languages:</strong> C++ </p>
                    <div id="project-features">
                        <h3>Features:</h3>
                        <ul>
                            <li>Designed a level configuration system to create, export, and import map data </li>
                            <li>Added a camera system for zoom and pan controls for easier navigation  </li>
                             <li>Implemented a basic physics engine for player movement, collision detection, and object interactions by using raycasting and AABB techniques</li>
                        </ul>
                    </div>
                    <div id="project-planned-features">
                        <h3>Planned Features:</h3>
                        <ul>
                            <li>Layer system to organize and manage tiles, objects, and background elements more efficiently</li>
                            <li>Addition of settings to customize the game</li>
                            <li>Dynamic Weather and Environmental Effects</li>
                        </ul>
                    </div>
                    <a href="https://github.com/chilly-nap/Hooked-on-Speed" target="_blank">View on GitHub (note: the one on Github was an outdated prototype)</a>
                    <div class="project-images-grid">
                        <img src="Project1/Menu.png" alt="Menu Screenshot" class="project-image">
                        <img src="Project1/Game.png" alt="Game Screenshot" class="project-image">
                    </div>
                </div>
            </div>
             <div class="project-item" onclick="toggleProjectDetails('project2-details')">
                <img src="project2.jpg" alt="Rasterizer" class="project-image">
                <div class="project-description">
                    <h2>3D Graphics Rasterizer</h2>
                    <p>A custom rasterizer to render 3D graphics.</p>
                </div>
                <div class="project-details" id="project2-details">
                    <p><strong>Languages:</strong> C++ </p>
                    <div id="project-features">
                        <h3>Features:</h3>
                        <ul>
                            <li>Developed a rasterizer that renders 3D models using the OBJ format, implementing normal mapping, texture mapping, and specular mapping</li>
                            <li>Implemented a camera, lighting system, and shader pipeline to enable realistic scene rendering with dynamic perspectives </li>
                            <li>Optimized some of the rendering pipeline by leveraging matrix transformations and backface culling, improving performance</li>
                        </ul>
                    </div>
                    <div id="project-planned-features">
                        <h3>Planned additions:</h3>
                        <ul>
                            <li>Better support for multi-model rendering for scenes</li>
                            <li>Support for multithreading to further optimize the renderer</li>
                        </ul>
                    </div>
                    <a href="https://github.com/chilly-nap/Rasterizer" target="_blank">View on GitHub</a>
                    <div class="project-images-grid">
                        <img src="Project2/Standard.png" alt="Standard Screenshot" class="project-image">
                        <img src="Project2/Custom.png" alt="Custom Screenshot" class="project-image">
                        <img src="Project2/Wireframe.png" alt="Wireframe Screenshot" class="project-image">
                    </div>
                </div>
            </div>
            <div class="project-item" onclick="toggleProjectDetails('project3-details')">
                <img src="project3.jpg" alt="Tactical RPG" class="project-image">
                <div class="project-description">
                    <h2>Tactical RPG</h2>
                    <p>A Grid-based RPG that with unique character abilities</p>
                </div>
                <div class="project-details" id="project3-details">
                    <p><strong>Languages:</strong> C# </p> <!-- Added tools -->
                    <div id="project-features">
                <h3>Features:</h3>
                <ul>
                    <li>Implemented movement validation algorithms supporting class behaviors alongside RPG mechanics (e.g., teleportation, shield blocking, AoE spells)</li>
                    <li>Customizable character classes with distinct stats and skill sets</li>
                    <li>Designed a scalable grid system to support variable board sizes and custom game scenarios</li>
                </ul>
            </div>
                    <a href="javascript:void(0);" target="_blank">Not on Github as of now</a>
                    <div class="project-images-grid">
                        <img src="Project3/Chess.png" alt="Screenshot" class="project-image">
                    </div>
                </div>
            </div>
            <div class="project-item" onclick="toggleProjectDetails('project4-details')">
                <img src="project4.jpg" alt="Shogi Learning App" class="project-image">
                <div class="project-description">
                    <h2>Shogi Learning App</h2>
                    <p>An interactive app teaching players to learn Shogi </p>
                </div>
                <div class="project-details" id="project4-details">
                    <p><strong>Languages:</strong> Java </p>
                    <div id="project-planned-features">
                        <h3>Features:</h3>
                        <ul>
                            <li>Step-by-step tutorials GUI covering basic rules, piece movements, and board setup</li>
                            <li>Added puzzle challenges where players solve specific Shogi scenarios to achieve checkmate</li>
                            <li>Progress tracking system that shows a player’s improvement over time</li>
                        </ul>
                    </div>
                    <div class="project-images-grid">
                        <img src="Project4/Teach.png" alt="teach Screenshot" class="project-image">
                        <img src="Project4/Tutorial.png" alt="Tutorial Screenshot" class="project-image">
                    </div>
                    <a href="javascript:void(0);" target="_blank">Not on Github as of now</a>
                </div>
            </div>
            <div class="project-item" onclick="toggleProjectDetails('project5-details')">
                <img src="project5.jpg" alt="Detective Puzzle Game" class="project-image">
                <div class="project-description">
                    <h2>Detective Puzzle Game (Currently working on)</h2>
                    <p>A 2D narrative-driven puzzle game where players take on the role of a private investigator </p>
                </div>
                <div class="project-details" id="project5-details">
                    <p><strong>Languages:</strong> Unity / C# </p>
                    <div id="project-planned-features">
                        <h3>Planned features:</h3>
                        <ul>
                            <li>Solve puzzles using gadgets like fingerprint kits, surveillance cameras, code decryption to gather critical evidence and break into areas</li>
                            <li>Dynamic dialogue system where interactions with NPCs influence investigation outcomes, offering branching storylines and moral choices</li>
                            <li>An interrogation system where players use logic, evidence, and persuasion in a turn-based dialogue battle to extract the truth</li>
                        </ul>
                    </div>
                    <a href="javascript:void(0);" target="_blank">Not on Github as of now</a>
                </div>
            </div>
            <div class="project-item" onclick="toggleProjectDetails('project6-details')">
                <img src="project6.jpg" alt="Turned-based Rougelite" class="project-image">
                <div class="project-description">
                    <h2>Turn-Based Roguelite (Currently working on)</h2>
                    <p>A turn-based roguelike where players collect resources from procedurally generated dungeons</p>
                </div>
                <div class="project-details" id="project6-details">
                    <p><strong>Languages:</strong> C++ </p>
                    <div id="project-planned-features">
                        <h3>Planned Work:</h3>
                        <ul>
                            <li>Procedural generation using BSP or Cellular Automata algorithms to create dungeon layouts </li>
                            <li>JSON-based configuration for weapons, NPCs, and enemies, enabling customization and game loading without modifying core code</li>
                            <li>Integrating Lua scripting to handle dynamic in-game events, NPC behavior, and customizable game mechanics </li>
                        </ul>
                    </div>
                    <a href="javascript:void(0);" target="_blank">Not on Github as of now</a>
                </div>
            </div>
        </div>
        `;
    }
    
    else if (sectionId === 'contact') {
        sectionContent = `
        <style>
        .contact-section {
            background-color: rgba(10, 10, 30, 0.9); /* Darker translucent background for contrast */
            color: #ffffff; /* White text for contrast */
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 800px;
            margin: auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            position: relative; /* For positioning pseudo-elements */
        }
        
        .contact-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('https://i.imgur.com/VrG4s2H.png'); /* Starry background */
            background-size: cover;
            opacity: 0.3; /* Slightly visible stars */
            z-index: -1; /* Behind the content */
        }
        
        .contact-section h1 {
            font-size: 2.5em; /* Larger font size for the heading */
            color: #00acc1; /* Teal color for the heading */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Add shadow for depth */
            margin-bottom: 20px;
        }
        
        .contact-section p {
            font-size: 1.2em; /* Slightly larger font size for paragraphs */
            line-height: 1.6;
            color: #ffffff; /* White text for contrast */
            margin-bottom: 15px;
        }
        
        .contact-section label {
            font-size: 1.1em; /* Slightly larger font size for labels */
            font-weight: bold;
            color: #00acc1; /* Teal color for labels */
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: 1fr; /* One column for centered email */
            gap: 20px; /* Space between columns */
            margin-top: 20px; /* Space above the contact info */
            text-align: center; /* Center align text in the contact info */
        }
        
        .contact-info p {
            border: 2px solid #00acc1; /* Teal border */
            padding: 10px; /* Padding inside the border */
            border-radius: 5px; /* Rounded corners */
            background-color: rgba(0, 0, 0, 0.5); /* Dark background for contrast */
            box-shadow: 0 4px 20px rgba(0, 172, 193, 0.2); /* Teal shadow for depth */
            transition: transform 0.3s, box-shadow 0.3s; /* Transition for hover effects */
            margin: 0 auto; /* Center the email block */
            display: inline-block; /* Allow margin auto to work */
        }
        
        .contact-info p:hover {
            transform: scale(1.05); /* Slight scale effect on hover */
            box-shadow: 0 8px 30px rgba(0, 172, 193, 0.3); /* Enhanced shadow on hover */
        }
        </style>
        <div class="contact-section">
            <h1>Contact</h1>
            <p>If you'd like to get in touch, you're in the right place!</p>
            <p>Feel free to reach out through the email listed below</p>
            <p>I'll get back to you as soon as possible.</p>
            <img src="robot.png" alt="robot" style="display: block; margin: 20px auto; width: 100%; max-width: 500px; height: auto; border-radius: 10px; box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);">
            <div class="contact-info">
                <p>Email:<br>wrgao5@gmail.com</p>
            </div>
        </div>`;
    }
    
    section.innerHTML = sectionContent;
    document.body.appendChild(section);
}

// Function to toggle the visibility of project details
function toggleProjectDetails(detailsId) {
    const details = document.getElementById(detailsId);
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}

// Toggle inventory panel
function toggleInventory() {
    const inventoryPanel = document.getElementById('inventory-panel');
    inventoryPanel.style.display = (inventoryPanel.style.display === 'none' || inventoryPanel.style.display === '') 
        ? 'block' 
        : 'none';
}

// Unlock a section
function unlockSection(sectionId) {
    inventory[sectionId] = true;

    // Create section if it doesn't exist
    if (!document.getElementById(sectionId)) {
        createSection(sectionId);
    }
    
    const section = document.getElementById(sectionId);
    section.classList.remove('unlocked');
    section.classList.add('unlocked');
}

// Initialize all sections as locked
document.querySelectorAll('section').forEach(section => {
    section.classList.add('unlocked');
});

// Simple jump to section without character animation
function basicJumpToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Hide header on scroll down and show on scroll up
let lastScrollTop = 0;
const header = document.querySelector('header');

// Smooth transition for the header
header.style.transition = 'top 0.3s';
// Hide top-button on scroll down and show on scroll up
const topButton = document.querySelector('.top-button');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 50) { 
        // Scroll down and only hide if scrolled past a threshold (e.g., 50px)
        header.style.top = '-200px'; // Adjust -100px based on header height
        topButton.style.display = 'none'; // Hide top-button
    } else if (scrollTop < lastScrollTop) {
        // Scroll up
        header.style.top = '0';
        topButton.style.display = 'block'; // Show top-button
    }
    
    // Update lastScrollTop, ensuring it's not negative
    lastScrollTop = Math.max(0, scrollTop);
});

// Simulate typing text for header and subheader
document.addEventListener("DOMContentLoaded", function () {
    const headerText = "Welcome to My Portfolio";
    const subheaderText = "Dive into my work!";
    
    // Directly set the text content without delay
    document.getElementById('typed-header').textContent = headerText;
    document.getElementById('typed-subheader').textContent = subheaderText;
});


// Toggle collapsible sections
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('collapsible')) {
        event.target.classList.toggle('active');
        var content = event.target.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }
});

// CSS for animations
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .collapsible:hover {
        background-color: #2980b9;
    }
    .collapsible:active {
        background-color: #1f6d8b;
    }
    .collapsible + .content {
        display: none;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
    }
`;
document.head.appendChild(style);

// script.js

document.addEventListener("mousemove", function (e) {
    createParticle(e.pageX, e.pageY);
});

function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Size of particles will be smaller for a dust effect
    const size = Math.random() * 5 + 2; // Random size between 2 and 7 pixels
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`; // Make it a circle

    // Light gray color for a dust/sand effect
    particle.style.backgroundColor = `rgba(200, 200, 200, 0.7)`; // Light gray with some transparency
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    // Apply a slight rotation to give it more of a "dust" look
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Adjust the animation duration to make it appear more organic
    const animationDuration = Math.random() * 0.5 + 0.5; // Random duration between 0.5s and 1s
    particle.style.animation = `fadeOut ${animationDuration}s forwards`;

    // Remove the particle after the animation is done
    particle.addEventListener("animationend", () => {
        particle.remove();
    });
}

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

// Function to update the progress circle
function updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / scrollHeight;
    const offset = circumference - scrollPercent * circumference;
    
    circle.style.strokeDashoffset = offset;
}

// Use requestAnimationFrame for smooth updates
let isTicking = false;

document.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            updateProgress();
            isTicking = false; // Reset flag after update
        });
        isTicking = true; // Set flag to prevent multiple updates
    }
});
