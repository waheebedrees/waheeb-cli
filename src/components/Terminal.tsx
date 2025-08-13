'use client';

import { useState, useEffect, useRef } from 'react';
import  { bannerText }  from './Banner';


interface CliData {
  personal_info: {
    name: string;
    tagline: string;
    current_status: string;
    about: string;
    contact: {
      email: string;
      website: string;
      github: string;
      portfolio: string;
    };
  };
  skills: {
    programming_languages: string;
    ai_ml_frameworks: string;
    specialized_areas: string;
    development_tools: string;
    cloud_infrastructure: string;
    current_focus: string;
  };
  research: {
    current_focus: string;
    active_projects: string;
    interests: string;
    application_domains: string;
  };
  projects: {
    ai_ml: Array<{name: string; description: string; tech: string}>;
    cybersecurity_automation: Array<{name: string; description: string; tech: string}>;
    intelligent_agents: Array<{name: string; description: string; tech: string}>;
    mobile_web: Array<{name: string; description: string; tech: string}>;
    portfolio_links: {
      github: string;
      live_portfolio: string;
    };
  };
  activities: {
    recent: string[];
    current_focus: string;
    upcoming: string;
  };
  hobbies: {
    intellectual_pursuits: string;
    technology_creativity: string;
    beyond_ai: string;
    relaxation: string;
  };
  quotes: {
    quotes_list: string[];
    personal_philosophy: string;
  };
  books: {
    currently_reading: string;
    ai_ml: string;
    cybersecurity_hacking: string;
    cognitive_science_philosophy: string;
    science_fiction_futurism: string;
  };
}

interface Command {
  name: string;
  description: string;
  aliases: string[];
  execute: (data: CliData) => string;
}

export default function Terminal() {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cliData, setCliData] = useState<CliData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch data from cli_data.json
    fetch('/cli_data.json')
      .then(response => response.json())
      .then((data: CliData) => {
        setCliData(data);
        setOutput([bannerText]);

      })
      .catch(error => {
        console.error('Error fetching CLI data:', error);
        setOutput(prev => [...prev, 'Error loading CLI data. Please try again later.']);
      });
  }, []);

  const commands: Command[] = [
    {
      name: 'help',
      description: 'show all available commands',
      aliases: ['h', '?'],
      execute: () => {
        return `available commands:
COMMAND              DESCRIPTION                                        ALIASES
──────────────────── ────────────────────────────────────────────────── ────────────────────
help                 show all available commands                        h, ?
whoami               display information about me                       who, me
about                show detailed bio and background                   bio, info
contact              show contact information                           email, reach
skills               list technical skills and expertise                tech, stack
research             show research areas and projects                   papers, studies
projects             show github projects and work                      work, portfolio, built
activities           show recent activities and updates                 activity, logs, recent
hobbies              what i do for fun                                  interests, fun
quotes               favorite quotes and thoughts                       quote, wisdom
books                my book collection and reading list                book, reading, library
clear                clear the terminal screen                          cls, clean
pwd                  show current location                              location
time                 show current time in my timezone                   date, now

tips: \`tab\` or \`→\` for autocomplete, \`↑/↓\` for cycling through history.`;
      }
    },
    {
      name: 'whoami',
      description: 'display information about me',
      aliases: ['who', 'me'],
      execute: (data) => {
        return `${data.personal_info.name}
${data.personal_info.tagline}
${data.personal_info.current_status}`;
      }
    },
    {
      name: 'about',
      description: 'show detailed bio and background',
      aliases: ['bio', 'info'],
      execute: (data) => {
        return `about me
========
${data.personal_info.about}`;
      }
    },
    {
      name: 'contact',
      description: 'show contact information',
      aliases: ['email', 'reach'],
      execute: (data) => {
        const contactInfo = data.personal_info.contact;
        return `contact information
==================
📧 email: ${contactInfo.email}
🌐 website: ${contactInfo.website}
💻 github: ${contactInfo.github}
🔗 portfolio: ${contactInfo.portfolio}

feel free to reach out for:
• ai research collaborations
• technical discussions
• project partnerships
• consulting opportunities

always open to connecting with fellow researchers and engineers!`;
      }
    },
    {
      name: 'skills',
      description: 'list technical skills and expertise',
      aliases: ['tech', 'stack'],
      execute: (data) => {
        const skills = data.skills;
        return `
technical skills & expertise
==========================
programming languages:
  ${skills.programming_languages}

ai/ml frameworks:
  ${skills.ai_ml_frameworks}

specialized areas:
  ${skills.specialized_areas}

development tools:
  ${skills.development_tools}

cloud & infrastructure:
  ${skills.cloud_infrastructure}

current focus:
  ${skills.current_focus}`;
      }
    },
    {
      name: 'research',
      description: 'show research areas and projects',
      aliases: ['papers', 'studies'],
      execute: (data) => {
        const research = data.research;
        return `research areas & projects
========================
🔬 current research focus:
   • ${research.current_focus}

🧪 active research projects:
   • ${research.active_projects}

🎯 research interests:
   • ${research.interests}

📊 application domains:
   • ${research.application_domains}`;
      }
    },
    {
      name: 'projects',
      description: 'show github projects and work',
      aliases: ['work', 'portfolio', 'built'],
      execute: (data) => {
        const projects = data.projects;
        let projectOutput = `github projects & engineering work
================================\n`;

        for (const category in projects) {
          if (category === 'portfolio_links') continue;
          projectOutput += `\n${category.replace(/_/g, ' ')}:\n`;
          const categoryProjects = projects[category as keyof typeof projects];
          if (Array.isArray(categoryProjects)) {
            categoryProjects.forEach((proj) => {
              projectOutput += `   • ${proj.name} - ${proj.description} (${proj.tech})\n`;
            });
          }
        }

        projectOutput += `\n🌐 portfolio:\n   • github: ${projects.portfolio_links.github}\n   • live portfolio: ${projects.portfolio_links.live_portfolio}\n\nall projects showcase practical applications of ai and modern development practices!`;
        return projectOutput;
      }
    },
    {
      name: 'activities',
      description: 'show recent activities and updates',
      aliases: ['activity', 'logs', 'recent'],
      execute: (data) => {
        const activities = data.activities;
        let activityOutput = `recent activities\n================\n`;
        activities.recent.forEach((act: string) => {
          activityOutput += `🔬 ${act}\n`;
        });
        activityOutput += `\n🎯 current focus:\n   • ${activities.current_focus}\n\n🌟 upcoming:\n   • ${activities.upcoming}\n\nstay tuned for cutting-edge ai research and practical applications!`;
        return activityOutput;
      }
    },
    {
      name: 'hobbies',
      description: 'what i do for fun',
      aliases: ['interests', 'fun'],
      execute: (data) => {
        const hobbies = data.hobbies;
        return `hobbies & interests
==================
🧠 intellectual pursuits:
   • ${hobbies.intellectual_pursuits}

🎮 technology & creativity:
   • ${hobbies.technology_creativity}

🌍 beyond ai:
   • ${hobbies.beyond_ai}

🎵 relaxation:
   • ${hobbies.relaxation}

balancing intense research with diverse interests keeps creativity and innovation flowing!`;
      }
    },
    {
      name: 'quotes',
      description: 'favorite quotes and thoughts',
      aliases: ['quote', 'wisdom'],
      execute: (data) => {
        const quotes = data.quotes;
        let quoteOutput = `favorite quotes & thoughts
========================\n`;
        quotes.quotes_list.forEach((q: string) => {
          quoteOutput += `"${q}"\n\n`;
        });
        quoteOutput += `personal philosophy:\n"${quotes.personal_philosophy}"`;
        return quoteOutput;
      }
    },
    

    {
      name: 'books',
      description: 'my book collection and reading list',
      aliases: ['book', 'reading', 'library'],
      execute: (data) => {
        const books = data.books;
        return `reading list & library
=====================
📚 currently reading:
   • ${books.currently_reading}

🤖 ai & machine learning:
   • ${books.ai_ml}

🔒 cybersecurity & hacking:
   • ${books.cybersecurity_hacking}

🧠 cognitive science & philosophy:
   • ${books.cognitive_science_philosophy}

📖 science fiction & futurism:
   • ${books.science_fiction_futurism}

books expand understanding and inspire breakthrough thinking in ai and security!`;
      }
    },
    {
      name: 'clear',
      description: 'clear the terminal screen',
      aliases: ['cls', 'clean'],
      execute: () => {
        setOutput([bannerText]);
        return '';
      }
    },
    {
      name: 'pwd',
      description: 'show current location',
      aliases: ['location'],
      execute: () => {
        return '~/the-internet/waheeb';
      }
    },
    {
      name: 'time',
      description: 'show current time in my timezone',
      aliases: ['date', 'now'],
      execute: () => {
        const now = new Date();
        return `${now.toLocaleString()} (local time)`;
      }
    }
  ];

  const findCommand = (input: string): Command | undefined => {
    const trimmedInput = input.trim().toLowerCase();
    return commands.find(cmd => 
      cmd.name === trimmedInput || cmd.aliases.includes(trimmedInput)
    );
  };

  const getSuggestions = (input: string): string[] => {
    if (!input.trim()) return [];
    const trimmedInput = input.trim().toLowerCase();
    return commands
      .filter(cmd => 
        cmd.name.startsWith(trimmedInput) || 
        cmd.aliases.some(alias => alias.startsWith(trimmedInput))
      )
      .map(cmd => cmd.name)
      .slice(0, 5);
  };

  const executeCommand = (input: string) => {
    if (!cliData) {
      setOutput(prev => [...prev, 'CLI data not loaded yet. Please wait.']);
      return;
    }
    const command = findCommand(input);
    if (command) {
      const result = command.execute(cliData);
      if (result) {
        setOutput(prev => [...prev, `$ ${input}`, result]);
      }
    } else if (input.trim()) {
      setOutput(prev => [...prev, `$ ${input}`, `command not found: ${input}. type 'help' for available commands.`]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setHistory(prev => [...prev, input]);
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === 'Tab' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentSuggestions = getSuggestions(input);
      if (currentSuggestions.length > 0) {
        setInput(currentSuggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setSuggestions(getSuggestions(value));
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Window */}
        <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-300 text-sm font-medium">
              ~/the-internet/waheeb.dev | [main]
            </div>
            <div className="w-16"></div>
          </div>
          
          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="bg-gray-900 p-6 min-h-[600px] max-h-[600px] overflow-y-auto cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {output.map((line, index) => (
              <div key={index} className="mb-1">
                {index < 6 ? (
                  <pre className="text-cyan-400 font-bold m-0 whitespace-pre">{line}</pre>
                ) : (
                  <pre className="text-green-400 font-bold m-0 whitespace-pre">{line}</pre>
                )}
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-green-400 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-gray-800 text-green-400 outline-none font-mono px-2 py-1 rounded border border-gray-600 focus:border-cyan-400"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            
            {suggestions.length > 0 && input.trim() && (
              <div className="mt-1 text-gray-500 text-sm">
                suggestions: {suggestions.join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

