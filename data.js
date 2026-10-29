/* ============================================================
   Cyber Sentinels — content bank
   Every item is a real-world attack pattern, written for students.
   ============================================================ */

export const PHISH = [
  {
    id: 'paypal',
    type: 'phish', channel: 'email', time: 30,
    from: 'PayPal Service',
    fromAddr: 'service@paypa1-secure.com',
    subject: '⚠️ Action required: your account will be limited in 24 hours',
    at: 'Today, 04:12',
    body: `Dear Customer,

We detected unusual sign-in activity on your account. To keep your account secure, you must confirm your identity within 24 hours or your balance will be permanently limited.

Confirm your information now to avoid permanent limitation.`,
    link: 'http://paypa1-secure.com/verify-account',
    verdict: 'scam',
    flags: [
      'The domain uses "paypa1" with the number 1 — a classic look-alike.',
      '"Dear Customer" instead of your name: real PayPal greets you by name.',
      'A 24-hour deadline is there to make you panic, not think.',
      'The link goes to a look-alike site, not paypal.com.'
    ],
    lesson: 'Read the domain immediately before the first slash. "paypa1-secure.com" is not paypal.com, no matter what the logo says.'
  },
  {
    id: 'fieldtrip',
    type: 'phish', channel: 'email', time: 30,
    from: 'Ms. Rivera (Science)',
    fromAddr: 'rivera@lincolnhs.edu',
    subject: 'Field trip permission slip — due Friday',
    at: 'Yesterday, 15:40',
    body: `Hi team,

Quick reminder that the aquarium permission slip is due Friday. Bring the signed paper to class — please don't email it.

See you in period 3,
Ms. Rivera`,
    verdict: 'safe',
    flags: [
      'The address is on the real school domain, lincolnhs.edu.',
      'No links, no attachments, no login request.',
      'Asks for an in-person action — exactly how a teacher works.'
    ],
    lesson: 'Not every email is an attack. The check is always the same: real domain, expected context, no credentials requested.'
  },
  {
    id: 'giftcard',
    type: 'phish', channel: 'sms', time: 25,
    from: '+1 (804) 555-0147',
    subject: 'Amazon Reward',
    at: 'Today, 08:07',
    body: `🎉 CONGRATS! You've been selected to receive a $1,000 Amazon gift card.

Claim within 2 HOURS or your reward expires:

bit.ly/x9kQ2`,
    link: 'bit.ly/x9kQ2',
    verdict: 'scam',
    flags: [
      'You never entered a competition — you cannot win one.',
      'A shortened link hides where it really goes.',
      'A two-hour deadline is pure pressure tactics.',
      'Unknown number, mass-blast wording ("CONGRATS!").'
    ],
    lesson: 'Nobody gives away $1,000 by text. Shortened links hide the destination — treat them as guilty until proven innocent.'
  },
  {
    id: 'itdesk',
    type: 'phish', channel: 'email', time: 30,
    from: 'IT Helpdesk',
    fromAddr: 'it-helpdesk@lincoln-school-support.com',
    subject: 'Mailbox full — reply with your password to keep your account',
    at: 'Today, 06:55',
    body: `Your mailbox has exceeded its storage limit.

Reply to this email with your username and password so we can upgrade your storage. Do not change your password during this migration.`,
    verdict: 'scam',
    flags: [
      'The domain is lincoln-school-support.com — not your school domain.',
      'IT never needs your password. Ever.',
      '"Do not change your password" is a control tactic to keep access.',
      'Real storage problems are fixed in a portal, not by email reply.'
    ],
    lesson: 'No legitimate helpdesk asks for your password. If the message says "don\'t change your password", that is the attacker protecting their access.'
  },
  {
    id: 'gdocs',
    type: 'phish', channel: 'email', time: 30,
    from: 'Google Docs',
    fromAddr: 'no-reply@docs-google.com',
    subject: 'A document has been shared with you',
    at: 'Today, 09:21',
    body: `Your teacher shared "Unit 6 Study Guide" with you.

Open the document to view it before tomorrow's test.`,
    link: 'https://docs.google.com.secure-share.co/view/9f2a',
    verdict: 'scam',
    flags: [
      'The sender is docs-google.com, not google.com.',
      'In the link, the real domain is secure-share.co — "docs.google.com" is just a decoy prefix.',
      'The shared-document lure is one of the most-clicked phishing themes.',
      '"Before tomorrow\'s test" adds time pressure.'
    ],
    lesson: 'Domains are read right-to-left from the first single slash. In docs.google.com.secure-share.co the real owner is secure-share.co.'
  },
  {
    id: 'bankalerts',
    type: 'phish', channel: 'email', time: 30,
    from: 'Valley National Bank',
    fromAddr: 'alerts@valleynational.bank',
    subject: 'Card purchase alert — $48.20 at Riverside Grocery',
    at: 'Today, 11:02',
    body: `We noticed a $48.20 purchase at Riverside Grocery on your debit card ending 4417.

If this was you, no action is needed. If it wasn't, call the number on the back of your debit card or open the bank app.

We will never ask for your PIN or a one-time code.`,
    verdict: 'safe',
    flags: [
      'Sender domain matches the bank\'s real domain.',
      'No link at all — it points you to the official app or the number on your card.',
      'It explicitly says it will never ask for a PIN or code.',
      'A purchase you actually made matches the alert.'
    ],
    lesson: 'Real banks do send alerts — the test is that they send you to a channel you already trust instead of a link in the message.'
  },
  {
    id: 'internship',
    type: 'phish', channel: 'email', time: 30,
    from: 'Talent Team — BrightWave Media',
    fromAddr: 'careers.brightwave@gmail.com',
    subject: 'Selected: Remote Data Assistant — $500/week, start Monday',
    at: 'Yesterday, 22:14',
    body: `Congratulations! You were selected from 300 applicants for a remote role at $500/week.

To activate your position, purchase two $50 Steam gift cards for the equipment kit and send the codes to your onboarding manager.

Also reply with your home address and a photo of your student ID.`,
    verdict: 'scam',
    flags: [
      'A real company recruits from its own domain, not a free Gmail account.',
      'No interview happened — you cannot be "selected".',
      'Gift cards are untraceable cash: no real employer ever asks for them.',
      'It harvests your address and student ID for identity theft.'
    ],
    lesson: 'Any job that asks you to pay first — especially in gift cards — is a scam. Real employers never ask you to buy anything to start.'
  },
  {
    id: 'usps',
    type: 'phish', channel: 'sms', time: 25,
    from: '+1 (206) 555-0193',
    subject: 'USPS',
    at: 'Today, 07:44',
    body: `USPS: Your parcel is on hold due to an incomplete address.

Pay the $1.99 redelivery fee within 12 hours:

usps-redelivery.top/pay`,
    link: 'usps-redelivery.top/pay',
    verdict: 'scam',
    flags: [
      'A .top domain has nothing to do with the postal service.',
      'A tiny fee is bait — the form harvests your full card details.',
      'You are not expecting a parcel that needs a fee.',
      'USPS does not text payment links for redelivery.'
    ],
    lesson: 'Small fees are big business for phishers: they get a full card number for "only $1.99". Track parcels in the official app instead.'
  },
  {
    id: 'steam',
    type: 'phish', channel: 'dm', time: 25,
    from: 'steamcommuntiy-noreply',
    subject: 'Steam Support',
    at: 'Today, 16:31',
    body: `Your account has been flagged for cheating and will be permanently banned.

To appeal, reply with the Steam Guard code sent to your phone so we can verify ownership.

Failure to respond in 30 minutes = permanent ban.`,
    verdict: 'scam',
    flags: [
      'The sender name is misspelled: "steamcommuntiy".',
      'No real support team asks for your 2FA / Steam Guard code.',
      'Threats of a permanent ban are designed to stop you thinking.',
      'You were contacted first, out of nowhere, in a chat.'
    ],
    lesson: 'A one-time code is a key. Anyone who asks you to read it out is trying to walk through your front door — even if they say they are support.'
  },
  {
    id: 'frienddm',
    type: 'phish', channel: 'dm', time: 25,
    from: '@jayden_hoops',
    subject: 'Jayden',
    at: 'Today, 20:12',
    body: `yo my account got locked and I need to get back in 😩

steam just sent a code to your phone right? send it here real quick i'll pay you back`,
    verdict: 'scam',
    flags: [
      'A friend\'s account was likely hijacked — the "friend" is now the attacker.',
      'It asks for a code sent to YOUR phone.',
      '"real quick" is pressure to skip the obvious question.',
      'You can verify by calling or seeing them in person.'
    ],
    lesson: 'Account-takeover scams often come from a real friend\'s hacked account. Verify out loud, on a different channel, before you send anything.'
  },
  {
    id: 'zoom',
    type: 'phish', channel: 'email', time: 30,
    from: 'Mr. Okafor (History)',
    fromAddr: 'okafor@lincolnhs.edu',
    subject: 'Zoom link for Thursday review session',
    at: 'Yesterday, 18:05',
    body: `Hi all,

Here is the link for the exam review on Thursday at 6pm. It's open to the whole class — join from the waiting room, no password needed.

https://lincolnhs.zoom.us/j/8823190475`,
    link: 'https://lincolnhs.zoom.us/j/8823190475',
    verdict: 'safe',
    flags: [
      'The link is on the school\'s own zoom.us subdomain.',
      'It matches a meeting you already expect from a known teacher.',
      'No login, password or personal details are requested.'
    ],
    lesson: 'Context matters: a link that matches an expected event, from a real school address, on the real service, is normal. Just never enter your school password to "join".'
  },
  {
    id: 'library',
    type: 'phish', channel: 'email', time: 30,
    from: 'Lincoln High Library',
    fromAddr: 'library@lincolnhs.edu',
    subject: 'Overdue: "The Martian" — $2 fine',
    at: 'Yesterday, 09:12',
    body: `Hi Sam,

Our records show "The Martian" was due Oct 18. Please return it to the front desk or renew it through the student portal you already use.

No payment link is included — fines are paid at the desk.

— Ms. Chen, Library`,
    verdict: 'safe',
    flags: [
      'Real school domain, personal greeting, specific detail you recognise.',
      'Explicitly refuses to send a payment link.',
      'Points to a portal you already use, not a new site.'
    ],
    lesson: 'A legitimate message reduces risk: it names you, matches reality, and never rushes you to a payment page.'
  },
  {
    id: 'lunch',
    type: 'phish', channel: 'email', time: 30,
    from: 'Student Accounts',
    fromAddr: 'billing@lincolnhs-billing.net',
    subject: 'Unpaid lunch balance — invoice attached',
    at: 'Today, 10:48',
    body: `Your lunch account is past due $18.50.

Open the attached invoice to pay and avoid suspension of meal service.`,
    attachment: 'Invoice_Oct2026.html',
    verdict: 'scam',
    flags: [
      'The domain is lincolnhs-billing.net — a fake copy of the school domain.',
      'An .html "invoice" is a fake login page in disguise.',
      'Threatening to suspend meals is emotional pressure.',
      'School payments go through the official portal, not an attachment.'
    ],
    lesson: 'Attachments ending in .html, .htm or .zip are usually fake login pages. Real invoices come as PDFs from the real domain.'
  }
];

export const QUIZ = [
  {
    id: 'padlock',
    type: 'choice', time: 20,
    prompt: 'The padlock (HTTPS) in your browser really means…',
    options: [
      { text: 'The site is honest and safe to shop on', why: 'Certificates are free and instant. Scam sites have padlocks too.' },
      { text: 'The connection is encrypted — the site can still be a scam', correct: true, why: 'HTTPS encrypts the pipe. It says nothing about whether the person on the other end is honest.' },
      { text: 'The police have checked the website', why: 'Nobody polices websites like that. Certificates only verify the domain owner.' },
      { text: 'Nothing can be stolen from you here', why: 'Encryption stops eavesdroppers, not a fake login page you typed into yourself.' }
    ],
    lesson: 'Encryption protects the pipe, not the person at the other end. A padlock is not a character reference.'
  },
  {
    id: 'strongest',
    type: 'choice', time: 25,
    prompt: 'Which of these passwords would take the longest to crack?',
    sub: 'Assume an attacker with a fast GPU rig and a wordlist.',
    options: [
      { text: 'Summer2024!', mono: true, why: 'A season, a year and one symbol is one of the first patterns cracking tools try.' },
      { text: 'Tr0ub4dor&3', mono: true, why: 'Better, but 11 characters with predictable leet substitutions cracks quickly.' },
      { text: 'blue-otter-sunset-hammer', mono: true, correct: true, why: '25 characters, no dictionary-shaped structure as a whole. Length wins — this is ~118 bits of entropy.' },
      { text: 'P@ssw0rd123', mono: true, why: 'The single most common "clever" password on every cracking list.' }
    ],
    lesson: 'Length beats complexity. Four random words joined together are stronger AND easier to remember than P@ssw0rd.'
  },
  {
    id: 'breach',
    type: 'choice', time: 25,
    prompt: 'A site you use emails you: "Your password was found in a breach." What is the smartest first move?',
    options: [
      { text: 'Change that password, and every other account that reused it, then turn on 2FA', correct: true, why: 'Attackers replay stolen passwords across other sites in seconds — this is credential stuffing.' },
      { text: 'Delete the email and move on', why: 'Ignoring it leaves the stolen password working.' },
      { text: 'Reply asking for more details', why: 'Never reply to a security alert. Open the site yourself instead.' },
      { text: 'Wait to see if anything bad happens', why: 'The bad thing already happened; waiting gives the attacker a head start.' }
    ],
    lesson: 'One breach exposes every account that shares that password. Change it everywhere it was reused, and use unique passwords from now on.'
  },
  {
    id: 'twofa',
    type: 'choice', time: 20,
    prompt: 'Two-factor authentication (2FA) protects you because…',
    options: [
      { text: 'It makes your password longer', why: '2FA adds a second proof; the password itself does not change.' },
      { text: 'A stolen password alone is no longer enough to log in', correct: true, why: '2FA needs a second factor — an app code, passkey or hardware key — that the attacker does not have.' },
      { text: 'It hides your account from Google', why: '2FA is about login proof, not visibility.' },
      { text: 'It encrypts your files', why: 'That is disk encryption. 2FA only guards the login.' }
    ],
    lesson: 'Passwords get stolen. 2FA means a stolen password is useless on its own. Prefer passkeys or an authenticator app over SMS codes.'
  },
  {
    id: 'reuse',
    type: 'choice', time: 20,
    prompt: 'Why is reusing one password everywhere so dangerous?',
    options: [
      { text: 'It slows down your computer', why: 'Reuse has nothing to do with performance.' },
      { text: 'One breached site hands attackers the keys to all your other accounts', correct: true, why: 'Automated "credential stuffing" tries stolen email/password pairs across hundreds of services.' },
      { text: 'The website will ban you', why: 'Sites cannot see your passwords on other services.' },
      { text: 'It is illegal', why: 'It is not illegal — just very risky.' }
    ],
    lesson: 'Think of each account as a separate lock. One stolen key should never open every door you own.'
  },
  {
    id: 'usb',
    type: 'choice', time: 20,
    prompt: 'You find a USB stick in the school car park. What do you do?',
    options: [
      { text: 'Plug it into a school laptop to find the owner', why: 'That is exactly the trap — "baiting". A rigged stick can install malware in seconds.' },
      { text: 'Hand it to IT or a teacher without plugging it in', correct: true, why: 'Found media is untrusted by default. Let IT inspect it in a safe environment.' },
      { text: 'Plug it into your home PC instead, it is safer', why: 'Your personal device is not a safe test lab.' },
      { text: 'Keep it and use it for your own files', why: 'You may be carrying malware in your pocket.' }
    ],
    lesson: 'Curiosity is the attack surface. Never plug in unknown media — hand it over instead.'
  },
  {
    id: 'otp',
    type: 'choice', time: 20,
    prompt: 'Someone calls: "This is your bank — a $340 charge was blocked. Read me the code we just texted you."',
    options: [
      { text: 'Read the code — they called you, so it must be real', why: 'Caller ID is trivially spoofed. The code is the key to your money.' },
      { text: 'Hang up and call the number on the back of your card', correct: true, why: 'Always start a fresh call through a channel you trust, never the one that contacted you.' },
      { text: 'Give them your card number but not the code', why: 'Half your card details is still a serious leak.' },
      { text: 'Ask them to email you instead', why: 'That keeps the attacker in the conversation and moves it to another fake channel.' }
    ],
    lesson: 'No bank will ever ask for a one-time code. Hang up, then dial the number printed on your card.'
  },
  {
    id: 'overshare',
    type: 'choice', time: 20,
    prompt: 'Which post is the most dangerous to publish publicly?',
    options: [
      { text: 'A photo of your lunch', why: 'Low risk, though it does reveal habits.' },
      { text: '"Home alone all week, here is my street and my daily walk to school at 7:40"', correct: true, why: 'Live location plus a routine is a stalker\'s dream — and a burglar\'s schedule.' },
      { text: 'A review of a video game', why: 'Harmless.' },
      { text: 'A photo of your dog', why: 'Low risk, unless it reveals your address in the background.' }
    ],
    lesson: 'Location plus routine is the dangerous combination. Share the moment, not the map.'
  },
  {
    id: 'ransom',
    type: 'choice', time: 20,
    prompt: 'What does ransomware do?',
    options: [
      { text: 'Encrypts your files and demands payment to unlock them', correct: true, why: 'Ransomware locks your data, then sells you the key — and paying often does not restore it.' },
      { text: 'Slows down your Wi-Fi', why: 'That is throttling, not ransomware.' },
      { text: 'Deletes your social media', why: 'Ransomware holds data hostage; it does not manage accounts.' },
      { text: 'Steals your screen brightness settings', why: 'Not a thing.' }
    ],
    lesson: 'Ransomware turns your own files into hostages. Backups are the only reliable way out.'
  },
  {
    id: 'backup',
    type: 'choice', time: 20,
    prompt: 'The strongest defence against losing your files to ransomware is…',
    options: [
      { text: 'A very long password', why: 'Great, but it does not bring files back.' },
      { text: 'Backups you have actually tested restoring', correct: true, why: 'An untested backup is a rumour. 3 copies, 2 media, 1 offline is the classic rule.' },
      { text: 'Antivirus alone', why: 'Useful, but new ransomware variants slip past it. Defence in depth matters.' },
      { text: 'Never using the internet', why: 'Not realistic — and files still get lost to drives failing.' }
    ],
    lesson: 'Back up early, back up often, keep one copy offline, and test that a restore actually works.'
  },
  {
    id: 'updates',
    type: 'choice', time: 20,
    prompt: 'Why do "annoying" software updates actually matter?',
    options: [
      { text: 'They mostly add new emoji', why: 'Some do, but that is not why security teams ship them.' },
      { text: 'They patch security holes attackers already know how to exploit', correct: true, why: 'Once a patch ships, the vulnerability is public. Unpatched devices get hit within days.' },
      { text: 'They make your battery last forever', why: 'Not the point.' },
      { text: 'They are only for big companies', why: 'Everyone\'s phone and laptop has known holes to close.' }
    ],
    lesson: 'Update promptly, and turn on automatic updates where you can. An unpatched device is an open door with the key taped to it.'
  },
  {
    id: 'clicked',
    type: 'choice', time: 25,
    prompt: 'You clicked a bad link and typed your school password. What now?',
    options: [
      { text: 'Change the password immediately, turn on 2FA, and tell IT or a teacher', correct: true, why: 'Speed matters. Changing the password kills the stolen one, and reporting protects everyone else too.' },
      { text: 'Say nothing — it is embarrassing', why: 'Silence is what attackers rely on. Fast reporting limits the damage.' },
      { text: 'Just close the tab and forget it', why: 'The credentials are already gone.' },
      { text: 'Delete your browsing history', why: 'History is local; the stolen password is not.' }
    ],
    lesson: 'Report fast, change the password, enable 2FA. Getting phished is normal; hiding it is the real mistake.'
  },
  {
    id: 'socialeng',
    type: 'choice', time: 20,
    prompt: '"Social engineering" means…',
    options: [
      { text: 'Hacking a server with code', why: 'That is a technical attack.' },
      { text: 'Manipulating people into breaking the rules for you', correct: true, why: 'It targets trust, urgency and authority — the human firewall, not the machine.' },
      { text: 'Building social media apps', why: 'Different meaning entirely.' },
      { text: 'Engineering a safer school', why: 'That is just good design.' }
    ],
    lesson: 'Most breaches start with a person, not a machine. Pause on urgency and check through a channel you chose.'
  },
  {
    id: 'wifi',
    type: 'choice', time: 20,
    prompt: 'You are on free café Wi-Fi. Safest habit?',
    options: [
      { text: 'Log into your bank quickly before anyone notices', why: 'Free Wi-Fi is exactly where fake hotspots and snooping live.' },
      { text: 'Stick to HTTPS sites, skip sensitive logins, or use your phone hotspot', correct: true, why: 'Encrypted traffic plus avoiding sensitive accounts keeps you out of reach.' },
      { text: 'Disable your firewall to get faster speed', why: 'You just removed your seatbelt for a smoother ride.' },
      { text: 'Trust it because it asked for a password', why: 'A password on Wi-Fi proves nothing about who runs it.' }
    ],
    lesson: 'Treat public Wi-Fi as public. Avoid sensitive logins, use HTTPS, or tether from your own phone.'
  },
  {
    id: 'manager',
    type: 'choice', time: 20,
    prompt: 'A password manager is useful because…',
    options: [
      { text: 'It lets you reuse one password safely', why: 'The opposite: it makes unique passwords practical.' },
      { text: 'It generates and remembers a unique long password for every account', correct: true, why: 'You memorise one strong master passphrase; it handles the rest and fills the right one only on the right site.' },
      { text: 'It posts your passwords to the cloud for friends', why: 'Absolutely not.' },
      { text: 'It replaces the need for 2FA', why: 'Use both. 2FA still stops a stolen master password.' }
    ],
    lesson: 'Memorise one strong passphrase, let the manager create and store the rest. For your most important accounts, use a passkey.'
  },
  {
    id: 'mfafatigue',
    type: 'choice', time: 25,
    prompt: 'Your phone keeps showing "Approve sign-in?" prompts you did not ask for. This is…',
    options: [
      { text: 'A glitch — just keep tapping Approve until it stops', why: 'That is exactly what "MFA fatigue" attacks want. One tap and the attacker is in.' },
      { text: 'An active attack: deny the prompts, change your password, report it', correct: true, why: 'Repeated prompts mean someone already has your password and is trying to get past 2FA.' },
      { text: 'Proof your account is extra safe', why: 'It is proof someone is knocking.' },
      { text: 'Normal when you update an app', why: 'App updates do not spam sign-in approvals.' }
    ],
    lesson: 'Unsolicited 2FA prompts are an alarm bell, not a nuisance. Deny, change your password, and report it.'
  }
];

export const CHATS = [
  {
    id: 'principal',
    type: 'chat', time: 40,
    contact: { name: 'Principal Hayes', sub: 'Unknown number · 1 new message', icon: 'PH' },
    thread: [{ who: 'them', text: 'Good morning. I am in a board meeting and locked out of the staff portal. I need you to read me the 6-digit code that just came to your phone. This is urgent — please do not tell anyone else.' }],
    options: [
      { text: 'Read the code out — it is the principal, this is urgent', why: 'The code is a login key. "Do not tell anyone" is the tell that something is wrong.', reply: '📵 40 seconds later your account is logged in from another country. The "principal" blocks you.' },
      { text: '"I can\'t share codes. I\'ll come to the office so you can verify me in person."', correct: true, why: 'You refused the shortcut and moved to a channel you chose. Real staff never need a student\'s login code.', reply: '✅ The number goes quiet. You walk to the office: the real principal never sent it. You just stopped an account takeover.' },
      { text: 'Send your student ID number instead', why: 'Any credential handed over can be used or sold. The request itself is the attack.', reply: '⚠️ The attacker now has your ID plus your name — and keeps asking for the code.' },
      { text: 'Ask them to email you so you can check', why: 'They control the email address they give you. Never verify an attacker through the attacker.', reply: '⚠️ A fake email arrives from a look-alike domain, asking again. The loop continues.' }
    ],
    lesson: 'Urgency + secrecy + "send me the code" = attack. Verify in person or through a channel you chose yourself.'
  },
  {
    id: 'remote',
    type: 'chat', time: 40,
    contact: { name: 'IT Support', sub: 'Unknown caller · screenshot attached', icon: 'IT' },
    thread: [{ who: 'them', text: 'Hi, this is IT. We are patching student laptops today. Install the remote-support tool in this screenshot and give me the 4-digit code it shows so I can finish before the end of the day.' }],
    options: [
      { text: 'Install it and share the code — IT needs access to fix things', why: 'Remote access plus the code hands over your whole machine, files and saved passwords.', reply: '🖥️ The tool connects. Files start opening and closing on their own. You cannot stop it.' },
      { text: '"What is the ticket number? I\'ll walk to the IT desk and confirm."', correct: true, why: 'Real IT has a ticket system and a physical desk. You moved the request to a channel they cannot fake.', reply: '✅ The caller hangs up. At the IT desk: no patch scheduled, no ticket. Reported and blocked.' },
      { text: 'Send a screenshot of your desktop so they can see the code', why: 'A screenshot can contain the code plus anything else on screen.', reply: '⚠️ Your screenshot includes an open document with your full name and address.' },
      { text: 'Ignore it but install the tool later just in case', why: 'Installing untrusted remote software is the breach, whether or not you talk to them.', reply: '⚠️ The tool sits quietly in the background with a permanent backdoor.' }
    ],
    lesson: 'Never install remote-access software or share its code because someone asked. Verify with IT directly, in person.'
  },
  {
    id: 'luna',
    type: 'chat', time: 40,
    contact: { name: '"Luna"', sub: 'Met in a game chat 3 days ago', icon: 'LU' },
    thread: [{ who: 'them', text: 'you are literally my best friend 🥺 can we keep us secret from your parents? also what school do you go to and what time do you walk home? i want to surprise you' }],
    options: [
      { text: 'Share your school and schedule — they are just being friendly', why: 'Secrecy plus a request for location and routine is the classic grooming pattern.', reply: '⚠️ "Luna" now knows your school, your route and when you are alone.' },
      { text: 'Keep chatting but never share identifying details — and tell a trusted adult about the secrecy request', correct: true, why: 'You kept your private information private and brought a trusted adult in. Secrecy from family is the red flag.', reply: '✅ A trusted adult helps you check the account. It is linked to dozens of similar approaches.' },
      { text: 'Block and screenshot everything, then report the account', correct: true, why: 'Blocking, keeping evidence and reporting is a strong response to a stranger asking for your location.', reply: '✅ You report the account with evidence. The platform removes it the same day.' },
      { text: 'Send a selfie so they know you are real', why: 'Photos are permanent, shareable and can be used to identify you or be manipulated.', reply: '⚠️ The photo is saved and later used to pressure you.' }
    ],
    lesson: 'Secrecy + location questions from a stranger is a red flag, always. Keep personal details private and tell a trusted adult early.'
  },
  {
    id: 'bankcall',
    type: 'chat', time: 40,
    contact: { name: 'Valley National Fraud', sub: 'Incoming call · number looks real', icon: '🏦' },
    thread: [{ who: 'them', text: 'This is the fraud team. A $340 charge was attempted on your card. To reverse it, read me the one-time code we just texted to your phone. I\'ll wait.' }],
    options: [
      { text: 'Read the code — they already know about the charge', why: 'They know the charge because they invented it. The code authorises their transfer.', reply: '💸 The "reversal" is actually a transfer out. $340 gone.' },
      { text: 'Hang up and call the number on the back of your card', correct: true, why: 'You ended the attacker\'s control of the conversation and used a number you can trust.', reply: '✅ The real bank has no such charge. They freeze the card and log the attempt.' },
      { text: 'Give the last 4 digits of your card to prove it is you', why: 'Card digits are exactly what an attacker wants next.', reply: '⚠️ Combined with your name and number, the attacker attempts more purchases.' },
      { text: 'Ask them to text you a link to confirm the charge', why: 'They will send a fake login page and harvest everything.', reply: '⚠️ The link asks for your full card number, expiry and PIN.' }
    ],
    lesson: 'Never authenticate a caller by giving them a code. Hang up and dial the number printed on your card.'
  },
  {
    id: 'friendlogin',
    type: 'chat', time: 35,
    contact: { name: 'Marcus', sub: 'Classmate · online now', icon: 'MA' },
    thread: [{ who: 'them', text: 'bro can I use your login for the homework site? mine is locked and the essay is due tonight. I won\'t change anything I promise 🙏' }],
    options: [
      { text: 'Send your username and password — it is just homework', why: 'Shared credentials are no longer yours. Anything done on the account is traced to you.', reply: '⚠️ Marcus shares it with two others. The teacher sees your account submit three different essays.' },
      { text: '"I can\'t share logins — let\'s get your account reset together instead"', correct: true, why: 'You protected your account AND helped. Account recovery is the correct fix, not credential sharing.', reply: '✅ You help him reset through the official form. Both accounts stay yours and his essay gets in on time.' },
      { text: 'Send it, but change your password afterwards', why: 'By then your work, your name and your history are already exposed on someone else\'s screen.', reply: '⚠️ He screenshots the dashboard before you change anything.' },
      { text: 'Give him a password you use on other sites too', why: 'This is the worst option: it spreads the exposure to every account that shares it.', reply: '⚠️ Now several accounts are exposed at once.' }
    ],
    lesson: 'Never share logins, even with friends. Help them recover their own account — sharing passwords can get you both in trouble.'
  }
];

/* ---------- password forge mission ---------- */
export const PASSWORD_MISSION = [
  {
    id: 'pw-pick',
    type: 'choice', time: 25,
    prompt: 'Which of these is the strongest password?',
    sub: 'All four would pass a school "8 characters and a number" rule.',
    options: [
      { text: 'Gryffindor99', mono: true, why: 'A famous name plus a number is on every cracking wordlist.' },
      { text: 'H0tD0g$2026', mono: true, why: '11 characters with predictable substitutions — cracked in minutes to hours.' },
      { text: 'velvet-anchor-mango-tiger', mono: true, correct: true, why: '27 characters of a random passphrase ≈ 125 bits of entropy. Length wins.' },
      { text: 'qwertyuiop1', mono: true, why: 'A keyboard row is one of the first patterns any tool tries.' }
    ],
    lesson: 'Four random words beat clever substitutions. Aim for 4+ words or 16+ random characters.'
  },
  {
    id: 'pw-build',
    type: 'pwbuild', time: 120,
    prompt: 'Forge a master password for your school account',
    sub: 'Type a password and watch the crack-time estimate change in real time.',
    hint: 'Aim for 70+ power. Long passphrases like "quiet-otter-sunset-hammer" score highest.',
    threshold: 70
  },
  {
    id: 'pw-manager',
    type: 'choice', time: 20,
    prompt: 'You have 40 accounts. How do you remember 40 different strong passwords?',
    options: [
      { text: 'Use one strong password everywhere', why: 'One breach would then unlock all 40 accounts at once.' },
      { text: 'Write them all in a public notes app', why: 'One compromised account exposes the entire list.' },
      { text: 'Let a password manager create and store them behind one strong passphrase', correct: true, why: 'Unique passwords become practical, and it only fills them on the real site.' },
      { text: 'Use your birthday plus the site name', why: 'That pattern is guessed instantly by cracking tools.' }
    ],
    lesson: 'One strong master passphrase + a password manager = a unique long password for every single account.'
  },
  {
    id: 'pw-friend',
    type: 'choice', time: 20,
    prompt: 'A friend asks for your login "just for one homework". Best answer?',
    options: [
      { text: 'Share it — friends help friends', why: 'Anything done on your account is traced to you, and they can copy your work.' },
      { text: 'Share it but change the password tomorrow', why: 'The damage happens in the first minute.' },
      { text: 'Say no and help them recover their own account', correct: true, why: 'Protects you both, and fixes the real problem.' },
      { text: 'Give them a password you also use elsewhere', why: 'That spreads the risk to every account sharing it.' }
    ],
    lesson: 'Your account, your responsibility. Never share credentials — help them reset instead.'
  },
  {
    id: 'pw-2fa',
    type: 'choice', time: 20,
    prompt: 'Which second factor is the strongest?',
    options: [
      { text: 'A code texted to your phone', why: 'SMS codes can be intercepted or stolen through SIM-swapping.' },
      { text: 'A passkey or security key', correct: true, why: 'Passkeys are bound to the real site, so a phishing page cannot replay them. This is the modern standard.' },
      { text: 'Your mother\'s maiden name', why: 'That is a weak "security question" — often findable online.' },
      { text: 'A second password', why: 'Two passwords are still just passwords.' }
    ],
    lesson: 'Passkeys and hardware keys resist phishing entirely. Use them for your most important accounts.'
  }
];

/* ---------- field manual ---------- */
export const RULES = [
  { n: '01', title: 'Urgency is the tell', text: 'Deadlines, threats and "act now" exist to stop you thinking. Slow down for 10 seconds — every time.' },
  { n: '02', title: 'Read the domain', text: 'Not the logo, not the display name. The domain right before the first single slash is the real owner.' },
  { n: '03', title: 'Codes are keys', text: 'Never read out a login code or share a password — not to friends, not to "IT", not to the principal.' },
  { n: '04', title: 'Long beats complex', text: 'Four random words are stronger and easier to remember than P@ssw0rd. Use a manager for the rest.' },
  { n: '05', title: 'Lock every door with 2FA', text: 'Passkeys or an authenticator app turn a stolen password into a useless password.' },
  { n: '06', title: 'Back up, then update', text: 'Patches close known doors; backups undo ransomware. Do both automatically.' }
];

/* ---------- boss battle ---------- */
export const BOSS_INTRO = {
  name: 'NULLBYTE',
  tag: 'A rogue AI is inside the school network. It will try every trick it has — phishing, pressure and plain lies. Answer fast, answer carefully. Eight good calls and it is offline for good.'
};
