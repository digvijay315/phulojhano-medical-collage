import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: "q1",
    question: "How to apply for MBBS?",
    answer: "Admissions to the MBBS programme are strictly based on the NEET-UG examination results and the subsequent state/central counseling process.",
  },
  {
    id: "q2",
    question: "What is the fee structure?",
    answer: "The fee structure is determined by the Government of Jharkhand. For detailed fee breakdown, please visit the Academics section.",
  },
  {
    id: "q3",
    question: "Where is the college located?",
    answer: "Phulo Jhano Medical College & Hospital is located in Dumka, Jharkhand.",
  },
  {
    id: "q4",
    question: "Are hostel facilities available?",
    answer: "Yes, we provide separate, well-equipped hostel facilities for both boys and girls within the campus.",
  },
  {
    id: "q5",
    question: "How can I contact the hospital?",
    answer: "You can reach the hospital emergency 24x7 at our official contact number listed in the header.",
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Phulo Jhano Medical College! Please select a question below or type your query.", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text, isFaq = false, answer = "") => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      setIsTyping(false);
      
      let botResponseText = answer;
      if (!isFaq) {
        botResponseText = "Thanks for your message. Currently, I can only answer predefined questions. Please contact the administration for specific queries.";
      }

      const botMsg = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 w-[340px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold shadow-inner">
                  PJ
                </span>
                <div>
                  <h3 className="text-sm font-semibold">College Assistant</h3>
                  <p className="text-xs text-primary-foreground/70">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-primary-foreground/20"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex h-80 flex-col gap-3 overflow-y-auto bg-muted/30 p-4">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.isBot
                      ? "self-start rounded-tl-sm bg-card text-card-foreground border border-border shadow-sm"
                      : "self-end rounded-tr-sm bg-accent text-accent-foreground shadow-sm"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-start rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-2.5 shadow-sm"
                >
                  <span className="flex gap-1">
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></motion.span>
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></motion.span>
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></motion.span>
                  </span>
                </motion.div>
              )}

              {/* FAQ Suggestions */}
              {!isTyping && messages[messages.length - 1].isBot && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 flex flex-wrap gap-2"
                >
                  {faqs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleSend(faq.question, true, faq.answer)}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 hover:border-primary/30 text-left"
                    >
                      {faq.question}
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-card p-3">
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                  aria-label="Send message"
                >
                  ➤
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground shadow-xl transition-colors hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-accent/30"
        aria-label="Toggle chat"
      >
        {isOpen ? "✕" : "💬"}
      </motion.button>
    </div>
  );
}
