# One practice check per lesson: (question, [options], correct_index, explanation)
CHECKS = {
  "cyber-safety": [
    ("A message makes you panic and asks you to click a link. What should you do first?", ["Click quickly before it expires", "Pause and verify through an official channel", "Forward it to friends", "Reply asking if it is real"], 1, "Strong emotion plus a request is the warning sign. Pause and verify using the official app, website or a number you already trust."),
    ("Which combination should you check before trusting a message?", ["The sender, the link, and the request", "The font, the logo, and the emoji", "The message length and time of day", "The profile photo only"], 0, "Scammers copy logos easily. The sender address, the real link and what they ask you to do reveal the scam."),
    ("A buyer sends a QR code so you can 'receive' ₹5,000. What happens if you scan it and enter your UPI PIN?", ["You receive ₹5,000", "Nothing happens", "Money is sent from your account", "Your account is verified"], 2, "A UPI PIN only authorises sending money. You never need a PIN or QR scan to receive money."),
    ("Which is the strongest way to protect an important account?", ["The same strong password everywhere", "A unique password plus 2-step verification", "Your birthday as the password", "Saving the password in a note on your phone"], 1, "A unique password stops one leak unlocking everything, and 2-step verification blocks someone who has only your password."),
    ("You've just lost money to a scam in India. What should you do first?", ["Wait a day to see if it returns", "Call 1930 and report at cybercrime.gov.in", "Delete the chat with the scammer", "Pay the scammer to undo it"], 1, "Act in the golden hour: call 1930, report online, call your bank and keep all evidence."),
  ],
  "cloud-basics": [
    ("What best describes cloud computing?", ["Storing files only on a USB drive", "Renting computing resources over the internet and paying for what you use", "Buying servers for your office", "Using Wi-Fi at home"], 1, "The cloud delivers computing, storage and software over the internet on a pay-as-you-go basis."),
    ("You want to run your own code without managing servers. Which model fits best?", ["IaaS", "PaaS", "SaaS", "On-premises"], 1, "PaaS gives you a ready platform for your code while the provider manages the servers."),
    ("Why spread an app across availability zones?", ["To make it cheaper", "To keep it running if one datacenter fails", "To change its programming language", "To avoid using a region"], 1, "Availability zones are separate datacenters in a region, so one failure doesn't take the app down."),
    ("What is a good first Azure certification?", ["AZ-400", "AZ-104", "AZ-900", "None, skip certifications"], 2, "AZ-900 Azure Fundamentals covers cloud concepts and core Azure services, and needs no prior experience."),
  ],
  "devops-foundations": [
    ("What is the main goal of DevOps?", ["Large releases once a year", "Delivering small changes often with fewer failures", "Separating developers from operations", "Using as many tools as possible"], 1, "DevOps is about shared ownership and shipping small, frequent, reliable changes."),
    ("What does Continuous Integration do?", ["Deploys to production once a month", "Builds and tests every code change automatically", "Writes code for you", "Monitors servers"], 1, "CI builds and tests each change as soon as it is pushed, so problems are found early."),
    ("What is a key benefit of Infrastructure as Code?", ["Environments can be reviewed, versioned and rebuilt exactly", "No need for a cloud provider", "It removes the need for testing", "It only works on laptops"], 0, "Describing infrastructure in files makes it repeatable, reviewable and easy to rebuild."),
    ("What does 'shifting left' mean in DevSecOps?", ["Moving security checks earlier into the pipeline", "Deploying on the left server", "Doing security only before release", "Removing security scans"], 0, "Shifting left builds security checks into every step, so issues are found early and fixed cheaply."),
  ],
  "ai-for-everyone": [
    ("How should you treat an AI chatbot's answer on an important fact?", ["As guaranteed truth", "As a strong first draft to verify", "As something to ignore", "As legal advice"], 1, "Generative AI can be confidently wrong, so check important facts with trusted sources."),
    ("Which prompt is likely to give the most useful answer?", ["Cloud", "Tell me stuff", "Explain cloud computing to a first-year student in five bullet points with one example", "Write everything about computers"], 2, "Clear prompts state the audience, the task and the format."),
    ("Which of these is safe to paste into a public AI tool?", ["Your bank OTP", "Client source code", "A public news article you want summarised", "Your Aadhaar number"], 2, "Never share secrets, personal IDs or confidential work data. Public information is fine."),
    ("What is prompt injection?", ["Typing prompts very fast", "Hidden instructions that try to trick an AI agent", "A way to speed up AI", "A type of vaccine"], 1, "Prompt injection hides instructions in pages, emails or files to hijack what an AI agent does."),
  ],
  "career-starter": [
    ("Which skills are useful across almost every tech career path?", ["Networking, Linux and basic scripting", "Only graphic design", "Only typing speed", "Memorising certification dumps"], 0, "Networking, Linux and a scripting language such as Python are shared foundations."),
    ("What's the best way to use certifications?", ["Collect as many as possible", "Pick one that fits your path and pair it with a project", "Avoid them completely", "Only list them, never practise"], 1, "One focused certification plus a hands-on project shows real skill."),
    ("What makes a portfolio stand out?", ["Ten unfinished projects", "Two or three complete projects with clear READMEs", "A list of course names", "Screenshots only"], 1, "Finished, well-explained projects are the clearest proof of what you can do."),
    ("In an interview you don't know an answer. What's the best response?", ["Guess confidently", "Stay silent", "Say you don't know, and explain how you would find out", "Change the subject"], 2, "Honesty plus a clear problem-solving approach is what interviewers value."),
  ],
  "hackathon-playbook": [
    ("What makes a strong hackathon idea?", ["A vague idea for everyone", "A real, specific problem that fits the judging criteria", "The most complex technology", "Copying last year's winner"], 1, "Clear, specific problems that match the judging criteria score best."),
    ("What team size usually works best?", ["One person", "Three or four people", "Ten people", "Twenty people"], 1, "A small team of three or four can cover building, design and the pitch."),
    ("What should an MVP focus on?", ["Many half-finished features", "One complete user journey that works end to end", "Only the logo", "Documentation only"], 1, "One working journey shows the idea better than many partial features."),
    ("What's the best safety net for a live demo?", ["Hope nothing breaks", "A recorded backup video of the demo", "Skipping the demo", "Talking faster"], 1, "A backup video keeps your pitch on track if something fails live."),
  ],
}
